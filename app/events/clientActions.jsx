import { DeleteEvent } from "../events/action";

export const deleteEvent = async (EventId) => {
  try {
    const response = await DeleteEvent(EventId);
    setevents(response);
  } catch (e) {
    console.log(e);
  }
};
