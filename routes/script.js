const express = require('express');
const stripe = require('stripe')('sk_test_51Klp7WSAhOyX2rjMKCaBlDGm28m3rESt8pBrdtp6yAKMfFbG9D3U0aOlPexviw03RLzrgBZXPqolLEUQijndP85800vlXI9ZIz');

const router = express.Router()

router.get('/', (req, res) => {
    return res.json("Hello World")
})

router.post('/pay', async (request, response) => {
    try {
        // Create the PaymentIntent
        let intent = await stripe.paymentIntents.create({
            payment_method: request.body.payment_method_id,
            description: "Test payment",
            amount: request.body.amount * 100,
            currency: 'inr',
            confirmation_method: 'manual',
            confirm: true
        });
        // Send the response to the client
        console.log(intent)
        response.send(generateResponse(intent));
    } catch (e) {
        // Display error on client
        return response.send({ error: e.message });
    }
});

const generateResponse = (intent) => {
    if (intent.status === 'succeeded' || intent.status === 'requires_action') {
        // The payment didn’t need any additional actions and completed!
        // Handle post-payment fulfillment
        return {
            success: true
        };
    } else {
        // Invalid status
        return {
            error: 'Invalid PaymentIntent status'
        };
    }
};

module.exports = router