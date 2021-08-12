import React, { useState } from 'react';

const EventConfirmation = ({eventData, setEventData, setEventCreated}) => {
  const [error, setError] = useState('');

  if (eventData.error) {
    console.log(error);
    setError(eventData.error);
  }

  // Reset the form
  const handleReset = () => {
    setEventData(null);
    setEventCreated(false);
  }

  return (
    <div className='mx-auto w-2/3 p-16'>
      { error ?
        <div>
          Oops! Something went wrong:
          <div>{eventData.error}</div>
          You may need to log in again.
        </div>
      :
        <div>
          Event created!
            <a className='block underline' href={eventData.createdEvent}>Click here to see your calendar invitation</a>
            <button
              className='mx-auto mt-4 mb-10 bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded'
              onClick={handleReset}
            >
              Create Another Event
            </button>
        </div>

      }
    </div>
  );
}

export default EventConfirmation;
