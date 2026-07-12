// // import React, { useEffect, useState } from 'react'
// // import { db } from '../firebase/firebase'
// // import { addDoc, getDoc, getDocs, collection, doc } from 'firebase/firestore';
// // import { useParams } from 'react-router-dom';


// // const ShowData = () => {

// //     const [tital, settital] = useState("")
// //     const [des, setdes] = useState("")
// //     const { id } = useParams();
// //     // console.log(id);

// //     async function showdata() {


// //         const ref = doc(db, "Issue", id);
// //         const getData = await getDoc(ref)
// //         console.log(getData);
// //         if (getData.exists()) {
// //             settital(getData.data().Tital);
// //             setdes(getData.data().Description);
// //         } else {
// //             console.log("document not found");

// //         }


// //     }
// //     useEffect(() => {
// //         showdata()
// //     }, [])
// //     return (
// //         <>

// //             <div id='body'>
// //                 <div className='w-screen h-screen flex flex-col justify-center items-center'>

// //                     <h1 className='my-10'>Tital:<br /><span className='font-bold '>{tital}</span></h1>
// //                     <p>Description<br /><span className='font-bold'>{des}</span></p>
// //                 </div>
// //             </div>

// //         </>
// //     )
// // }

// // export default ShowData


// import React, { useEffect, useState } from 'react'
// import { db } from '../firebase/firebase'
// import { getDoc, doc } from 'firebase/firestore'; // Jo imports use nahi ho rahe unhe hata diya
// import { useParams } from 'react-router-dom';

// const ShowData = () => {
//     const [tital, settital] = useState("")
//     const [des, setdes] = useState("")
//     const { id } = useParams();

//     async function showdata() {
//         try {
//             const ref = doc(db, "Issue", id);
//             const getData = await getDoc(ref);
//             if (getData.exists()) {
//                 settital(getData.data().Tital);
//                 setdes(getData.data().Description);
//             } else {
//                 console.log("Document not found");
//             }
//         } catch (error) {
//             console.error("Error fetching document:", error);
//         }
//     }

//     useEffect(() => {
//         showdata();
//     }, [id]); // id ko dependency array mein daalna behtar practice hai

//     return (
//         <div className='w-screen min-h-screen bg-gray-50 flex justify-center items-center p-4'>
//             {/* Main Card Container */}
//             <div className='bg-white shadow-xl rounded-2xl p-8 max-w-lg w-full border border-gray-100'>
                
//                 {/* Title Section */}
//                 <div className='mb-6'>
//                     <span className='text-xs font-semibold text-blue-600 uppercase tracking-wider block mb-1'>
//                         Title
//                     </span>
//                     <h1 className='text-2xl font-bold text-gray-800 break-words leading-tight'>
//                         {tital || "Loading..."}
//                     </h1>
//                 </div>

//                 {/* Divider Line */}
//                 <hr className='border-gray-100 my-4' />

//                 {/* Description Section */}
//                 <div>
//                     <span className='text-xs font-semibold text-blue-600 uppercase tracking-wider block mb-1'>
//                         Description
//                     </span>
//                     <p className='text-gray-600 text-base leading-relaxed break-words whitespace-pre-line'>
//                         {des || "No description available."}
//                     </p>
//                 </div>

//             </div>
//         </div>
//     )
// }

// export default ShowData;

import React, { useEffect, useState } from 'react';
import { db } from '../firebase/firebase';
import { getDoc, doc } from 'firebase/firestore'; 
import { useParams } from 'react-router-dom';

const ShowData = () => {
    const [tital, settital] = useState("");
    const [des, setdes] = useState("");
    const [worker, setWorker] = useState("");
    const [loading, setLoading] = useState(true);
    const { id } = useParams();

    async function showdata() {
        try {
            setLoading(true);
            const ref = doc(db, "Issue", id);
            const getData = await getDoc(ref);
            if (getData.exists()) {
                settital(getData.data().Tital);
                setdes(getData.data().Description);
                setWorker(getData.data().WorkerName || "Not Assigned");
            } else {
                console.log("Document not found");
            }
        } catch (error) {
            console.error("Error fetching document:", error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if(id) {
            showdata();
        }
    }, [id]); 

    if (loading) {
        return (
            <div className='w-screen min-h-screen bg-gray-50 flex justify-center items-center'>
                <p className='text-gray-500 font-semibold animate-pulse'>Loading Asset Data...</p>
            </div>
        );
    }

    return (
        <div className='w-screen min-h-screen bg-gray-50 flex justify-center items-center p-4'>
            <div className='bg-white shadow-xl rounded-2xl p-8 max-w-lg w-full border border-gray-100'>
                
                {/* Worker Section */}
                <div className='mb-4'>
                    <span className='text-xs font-semibold text-blue-600 uppercase tracking-wider block mb-1'>
                        Assigned Worker
                    </span>
                    <p className='text-lg font-medium text-gray-700'>
                        {worker}
                    </p>
                </div>

                <hr className='border-gray-100 my-4' />

                {/* Title Section */}
                <div className='mb-6'>
                    <span className='text-xs font-semibold text-blue-600 uppercase tracking-wider block mb-1'>
                        Issue Title
                    </span>
                    <h1 className='text-2xl font-bold text-gray-800 break-words leading-tight'>
                        {tital || "No Title Available"}
                    </h1>
                </div>

                <hr className='border-gray-100 my-4' />

                {/* Description Section */}
                <div>
                    <span className='text-xs font-semibold text-blue-600 uppercase tracking-wider block mb-1'>
                        Description
                    </span>
                    <p className='text-gray-600 text-base leading-relaxed break-words whitespace-pre-line'>
                        {des || "No description available."}
                    </p>
                </div>

            </div>
        </div>
    );
};

export default ShowData;