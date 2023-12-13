

import React, { useState, useEffect } from 'react';
import { firestore } from '../../firebase/firebase';
import { collection, getDoc, where, query, onSnapshot, updateDoc, doc } from 'firebase/firestore';
import { UserAuth } from '../../context/authcontext';
import "./mainreceivetransfer.scss"

const ReceiveTransferRequest = () => {
  const [transferRequests, setTransferRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const {user}=UserAuth()

  const [currentPage,setCurrentPage]=useState(1)
  const [itemsPerPage,setItemsPerPage]=useState(5)
  console.log(setItemsPerPage)

  useEffect(() => {
    if (user) {
      const transferRequestsCollection = collection(firestore, 'transferRequests');
      const transferRequestsQuery = query(
        transferRequestsCollection,
        where('recipient', '==', user.email),
        where('status', '==', 'pending')
      );

      const unsubscribe = onSnapshot(transferRequestsQuery, (snapshot) => {
        try {
          const requests = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
          setTransferRequests(requests);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching transfer requests:', error);
          setError('Error fetching transfer requests.');
          setLoading(false);
        }
      });

      return () => unsubscribe();
    }
  }, [user]);

  const handleDeclineRequest = async (requestId) => {
    try {
      const transferRequestDocRef = doc(firestore, 'transferRequests', requestId);
      await updateDoc(transferRequestDocRef, { status: 'Declined ' });
    } catch (error) {
      console.error('Error declining transfer request:', error);
    }
  };

  const handleAcceptRequest = async (requestId) => {
    try {
      const transferRequestDocRef = doc(firestore, 'transferRequests', requestId);
      const transferRequestSnapshot = await getDoc(transferRequestDocRef);
      const transferRequestData = transferRequestSnapshot.data();
  
      if (transferRequestData && transferRequestData.status === 'pending') {
        const certificateId = transferRequestData.certificateDetails.id;
  
        const certificatesCollection = collection(firestore, 'certificates');
        const existingCertificate = await getDoc(doc(certificatesCollection, certificateId));
  
        if (existingCertificate.exists()) {
     
          await updateDoc(doc(certificatesCollection, certificateId), {
            email: transferRequestData.recipient,
            
           
          });
        } 
        
        await updateDoc(transferRequestDocRef, { status: 'Accepted' });
  
        console.log('Transfer request accepted:', requestId);
      } else {
        console.warn('Invalid transfer request state or not found.');
      }
    } catch (error) {
      console.error('Error accepting transfer request:', error);
    }
  };
  

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = transferRequests.slice(indexOfFirstItem, indexOfLastItem);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  return (
    <div className='main-container-reveiver'>
      {/* <h2>Certificate transfer</h2> */}
      {loading && <p>Loading transfer requests...</p>}
      {error && <p style={{ color: 'red' }}>{`Error fetching transfer requests: ${error}`}</p>}
      {!loading && !error && (
        <div>
        <table className="transfer-requests-table">
        <thead>
          <tr>
            <th>Certificate ID</th>
            <th>File Name</th>
            <th>Request ID</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {
            transferRequests.length === 0 ? (
  
  <tr>
    <td colSpan='4'>No Record Found</td>
  </tr>
) :(currentItems.map((request) => (
            <tr key={request.id}>
              <td>{request.certificateDetails.id}</td>
              <td>{request.certificateDetails.filename}</td>
              <td>{request.certificateDetails.Createby}</td>
              <td >{request.status}</td>
              <td>
                {request.status === 'pending' && (
                  <>
                    <button onClick={() => handleDeclineRequest(request.id)}>Decline</button>
                    <button onClick={() => handleAcceptRequest(request.id)}>Accept</button>
                  </>
                )}
              </td>
            </tr>
          )))}
        </tbody>
      </table>
      <div className='pagination'>
            <div className='page-info'>
              <span>
                Showing {indexOfFirstItem + 1} to{' '}
                {Math.min(indexOfLastItem, transferRequests.length)} from {transferRequests.length} items
              </span>
            </div>
            <div className='page-numbers'>
              {Array.from(
                { length: Math.ceil(transferRequests.length / itemsPerPage) },
                (_, i) => i + 1
              ).map((pageNumber) => (
                <span
                  key={pageNumber}
                  onClick={() => paginate(pageNumber)}
                  className={currentPage === pageNumber ? 'active' : ''}
                >
                  {pageNumber}
                </span>
              ))}
            </div>
          </div>
        
      </div>
      
      )}
    </div>
  );
};
export default ReceiveTransferRequest;
