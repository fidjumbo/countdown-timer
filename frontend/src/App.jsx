import React, { useState, useEffect } from "react";
import EventForm from "./components/EventForm";
import EventCard from "./components/EventCard";

const App = () => {
  const [events, setEvents] = useState(
    JSON.parse(localStorage.getItem("events")) || []
  );
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [now, setNow] = useState(new Date());

  // live countdown timer
  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // persist to localStorage
  useEffect(() => {
    localStorage.setItem("events", JSON.stringify(events));
  }, [events]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      setEvents(
        events.map((event) =>
          event.id === editingId ? { ...event, name, date, description } : event
        )
      );
      setEditingId(null);
    } else {
      setEvents([...events, { id: Date.now(), name, date, description }]);
    }
    setName("");
    setDate("");
    setDescription("");
  };

  const handleEdit = (event) => {
    setEditingId(event.id);
    setName(event.name);
    setDate(event.date);
    setDescription(event.description);
  };

  const handleDelete = (id) => {
    setEvents(events.filter((event) => event.id !== id));
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center 
     justify-start animate-gradient-purple-black py-10 px-4 overflow-x-hidden">
      <h1 className="text-5xl text-white mb-8 text-center drop-shadow-lg"
       style={{ fontFamily: 'Orbitron, sans-serif' }}
       >
        Event Countdown Collection
      </h1>

      <div className="w-full max-w-6xl flex flex-col gap-6 px-2 sm:px-4">
        <EventForm
          name={name}
          date={date}
          description={description}
          setName={setName}
          setDate={setDate}
          setDescription={setDescription}
          handleSubmit={handleSubmit}
          editingId={editingId}
        />

        {events.length === 0 ? (
          <p className="text-center text-white text-lg animate-pulse">
            No events yet. Add your first countdown!
          </p>
        ) : (
          [...events]
            .sort((a, b) => new Date(a.date) - new Date(b.date))
            .map((event) => (
              <EventCard
                key={event.id}
                event={event}
                now={now}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))
        )}
      </div>

      {/* Tailwind Animation for gradient */}
      <style>
  {`
    @keyframes gradientPurpleBlack {
      0% {background-position:0% 50%;}
      50% {background-position:100% 50%;}
      100% {background-position:0% 50%;}
    }
    .animate-gradient-purple-black {
      background: linear-gradient(270deg, #6b21a8, #000000, #6b21a8);
      background-size: 400% 400%;
      animation: gradientPurpleBlack 15s ease infinite;
    }
  `}
</style>
    </div>
  );
};

export default App;