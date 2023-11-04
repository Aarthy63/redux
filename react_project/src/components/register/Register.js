// import { toast, ToastContainer } from "react-toastify";
// import { useForm } from "react-hook-form";
// import { yupResolver } from '@hookform/resolvers/yup';
// import * as Yup from 'yup'
// import '../register/Register'
// import { useNavigate } from "react-router-dom";
// import '../register/Register.css'
// import Banner from '../assets/18.gif';



// // form validation rules 
// const validationSchema = Yup.object().shape({

//   firstName: Yup.string()
//     .matches(/^[a-zA-Z ]*$/, "Name should be in alphabets")
//     .required("Name is required")
//     .min(3, "Name must be at least 3 characters")
//     .max(20, "Name should not exceed 20 characters")
//     .trim(),
//   email: Yup.string()
//     .required("Email is required")
//     .email("Email is invalid")
//     .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g, "invalid email")
//     .trim(),
//   password: Yup.string()
//     .min(7, 'Password must be at least 7 characters')
//     .matches(
//       /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
//       "Minimum eight characters, at least one uppercase , one lowercase, one number and one special character")
//     .required('Password is required'),
//   confirmPassword: Yup.string()
//      .oneOf([Yup.ref('password')], 'Passwords must match')
//     // .matches(
//     //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
//     //   "Minimum eight characters, at least one uppercase, one lowercase, one number and one special character"
//     // )
//     .required('Confirm Password is required'),
//   acceptTerms: Yup.bool()
//     .oneOf([true], 'Accept Ts & Cs is required')
// });

// // functions to build form returned by useForm() hook
// const Validation = () => {
//   const navigate = useNavigate();
//   const { register, handleSubmit, trigger, reset, formState: { errors } } = useForm({
//     resolver: yupResolver(validationSchema),
//     mode: "onBlur",
//   });

//   const notify = () => toast.success("Successfully Registered!");
//   const onSubmit = (data) => {
//     const storedData = JSON.parse(localStorage.getItem("usersData")) || [];
//     try {
//       const user = storedData.find((user) => user.email === data.email);
//       if (user) {
//         toast.error("Email Already Exists");
//         return
//       } else {
//         const id = storedData.length + 1;

//         const dataWId = { ...data, id };
//         storedData.push(dataWId);
//         notify();
//       }
//     } catch (error) {
//       console.log(error);
//     }

//     localStorage.setItem("usersData", JSON.stringify(storedData));

//     setTimeout(() => {
//       navigate("/Login");

//     }, 1000)

//   }

//   return (
//     <div>
//       <div className="container">
//         <div className="row" style={{ marginTop: '50px' }}>
//           <div class="col-md-3 back-linear">
//             <img
//               src={Banner}
//               height='400px'
//               width='430px'
//               alt="banner"
//             />
//           </div>
//           <div class="col-md-8 back-linear">
//             <h5 style={{ textAlign: 'center', marginLeft: '250px', fontSize: '22px', fontWeight: 'bold', color: 'black' }}>Sign-Up</h5>
//             <form onSubmit={handleSubmit(onSubmit)} onReset={reset}>
//               <div className="form-row" style={{ marginLeft: '300px' }}>
//                 <div className="form-group col-11" >
//                   <label style={{ color: 'black', fontWeight: 'bold' }}>User Name</label>
//                   <input name="firstName" type="text" {...register('firstName')} className={`form-control ${errors.firstName ? 'is-invalid' : ''}`} />
//                   <div className="invalid-feedback">{errors.firstName?.message}</div>
//                 </div>

//                 <div className="form-group col-11">
//                   <label style={{ fontWeight: 'bold', color: 'black' }}>Email</label>
//                   <input name="email" type="text" {...register('email')} className={`form-control ${errors.email ? 'is-invalid' : ''}`} />
//                   <div className="invalid-feedback">{errors.email?.message}</div>
//                 </div>
//                 <div className="form-group col-11">
//                   <label style={{ fontWeight: 'bold', color: 'black' }}>Password</label>
//                   <input name="password" type="password" {...register('password')} className={`form-control ${errors.password ? 'is-invalid' : ''}`} onBlur={()=> trigger('confirmPassword')}/>
//                   <div className="invalid-feedback">{errors.password?.message}</div>
//                 </div>
//                 <div className="form-group col-11">
//                   <label style={{ fontWeight: 'bold', color: 'black' }}>Confirm Password</label>
//                   <input name="confirmPassword" type="password"  {...register('confirmPassword')}  className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`} />
//                   <div className="invalid-feedback" >{errors.confirmPassword?.message}</div>
//                 </div>
//               </div>

