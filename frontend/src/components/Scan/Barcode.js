// import React, { Component } from "react";
// import styled from "styled-components";
// import { Observable } from "rxjs";
// import { scan } from "rxjs/operators";

// class Barcode extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       result: 0,
//       cameraStream: null,
//     };
//   }

//   openCamera = () => {
//     if (!this.state.isCameraOpen) {
//       // Access the user's webcam
//       if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
//         navigator.mediaDevices
//           .getUserMedia({ video: true })
//           .then((stream) => {
//             this.setState({ cameraStream: stream, isCameraOpen: true });
//           })
//           .catch((error) => {
//             console.error("Error accessing the camera:", error);
//           });
//       } else {
//         console.error("getUserMedia is not supported in this browser.");
//       }
//     }
//   };

//   componentDidMount() {
//     // Create an observable that emits a sequence of numbers
//     const numbers$ = new Observable((observer) => {
//       for (let i = 1; i <= 10; i++) {
//         observer.next(i);
//       }
//       observer.complete();
//     });

//     // Use the scan operator to accumulate the values
//     numbers$
//       .pipe(scan((accumulator, currentValue) => accumulator + currentValue, 0))
//       .subscribe((result) => {
//         this.setState({ result });
//       });

//     // Access the user's webcam
//     if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
//       navigator.mediaDevices
//         .getUserMedia({ video: true })
//         .then((stream) => {
//           this.setState({ cameraStream: stream });
//         })
//         .catch((error) => {
//           console.error("Error accessing the camera:", error);
//         });
//     } else {
//       console.error("getUserMedia is not supported in this browser.");
//     }
//   }

//   componentWillUnmount() {
//     this.closeCamera();
//   }

//   closeCamera = () => {
//     // Use an arrow function to automatically bind to the component instance
//     if (this.state.cameraStream) {
//       this.state.cameraStream.getTracks().forEach((track) => track.stop());
//     }
//   };

//   render() {
//     const { className } = this.props;

//     return (
//       <div className={className}>
//         <div>Barcode test</div>
//         <div>Accumulated Result: {this.state.result}</div>
//         <video
//           ref={(video) => {
//             if (video && this.state.cameraStream) {
//               video.srcObject = this.state.cameraStream;
//             }
//           }}
//           autoPlay
//         />
//         <button onClick={this.closeCamera}>Close Camera</button>
//       </div>
//     );
//   }
// }

// const StyledBarcode = styled(Barcode)`
//   /* Add your CSS styles here */
//   background-color: lightgray;
//   border: 1px solid gray;
//   padding: 10px;
//   font-size: 18px;
//   text-align: center;

//   div {
//     /* Styles for the nested div */
//     color: blue;
//   }

//   video {
//     /* Styles for the video element */
//     width: 100%;
//     height: auto;
//   }
// `;

// export default StyledBarcode;
