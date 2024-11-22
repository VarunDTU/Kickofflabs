"use client";
import { createContext, useState } from "react";
import Calender from "./components/calender";

export default function Home() {
  const [events, setevents] = useState([
    {
      date: "2024-11-01",
      title: "Event 1",
      description: "Description 1",
      time: "10:00",
    },
    {
      date: "2024-11-01",
      title: "Event 2",
      description: "Description 2",
      time: "11:00",
    },
    {
      date: "2024-11-02",
      title: "Event 3",
      description: "Description 3",
      time: "12:00",
    },
    {
      date: "2024-11-01",
      title: "Event 4",
      description: "Description 4",
      time: "13:00",
    },
  ]);
  const EventContext = createContext({ events, setevents });

  return (
    <div>
      <EventContext.Provider value={{ events, setevents }}>
        <Calender></Calender>
      </EventContext.Provider>
    </div>
  );
}
