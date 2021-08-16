import React from 'react';
import EventForm from './EventForm';

const App = () => {
  return (
    <div className='flex flex-col min-h-screen bg-pink-100'>
      <header className='flex justify-between py-4 bg-pink-900'>
        <div className='ml-10'>
          <span className='ml-1 text-xl text-pink-50 font-semibold'>Video Calendar Invitation</span>
        </div>
        <ul className='mr-10 font-semibold'>
          <li className='mr-6 p-1'>
            <a href='http://localhost:5000/auth' className='text-yellow-200 text-lg cursor-default hover:underline'>Login</a>
          </li>
        </ul>
      </header>
      <main className='w-full flex-grow'>
        <EventForm />
      </main>
      <footer className='w-full bg-pink-900 mx-auto'>
        <div className='flex text-center text-white justify-center mt-2'>📅</div>
      </footer>
    </div>
  );
}

export default App;