//               <div className="form-group form-check" style={{ marginLeft: '300px', fontWeight: 'bold', color: 'black' }}>
//                 <input name="acceptTerms" type="checkbox" {...register('acceptTerms')} id="acceptTerms" className={`form-check-input ${errors.acceptTerms ? 'is-invalid' : ''}`} />
//                 <label for="acceptTerms" className="form-check-label">Accept Terms & Conditions</label>
//                 <div className="invalid-feedback">{errors.acceptTerms?.message}</div>
//               </div>
//               <div className="form-group" style={{ marginLeft: '380px' }}>
//                 <button type="submit" className="btn btn-primary mr-1 m-2" >Sign-Up</button>
//               </div>
//             </form>
//           </div>
//           <ToastContainer limit={1} />
//         </div>
//       </div>
//     </div>

//   )
// }


// export default Validation


import { toast, ToastContainer } from "react-toastify";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Banner from "../assets/18.gif";
import DataTable from 'react-data-table-component';
import Swal from 'sweetalert2';
import { useAddUserMutation, useGetUsersQuery, useDeleteUserMutation } from "../redux/api";

const validationSchema = Yup.object().shape({
  firstName: Yup.string()
    .matches(/^[a-zA-Z ]*$/, "Name should be in alphabets")
    .required("Name is required")
    .min(3, "Name must be at least 3 characters")
    .max(20, "Name should not exceed 20 characters")
    .trim(),
  email: Yup.string()
    .required("Email is required")
    .email("Email is invalid")
    .matches(
      /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
      "Invalid email format"
    )
    .trim(),
  password: Yup.string()
    .min(7, "Password must be at least 7 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Minimum eight characters, at least one uppercase, one lowercase, one number and one special character"
    )
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required"),
  acceptTerms: Yup.bool().oneOf(
    [true],
    "Accept Ts & Cs is required"
  ),
});

