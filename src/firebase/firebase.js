
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import { getFirestore ,collection,addDoc,deleteDoc,getDocs,onSnapshot,where,query,doc} from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyCcojRc2JU8T_YtEIkoNH3ea825y-BVicE",
  authDomain: "myipr-da511.firebaseapp.com",
  databaseURL: "https://myipr-da511-default-rtdb.firebaseio.com",
  projectId: "myipr-da511",
  storageBucket: "myipr-da511.appspot.com",
  messagingSenderId: "514538298997",
  appId: "1:514538298997:web:c9f5fd04d14320435ca23c",
  measurementId: "G-78WPLEHLY0"
};


const app = initializeApp(firebaseConfig);
 const firestore=getFirestore(app)
export const auth=getAuth(app)

export {firestore,collection,deleteDoc,getDocs,addDoc,onSnapshot,where,query,doc,app as default} 



// const addCertificatesToFirestore = async () => {
//   try {
   
//     const db = getFirestore();

  
//     const certificatesData = [
//       { Createby: 'Company A', dateIssued: '2023-01-01', filename: 'image certificate', creatorID: '1fuHxxnMOqRpHUXxH3bdp4QeJA33' ,activity:'Created',email:'hem@gmail.com'},
//       { Createby: 'Company B', dateIssued: '2023-02-01', filename: 'nowwave ', creatorID: 'NvKuC18dKWdu3KfgMCW9XSFNzfI2' ,activity:'Created',email:'123@gmail.com' },
//       { Createby: 'Company C', dateIssued: '2023-03-01', filename: 'world certficate', creatorID: '1fuHxxnMOqRpHUXxH3bdp4QeJA33',activity:'Created',email:'123@gmail.com' },
//       { Createby: 'Company A', dateIssued: '2023-01-01', filename: 'undertaker', creatorID: '1fuHxxnMOqRpHUXxH3bdp4QeJA33' ,activity:'Created',email:'123@gmail.com' },
//       { Createby: 'Company B', dateIssued: '2023-02-01', filename: 'pokemon ', creatorID: 'NvKuC18dKWdu3KfgMCW9XSFNzfI2' ,activity:'Created',email:'123@gmail.com' },
//       { Createby: 'Company C', dateIssued: '2023-03-01', filename: 'power ranger', creatorID: '1fuHxxnMOqRpHUXxH3bdp4QeJA33',activity:'Created',email:'hem@gmail.com' },
//       { Createby: 'Company A', dateIssued: '2023-01-01', filename: 'hondacity', creatorID: '1fuHxxnMOqRpHUXxH3bdp4QeJA33' ,activity:'Created',email:'hem@gmail.com' },
//       { Createby: 'Company B', dateIssued: '2023-02-01', filename: 'naruto', creatorID: 'NvKuC18dKWdu3KfgMCW9XSFNzfI2' ,activity:'Created',email:'123@gmail.com' },
//       { Createby: 'Company C', dateIssued: '2023-03-01', filename: 'parazite', creatorID: '1fuHxxnMOqRpHUXxH3bdp4QeJA33',activity:'Created' ,email:'123@gmail.com' },
//       { Createby: 'Company A', dateIssued: '2023-01-01', filename: 'hello', creatorID: '1fuHxxnMOqRpHUXxH3bdp4QeJA33' ,activity:'Created',email:'hem@gmail.com'},
//       { Createby: 'Company B', dateIssued: '2023-02-01', filename: 'Tenz', creatorID: 'NvKuC18dKWdu3KfgMCW9XSFNzfI2' ,activity:'Created',email:'123@gmail.com' },
//       { Createby: 'Company C', dateIssued: '2023-03-01', filename: 'prod', creatorID: '1fuHxxnMOqRpHUXxH3bdp4QeJA33',activity:'Created',email:'hem@gmail.com' },
//       { Createby: 'Company A', dateIssued: '2023-01-01', filename: 'zoro', creatorID: '1fuHxxnMOqRpHUXxH3bdp4QeJA33' ,activity:'Created',email:'hem@gmail.com'},
//       { Createby: 'Company B', dateIssued: '2023-02-01', filename: 'nike ', creatorID: 'NvKuC18dKWdu3KfgMCW9XSFNzfI2' ,activity:'Created',email:'123@gmail.com' },
//       { Createby: 'Company C', dateIssued: '2023-03-01', filename: 'earth', creatorID: '1fuHxxnMOqRpHUXxH3bdp4QeJA33',activity:'Created',email:'123@gmail.com' },
//       { Createby: 'Company A', dateIssued: '2023-01-01', filename: 'aftar', creatorID: '1fuHxxnMOqRpHUXxH3bdp4QeJA33' ,activity:'Created',email:'123@gmail.com' },
//       { Createby: 'Company B', dateIssued: '2023-02-01', filename: 'doremon ', creatorID: 'NvKuC18dKWdu3KfgMCW9XSFNzfI2' ,activity:'Created',email:'123@gmail.com' },
//       { Createby: 'Company C', dateIssued: '2023-03-01', filename: 'shinchan', creatorID: '1fuHxxnMOqRpHUXxH3bdp4QeJA33',activity:'Created',email:'hem@gmail.com' },
//       { Createby: 'Company A', dateIssued: '2023-01-01', filename: 'gogo', creatorID: '1fuHxxnMOqRpHUXxH3bdp4QeJA33' ,activity:'Created',email:'hem@gmail.com' },
//       { Createby: 'Company B', dateIssued: '2023-02-01', filename: 'mountain', creatorID: 'NvKuC18dKWdu3KfgMCW9XSFNzfI2' ,activity:'Created',email:'123@gmail.com' },
//       { Createby: 'Company C', dateIssued: '2023-03-01', filename: 'flight', creatorID: '1fuHxxnMOqRpHUXxH3bdp4QeJA33',activity:'Created' ,email:'123@gmail.com' },
//       { Createby: 'Company A', dateIssued: '2023-01-01', filename: 'instagram', creatorID: '1fuHxxnMOqRpHUXxH3bdp4QeJA33' ,activity:'Created',email:'hem@gmail.com'},
//       { Createby: 'Company B', dateIssued: '2023-02-01', filename: 'Tata', creatorID: 'NvKuC18dKWdu3KfgMCW9XSFNzfI2' ,activity:'Created',email:'123@gmail.com' },
//       { Createby: 'Company C', dateIssued: '2023-03-01', filename: 'GG', creatorID: '1fuHxxnMOqRpHUXxH3bdp4QeJA33',activity:'Created',email:'hem@gmail.com' },
//     ];

    
//     for (const certificate of certificatesData) {
//       await addDoc(collection(db, 'certificates'), certificate);
//       console.log(`Certificate added: ${certificate.name}`);
//     }

//     console.log('Certificates added successfully');
//   } catch (error) {
//     console.error('Error adding certificates to Firestore:', error.message);
//   }
// };


// addCertificatesToFirestore();

