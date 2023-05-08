import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignupForm = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("mentor");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      firstName,
      lastName,
      email,
      password,
      userType,
    };
    console.log(data);
    const response = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    console.log(result);
    const isRegistered = result["registered"];
    console.log(`registered ${isRegistered}`);
    const userId = result["objectId"];
    if (isRegistered) {
      const response = await fetch(`/profile/${userType}/${userId}`);
      const result = await response.json();
      console.log(result.data);
      const userData = result.data;
      if (userData) {
        navigate("/editProfile", { state: { userData, userType } });
      }
    }
  };

  const handleUserTypeChange = (event) => {
    setUserType(event.target.value);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col justify-center items-center h-screen"
    >
      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        Create an account
      </h1>
      <div className="flex items-center mb-8">
        <label htmlFor="Mentor" className="mr-4 cursor-pointer">
          <input
            type="radio"
            id="Mentor"
            name="userType"
            value="Mentor"
            checked={userType === "Mentor"}
            onChange={handleUserTypeChange}
            required
            className="form-radio text-blue-600 h-4 w-4"
          />
          <span className="ml-2 text-gray-800 font-medium">Mentor</span>
        </label>
        <label htmlFor="Mentee" className="cursor-pointer">
          <input
            type="radio"
            id="Mentee"
            name="userType"
            value="Mentee"
            checked={userType === "Mentee"}
            onChange={handleUserTypeChange}
            required
            className="form-radio text-blue-600 h-4 w-4"
          />
          <span className="ml-2 text-gray-800 font-medium">Mentee</span>
        </label>
      </div>
      <div className="mb-4 w-full">
        <label
          htmlFor="firstName"
          className="text-sm font-medium text-gray-800 mb-2 block"
        >
          First Name
        </label>
        <input
          type="text"
          id="firstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
          className="form-input w-full border-gray-300 shadow-sm focus:ring-blue-600 focus:border-blue-600"
        />
      </div>
      <div className="mb-4 w-full">
        <label
          htmlFor="lastName"
          className="text-sm font-medium text-gray-800 mb-2 block"
        >
          Last Name
        </label>
        <input
          type="text"
          id="lastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
          className="form-input w-full border-gray-300 shadow-sm focus:ring-blue-600 focus:border-blue-600"
        />
      </div>
      <div className="mb-4 w-full">
        <label
          htmlFor="email"
          className="text-sm font-medium text-gray-800 mb-2 block"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="form-input w-full border-gray-300 shadow-sm focus:ring-blue-600 focus:border-blue-600"
        />
      </div>
      <div className="mb-6 w-full">
        <label
          htmlFor="password"
          className="text-sm font-medium text-gray-800 mb-2 block"
        >
          Password
        </label>
        <input
          type="password"
          id="password"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
          className="form-input w-full border-gray-300 shadow-sm focus:ring-blue-600 focus:border-blue-600"
        />
      </div>
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        type="submit"
      >
        Submit
      </button>
    </form>
  );
};

export default SignupForm;

// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// const SignupForm = () => {
//   const navigate = useNavigate();
//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [userType, setUserType] = useState("mentor");

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     const data = {
//       firstName,
//       lastName,
//       email,
//       password,
//       userType,
//     };
//     console.log(data);
//     const response = await fetch("/api/register", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(data),
//     });
//     const result = await response.json();
//     console.log(result);
//     const isRegistered = result["registered"];
//     console.log(`registered ${isRegistered}`);
//     const userId = result["objectId"];
//     if (isRegistered) {
//       const response = await fetch(`/profile/${userType}/${userId}`);
//       const result = await response.json();
//       console.log(result.data);
//       const userData = result.data;
//       if (userData) {
//         navigate("/editProfile", { state: { userData, userType } });
//       }
//     }
//   };

//   const handleUserTypeChange = (event) => {
//     setUserType(event.target.value);
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
//       <div className="sm:mx-auto sm:w-full sm:max-w-md">
//         <h2 className="text-center text-3xl font-extrabold text-gray-900">
//           Create an account
//         </h2>
//       </div>

//       <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
//         <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
//           <form className="space-y-6" onSubmit={handleSubmit}>
//             <div>
//               <label
//                 htmlFor="firstName"
//                 className="block text-sm font-medium text-gray-700"
//               >
//                 First name
//               </label>
//               <div className="mt-1">
//                 <input
//                   id="firstName"
//                   name="firstName"
//                   type="text"
//                   autoComplete="given-name"
//                   value={firstName}
//                   onChange={(e) => setFirstName(e.target.value)}
//                   required
//                   className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
//                 />
//               </div>
//             </div>

//             <div>
//               <label
//                 htmlFor="lastName"
//                 className="block text-sm font-medium text-gray-700"
//               >
//                 Last name
//               </label>
//               <div className="mt-1">
//                 <input
//                   id="lastName"
//                   name="lastName"
//                   type="text"
//                   autoComplete="family-name"
//                   value={lastName}
//                   onChange={(e) => setLastName(e.target.value)}
//                   required
//                   className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
//                 />
//               </div>
//             </div>

//             <div>
//               <label
//                 htmlFor="email"
//                 className="block text-sm font-medium text-gray-700"
//               >
//                 Email address
//               </label>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default SignupForm()
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Navbar from "./Navbar";

// const SignupForm = () => {
//   const navigate = useNavigate();
//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [userType, setUserType] = useState("mentor");

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     const data = {
//       firstName,
//       lastName,
//       email,
//       password,
//       userType,
//     };
//     console.log(data);
//     const response = await fetch("/api/register", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(data),
//     });
//     const result = await response.json();
//     console.log(result);
//     const isRegistered = result["registered"];
//     console.log(`registered ${isRegistered}`);
//     const userId = result["objectId"];
//     if (isRegistered) {
//       const response = await fetch(`/profile/${userType}/${userId}`);
//       const result = await response.json();
//       console.log(result.data);
//       const userData = result.data;
//       if (userData) {
//         navigate("/editProfile", { state: { userData, userType } });
//       }
//     }
//   };

//   const handleUserTypeChange = (event) => {
//     setUserType(event.target.value);
//   };

//   return (
//     <div>
//       <Navbar />
//       <form onSubmit={handleSubmit} className="max-w-lg mx-auto mt-12">
//         <h1 className="text-3xl font-bold text-gray-800 mb-8">
//           Create an account
//         </h1>
//         <div className="flex items-center mb-8">
//           <label htmlFor="mentor" className="mr-4 cursor-pointer">
//             <input
//               type="radio"
//               id="mentor"
//               name="userType"
//               value="mentor"
//               checked={userType === "mentor"}
//               onChange={handleUserTypeChange}
//               required
//               className="form-radio text-blue-600 h-4 w-4"
//             />
//             <span className="ml-2 text-gray-800 font-medium">Mentor</span>
//           </label>
//           <label htmlFor="mentee" className="cursor-pointer">
//             <input
//               type="radio"
//               id="mentee"
//               name="userType"
//               value="mentee"
//               checked={userType === "mentee"}
//               onChange={handleUserTypeChange}
//               required
//               className="form-radio text-blue-600 h-4 w-4"
//             />
//             <span className="ml-2 text-gray-800 font-medium">Mentee</span>
//           </label>
//         </div>
//         <div className="mb-4 w-full">
//           <label
//             htmlFor="firstName"
//             className="text-sm font-medium text-gray-800 mb-2 block"
//           >
//             First Name
//           </label>
//           <input
//             type="text"
//             id="firstName"
//             value={firstName}
//             onChange={(e) => setFirstName(e.target.value)}
//             required
//             className="form-input w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-600 focus:border-blue-600"
//           />
//         </div>
//         <div className="mb-4 w-full">
//           <label
//             htmlFor="lastName"
//             className="text-sm font-medium text-gray-800 mb-2 block"
//           >
//             LastName
//           </label>
//           <input
//             type="text"
//             name="lastName"
//             id="lastName"
//             className="border border-gray-300 rounded-md p-2 w-full"
//           />
//         </div>
//         <div className="mb-4">
//           <label
//             htmlFor="email"
//             className="text-sm font-medium text-gray-800 mb-2 block"
//           >
//             Email
//           </label>
//           <input
//             type="email"
//             name="email"
//             id="email"
//             className="border border-gray-300 rounded-md p-2 w-full"
//           />
//         </div>
//         <div className="mb-4">
//           <label
//             htmlFor="message"
//             className="text-sm font-medium text-gray-800 mb-2 block"
//           >
//             Message
//           </label>
//           <textarea
//             name="message"
//             id="message"
//             rows={5}
//             className="border border-gray-300 rounded-md p-2 w-full"
//           ></textarea>
//         </div>
//         <button
//           type="submit"
//           className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-300"
//         >
//           Submit
//         </button>
//       </form>
//     </div>
//   );
// };

// export default SignupForm;
