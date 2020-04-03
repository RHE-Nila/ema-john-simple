import React from 'react';
import { useForm } from 'react-hook-form';
import './Shipment.css';
import { useAuth } from '../Login/useAuth';

const Shipment = () => {
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = data => { }
  const auth = useAuth();

  return (
    <form className="shipment" onSubmit={handleSubmit(onSubmit)}>

      <input name="name"
        defaultValue={auth.user.name}
        ref={register({ required: true })}
        placeholder="Name" />
      {
        errors.name &&
        <span className="error">
          Name is required
        </span>
      }

      <input name="email"
        defaultValue={auth.user.email}
        ref={register({ required: true })}
        placeholder="Email" />
      {
        errors.email &&
        <span className="error">
          email is required
          </span>
      }

      <input name="AddressLine1"
        ref={register({ required: true })}
        placeholder="Address Line 1" />
      {errors.AddressLine1 &&
        <span className="error">
          Addresss is required
        </span>}

      <input name="AddressLime2"
        ref={register}
        placeholder="Address Line 2" />

      <input name="city"
        ref={register({ required: true })}
        placeholder="City" />
      {errors.city &&
        <span className="error">
          city is required
        </span>}

      <input name="country"
        ref={register({ required: true })}
        placeholder="Country" />
      {errors.country &&
        <span className="error">
          country is required
        </span>}

      <input name="zipcode"
        ref={register({ required: true })}
        placeholder="zip code" />
      {errors.zipcode &&
        <span className="error">
          zipcode is required
        </span>}

      <input type="submit" />
    </form>
  )
};

export default Shipment;