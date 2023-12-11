import React, { useState, useEffect } from 'react';
import { firestore } from '../../firebase/firebase';
import { collection, addDoc, where, query, getDocs } from 'firebase/firestore';
// import TransferRequests from '../TransferRequest/TransferRequest';
import { UserAuth } from '../../context/authcontext';
import './request.scss';

const TransferRequestForm = ({selectedCertificateDetails,cnaclehandler}) => {
  const [certificates, setCertificates] = useState([]);
  const [recipientEmail, setRecipientEmail] = useState('');
  // const [selectedCertificate, setSelectedCertificate] = useState('');
 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = UserAuth();
console.log(certificates)
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user && user.uid) {
          const certificateCollection = collection(firestore, 'certificates');
          const snapshot = await getDocs(query(certificateCollection, where('creatorID', '==', user.uid)));

          const certificateData = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

          setCertificates(certificateData);
          setLoading(false);
        } else {
          console.log('User not authenticated.');
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching certificates:', error);
        setError('Error fetching certificates.');
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  const handleTransferRequest = async (e) => {
    e.preventDefault();

    try {
      console.log('Recipient email', recipientEmail);
      console.log('Selected certificate details', selectedCertificateDetails);

      const transferRequestsCollection = collection(firestore, 'transferRequests');
      await addDoc(transferRequestsCollection, {
        certificateDetails: selectedCertificateDetails,
        recipient: recipientEmail,
        status: 'pending',
      });

      alert('Transfer request submitted successfully!',onclick={cnaclehandler});
    } catch (error) {
      console.error('Error submitting transfer request:', error);
      alert('Error submitting transfer request.');
    }
  };

  return (
    <div className='transfer-container'>
      <h2>Transfer Request Form</h2>
      {loading && <p>Loading certificates...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!loading && !error && (
        <form onSubmit={handleTransferRequest}>
          <label>
            Select Certificate:{selectedCertificateDetails?.filename}
           
          </label>
          <br />
          <label>
            Email:
            <input
              type='text'
              value={recipientEmail}
              onChange={(e) => setRecipientEmail(e.target.value)}
            />
          </label>
          <br />
          <button type='submit'>Submit Transfer Request</button>
        </form>
      )}
    </div>
  );
};

export default TransferRequestForm;
