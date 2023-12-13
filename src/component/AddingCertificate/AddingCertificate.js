import React, { useState ,useEffect} from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { storage, ref, uploadBytes, getDownloadURL } from '../../firebase/firebase';
import { firestore, auth } from '../../firebase/firebase';
import './addingcertificate.scss';
import { useNavigate} from 'react-router-dom'; 
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import { Link } from 'react-router-dom';
import RotateLeftIcon from '@mui/icons-material/RotateLeft';

const AddingCertificate = () => {
  const navigate = useNavigate();

  const [part, setPart] = useState(1);
  const [file, setFile] = useState(null);
  const [filename, setFilename] = useState('');
  const [creatorID, setCreatorID] = useState('');
  const [email, setEmail] = useState('');
  const [Createby, setCreateBy] = useState('');
  const [activity] = useState('Created');
  const [loading,setloading]=useState(false)
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleNext = () => {
    setPart(2);
  };
  const handleBack = () => {
    setPart(1);
  };
  const canclehandle=()=>{
    navigate("/home")
  }



  useEffect(() => {
    
    const user = auth.currentUser;
    if (user) {
      setEmail(user.email);
      setCreatorID(user.uid);
    }
  }, []);

  const handleUpload = async () => {
    try {
      setloading(true)
      
      const storageRef = ref(storage, `images/${file.name}`);
      await uploadBytes(storageRef, file);

      
      const imageUrl = await getDownloadURL(storageRef);

      
      const certificatesCollection = collection(firestore, 'certificates');
      const docRef = await addDoc(certificatesCollection, {
        filename,
        creatorID,
        email,
        Createby,
        activity,
        dateIssued: new Date().toISOString().split('T')[0],
        image: imageUrl,
      });
      
      console.log('Image details added with ID: ', docRef.id);
      alert('Certificate created successfully!');

      
      navigate('/home');
    } catch (error) {
      console.error('Error uploading image:', error.message);
    }finally {
      setloading(false);
    }
  };

  return (
    <div className='main-container-certificate'>
     <Link to="/home">Certificate <ArrowRightAltIcon/> <h4> Create Certificate </h4></Link>
      <h2>New Certificates</h2>
    <div className="container">
      {part === 1 && (
        <div>
          <h2>Upload File</h2>
          <form>
           
            <div className="drop-area">
            <DriveFolderUploadIcon/>
            <input type="file" onChange={handleFileChange} />
              
              Drag & Drop an file or <span>browser</span>
              <p>Local storage: 100MB max | Cloud storage: 5GB max</p>
              <p>Executable files are not allowed</p>
            </div>
            <div className='file-button'>
            <button type='button' onClick={canclehandle} className='cancle-file'>Cancle</button>
            <button type="button" onClick={handleNext}>
            
              Next
            </button></div>
          </form>
        </div>
      )}

      {part === 2 && (
        <div className='part2'>
         
          <h2> Certificate Details</h2>
          <p>Please enter the following details.</p>
          <form>
            <div>
              <label>Filename:</label>
              <input type="text" value={filename} onChange={(e) => setFilename(e.target.value)} />
            </div>
            <div>
              <label>Creator ID:</label>
              <input type="text" value={creatorID} readOnly />
            </div>
            <div>
              <label>Email:</label>
              <input type="text" value={email} readOnly />
            </div>
            <div>
              <label>Create By:</label>
              <input type="text" value={Createby} onChange={(e) => setCreateBy(e.target.value)} />
            </div>
            <div>
              <label>Activity:</label>
              <input type="text" value={activity} readOnly />
            </div>

            <div className='part2-button'>
            <button className ="back-button" type="button" onClick={handleBack}>
              Back
            </button>
            <button type="button" className='upload-loading' onClick={handleUpload} disabled={loading}>
            {loading ? <RotateLeftIcon className='spinner'/> : 'Create Certificate '}
              
            </button>
            </div>
          </form>
        </div>
      )}
    </div>
    </div>

  );
};

export default AddingCertificate;
