"use client";
import { createContext, useEffect, useState } from "react";
import Calender from "./components/calender";
import GetEvents from "./events/action";
export const EventContext = createContext();
export default function Home() {
  const [events, setevents] = useState(null);
  useEffect(() => {
    const data = async () => {
      const events = await GetEvents();
      setevents(events);
      return events;
    };
    data();
  }, []);

  return (
    <div>
      <EventContext.Provider value={[events, setevents]}>
        <Calender></Calender>
      </EventContext.Provider>
    </div>
  );
}
