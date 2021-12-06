import React from 'react'
import logo from '../../assets/crown.svg'

import StripeCheckout from 'react-stripe-checkout'



//NOTE: takes in 'price' as a 'property'
const StripeCheckoutButton = ({price})=> {
    const priceForStripe = price * 100
    const publishableKey = 'pk_test_51K3Z9WA6BzRqnWmvfMQTrUFXBn5jLvXxyXnMN69DStZ5mQHsUYLeqpW4HcQfJpUqLaQv5ZuIJmDvDb7prDLg0aOF00ACZVQTZs'

    const onToken = (token)=> {
        //simulates real process
        console.log(token)
        alert('Payment Successful')
    }


    return(
        <StripeCheckout
            label="Pay Now"
            name="ecommerce2"
            billingAddress
            shippingAddress
            image={logo}
            description={`Your total is $${price}`}
            amount={priceForStripe}
            panelLabel="PayNow"
            token={onToken}
            stripeKey={publishableKey}
        />
    )
}

export default StripeCheckoutButton