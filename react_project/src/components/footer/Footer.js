import React, { useState, useContext } from "react";
import '../footer/Footer.css'


const Footer = () => {

  return (
  <footer id="footer">
   <div className="d-flex justify-content-center mt-3 ">
        <blockquote className="blockquote m-4">
        <p className="text-primary mt-3 ">Copyright &#169; Osiz Tech, Madurai</p>
        </blockquote>
   </div>
  </footer>
   
  );
};

export default Footer;