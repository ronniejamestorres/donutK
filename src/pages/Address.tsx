import React from 'react';

import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';

import AddressForm from '../component/AddressForm';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripe = loadStripe('pk_test_HvEeju8Kg8pqDFSjQQyyxGDb');

function Address() {
  const options = {
    // Fully customizable with appearance API.
    appearance: {/*...*/},
  };

  return (
    <Elements stripe={stripe} options={options}>
      <AddressForm />
    </Elements>
  );
};

export default Address;