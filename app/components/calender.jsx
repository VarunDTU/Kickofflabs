"use client";
import "@/app/globals.css";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { useContext, useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/src/style.css";
import { DeleteEvent } from "../events/action";
import { EventContext } from "../page";
import { AddEvent } from "./addevent";
export default function Calender() {
  const [events, setevents] = useContext(EventContext);
  console.log(events);
  const date = new Date();
  const [selected, setSelected] = useState(
    new Date(`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`)
  );
  if (!events) return <div>Loading...</div>;

  const currentEvents = events.filter((event) => {
    return (
      event.starttime.toDateString() === selected?.toDateString() ||
      event.endtime.toDateString() === selected?.toDateString()
    );
  });
  const deleteEvent = async (EventId) => {
    try {
      const response = await DeleteEvent(EventId);

      setevents(response);
    } catch (e) {
      console.log(e);
    }
  };
  const bookedEvents = [
    new Date(2021, 5, 8),
    new Date(2021, 5, 9),
    new Date(2021, 5, 11),
  ];
  events?.forEach((element) => {
    bookedEvents.push(element.starttime);
  });
  console.log(bookedEvents);

  return (
    <div className=" h-full flex flex-col md:flex-row justify-between p-2 ">
      <div className="w-full md:w-1/2 flex items-center justify-center">
        <DayPicker
          mode="single"
          modifiers={{ booked: bookedEvents }}
          modifiersClassNames={{ booked: "bg-red-500 text-white font-bold" }}
          modifiersStyles={{
            booked: {
              backgroundColor: "lightgreen",
              border: 1,

              borderRadius: "50%",
              outline: "2px solid black",
              margin: "2px",
            },
          }}
          selected={selected}
          onSelect={setSelected}
        />
      </div>
      <div className="w-full md:w-1/2 h-96  border p-4 rounded-lg m-4 ">
        <div className="text-2xl font-bold flex justify-between ">
          <div>
            <div>Events</div>
            <div className="text-xs font-semibold ">
              {selected?.toDateString()}
            </div>
          </div>
          <AddEvent currentDate={selected}></AddEvent>
        </div>
        <div className="h-full">
          <div className="text-left overflow-y-auto h-4/5  ">
            {currentEvents.map((event, index) => {
              return (
                <Accordion
                  key={index}
                  type="single"
                  collapsible
                  className="w-full"
                >
                  <AccordionItem value="item-1" className="">
                    <AccordionTrigger>
                      <div className="flex flex-col justify-start items-start">
                        <div>{event?.title}</div>
                        <div className="text-xs">
                          {event?.starttime?.getHours() < 10
                            ? "0" + event?.starttime.getHours()
                            : event?.starttime?.getHours()}
                          :
                          {event?.starttime.getMinutes() < 10
                            ? "0" + event?.starttime.getMinutes()
                            : event?.starttime?.getMinutes()}
                          -
                          {event?.endtime?.getHours() < 10
                            ? "0" + event?.endtime.getHours()
                            : event?.endtime?.getHours()}
                          :
                          {event?.endtime?.getMinutes() < 10
                            ? "0" + event?.endtime.getMinutes()
                            : event?.endtime?.getMinutes()}
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="flex justify-between"></div>
                      <Button
                        className="m-1"
                        onClick={() => deleteEvent(event.event_id)}
                      >
                        Delete
                      </Button>
                      <Button className="m-1">Edit</Button>
                      {event?.description}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
