// // import React, { useEffect, useRef } from 'react'
// // import { db } from '../firebase/firebase'
// // import { addDoc, getDoc, getDocs, collection } from 'firebase/firestore';
// // import { QRCodeCanvas } from "qrcode.react";
// // import { useState } from 'react';

// // const Get_Issue = () => {
// //   const [qrUrl, setQrUrl] = useState("");
// //   const ref = collection(db, "Issue")



// //   const Issue_Tital = useRef();
// //   const Description = useRef();

// //   async function handler() {

// //     let userIssue = {
// //       "Tital": Issue_Tital.current.value,
// //       "Description": Description.current.value

// //     }
// //     try {
// //       const addData = await addDoc(ref, userIssue)

// //       console.log(addData.id);
// //       const issueUrl = `${window.location.origin}/showdata/${addData.id}`;
// //       localStorage.setItem("qrUrl", issueUrl)
// //       const saved = localStorage.getItem("qrUrl");

// //       if (saved) {
// //         setQrUrl(saved);
// //       }
// //       // setQrUrl(issueUrl);

// //       console.log(issueUrl);

// //       // if (addData) {
// //       //   console.log("data is added");
// //       // } else {
// //       //   console.log("error Arha he");
// //       // }
// //     } catch (error) { console.error }

// //   }

// //   useEffect(() => {
// //     const savedUrl = localStorage.getItem("qrUrl");

// //     if (savedUrl) {
// //       setQrUrl(savedUrl);
// //     }
// //   }, []);

// //   async function getdocs() {
// //     const snapshot = await getDocs(collection(db, "Issue"));

// //     snapshot.forEach((doc) => {
// //       console.log(doc.id);  

// //     });
// //   }

// //   // useEffect(()=>{
// //   //   console.log("useEffect chala");
// //   //   getdocs()
// //   // },[])

// //   return (
// //     <>



// //       <div id="maindiv" className='h-screen'>

// //         <div className='flex flex-col justify-center items-center h-screen'>

// //           <input ref={Issue_Tital} type="text" name="tital" id="tital" placeholder='Enter Issue Tital' className='border my-10 p-2' />

// //           <textarea ref={Description} name="description" id="description" placeholder='Enter Issue Description' className='border h-50 w-50'></textarea>

// //           <button onClick={handler} className='bg-blue-400 p-2 font-bold mt-10 text-white rounded-xl'>Issue Submit</button>

// //           <h1 className='text-2xl'>Scan-QRcode</h1>

// //         </div>

// //       </div>


// //     </>
// //   )
// // }

// // export default Get_Issue


























// // import React, { useRef } from "react";
// // import { db } from "../firebase/firebase";
// // import { collection, addDoc } from "firebase/firestore";
// // import { useNavigate } from "react-router-dom";

// // const Get_Issue = () => {

// //     const navigate = useNavigate();

// //     const titleRef = useRef();
// //     const descriptionRef = useRef();

// //     const issueRef = collection(db, "Issue");

// //     async function handler() {

// //         const userIssue = {
// //             Tital: titleRef.current.value,
// //             Description: descriptionRef.current.value,
// //         };

// //         try {

// //             const addData = await addDoc(issueRef, userIssue);

// //             console.log("Document ID:", addData.id);

// //             // QR Page pr bhej do
// //             navigate(`/qrcode/${addData.id}`);

// //         } catch (error) {

// //             console.log(error);

// //         }

// //     }

// //     return (
// //         <div className="h-screen flex justify-center items-center">

// //             <div className="flex flex-col">

// //                 <input
// //                     ref={titleRef}
// //                     type="text"
// //                     placeholder="Enter Issue Title"
// //                     className="border p-2 my-3"
// //                 />

// //                 <textarea
// //                     ref={descriptionRef}
// //                     placeholder="Enter Description"
// //                     className="border p-2 my-3"
// //                 ></textarea>

// //                 <button
// //                     onClick={handler}
// //                     className="bg-blue-500 text-white p-2 rounded"
// //                 >
// //                     Submit Issue
// //                 </button>

// //             </div>

// //         </div>
// //     );
// // };



// // export default Get_Issue;








// import React, { useRef } from "react";
// import { db } from "../firebase/firebase";
// import { collection, addDoc } from "firebase/firestore";
// import { useNavigate } from "react-router-dom";

// const Get_Issue = () => {

//   const navigate = useNavigate();

//   const titleRef = useRef();
//   const workRef = useRef();
//   const descriptionRef = useRef();

//   async function handler() {

//     if (
//       titleRef.current.value.trim() === "" ||
//       descriptionRef.current.value.trim() === ""
//     ) {
//       alert("Please fill all fields");
//       return;
//     }

//     const issue = {
//       Tital: titleRef.current.value,
//       Description: descriptionRef.current.value,
//     };

//     try {

//       await addDoc(collection(db, "Issue"), issue);

//       alert("Issue Submitted Successfully");

//       titleRef.current.value = "";
//       descriptionRef.current.value = "";

//       navigate("/dashboard");

//     } catch (error) {
//       console.log(error);
//     }
//   }

//   return (
//     <div className="h-screen flex justify-center items-center">

//       <div className="flex flex-col w-[400px]">

//         <input
//           ref={titleRef}
//           className="border p-3 my-3 rounded"
//           placeholder="Worker Name"
//         />
//         <input
//           ref={workRef}
//           className="border p-3 my-3 rounded"
//           placeholder="Issue Title"
//         />
//         <textarea
//           ref={descriptionRef}
//           className="border p-3 my-3 rounded"
//           placeholder="Issue Description"
//         />

//         <button
//           onClick={handler}
//           className="bg-blue-600 text-white p-3 rounded"
//         >
//           Submit Issue
//         </button>

//       </div>

//     </div>
//   );
// };

// export default Get_Issue;


import React, { useRef } from "react";
import { db } from "../firebase/firebase";
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const Get_Issue = () => {
  const navigate = useNavigate();

  const titleRef = useRef(); // Worker Name input
  const workRef = useRef();  // Issue Title input
  const descriptionRef = useRef();

  async function handler() {
    // Teeno fields ki validation check
    if (
      titleRef.current.value.trim() === "" ||
      workRef.current.value.trim() === "" ||
      descriptionRef.current.value.trim() === ""
    ) {
      alert("Please fill all fields");
      return;
    }

    // Database mein save hone wala object
    const issue = {
      WorkerName: titleRef.current.value, // Worker Name add kiya
      Tital: workRef.current.value,       // Issue Title ko Tital key di
      Description: descriptionRef.current.value,
    };

    try {
      await addDoc(collection(db, "Issue"), issue);
      alert("Issue Submitted Successfully");

      titleRef.current.value = "";
      workRef.current.value = "";
      descriptionRef.current.value = "";

      navigate("/dashboard");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="flex flex-col w-[400px]">
        <input
          ref={titleRef}
          className="border p-3 my-3 rounded"
          placeholder="Worker Name"
        />
        <input
          ref={workRef}
          className="border p-3 my-3 rounded"
          placeholder="Issue Title"
        />
        <textarea
          ref={descriptionRef}
          className="border p-3 my-3 rounded"
          placeholder="Issue Description"
        />

        <button
          onClick={handler}
          className="bg-blue-600 text-white p-3 rounded"
        >
          Submit Issue
        </button>
      </div>
    </div>
  );
};

export default Get_Issue;