import React from "react";
import './App.css';
import EventForm from './EventForm';

const App = () => {
  return (
    <div class='flex flex-col min-h-screen bg-pink-100'>
        <header class="flex justify-between py-4 bg-pink-900">
          <div class="ml-10">
            <span class="ml-1 text-xl text-pink-50 font-semibold">Video Calendar Invitation</span>
          </div>
          <ul class="mr-10 font-semibold">
            <li class="mr-6 p-1">
              <a href="http://localhost:5000/auth" class="text-pink-50 cursor-default hover:underline">Login</a>
            </li>
          </ul>
        </header>
        <main class="w-full flex-grow">
          <EventForm />
        </main>
        <footer class="w-full bg-pink-900 mx-auto">
          <div class="flex text-center text-white justify-center mt-2">📅</div>
        </footer>
    </div>
  );
}

export default App;