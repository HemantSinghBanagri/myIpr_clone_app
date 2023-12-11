import React, { useState, useEffect,useRef } from 'react';
import { firestore } from '../../firebase/firebase';
import { collection, getDocs, where, query } from 'firebase/firestore';
import { UserAuth } from '../../context/authcontext';
import './maincertificate.scss';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import TransferRequestForm from '../request/Request';
import SearchIcon from '@mui/icons-material/Search';

const CertificatesTable = ({ creatorID }) => {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = UserAuth();
  const [isOpentransfer, setIsTransfer] = useState(false);
  const [issearch, setIsSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5); 
  const [totalItems, setTotalItems] = useState(0);
  const [selectedCertificateDetails, setSelectedCertificateDetails] = useState(null);
  const dropdownRef=useRef(null)

  const transferDropDownhandler = (item) => {
    setSelectedCertificateDetails(item)
    setIsTransfer(!isOpentransfer);

  };
  // const cnaclehandler=(item)=>{
  //   item.stopPropagation()
  //   setIsTransfer(!isOpentransfer)
  // }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsTransfer(false);
      }
    };
  
    if (isOpentransfer) {
      document.addEventListener('click', handleClickOutside);
    }
  
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isOpentransfer]);
  

  useEffect(() => {
    if (user) {
      const fetchData = async () => {
        try {
          const certificateCollection = collection(firestore, 'certificates');
          const snapshot = await getDocs(
            query(
              certificateCollection,
              
              where('email', '==', user.email)
            )
          );

          const certificateData = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

          setCertificates(certificateData);
          setTotalItems(certificateData.length); 
          setLoading(false);
        } catch (error) {
          console.error('Error fetching certificates:', error);
          setError('Error fetching certificates.');
          setLoading(false);
        }
      };

      fetchData();
    }
  }, [user]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = certificates.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
    <div className='main-container-certificate' >
      <h2>Your Certificates</h2>
      <div className='input-search'>
        <SearchIcon />
        <input
          type='text'
          placeholder='Search by name'
          onChange={(e) => setIsSearch(e.target.value)}
        />
      </div>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!loading && !error && (
        <div>
          <table>
            <thead>
              <tr>
                <th>File Name</th>
                <th>Created by</th>
                <th>Activity</th>
                <th>Created On</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
            

{certificates.length === 0 ? (
  
  <tr>
    <td colSpan='4'>No Record Found</td>
  </tr>
) : (
 certificates
    .filter((item) => {
      return issearch.toLowerCase() === '' ? item : item.filename.toLowerCase().includes(issearch);
    })
    .slice(indexOfFirstItem,indexOfLastItem)
    .map((item) => (
      <tr key={item.id}>
        <td className='filename'>{item.filename}</td>
        <td>{item.Createby}</td>
        <td>{item.activity}</td>
        <td>{item.dateIssued}</td>
        <td onClick={()=>transferDropDownhandler(item)}>
          <MoreVertIcon />
        </td>
      </tr>
    ))
   
)}


            </tbody>
          </table>

          <div className='pagination'>
            <div className='page-info'>
              <span>
                Showing {indexOfFirstItem + 1} to{' '}
                {Math.min(indexOfLastItem, totalItems)} from {totalItems} items
              </span>
            </div>
            <div className='page-numbers'>
              {Array.from({ length: Math.ceil(totalItems / itemsPerPage) }, (_, i) => i + 1).map(
                (pageNumber) => (
                  <span
                    key={pageNumber}
                    onClick={() => paginate(pageNumber)}
                    className={currentPage === pageNumber ? 'active' : ''}
                  >
                    {pageNumber}
                  </span>
                )
              )}
            </div>
          </div>
        </div>
      )}
      
    </div>
    <div className='transferfrom-container'>
      {isOpentransfer && <TransferRequestForm selectedCertificateDetails={selectedCertificateDetails} />}
      </div>
      </>
  );
};

export default CertificatesTable;
