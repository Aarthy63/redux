// import React, { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import '../dashboard/Dashboard.css'


// const Dashboard = () => {
//   const navigate = useNavigate();
//   const logindata = JSON.parse(localStorage.getItem("loggedInUser"));
//   const login = logindata.email;
//   const userDetails = JSON.parse(localStorage.getItem("loggedInUser")) || [];

//   useEffect(() => {
//     const userEmail = userDetails.email;
//     const userProducts = JSON.parse(localStorage.getItem(userEmail)) || [];
  
//   }, []);

//   useEffect(() => {
//     const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

//     if (!loggedInUser) {
//       navigate("/Login");
//       return;
//     }
//   }, []);

 
 
//   const contact = JSON.parse(localStorage.getItem(login)) || [];
//    return (
//     <div className="container">
//       <h1 className="text-white" style={{ textAlign: "center" }}>
//         Dashboard
//       </h1>
//       <div className="row d-flex justify-content-center">
//         <div className="card ms-2 mt-2 col-lg-4 m-1" key={userDetails.id}>
//           <h4 className="card-title text-center mt-4">
//             {userDetails.firstName}'s Profile
//           </h4>
//           <div className="card-body p-4">
//           <p>Contact Length:{contact.length}</p>
//             <p>UserName: {userDetails.firstName}</p>
//             <p>Email: {userDetails.email}</p>
//             <button type="button" className="btn-btn-primary" style={{ color:'black',border:'white', height:'30px', borderRadius:'7px', marginLeft:'50px'}}> See Table details</button>
//           </div>
//         </div>
//       </div>
//       <div className="row mt-3">
//         <div className="d-flex">
//           <button
//             className="view-button mb-4 me-2"
//             onClick={() => navigate("/Addcontact")}
//           >
//             Add Contact
//           </button>
//           <button
//             className="view-button mb-4 me-2"
//             onClick={() => navigate("/Listcontact")}
//           >
//             View All Contact
//           </button>
//         </div>
//         <div>
//           <h5 >Contacts Added:</h5>
//           {contact.length>0 ? 
//           ( <table className="table">
//           <thead >
//             <tr style={{border:'1px solid black'}}>
//             <th>Relation </th>
//               <th>Contact </th>
//               <th>Mobile </th>
//               <th>Address </th>
//             </tr>
//           </thead>
//           <tbody style={{border:'1px solid black'}} >
//             {contact.slice(0,5).map((contact) => (
//               <tr key={contact.id} >
//                 <td >{contact.RelationDropdown}</td>
//                 <td >{contact.Name}</td>
//                 <td >{contact.mobileNumber}</td>
//                 <td >{contact.Address}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>):(<p>No data found</p>)}
         
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;


import React, { useEffect, useState } from "react";
import {  useParams } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDeleteUserMutation } from "../redux/api";
import Swal from 'sweetalert2';
import * as yup from "yup";

const schema = yup.object({
  firstName: yup.string().required("First Name is required"),
  email: yup.string().required("Email is required").email("Email is invalid"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const Dashboard = () => {
  const [user, setUser] = useState([]);
  const [addUser] = useDeleteUserMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const navigate = useNavigate();
  const params = useParams();
  const id = params.id;

  // useEffect(() => {
  //   axios.get(`http://localhost:8080/users/fetchuser/${id}`).then((res) => {


  //   headers: {
  //     Authorization: 'Bearer ' + YOUR_TOKEN_HERE // Replace YOUR_TOKEN_HERE with the actual token
  //   }
  //     setUser(res.data.data);
  //   });
  // }, []);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}` // Replace 'YOUR_TOKEN_HERE' with the actual token
      }
    };
  
    axios.get(`http://localhost:8080/users/fetchuser/${id}`, config)
      .then((res) => {
        setUser(res.data.data);
      })
      .catch((error) => {
        // Handle error here
        console.error('Error fetching user:', error);
      });
  }, []);
  

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
  await axios.put(`http://localhost:8080/users/updateuser/${id}`, data);
    
  };
  
  const deleteUser = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {

          Swal.fire("Deleted!", "Your file has been deleted.", "success");
          const response = await addUser(id);
          console.log(response);
          // Perform any other necessary actions after successful deletion
        } catch (error) {
          Swal.fire("Error!", "There was an error deleting the file.", "error");
          console.error("Error deleting file", error);
        }
      }
    });
  };

  const openModal = () => {
    reset(user);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <h3 style={{textAlign:'center'}}>User Details</h3>
      <div className="card ms-2 mt-2 col-lg-3 m-1" key={user.id}>
        <p className="card-title text-center mt-4">
          {user.firstName}'s Profile
        </p>
        <div className="card-body p-4">
          <h5 className="card-title">UserID: {user._id}</h5>
          <p>User Name: {user.firstName}</p>
          <p>Email: {user.email}</p>
        </div>
        <div>
          <button className="btn btn-success m-3" style={{marginLeft:'50px', color:'black'}} onClick={openModal}>
            Edit Profile
          </button>
          <button
            className="btn btn-danger m-3"
            style={{ marginLeft: '50px', color: 'black' }}
            onClick={() => deleteUser(user._id)}
          >
            Delete User
          </button>
        </div>
      </div>
      {isModalOpen && (
        <div className="modal" style={{ display: "block" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" style={{color:'black'}}>Edit Profile</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={closeModal}>
                </button>
              </div>
              <div className="modal-body">
                <form id="registration-form" onSubmit={handleSubmit(onSubmit)}>
                  <div className="form-row">
                    <div className="form-group col-5">
                      <label className="text-dark">User Name</label>
                      <input
                        name="firstName"
                        type="text"
                        {...register("firstName")}
                        className={`form-control ${
                          errors.firstName ? "is-invalid" : ""
                        }`}
                      />
                      <div className="invalid-feedback">
                        {errors.firstName?.message}
                      </div>
                    </div>
                </div>
                  <div className="form-row">
                    <div className="form-group col">
                      <label className="text-dark">Email</label>
                      <input
                        name="email"
                        type="text"
                        {...register("email")}
                        className={`form-control ${
                          errors.email ? "is-invalid" : ""
                        }`}
                      />
                      <div className="invalid-feedback">
                        {errors.email?.message}
                      </div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <button type="submit" className="btn btn-primary me-3">
                      Save Changes
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={closeModal}>
                      Close
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;