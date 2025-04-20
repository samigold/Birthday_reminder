const Birthday = require('../models/Birthday');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();

// Configure nodemailer transporter using environment variables
const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: process.env.EMAIL_PORT || 587,
    secure: process.env.EMAIL_SECURE === 'true',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Add a new birthday to the database
exports.addBirthday = async (req, res) => {
    try {
        const { username, email, dateOfBirth } = req.body;
        
        // Create new birthday record
        const birthday = new Birthday({
            username,
            email,
            dateOfBirth
        });
        
        await birthday.save();
        
        res.redirect('/birthdays?success=true');
    } catch (error) {
        console.error('Error adding birthday:', error);
        res.status(500).render('index', { error: 'Failed to add birthday.' });
    }
};

// Get all birthdays from the database
exports.getAllBirthdays = async (req, res) => {
    try {
        const birthdays = await Birthday.find().sort({ username: 1 });
        res.render('birthdays', { birthdays });
    } catch (error) {
        console.error('Error retrieving birthdays:', error);
        res.status(500).render('birthdays', { 
            error: 'Failed to retrieve birthdays.',
            birthdays: [] 
        });
    }
};

// Check for birthdays occurring today and send emails
exports.checkBirthdays = async () => {
    try {
        const today = new Date();
        const currentMonth = today.getMonth();
        const currentDay = today.getDate();
        
        // Find people whose birthdays are today
        const birthdays = await Birthday.find();
        const birthdayToday = birthdays.filter(person => {
            const birthDate = new Date(person.dateOfBirth);
            return birthDate.getMonth() === currentMonth && 
                   birthDate.getDate() === currentDay;
        });
        
        console.log(`Found ${birthdayToday.length} birthdays today.`);
        
        // Send birthday emails
        for (const person of birthdayToday) {
            await sendBirthdayEmail(person);
        }
    } catch (error) {
        console.error('Error checking birthdays:', error);
    }
};

// Send birthday email to a person
async function sendBirthdayEmail(person) {
    try {
        // Email content
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: person.email,
            subject: '🎂 Happy Birthday! 🎉',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8f8f8; border-radius: 10px;">
                    <h1 style="color: #FF69B4; text-align: center;">Happy Birthday, ${person.username}! 🎂</h1>
                    <div style="text-align: center;">
                        <p style="font-size: 18px; color: #333;">Wishing you a fantastic birthday filled with joy, laughter, and memorable moments!</p>
                        <p style="font-size: 16px; color: #333;">May all your dreams and wishes come true in the year ahead.</p>
                        <div style="margin: 30px 0;">
                            <span style="font-size: 30px;">🎁 🎈 🎉 🎊 🎂</span>
                        </div>
                        <p style="font-style: italic; color: #666;">Warm wishes,<br>The Birthday Reminder Team</p>
                    </div>
                </div>
            `
        };
        
        // Send the email
        await transporter.sendMail(mailOptions);
        console.log(`Birthday email sent to ${person.email}`);
    } catch (error) {
        console.error(`Error sending birthday email to ${person.email}:`, error);
    }
}