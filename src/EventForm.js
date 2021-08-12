import React, { useState } from 'react';
import EventConfirmation from './EventConfirmation';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const EventForm = () => {
  const [attendees, setAttendees] = useState([]);
  const [summary, setSummary] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [eventCreated, setEventCreated] = useState(false);
  const [eventData, setEventData] = useState(false);

  // Create an array of strings from the list of email addresses
  const handleSetAttendees = (emails) => {
    const attendeeList = emails.split(',').map(email => email.trim())
    setAttendees(attendeeList)
  }

  // Submit the event creation request
  const handleSubmit = async (event) => {
    event.preventDefault();

    let body = JSON.stringify({
      attendees,
      summary,
      startDate,
      endDate
    });

    try{
      const response = await fetch('http://localhost:5000/createEvent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body
      });

      const result = await response.json();
      setEventCreated(true);
      setEventData(result);

    } catch (error) {
      console.log(error)
    }
  }

  return (
    eventCreated ? <EventConfirmation
                      eventData={eventData}
                      setEventData={setEventData}
                      setEventCreated={setEventCreated}
                    /> :

    <div className='mx-auto bg-pink-100'>
      <form
        id='createEventForm'
        name='createEventForm'
        className='mx-auto w-2/3 p-16'
        onSubmit={handleSubmit}
      >
        <h2 className='text-lg w-full mb-5 font-bold'>Invitation Details</h2>
        <label className='text-gray-700'>
            Email Addresses (separate with comma)
            <input
              className='block w-full bg-gray-50 text-gray-700 py-3 px-4 mb-3'
              name='attendees'
              type='text'
              placeholder='friend1@email.com, friend2@email.com'
              onBlur={(e) => handleSetAttendees(e.target.value)}
            />
        </label>

        <label className='text-gray-700'>Summary
          <input
            className='block w-full bg-gray-50 text-gray-700 py-3 px-4 mb-3'
            id='summary'
            name='summary'
            type='text'
            placeholder='1:1 Meeting/Check-in'
            onChange={(e) => setSummary(e.target.value)}
          />
        </label>

        <label className='text-gray-700'>Start
          <div>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              showTimeSelect
              dateFormat='Pp'
              className='block w-full bg-gray-50 text-gray-700 py-3 px-4 mb-3'
              id='startDateTime'
              name='startDateTime'
              placeholder='Select Date/Time'
            />
          </div>
        </label>

        <label className='text-gray-700'>End
          <div>
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              showTimeSelect
              dateFormat='Pp'
              className='block w-full bg-gray-50 text-gray-700 py-3 px-4 mb-3'
              id='endDateTime'
              name='endDateTime'
              placeholder='Select Date/Time'
            />
          </div>
        </label>

        <button className='mx-auto mt-4 mb-10 bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded'>
          Create Video Calendar Event
        </button>
      </form>
    </div>
  );
}

export default EventForm;
