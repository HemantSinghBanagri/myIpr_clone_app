import React, { useState, useEffect } from 'react';
import './certificatedetails.scss'
import DeleteIcon from '@mui/icons-material/Delete';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import { firestore, doc, deleteDoc } from '../../../firebase/firebase';
import { useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';


const CertificateDetails = () => {
  const [certificate, setCertificate] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedCertificate = localStorage.getItem('certificateDetails');
    if (storedCertificate) {
      setCertificate(JSON.parse(storedCertificate));
    }
  }, []);

  const handleDelete = async () => {
    try {
      if (certificate) {
        const certificateRef = doc(firestore, 'certificates', certificate.id);
        await deleteDoc(certificateRef);
        alert('Certificate deleted');
        navigate('/home');
      }
    } catch (error) {
      console.error('Error deleting certificate:', error.message);
    }
  };
  const handleDownload = () => {
    if (certificate) {
      const pdf = new jsPDF();
      pdf.text(`Certificate \n\n`, 90, 10);
      pdf.text(`This Certificate is Creator by : ${certificate.Createby}/Activity: ${certificate.activity}\n` , 10, 40);
      
      pdf.text(`The user Creator ID is : ${certificate.creatorID} \n and was Created on the Date Issued: ${certificate.dateIssued}\n` , 10, 50);
      pdf.text(`The User Email Id is: ${certificate.email} with the filename  Filename: ${certificate.filename}\n`, 10, 70);
      

      pdf.save(`${certificate.filename}_details.pdf`);
    }
  };

  return (
    <div className='main-container-certificate'>
     {/* <Link to="/home">Certificate <ArrowRightAltIcon/> <h4> Create Certificate </h4></Link> */}
      <h2>Certificates</h2>
    <div className="certificate-details-container">

   
      <div className='certificate-button-details'>
      <button className="delete-button" onClick={handleDelete}>
              <DeleteIcon />
              <span>Delete</span>
            </button>
            <button className="download-button" onClick={handleDownload }>
              <CloudDownloadIcon />
              <span>Download</span>
            </button>
            </div>
      {certificate && (
        <div className="certificate-details-content">
          
          <div className="left-side">
          <div className='certificate-pathname'>  <p>Certificate Details <ArrowRightAltIcon/> {certificate.filename}</p> </div>
          <div className='left-side-certificate-detail'>
           
            <p>Created by : {certificate.Createby}</p>
          </div>
            {certificate.image && <img src={certificate.image} alt={certificate.filename} />}
          </div>

          
          <div className="right-side">
          <p className='complete-certifiate'>Complete</p>
            <p>
              <strong>Creator:</strong> {certificate.Createby}
            </p>
            <p>
              <strong>Activity:</strong> {certificate.activity}
            </p>
            <p>
              <strong>Creator ID:</strong> {certificate.creatorID}
            </p>
            <p>
              <strong>Date Issued:</strong> {certificate.dateIssued}
            </p>
            <p>
              <strong>Email:</strong> {certificate.email}
            </p>
            <p>
              <strong>Filename:</strong> {certificate.filename}
            </p>
          </div>
        </div>
      )}
    </div>
    <div className='certificate-detail-border'></div>
    </div>
  );
};

export default CertificateDetails;
