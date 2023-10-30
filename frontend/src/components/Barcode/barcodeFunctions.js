import { useRef, useState, useEffect } from "react";
import Quagga from '@ericblade/quagga2';
import { useDispatch, useSelector } from "react-redux";
import {setSku, setStatus } from "../../store/barcodeSlice";
export default function BarcodeFunctions() {
    const [scanning, setScanning] = useState(false); // toggleable state for "should render scanner"
    const [cameras, setCameras] = useState([]); // array of available cameras, as returned by Quagga.CameraAccess.enumerateVideoDevices()
    const [cameraId, setCameraId] = useState(null); // id of the active camera device
    const [cameraError, setCameraError] = useState(null); // error message from failing to access the camera
    const [results, setResults] = useState(); // list of scanned results
    const scannerRef = useRef(null); // reference to the scanner element in the DOM

    const {status} = useSelector((state) => state.barcode);
    const dispatch = useDispatch();


    useEffect(() => {
        const enableCamera = async () => {
            await Quagga.CameraAccess.request(null, {});
        };
        const disableCamera = async () => {
            await Quagga.CameraAccess.release();
        };
        const enumerateCameras = async () => {
            const cameras = await Quagga.CameraAccess.enumerateVideoDevices();
            console.log('Cameras Detected: ', cameras);
            return cameras;
        };
        enableCamera()
        .then(disableCamera)
        .then(enumerateCameras)
        .then((cameras) => setCameras(cameras))
        .then(() => Quagga.CameraAccess.disableTorch()) // disable torch at start, in case it was enabled before and we hot-reloaded
        .catch((err) => setCameraError(err));
        return () => disableCamera();
    }, []);
  

    useEffect(() => {
        console.log(results);
        if(!status && results && results.length > 0){
            document.getElementById('my_modal_2').close();
            dispatch(setSku(results))
            dispatch(setStatus(true))
        }     
    },[results])

    return (
        {
        scanning,
        cameras,
        cameraId,
        cameraError,
        scannerRef,
        setScanning,
        setCameraId,
        setResults,
    })
}