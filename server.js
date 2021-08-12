require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { google } = require('googleapis');

const app = express();
const port = 5000;

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  'http://localhost:5000/auth/callback',
);

const scopes = [
  'https://www.googleapis.com/auth/calendar'
];

// For the purposes of this demo app, we'll prompt the user for consent each time
const authUrl = oauth2Client.generateAuthUrl({
  access_type: 'offline',
  scope: scopes,
  prompt: 'consent'
});

app.use(cookieParser());

app.use(
  cors({
    // Allow the server to accept requests from localhost:3000
    origin: 'http://localhost:3000',

    // Allow cookies to be sent
    credentials: true
  })
);

app.use(express.json());

app.get('/auth', async (req, res) => {
  res.redirect(authUrl);
});

app.get('/auth/callback', async (req, res) => {
  const code = req.query.code;

  // Exchange the code for tokens
  const {tokens} = await oauth2Client.getToken(code);

  // Save the tokens in a cookie
  res.cookie('tokens', tokens);

  // Redirect back to the client side
  res.redirect('http://localhost:3000/')
});


// Create a new calendar event
app.post('/createEvent', async (req, res) => {
  const tokens = req.cookies.tokens;
  oauth2Client.setCredentials(tokens);

  const calendar = google.calendar({version: 'v3', oauth2Client});

  const eventData = req.body;

  // Create a list of attendee objects to pass into the request to Google
  const attendees = eventData.attendees.map((attendee) => {
    return {'email': attendee}
  });

  const eventDetails = {
    'summary': eventData.summary,
    'location': 'Online',
    'description': `Enter room name: ${eventData.summary}<br/><a href='YOUR_LINK_HERE'>Join Video Call</a>`,
    'start': {
      'dateTime': eventData.startDate,
    },
    'end': {
      'dateTime': eventData.endDate,
    },
    'attendees': attendees,
    'reminders': {
      'useDefault': true,
    },
  };

  let calendarEvent;

  try {
    calendarEvent = await calendar.events.insert({
      auth: oauth2Client,
      calendarId: 'primary',
      resource: eventDetails,
    })
    console.log(`Event created: ${calendarEvent.data.htmlLink}`);
    res.status(200).send({ createdEvent: calendarEvent.data.htmlLink });

  } catch (error) {
    console.log(error)
    res.status(400).send(error);
  }
});

app.listen(port, () => {
  console.log(`Express server running on port ${port}`);
});