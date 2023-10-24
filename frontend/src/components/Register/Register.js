import React, { useState } from "react";

function Register() {
  const [userData, setUserData] = useState({
    gender: "",
    age: '',
    weight: '',
    height: '',
    bmi: '',
  });

  const [currentStep, setCurrentStep] = useState('Gender');

  const handleGenderSubmit = (gender) => {
    setUserData({ ...userData, gender });
    setCurrentStep('Bmi');
  };

  const handleBmiSubmit = (bmi) => {
    setUserData({ ...userData, bmi });
    // submit the data to the database.
  };

  const handleEditStep = (step) => {
    setCurrentStep(step);
  };

  return (
    <>
      <div>
     {currentStep === 'Gender' && (
        <genderComponent data={userData.gender} onSubmit={handleGenderSubmit} />
      )}
      {currentStep === 'Bmi' && userData.gender && (
        <BmiComponent data={{ age: userData.age, weight: userData.weight, height: userData.height, bmi: userData.bmi }} onSubmit={handleBmiSubmit} onEdit={() => handleEditStep('Gender')} />
      )}
      {currentStep === 'Height' && userData.gender && userData.age && userData.weight && userData.height && userData.bmi && (
        <CompleteComponent />
      )}
    </div>
    </>
  );
}
export default Register;


// function AgeComponent({ data, onSubmit }) {
//   const [age, setAge] = useState(data || '');

//   const handleSubmit = () => {
//     onSubmit(age);
//   };

//   return (
//     <div>
//       <h1>Age Input</h1>
//       <input type="text" placeholder="Age" value={age} onChange={(e) => setAge(e.target.value)} />
//       <button onClick={handleSubmit}>Next</button>
//     </div>
//   );
// }

// function NameComponent({ data, onSubmit, onEdit }) {
//   const [name, setName] = useState(data || '');

//   const handleSubmit = () => {
//     onSubmit(name);
//   };

//   return (
//     <div>
//       <h1>Name Input</h1>
//       <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
//       <button onClick={handleSubmit}>Next</button>
//       <button onClick={onEdit}>Edit</button>
//     </div>
//   );
// }

// function HeightComponent({ data, onSubmit, onEdit }) {
//   const [height, setHeight] = useState(data || '');

//   const handleSubmit = () => {
//     onSubmit(height);
//   };

//   return (
//     <div>
//       <h1>Height Input</h1>
//       <input type "text" placeholder="Height" value={height} onChange={(e) => setHeight(e.target.value)} />
//       <button onClick={handleSubmit}>Complete</button>
//       <button onClick={onEdit}>Edit</button>
//     </div>
//   );
// }

// export default App;
