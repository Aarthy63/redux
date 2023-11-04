import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useParams } from "react-router-dom";
import { useGetSingleUserQuery, useUpdateUserMutation } from "../components/redux/api";

const schema = yup.object().shape({
  firstName: yup.string().required("First Name is required"),
  lastName: yup.string().required("Last Name is required"),
  email: yup.string().required("Email is required").email("Email is invalid"),
  password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
});

function EditUser() {
 
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: userData, error, isLoading } = useGetSingleUserQuery(id);
  const [formData, setFormData] = useState({ firstName: "", email: "" });
  const [updateData] = useUpdateUserMutation();

  useEffect(() => {
    if (userData) {
      setFormData({
        firstName: userData.data.firstName,
        email: userData.data.email,
      });
    }
  }, [userData]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log("Form submitted", formData);
    alert("Form submitted");
  //  Uncomment the following lines when the API is available
    try {
        const updatedData = await updateData({ id, data: formData });
        navigate(`/ListComponent`)
        console.log("Data updated", updatedData);
    } catch (err) {
        console.log(err.message);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error occurred</div>;
  }

  return (
    <div className="container mt-3">
      <h2>Register Form</h2>
      <form onSubmit={handleSubmit} id="registration-form">
        <div className="form-row">
          <div className="form-group col-5">
            <label className="text-white">User Name</label>
            <input
              name="firstName"
              type="text"
              value={formData.firstName}
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              className="form-control"
            />
          </div>
          <div className="form-group col-5">
            <label className="text-white">Email</label>
            <input
              name="email"
              type="text"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="form-control"
            />
          </div>
        </div>
        <div className="form-group mt-3">
          <button type="submit" className="btn btn-primary mr-1"  >
            Register
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditUser;
