import React, { useState, useEffect } from 'react';
import { firestore,collection, deleteDoc, where, query, onSnapshot,doc } from '../../firebase/firebase';

import './trans.scss';
import { UserAuth } from '../../context/authcontext';
import SearchIcon from '@mui/icons-material/Search';


const TransferRequests = () => {
  const [transferRequests, setTransferRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = UserAuth();
  const [isSearch, setIsSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);


  useEffect(() => {
    if (user) {
      const transferRequestsCollection = collection(firestore, 'transferRequests');
      const transferRequestsQuery = query(
        transferRequestsCollection,
        where('certificateDetails.email', '==', user.email)||where('status', '==', 'pending')||where('status', '==', 'accepted , Traansfer Sucessful')||where('status', '==', 'declined , Transfer Fail')
        
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

  

  const handleCancelRequest = async (requestId) => {
    try {
      console.log('Cancelling transfer request with ID:', requestId);
      setLoading(true);
  
      const transferRequestDocRef = doc(firestore, 'transferRequests', requestId);
      await deleteDoc(transferRequestDocRef);
  
      console.log('Transfer request canceled:', requestId);
    } catch (error) {
      console.error('Error canceling transfer request:', error);
      
    } finally {
      setLoading(false);
    }
  };
  

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  // const currentItems = transferRequests.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  // const getRequestStatusClassName = (status) => {
  //   switch (status) {
  //     case 'accepted':
  //       return 'accepted-status';
  //     case 'declined , Transfer Fail':
  //       return 'declined-status';
  //     default:
  //       return '';
  //   }
  // };



  return (
    <div className='main-container-reveiver'>
      {/* <h2>Certificate transfer</h2> */}
      <div className='input-search'>
        <SearchIcon />
        <input
          type='text'
          placeholder='Search by name'
          onChange={(e) => setIsSearch(e.target.value)}
        />
      </div>
      {loading && <p>Loading transfer requests...</p>}
      {error && <p style={{ color: 'red' }}>{`Error fetching transfer requests: ${error}`}</p>}
      {!loading && !error && (
        <div>
          <table className='transfer-requests-table'>
            <thead>
              <tr>
                <th>Certificate Name</th>
                <th>Certificate ID</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {transferRequests
                .filter((request) =>
                  isSearch.toLowerCase() === ''
                    ? request
                    : request.certificateDetails.filename.toLowerCase().includes(isSearch)
                )
                .slice(indexOfFirstItem,indexOfLastItem)
                .map((request) => (
                  <tr key={request.id}>
                    <td>{request.certificateDetails.filename}</td>
                    <td>{request.certificateDetails.id}</td>
                    <td  ><p className={
                                   request.status === 'Accepted' ? 'accepted-status' :
                                   request.status === 'pending' ? 'pending-status' :
                                   'declined-status'
                                        }>{request.status }</p></td>
                    <td>
                      {request.status === 'pending' ? (
                        <button onClick={() => handleCancelRequest(request.id)}>Cancel</button>
                      ) : (
                        <>
                       
                        </>
                      )}
                    </td>
                  </tr>
                ))}
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


export default TransferRequests;
