"use server";
import { auth } from "@clerk/nextjs/server";
import { neon } from "@neondatabase/serverless";
import { z } from "zod";
const User = z.object({
  title: z.string().min(1),
  description: z.string(),
  start_time: z.date(),
  end_time: z.date(),
});
async function getData(userId) {
  const sql = neon(process.env.DATABASE_URL);
  const response = await sql`SELECT * FROM events WHERE user_id = ${userId}`;

  return response;
}
export default async function GetEvents() {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("User ID is required");
  }

  const data = await getData(userId);

  return data;
}
export async function AddNewEvent(userData) {
  console.log(userData);
  userData = {
    ...userData,
    start_time: new Date(userData.start_time),
    end_time: new Date(userData.end_time),
  };
  User.parse(userData);
  const { userId } = await auth();
  userData = { ...userData, userId: userId };

  const sql = neon(process.env.DATABASE_URL);

  await sql`INSERT INTO events (user_id, title, description, startTime, endTime) VALUES (${userData.userId}, ${userData.title}, ${userData.description}, ${userData.start_time}, ${userData.end_time})`;

  const response = await GetEvents();
  return response;
}

export async function DeleteEvent(EventId) {
  const sql = neon(process.env.DATABASE_URL);
  await sql`DELETE FROM events WHERE event_id = ${EventId}`;

  const response = await GetEvents();

  return response;
}
