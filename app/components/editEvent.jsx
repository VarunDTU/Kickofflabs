"use client";
import { EventContext } from "@/app/page";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useContext, useEffect, useState } from "react";
import { UpdateEvent } from "../events/action";

export function EditEvent({ currentEvent }) {
  const [events, setevents] = useContext(EventContext);

  const [newEvent, setNewEvent] = useState({
    id: currentEvent?.event_id,
    title: currentEvent?.title,
    description: currentEvent?.description,
    startTime: {
      hour: currentEvent?.starttime?.getHours(),
      minute: currentEvent?.starttime?.getMinutes(),
    },
    endTime: {
      hour: currentEvent?.endtime?.getHours(),
      minute: currentEvent?.endtime?.getMinutes(),
    },
    date: currentEvent?.starttime?.toDateString(),
  });
  const [loading, setLoading] = useState(false);
  const [suceess, setSuccess] = useState(false);
  useEffect(() => {
    setNewEvent({
      id: currentEvent?.event_id,
      title: currentEvent?.title,
      description: currentEvent?.description,
      startTime: {
        hour: currentEvent?.starttime?.getHours(),
        minute: currentEvent?.starttime?.getMinutes(),
      },
      endTime: {
        hour: currentEvent?.endtime?.getHours(),
        minute: currentEvent?.endtime?.getMinutes(),
      },
      date: currentEvent?.starttime?.toDateString(),
    });
  }, [currentEvent]);

  const hours = Array.from({ length: 24 }, (_, i) => i + 1);
  const minutes = Array.from({ length: 3 }, (_, i) => i);
  const editEvent = async () => {
    console.log(newEvent);
    setLoading(true);
    try {
      const formatedNewEvent = {
        id: currentEvent?.event_id,
        title: newEvent.title,
        description: newEvent.description,
        start_time: new Date(newEvent.date).setHours(
          newEvent.startTime.hour,
          newEvent.startTime.minute
        ),
        end_time: new Date(newEvent.date).setHours(
          newEvent.endTime.hour,
          newEvent.endTime.minute
        ),
        event_id: currentEvent?.event_id,
      };

      const response = await UpdateEvent(formatedNewEvent);
      setevents(response);
      setSuccess(false);
    } catch (e) {
      console.log(e);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Popover open={suceess} onOpenChange={setSuccess}>
      <PopoverTrigger asChild>
        <Button variant="outline">Edit</Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">{newEvent.date}</h4>
            <p className="text-sm text-muted-foreground">Update event</p>
          </div>
          <div className="grid gap-2">
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="width">Title</Label>
              <Input
                id="width"
                placeholder="Title"
                className="col-span-2 h-8"
                value={newEvent.title}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, title: e.target.value })
                }
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="width">Description</Label>
              <Input
                id="width"
                placeholder="Description"
                className="col-span-2 h-8"
                value={newEvent.description}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, description: e.target.value })
                }
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="maxWidth">Start Time</Label>

              <div className="">
                <div className="flex items-center ">
                  <select
                    className="border border-gray-300 rounded px-4 py-2 mr-2"
                    value={newEvent.startTime.hour}
                    onChange={(e) =>
                      setNewEvent({
                        ...newEvent,
                        startTime: {
                          ...newEvent.startTime,
                          hour: parseInt(e.target.value),
                        },
                      })
                    }
                  >
                    {hours.map((h) => (
                      <option key={h} value={h}>
                        {h}
                      </option>
                    ))}
                  </select>

                  <select
                    className="border border-gray-300 rounded px-4 py-2 mr-2"
                    value={newEvent.startTime.minute}
                    onChange={(e) =>
                      setNewEvent({
                        ...newEvent,
                        startTime: {
                          ...newEvent.startTime,
                          minute: parseInt(e.target.value),
                        },
                      })
                    }
                  >
                    {minutes.map((m) => (
                      <option key={m} value={m * 15}>
                        {m * 15 < 1 ? `0${m * 15}` : 15 * m}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="maxWidth">End Time</Label>

              <div className="">
                <div className="flex items-center ">
                  <select
                    className="border border-gray-300 rounded px-4 py-2 mr-2"
                    value={newEvent.endTime.hour}
                    onChange={(e) =>
                      setNewEvent({
                        ...newEvent,
                        endTime: {
                          ...newEvent.endTime,
                          hour: parseInt(e.target.value),
                        },
                      })
                    }
                  >
                    {hours.map((h) => (
                      <option key={h} value={h}>
                        {h}
                      </option>
                    ))}
                  </select>

                  <select
                    className="border border-gray-300 rounded px-4 py-2 mr-2"
                    value={newEvent.endTime.minute}
                    onChange={(e) =>
                      setNewEvent({
                        ...newEvent,
                        endTime: {
                          ...newEvent.endTime,
                          minute: parseInt(e.target.value),
                        },
                      })
                    }
                  >
                    {minutes.map((m) => (
                      <option key={m} value={m * 15}>
                        {m * 15 < 1 ? `0${m * 15}` : 15 * m}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <button
              onClick={editEvent}
              disabled={loading}
              className="btn btn-primary hover:bg-slate-400 border p-2 rounded-lg focus:outline-2 focus:border-3 focus:border-black "
            >
              Update Event
            </button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
