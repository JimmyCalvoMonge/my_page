// //Programming our own react hook to fetch data. [Useful to get data from api]
// We are not going to use it here
// Taken from coding-ninja tutorial
// /*
// It can be from web API or from local json file
// */

// import { useState, useEffect } from "react";  //useState to change the state of variables.

// const useFetch = (url) => {

//     const [data,setData] = useState(null);
//     const [isPending, setIsPending] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect ( ()=>{

//         const abortCont = new AbortController();

//         setTimeout(()=>{
//             //This is an example of fetching data from an API. This is a simulation, using 
//             //command line with: npx json-server --watch data/db.json --port 8000
//             //Will render a "fake" api in that url.
//             //fetch(filename, {signal: abortCont.signal})  // To read a local file, this one need to be in the public folder
//             fetch(url, {signal: abortCont.signal}) 
//             .then(res =>{
//                 if (!res.ok){
//                     console.log('ERROR!')
//                     console.log(res)
//                 }
//                 return res.json();
//             }).then(
//                 data =>{
//                     setData(data);
//                     setIsPending(false);
//                     setError(null);
//                 }).catch( err =>{

//                     if (err.name==='AbortError'){
//                         console.log('Data Fetch Aborted');
//                     } else { 
//                         setError(err.message);
//                         setIsPending(false);
//                     }
//                 }
//                 );
//         },200) //Simulate a data fetching.

//         return () => abortCont.abort();
//     }, [url]);

//     return { data, isPending, error };
// };

// export default useFetch;