const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const { saveJobApplication, saveEsportsRegistration } = require('./utils/excelUtils');

// Initialize Express
const app = express();

// Middleware to parse incoming request bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Configure Nodemailer transport
const transporter = nodemailer.createTransport({
    service: 'gmail',  // You can use another service (e.g., SendGrid, Mailgun, etc.)
    auth: {
        user: 'your-email@gmail.com',  // Replace with your email
        pass: 'your-email-password'   // Replace with your email password (or App Password if 2FA enabled)
    }
});

// Route for the general job application form submission
app.post('/submit-general-application', async (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).send('All fields are required.');
    }

    try {
        // Save to Excel
        await saveJobApplication({
            name,
            email,
            message,
            date: new Date().toISOString()
        });

        // Send email notification
        const mailOptions = {
            from: email,
            to: 'your-email@example.com',
            subject: 'New General Job Application',
            text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return res.status(500).send('Error sending email: ' + error.message);
            }
            res.status(200).send('Your application has been submitted successfully!');
        });
    } catch (error) {
        res.status(500).send('Error saving application: ' + error.message);
    }
});

// Route for specific job applications (web developer, graphic designer, etc.)
app.post('/apply-job', (req, res) => {
    const { jobTitle, name, email, message } = req.body;

    if (!name || !email || !message || !jobTitle) {
        return res.status(400).send('All fields are required.');
    }

    const mailOptions = {
        from: email,
        to: 'your-email@example.com',  // Replace with your email
        subject: `New Application for ${jobTitle} Position`,
        text: `Job Title: ${jobTitle}\nName: ${name}\nEmail: ${email}\nMessage: ${message}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send('Error sending email: ' + error.message);
        }
        res.status(200).send('Your application for the job has been submitted successfully!');
    });
});

// Route for esports registration
app.post('/register-esports', async (req, res) => {
    const { name, email, tournament, payment, p_method } = req.body;

    if (!name || !email || !tournament || !payment || !p_method) {
        return res.status(400).send('All fields are required.');
    }

    try {
        // Save to Excel
        await saveEsportsRegistration({
            name,
            email,
            tournament,
            payment,
            payment_method: p_method,
            date: new Date().toISOString()
        });

        res.status(200).send('Registration successful!');
    } catch (error) {
        res.status(500).send('Error saving registration: ' + error.message);
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
