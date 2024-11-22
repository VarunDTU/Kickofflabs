"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";

export function AddEvent({ currentDate }) {
  const [newEvent, setNewEvent] = useState({
    title: "",
    description: "",
    startTime: "",
    endTime: "",
    date: currentDate?.toDateString(),
  });
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Open popover</Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">
              {currentDate?.toDateString()}
            </h4>
            <p className="text-sm text-muted-foreground">Add event</p>
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
              <Input
                id="maxWidth"
                placeholder="Start Time"
                className="col-span-2 h-8"
                value={newEvent.startTime}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, startTime: e.target.value })
                }
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="height">End Time</Label>
              <Input
                id="height"
                placeholder="End Time"
                className="col-span-2 h-8"
                value={newEvent.endTime}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, endTime: e.target.value })
                }
              />
            </div>
            <button className="btn btn-primary hover:bg-slate-400 border p-2 rounded-lg focus:outline-2 focus:border-3 focus:border-black ">
              Add Event
            </button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
