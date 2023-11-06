import Scanner from './Scanner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBarcode } from '@fortawesome/free-solid-svg-icons';
import BarcodeFunctions from './barcodeFunctions';
import { Preview } from '@mui/icons-material';
const Barcode = () => {
    const {scannerRef, cameraId, setCameraId, scanning, setScanning, setResults, cameraError, cameras} = BarcodeFunctions();
  return (
    <>
        <button className="btn btn-primary bg-primary-focus ml-2" onClick={()=>document.getElementById('my_modal_2').showModal()}>
              <FontAwesomeIcon icon={faBarcode} className="input-icon" />
        </button>
        <dialog id="my_modal_2" className="modal">
            <div className="modal-box w-11/12 max-w-5xl h-auto flex justify-center items-center">
                <div className='flex-1'>
                    {cameraError ? <p>ERROR INITIALIZING CAMERA -- DO YOU HAVE PERMISSION?</p> : null}
                    {cameras.length === 0 ? <p>Enumerating Cameras, browser may be prompting for permissions beforehand</p> :
                        <form>
                            <select onChange={(event) => setCameraId(event.target.value)}>
                                {cameras.map((camera) => (
                                    <option key={camera.deviceId} value={camera.deviceId}>
                                        {camera.label || camera.deviceId}
                                    </option>
                                ))}
                            </select>
                        </form>
                    }
                    <center><button className='btn' onClick={() => setScanning(!scanning) }>{scanning ? 'หยุด' : 'เริ่ม'}</button></center>
                    <div ref={scannerRef} className="w-auto min-h-[75vh]  md:min-h-[50vh]">
                        {scannerRef.current && <canvas className="drawingBuffer absolute" width={scannerRef.current.offsetWidth} height={scannerRef.current.offsetHeight}></canvas>}
                        {scanning ? <Scanner scannerRef={scannerRef} cameraId={cameraId} onDetected={(result) => setResults(result)}  constraints={{width: scannerRef.current.offsetWidth, height: scannerRef.current.offsetHeight}}/> : null}
                    </div>
                </div>
            </div>
            <form method="dialog" className="modal-backdrop">
                <button>close</button>
            </form>
        </dialog>

                
    </>
  );
};

export default Barcode;