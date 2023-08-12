import {
  Application,
  Context,
  helpers,
  Router,
} from "https://deno.land/x/oak@v12.4.0/mod.ts";
import { deleteUserById, getAllUsers, getUserById, upsertUser } from "./db.ts";

export interface User {
  id: number; // 202008397
  name: string; // Nicolas Plaza
  email: string; // niplinig@espol.edu.ec
}

// export interface Date { // 11-ago-2023
//   day: number;
//   month: string;
//   year: number;
// }

// export interface Time { // 22:28
//   hour: number; // 24h-format
//   minutes: number;
// }

// export interface Place {
//   id: number;
//   name: string; // ESPOL GYM
//   building: string; // A1
// }

// export interface Calendar {
//   id: number;
//   place: Place;
//   date: Date;
//   capacity: number; // max-for-the-day
// }

// export interface Schedule {
//   id: number;
//   calendar: Calendar;
//   start_hour: Time;
//   end_hour: Time;
// }

// export interface Reservation {
//   id: number;
//   user: User;
//   schedule: Schedule;
// }

const { getQuery } = helpers;
const router = new Router();

router
  .get("/", async (ctx: Context) => {
    ctx.response.body = "Hello World";
  })
  .get("/users", async (ctx: Context) => {
    ctx.response.body = await getAllUsers();
  })
  .get("/users/:id", async (ctx: Context) => {
    const { id } = getQuery(ctx, { mergeParams: true });
    ctx.response.body = await getUserById(id);
  })
  .post("/users", async (ctx: Context) => {
    const body = ctx.request.body();
    const user = await body.value;
    await upsertUser(user);
  })
  .delete("/users/:id", async (ctx: Context) => {
    const { id } = getQuery(ctx, { mergeParams: true });
    await deleteUserById(id);
  });

const app = new Application();

app.use(router.routes());
app.use(router.allowedMethods());

console.log("Server Running at http://localhost:8000/users")
await app.listen({ port: 8000 });
