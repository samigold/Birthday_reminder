# Birthday Reminder Application

A simple application to collect and store birthdays and send automatic email reminders on users' birthdays.

## Features

- Simple UI to collect user information (name, email, date of birth)
- Store birthday information in MongoDB database
- Daily automated check for birthdays at 7am
- Send personalized birthday emails using Nodemailer with any SMTP email provider
- View all stored birthdays with days remaining until next birthday

## Tech Stack

- Node.js & Express - Backend server
- MongoDB - Database
- EJS - Templating engine
- Nodemailer - Email delivery
- node-cron - Scheduling birthday checks
- Docker & Docker Compose - Containerization

## Setup Instructions

### Prerequisites

- Node.js (v14 or newer)
- MongoDB (local or remote)
- Email account with SMTP access

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/birthday_reminder

# Email configuration
EMAIL_HOST=smtp.example.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=your-email@example.com
EMAIL_PASS=your-email-password
```

#### Common Email Provider Settings

**Gmail:**
```
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_SECURE=false
```
**Note**: For Gmail, you'll need to generate an "app password" instead of using your regular password. See [Google's documentation](https://support.google.com/accounts/answer/185833) for instructions.

**Outlook/Hotmail:**
```
EMAIL_HOST=smtp.office365.com
EMAIL_PORT=587
EMAIL_SECURE=false
```

**Yahoo:**
```
EMAIL_HOST=smtp.mail.yahoo.com
EMAIL_PORT=587
EMAIL_SECURE=false
```

**Custom SMTP Server:**
Configure the host, port, and secure options according to your provider's documentation.

### Installation

1. Clone the repository
2. Install dependencies:
```
npm install
```
3. Start the application:
```
npm start
```

For development with auto-restart:
```
npm run dev
```

### Using Docker

To run with Docker Compose (includes MongoDB):

1. Set the environment variables:
```
export EMAIL_HOST=your-smtp-server
export EMAIL_PORT=587
export EMAIL_SECURE=false
export EMAIL_USER=your-email@example.com
export EMAIL_PASS=your-email-password
```

2. Build and start containers:
```
npm run docker:build
```

Or simply start the containers if already built:
```
npm run docker
```

## Usage

1. Navigate to `http://localhost:3000` in your web browser
2. Fill out the form with a name, email, and date of birth
3. View all stored birthdays at `http://localhost:3000/birthdays`
4. The application will automatically check for birthdays each day at 7 AM and send emails to anyone with a birthday on the current date

## License

ISC