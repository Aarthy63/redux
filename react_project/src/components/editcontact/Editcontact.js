import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import Background from '../assets/images (1).png';

const validationSchema = Yup.object().shape({
  RelationDropdown: Yup.string().required('Relation is required').trim(),
  Name: Yup.string()
    .required('Name is required')
    .min(3, 'Name must be at least 3 characters')
    .trim(),
  mobileNumber: Yup.string().required('Mobile number is required')
  .matches(
    /^[0-9]{10}$/g,
    "mobile number should be in numeric value and  10 digits"
  )
    .min(10, 'Mobile Number must be at least 10 characters')
    .trim(),
  Address: Yup.string()
    .required('Address is required')
    .min(3, 'Address must be at least 3 characters')
    .trim(),
});


const EditContact = () => {
  const logindata = JSON.parse(localStorage.getItem("loggedInUser"));
  const login = logindata.email;

  const storedData = JSON.parse(localStorage.getItem(login)) || [];
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: 'All',
  });

  const notify = () => toast.success('Contact saved successfully..!');

  useEffect(() => {
    const contact = storedData.find((item) => item.index === parseInt(id, 10));

    if (contact) {
      // Set default values using setValue
      setValue('RelationDropdown', contact.RelationDropdown);
      setValue('Name', contact.Name);
      setValue('mobileNumber', contact.mobileNumber);
      setValue('Address', contact.Address);
    } else {
      navigate('/Listcontact');
    }
  }, [id, navigate, storedData, setValue]);

  const onSubmit = (data) => {
    const contactIndex = storedData.findIndex((item) => item.index === parseInt(id, 10));

    if (contactIndex !== -1) {
      storedData[contactIndex] = { ...data, index: parseInt(id, 10) };
      localStorage.setItem(login, JSON.stringify(storedData));
      notify();
      navigate('/Listcontact');
    } else {
      navigate('/pagenotFound');
    }
  };

  return (
    <div>
      <div className="container">
        <div className="row" style={{ marginTop: '50px' }}>
          <div className="col-md-3 back-linear" style={{ border: '1px solid black', borderRadius: '20px' }}>
            <img src={Background} height="350px" width="430px" alt="background" style={{ borderRadius: '20px' }} />
          </div>
          <div className="col-md-8 back-linear">
            <h5 style={{ textAlign: 'center', marginLeft: '220px', fontSize: '22px', fontWeight: 'bold' }}>Edit Here!</h5>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-row" style={{ marginLeft: '300px' }}>
                <div className="form-group col-10">
                  <label style={{ color: 'black', fontWeight: 'bold' }}>Name</label>
                  <input
                    name="Name"
                    type="text"
                    {...register('Name')}
                    className={`form-control ${errors.Name ? 'is-invalid' : ''}`}
                  />
                  <div className="invalid-feedback">{errors.Name?.message}</div>
                </div>

                <div className="form-group col-10">
                  <label style={{ color: 'black', fontWeight: 'bold' }}>Mobile Number</label>
                  <input
                    name="mobileNumber"
                    type="text"
                    {...register('mobileNumber')}
                    className={`form-control ${errors.mobileNumber ? 'is-invalid' : ''}`}
                  />
                  <div className="invalid-feedback">{errors.mobileNumber?.message}</div>
                </div>
                <div className="form-group col-10">
                  <label style={{ color: 'black', fontWeight: 'bold' }}>Address</label>
                  <input
                    name="Address"
                    type="text"
                    {...register('Address')}
                    className={`form-control ${errors.Address ? 'is-invalid' : ''}`}
                  />
                  <div className="invalid-feedback">{errors.Address?.message}</div>
                </div>
                <div className="form-group col-10">
                  <label style={{ color: 'black', fontWeight: 'bold' }}>Relation</label>
                  <select
                    name="RelationDropdown"
                    {...register('RelationDropdown')}
                    className={`form-control ${errors.RelationDropdown ? 'is-invalid' : ''}`}
                  >
                    <option value=""></option>
                    <option value="Mr">Mr</option>
                    <option value="Mrs">Mrs</option>
                    <option value="Miss">Miss</option>
                    <option value="Ms">Ms</option>
                  </select>
                  <div className="invalid-feedback">{errors.RelationDropdown?.message}</div>
                </div>
              </div>

              <div className="form-group" style={{ marginLeft: '300px' }}>
                <button type="submit" className="btn btn-primary mr-1 m-2">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditContact;
