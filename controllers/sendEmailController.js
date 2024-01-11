const express = require('express');
const router = express.Router();
const admin = require('firebase-admin'); // Import the admin object from Firebase
const db = require("../config");


const serviceAccount = require("../routes/serviceAccount.json"); // Update with your actual service account key path

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://belajarin-ac6fd.firebaseio.com" // Update with your Firebase project URL
});


const sendEmail = async (req, res) => {
    const { email } = req.body;
    admin
        .firestore()
        .collection("mail")
        .add({
            to: email,
            message: {
                subject: "Status Mentor",
                text: "Hi sayang tunggu 5 hari ya buat ketemu hehehehehe",
                html: `
                <html>
                    <head>
                        <style>
                            /* Add your CSS styles here if needed */
                        </style>
                    </head>
                    <body>
                        <h1>Hello from Firebase!</h1>
                        <p>This is the HTML section of the email body.</p>
                        <code>This is a code snippet.</code>
                    </body>
                </html>
            `,
            },
        })
        .then(() => {
            console.log("Queued email for delivery!");
            res.send("Email sent successfully."); // Send a response to the client
        })
        .catch((error) => {
            console.error("Error sending email:", error);
            res.status(500).send("Internal Server Error"); // Send an error response to the client
        });
};

module.exports = {
    sendEmail
};
