import React from "react";
import { toast} from "react-toastify";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import Add from '../assets/dribbs_shopping.gif';

// Define the validation schema
const validationSchema = Yup.object().shape({
  RelationDropdown: Yup.string().required("Relation's is required"),
  Name: Yup.string().required("Name is required").trim(),
  mobileNumber: Yup.string()
  .matches(
    /^[0-9]{10}$/g,
    "mobile number should be in numeric value and  10 digits"
  )
    .min(10, "Mobile Number must be at least 10 characters")
    .required("Mobile Number is required"),
  Address: Yup.string().required("Address is required"),
  acceptTerms: Yup.bool().oneOf([true], "Accept Ts & Cs is required"),
});

const Addcontact = () => {
  const navigate = useNavigate();
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: "All",
  });

  

  function onSubmit(data) {
    const logindata = JSON.parse(localStorage.getItem("loggedInUser"));
    const login = logindata.email;
    const storedData = JSON.parse(localStorage.getItem(login)) || [];
    
    const index = storedData.length + 1;
    const newData = { ...data, index };
    storedData.push(newData);
    localStorage.setItem(login, JSON.stringify(storedData));
    reset();
    toast.success("See List Page!");
    setTimeout(() => {
     
      navigate("/Listcontact");
    }, 2000);
  }

  return (
    <div>
      <div className="container">
      <div className="row" style={{marginTop:'50px'}}>
        <div class="col-md-3 back-linear" style={{border:'1px solid black', borderRadius:'20pxs'}}>
          <img
         src={Add}
          height= '400px'
          width= '450px'
          alt="background" />
        </div>
        <div class="col-md-8 back-linear">
        <h5  style={{textAlign:'center', marginLeft:'220px', fontSize:'22px', fontWeight:'bold' }}>Add-Contact Here!</h5>
          <form onSubmit={handleSubmit(onSubmit)} onReset={reset}>
            <div className="form-row" style={{ marginLeft: "300px" }}>
            <div className="form-group col-10">
                <label style={{color:'black', fontWeight:'bold'}}>Relation</label>
                <select
                  name="RelationDropdown"
                  {...register("RelationDropdown")}
                  className={`form-control ${
                    errors.RelationDropdown ? "is-invalid" : ""
                  }`} >
                  <option value=""></option>
                  <option value="Mr">Mr</option>
                  <option value="Mrs">Mrs</option>
                  <option value="Miss">Miss</option>
                  <option value="Ms">Ms</option>
                </select>
                <div className="invalid-feedback">{errors.RelationDropdown?.message}</div>
              </div>
              <div className="form-group col-10">
                <label style={{color:'black', fontWeight:'bold'}}>Name</label>
                <input
                  name="Name"
                  type="text"
                  {...register("Name")}
                  className={`form-control ${errors.Name ? "is-invalid" : ""}`}
                />
                <div className="invalid-feedback">{errors.Name?.message}</div>
              </div>

              <div className="form-group col-10">
                <label style={{color:'black', fontWeight:'bold'}}>Mobile Number</label>
                <input
                  name="mobileNumber"
                  type="text"
                  {...register("mobileNumber")}
                  className={`form-control ${
                    errors.mobileNumber ? "is-invalid" : ""
                  }`}
                />
                <div className="invalid-feedback">{errors.mobileNumber?.message}</div>
              </div>
              <div className="form-group col-10">
                <label style={{color:'black', fontWeight:'bold'}}>Address</label>
                <input
                  name="Address"
                  type="text"
                  {...register("Address")}
                  className={`form-control ${errors.Address ? "is-invalid" : ""}`}
                />
                <div className="invalid-feedback">{errors.Address?.message}</div>
              </div>
             
            </div>
<br></br>
            <div className="form-group" style={{ marginLeft: "300px" }}>
              <button type="submit" className="btn btn-primary mr-1 m-2">
            Add-Contact
              </button>
              <button type="submit"  className="btn btn-outline-light"  onClick={() => navigate('/Dashboard')}>
                DashBoard 
            </button>
            </div>
            
          </form>
        </div>
      </div>
    </div>
    </div>
    // </div>
  );
};

export default Addcontact;
