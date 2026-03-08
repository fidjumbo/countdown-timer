import React from "react";

const EventForm = ({
  name,
  date,
  description,
  setName,
  setDate,
  setDescription,
  handleSubmit,
  editingId,
}) => {
  return (
    <form
      onSubmit={handleSubmit}
      className="w-full bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-2xl flex flex-col gap-4 animate-slide-in"
    >
      <input
        type="text"
        placeholder="Event Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 
        focus:ring-blue-400 transition duration-300"
      />
      <input
        type="datetime-local"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
        placeholder="Date/Time"
        className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 
        focus:ring-blue-400 transition duration-300"
      />
      <input
        type="text"
        placeholder="Description (optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 
        focus:ring-blue-400 transition duration-300"
      />
      <button
        type="submit"
        className="py-3 px-5 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-500 
        transition duration-300"
      >
        {editingId ? "Update Event" : "Add Event"}
      </button>

      <style>
        {`
          @keyframes slideIn {
            0% {opacity: 0; transform: translateY(-20px);}
            100% {opacity: 1; transform: translateY(0);}
          }
          .animate-slide-in {
            animation: slideIn 0.5s ease forwards;
          }
        `}
      </style>
    </form>
  );
};

export default EventForm;