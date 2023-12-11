

import './App.css';
import Homepage from './component/home/Homepage';
import Home from './component/home/home/Home';
import { Route,Routes } from 'react-router-dom';

import { AuthContextProvider } from './context/authcontext';
import MainCertificate from './component/certificate/Maincertificate';
import MainRequest from './component/request/mainRequest';
import RequiredAuth from './component/requiredAuth';
// import MainreceiverTransfer from './component/receivedTransferRequest/MainreceiverTransfer';
// import PrivateRoute from './component/PrivateRouting';
import { Helmet } from 'react-helmet';
// import TransferRequestForm from './component/request/Request';
import TransferRequests from './component/TransferRequest/TransferRequest';
// import RequestTransferWrapper from './component/RequestTransfer/RequestTransfer';
import ReceiveTransferRequest from './component/receivedTransferRequest/ReceiveTransferRequest';



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


      <Route path='/home' element={<RequiredAuth><Home/></RequiredAuth>}/>
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
