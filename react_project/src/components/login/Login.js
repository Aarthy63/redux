// import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as yup from "yup";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { useNavigate } from "react-router-dom";
// import '../login/Login.css'
// import Background from '../assets/login.gif'


// const schema = yup
//   .object({
//     password: yup
//       .string()
//       .min(8, "Password must be same as SignIn")
//       .required("Password is required"),

//     email: yup.string().required("Email is required").email("Email is invalid"),
//   })
//   .required();

// const Login = () => {
//   const navigate = useNavigate();
//   const {
//     register,
//     handleSubmit,
//     resetField,
//     formState: { errors },
//   } = useForm({
//     resolver: yupResolver(schema),
//   });

//   const onSubmit = (data) => {
//     const storedData = JSON.parse(localStorage.getItem("usersData")) || [];
//     const user = storedData.find(
//       (user) => user.email === data.email && user.password === data.password
//     );

//     if (user) {
//       const isUserLoggedIn = false;
//       const newUser = { ...user, isUserLoggedIn: isUserLoggedIn }
//       localStorage.setItem("loggedInUser", JSON.stringify(newUser));
//       toast.success("successfuly login!");
//       navigate(`/Dashboard`);
//     } else {
//       toast.error("Invalid email or password");
//     }
//     resetField("password");

//     resetField("email");
//   };
//   return (
//     <div className="container">
//       <div className="row" style={{ marginTop: '50px' }}>
//         <div class="col-md-3 back-linear" style={{ border: '1px solid black', borderRadius: '20pxs' }}>
//           <img
//             src={Background}
//             height='300px'
//             width='430px'
//             borderRadius='20px'
//             alt="background"
//           />
//         </div>
//         <div class="col-md-8 back-linear">
//           <h5 style={{ textAlign: 'center', marginLeft: '220px', fontSize: '22px', fontWeight: 'bold' }}>Sign-In</h5>
//           <form onSubmit={handleSubmit(onSubmit)} >
//             <div className="form-row" style={{ marginLeft: '300px' }}>

//               <div className="form-group col-8">
//                 <label style={{ color: 'black', fontWeight: 'bold' }}>Email</label>
//                 <input name="email" type="text" {...register('email')} className={`form-control ${errors.email ? 'is-invalid' : ''}`} />
//                 <div className="invalid-feedback">{errors.email?.message}</div>
//               </div>
//               <div className="form-group col-8">
//                 <label style={{ color: 'black', fontWeight: 'bold' }}>Password</label>
//                 <input name="password" type="password" {...register('password')} className={`form-control ${errors.password ? 'is-invalid' : ''}`} />
//                 <div className="invalid-feedback">{errors.password?.message}</div>
//               </div>
//             </div>
//             <br>
//             </br>
//             <div className="form-group" style={{ marginLeft: '350px' }}>
//               <button type="submit" className="btn btn-primary mr-1 m-2 ">Sign-In</button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>

//   );
// };

// export default Login;


import React, { useState } from 'react';
import Background from '../assets/login.gif'
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useLogInUserMutation } from "../redux/api";


const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loggedUser, setLoggedUser] = useState({});
  const [ addUser]= useLogInUserMutation();
  const navigate = useNavigate();

  //schema validation
  const schema = yup
    .object({
      password: yup
        .string()
        .required("Password is required"),
      email: yup.string().required("Email is required")
        .email("Email is invalid"),
    })
    .required();

  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "all",
  });

  // handleSubmit data
  const onSubmit = async (data) => {
    console.log(data);
    try {
      // console.log("working", data);
      const response = await addUser (data);
      console.log(response);
      const userid = response.data.user._id
      console.log(response.data.token,"hygfyutgfyu");
      const token = response.data.token
      localStorage.setItem("token", token)
      localStorage.setItem("loggedInUser", JSON.stringify(response.data.user._id))
      console.log(response.data.user._id);
      console.log(userid);
      navigate(`/Dashboard/${userid}`);

      //navigate("/Dashboard");
      //  toast.success("successfuly login!");
      // navigate(`/Dashboard`);
      

    } catch (error) {
      console.error("login failed", error);
    }

    resetField("password");

    resetField("email");

  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };


  return (
    <div className="container">
      <div className="row" style={{ marginTop: '50px' }}>
        <div className="col-md-3 back-linear" style={{ border: '1px solid black', borderRadius: '20px' }}>
          <img
            src={Background}
            height="300px"
            width="430px"
            style={{ borderRadius: '20px' }}
            alt="background"
          />
        </div>
        <div className="col-md-8 back-linear">
          <form className="p-5 rounded h-100 mb-5" onSubmit={handleSubmit(onSubmit)}>
            <h5 style={{ textAlign: 'center', marginLeft: '220px', fontSize: '22px', fontWeight: 'bold' }}>Sign-In</h5>
            <div className="form-row" style={{ marginLeft: '300px' }}>
              <div className="form-group col-8">
                <label style={{ color: 'black', fontWeight: 'bold' }}>Email</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  {...register('email')}
                  placeholder="Email"
                />
                <p className="text-danger">{errors.email?.message}</p>
              </div>
              <div className="form-group col-8">
                <label style={{ color: 'black', fontWeight: 'bold' }}>Password</label>
                <div className="input-group">
                  <input
                    className="form-control"
                    {...register('password')}
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Password"
                  />
                  <button
                    type="button"
                    className="input-group-text"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? (
                      <i className="bi bi-eye-slash-fill"></i>
                    ) : (
                      <i className="bi bi-eye-fill"></i>
                    )}
                  </button>
                </div>
                <p className="text-danger">{errors.password?.message}</p>
              </div>
            </div>
            <input type="submit" className="nav-button p-2 btn-primary" style={{ marginLeft: '350px' }} />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;