

import './App.css';
import Homepage from './component/home/Homepage';
import Home from './component/home/home/Home';
import { Route,Routes } from 'react-router-dom';

import { AuthContextProvider } from './context/authcontext';
import MainCertificate from './component/certificate/Maincertificate';
import MainRequest from './component/request/mainRequest';
import RequiredAuth from './component/requiredAuth';

import { Helmet } from 'react-helmet';

import TransferRequests from './component/TransferRequest/TransferRequest';

import ReceiveTransferRequest from './component/receivedTransferRequest/ReceiveTransferRequest';

import MainAddingCertificate from './component/AddingCertificate/MainAddingCertificate';

import MainCertificateDetails from './component/certificate/CertificateDetails/MainCertificatedetails';

function App() {
 
  return (
    <>
    <div>
      <Helmet>
        <title>MyIpr</title>
        <link rel='icon' href='public\myIpr-green.63532adc5d970aad34f3.png' />

      </Helmet>
    </div>
    <AuthContextProvider>
    <Routes >
      <Route path='/' element={<Homepage/>}></Route>
      <Route path='/CertificateDetails' element={<RequiredAuth><MainCertificateDetails/></RequiredAuth>}/>
      
      <Route path='/adding_certificate' element={<RequiredAuth><MainAddingCertificate/></RequiredAuth>}/>
      <Route path='/home' element={<RequiredAuth><Home/></RequiredAuth>}>

        
      </Route>
      <Route path="/certificate" element={<RequiredAuth><MainCertificate/></RequiredAuth>}/>
      <Route path="/request" element={<RequiredAuth><MainRequest/></RequiredAuth>}>
        <Route path="/request/receive" element={<ReceiveTransferRequest/>}></Route>
        <Route path='/request/sent' element={<TransferRequests/>}></Route>

     
      </Route>

      {/* <Route path="/receive-transfer-requests" element={<RequiredAuth><MainreceiverTransfer/></RequiredAuth>} /> */}



      
      
       
    </Routes>
    
    </AuthContextProvider>
      
     
    </>
  );
}

export default App;
