"use client";
import { useState } from "react";

import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import { AddEvent } from "./addevent";

export default function Calender() {
  const date = new Date();
  const [selected, setSelected] = useState(
    new Date(`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`)
  );

  const currentEvents = events.filter((event) => {
    return new Date(event.date).toDateString() === selected?.toDateString();
  });
  console.log(currentEvents);
  return (
    <div className=" h-full flex flex-col md:flex-row justify-between p-2">
      <div className="w-1/2 flex items-center justify-center">
        <DayPicker mode="single" selected={selected} onSelect={setSelected} />
      </div>
      <div className="w-1/2 h-96 border p-4 rounded-lg m-4 ">
        <div className="text-2xl font-bold flex justify-between ">
          <div>
            <div>Events</div>
            <div className="text-xs font-semibold ">
              {selected?.toDateString()}
            </div>
          </div>
          <AddEvent currentDate={selected}></AddEvent>
        </div>

        <div className="text-left">
          {currentEvents.map((event, index) => {
            return (
              <div
                className=" border border-y my-2 p-2 rounded-sm font-semibold"
                key={index}
              >
                {event.title}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
