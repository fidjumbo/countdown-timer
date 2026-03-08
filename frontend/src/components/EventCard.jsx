import React, { useState, useEffect } from "react";

const EventCard = ({ event, now, onEdit, onDelete }) => {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      const diff = new Date(event.date) - new Date();
      setSeconds(Math.floor((diff / 1000) % 60));
    }, 1000);
    return () => clearInterval(timer);
  }, [event.date]);

  const getTimeLeft = (date) => {
    const diff = new Date(date) - now;
    if (diff <= 0) return "Event Passed!";
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);
    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  };

  const getEventColor = (date) => {
    const diff = new Date(date) - now;
    const days = diff / (1000 * 60 * 60 * 24);
    if (days <= 1) return "border-red-500 bg-red-100/50";
    if (days <= 7) return "border-orange-400 bg-orange-100/50";
    return "border-green-500 bg-green-100/50";
  };

  return (
    <div
      className={`w-full p-6 rounded-2xl shadow-2xl border-l-4 ${getEventColor(
        event.date
      )} transform transition duration-300 hover:scale-105 animate-fade-in`}
    >
      <h3 className="text-2xl font-bold mb-2 text-gray-800 drop-shadow-md">
        {event.name}
      </h3>
      <p className="text-gray-700 mb-3">{event.description}</p>
      <strong className="text-lg font-mono text-gray-900 animate-pulse">
        {getTimeLeft(event.date)}
      </strong>
      <div className="mt-4 flex gap-4">
        <button
          onClick={() => onEdit(event)}
          className="px-4 py-2 rounded-md bg-blue-600 text-white font-semibold hover:bg-blue-500 transition"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(event.id)}
          className="px-4 py-2 rounded-md bg-red-500 text-white font-semibold hover:bg-red-400 transition"
        >
          Delete
        </button>
      </div>

      <style>
        {`
          @keyframes fadeIn {
            0% {opacity: 0; transform: translateY(20px);}
            100% {opacity: 1; transform: translateY(0);}
          }
          .animate-fade-in {
            animation: fadeIn 0.5s ease forwards;
          }
        `}
      </style>
    </div>
  );
};

export default EventCard;