const Validation = () => {

  const [users, setUsers] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [userAdd] = useAddUserMutation()
  const navigate = useNavigate();
  const [deleteUserMutation] = useDeleteUserMutation();
  const { data: getusers, isLoading, isError } = useGetUsersQuery();

  const usersFromDB = users.data;
  console.log(usersFromDB);


  // useEffect(() => {
  //   axios.get("http://localhost:8080/users").then((res) => {
  //     setUsers(res.data.data);
  //   });
  // }, []);

  const {
    register,
    handleSubmit,
    trigger,
       formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: "onBlur",
  });

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const handleuserAdd = async (userData) => {
    const imageFile = userData.profileImage[0];

    try {
      const formData = new FormData();
  
      formData.append("firstName", userData.firstName);
          formData.append("email", userData.email);
      formData.append("password", userData.password);
      formData.append("acceptTerms", userData.acceptTerms);
      formData.append("profileImage", imageFile);
      // console.log(formData);
      let result = await userAdd(formData);
      console.log("User added:", result);
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  const notify = () => toast.success("Successfully Registered!");

  // const onSubmit = async (data) => {
  //   const response = await userAdd(data);
  //   console.log(response);
  //   const storedData = JSON.parse(localStorage.getItem("usersData")) || [];
  //   try {
  //     const user = storedData.find((user) => user.email === data.email);
  //     if (user) {
  //       toast.error("Email Already Exists");
  //       return
  //     } else {
  //       const id = storedData.length + 1;
  //       const dataWId = { ...data, id };
  //       storedData.push(dataWId);
  //       notify();
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  //   localStorage.setItem("usersData", JSON.stringify(storedData));
  //   setTimeout(() => {
  //     navigate("/Login");

  //   }, 1000)
  // };


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
          const response = await deleteUserMutation(id);
          console.log(response);
          // Perform any other necessary actions after successful deletion
        } catch (error) {
          Swal.fire("Error!", "There was an error deleting the file.", "error");
          console.error("Error deleting file", error);
        }
      }
    });
  };

  const columns = [
    {
      name: 'firstName',
      selector: 'firstName',
    },
    {
      name: 'email',
      selector: 'email',
    },
    {
      name: "profile pic",
      cell: (row) =>
        row.profileImage ? (
          <img
            src={`http://localhost:8080/${row.profileImage}`}
            alt="Profile"
            style={{ width: "50px", height: "50px" }}
          />
        ) : null,
    },
    {
      name: 'Actions/Delete',
      cell: (row) => (
        <button
          className="btn btn-danger btn btn-outline-dark"
          onClick={() => deleteUser(row._id)}
        >
          <i class="bi bi-archive-fill"></i>Delete
        </button>
      ),
    },
    {
      name: 'Actions/Edit',
      cell: (row) => (
        <button
          className="btn btn-primary btn btn-outline-dark"
          onClick={() => navigate(`/EditUser/${row._id}`)}
        >
          <i class="bi bi-pen-fill"></i> Edit
        </button>
      ),
    },
  ];


  return (
    <div>
      <div className="container">
        <div className="row" style={{ marginTop: "50px" }}>
          <div class="col-md-3 back-linear">
            <img src={Banner} height="400px" width="430px" alt="banner" />
          </div>
          <div class="col-md-8 back-linear">
            <h5
              style={{
                textAlign: "center",
                marginLeft: "250px",
                fontSize: "22px",
                fontWeight: "bold",
                color: "black",
              }} >
              Sign-Up
            </h5>
            <form onSubmit={handleSubmit(handleuserAdd)} encType= 'multipart/form-data'>
              <div className="form-row" style={{ marginLeft: "300px" }}>
                <div className="form-group col-11">
                  <label style={{ color: "black", fontWeight: "bold" }}>
                    User Name
                  </label>
                  <input
                    name="firstName"
                    type="text"
                    {...register("firstName")}
                    className={`form-control ${errors.firstName ? "is-invalid" : ""
                      }`}
                  />
                  <div className="invalid-feedback">
                    {errors.firstName?.message}
                  </div>
                </div>
                <div className="form-group col-11">
                  <label style={{ fontWeight: "bold", color: "black" }}>
                    Email
                  </label>
                  <input
                    name="email"
                    type="text"
                    {...register("email")}
                    className={`form-control ${errors.email ? "is-invalid" : ""
                      }`}
                  />
                  <div className="invalid-feedback">
                    {errors.email?.message}
                  </div>
                </div>
                <div className="form-group col-11">
                  <label style={{ fontWeight: "bold", color: "black" }}>
                    Password
                  </label>
                  <input
                    name="password"
                    type="password"
                    {...register("password")}
                    className={`form-control ${errors.password ? "is-invalid" : ""
                      }`}
                    onBlur={() => trigger("confirmPassword")}
                  />
                  <div className="invalid-feedback">
                    {errors.password?.message}
                  </div>
                </div>
                <div className="form-group col-11">
                  <label style={{ fontWeight: "bold", color: "black" }}>
                    Confirm Password
                  </label>
                  <input
                    name="confirmPassword"
                    type="password"
                    {...register("confirmPassword")}
                    className={`form-control ${errors.confirmPassword ? "is-invalid" : ""
                      }`}
                  />
                  <div className="invalid-feedback">
                    {errors.confirmPassword?.message}
                  </div>
                </div>
                <label className="form-label">Profile Image</label>
          <input
            type="file"
            onChange={handleImageUpload}
            {...register("profileImage")}
            className={`form-control ${
              errors.profileImage ? "is-invalid" : ""
            }`}
          />
          <div className="invalid-feedback">{errors.profileImage?.message}</div>
          {selectedFile && (
            <p>
              Selected file: {selectedFile.name} ({selectedFile.type})
            </p>
          )}
              </div>
              <div
                className="form-group form-check"
                style={{
                  marginLeft: "300px",
                  fontWeight: "bold",
                  color: "black",
                }}>
                <input
                  name="acceptTerms"
                  type="checkbox"
                  {...register("acceptTerms")}
                  id="acceptTerms"
                  className={`form-check-input ${errors.acceptTerms ? "is-invalid" : ""
                    }`} />
                <label for="acceptTerms" className="form-check-label">
                  Accept Terms & Conditions
                </label>
                <div className="invalid-feedback">
                  {errors.acceptTerms?.message}
                </div>
              </div>
              <div className="form-group" style={{ marginLeft: "380px" }}>
                <button type="submit" className="btn btn-primary mr-1 m-2">
                  Sign-Up
                </button>
              </div>
            </form>
            <div className="container mt-5" style={{ backgroundColor: 'black', color: 'white' }}>
              <h3 style={{ textAlign: 'center' }}>Users</h3>
              <div >
                {isLoading ? (
                  <div>Loading...</div>
                ) : isError ? (
                  <div>Error occurred</div>
                ) : (
                  <DataTable title="" columns={columns} data={getusers.data} pagination id="data-table" />
                )}
           </div>
              <ToastContainer limit={1} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Validation;
