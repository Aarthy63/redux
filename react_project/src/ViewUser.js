import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";


const ViewUser = () => {
  const [user, setUser] = useState([])
  const navigate = useNavigate();
  const params = useParams();
  const id = params.id;

  useEffect(() => {
    axios.get(`http://localhost:8080/users/fetchuser/${id}`).then((res) => {
      setUser(res.data.data);
    });
  },[]);
  console.log(user);

  
  return (
    <>
    <h3>User Details</h3>
    <div className="card ms-2 mt-2 col-lg-4 m-1" key={user._id}>
          <h4 className="card-title text-center mt-4">
            {user.firstName}'s Profile
          </h4>
          <div className="card-body p-4">
            <h5 className="card-title">UserID: {user._id}</h5>
            <p>FirstName: {user.firstName}</p>
            <p>email: {user.email}</p>
          </div>
        </div>
    </>
  )
}

export default ViewUser