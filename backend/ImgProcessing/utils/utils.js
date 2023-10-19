const ort = require("onnxruntime-node");
const sharp = require("sharp");
const nameList = require("../nameList");
const dotenv = require("dotenv");
dotenv.config();

async function detect_objects_on_image(buf, threshold = 0.5) {
    const [input,img_width,img_height] = await prepare_input(buf);
    const output = await run_model(input);
    return process_output(output,img_width,img_height,threshold);
}

async function prepare_input(buf) {
    const img = sharp(buf);
    const md = await img.metadata();
    const [img_width,img_height] = [md.width, md.height];
    const pixels = await img.removeAlpha()
        .resize({width:640,height:640,fit:'fill'})
        .raw()
        .toBuffer();

    const red = [], green = [], blue = [];
    for (let index=0; index<pixels.length; index+=3) {
        red.push(pixels[index]/255.0);
        green.push(pixels[index+1]/255.0);
        blue.push(pixels[index+2]/255.0);
    }

    const input = [...red, ...green, ...blue];
    return [input, img_width, img_height];
}

async function run_model(input) {
    const model = await ort.InferenceSession.create(`./modelONNX/${process.env.MODEL_NAME}`);
    input = new ort.Tensor(Float32Array.from(input),[1, 3, 640, 640]);
    const outputs = await model.run({images:input});
    return outputs["output0"].data;
}

function process_output(output, img_width, img_height, threshold) {
    let boxes = [];
    for (let index = 0; index < 8400; index++) {
        const [class_id, prob] = [...Array(80).keys()]
            .map(col => [col, output[8400 * (col + 4) + index]])
            .reduce((accum, item) => item[1] > accum[1] ? item : accum, [0, 0]);
        if (prob < threshold) {
            continue;
        }
        const label = nameList.yolo_classes[class_id];
        const xc = output[index];
        const yc = output[8400 + index];
        const w = output[2 * 8400 + index];
        const h = output[3 * 8400 + index];
        const x1 = (xc - w / 2) / 640 * img_width;
        const y1 = (yc - h / 2) / 640 * img_height;
        const x2 = (xc + w / 2) / 640 * img_width;
        const y2 = (yc + h / 2) / 640 * img_height;
        const confidence = prob * 100; // Calculate the confidence percentage
        boxes.push([x1, y1, x2, y2, label, confidence]);
    }

    boxes = boxes.sort((box1, box2) => box2[5] - box1[5]);
    const result = [];
    while (boxes.length > 0) {
        result.push(boxes[0]);
        boxes = boxes.filter(box => iou(boxes[0], box) < 0.7);
    }
    return result;
}

function iou(box1,box2) {
    return intersection(box1,box2)/union(box1,box2);
}

function union(box1,box2) {
    const [box1_x1,box1_y1,box1_x2,box1_y2] = box1;
    const [box2_x1,box2_y1,box2_x2,box2_y2] = box2;
    const box1_area = (box1_x2-box1_x1)*(box1_y2-box1_y1)
    const box2_area = (box2_x2-box2_x1)*(box2_y2-box2_y1)
    return box1_area + box2_area - intersection(box1,box2)
}

function intersection(box1,box2) {
    const [box1_x1,box1_y1,box1_x2,box1_y2] = box1;
    const [box2_x1,box2_y1,box2_x2,box2_y2] = box2;
    const x1 = Math.max(box1_x1,box2_x1);
    const y1 = Math.max(box1_y1,box2_y1);
    const x2 = Math.min(box1_x2,box2_x2);
    const y2 = Math.min(box1_y2,box2_y2);
    return (x2-x1)*(y2-y1)
}

exports.detect_objects_on_image = detect_objects_on_image