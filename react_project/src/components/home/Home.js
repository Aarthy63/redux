import React from "react";
import Banner from '../assets/Contact.jpg';
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowUp} from 'react-bootstrap-icons';

const Home = () => {
  const navigate = useNavigate();
  return (
    <div class="container">
      <div class="row">
        <div class="col-lg-6 back-linear">
          <img
            class="mt-5 ms-4 px-auto d-none d-md-block image"
            src={Banner}
            height="350px"
            alt="banner"
          />
        </div>
        <div class="col-lg-6 banner-col-2 px-0 d-flex align-items-center">
          <div class="col-lg-10 position-relative">
            <div class="banner-col-2">
            </div>
            <h1 class="text-white">
              Why Contact management <span> System </span>
              <br />
            </h1>
            <p className="mt-4 text-white">
              A contact management system keeps you organized, makes it easy to contact clients, and enhances the work your team does internally. These benefits help improve your customer experience and relationships for guaranteed customer satisfaction
            </p>
            <div class="col-lg-10 mt-5">
              <button class="banner-btn-1" onClick={()=>navigate('/Register')} >Register Now!   <ArrowLeft /> </button>
              <button class="banner-btn-2" onClick={()=>navigate('/Login')}>Login Here!   <ArrowUp /></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
