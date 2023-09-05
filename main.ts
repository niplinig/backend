import {
  Application,
  Context,
  helpers,
  Router,
} from "https://deno.land/x/oak@v12.4.0/mod.ts";
import { oakCors } from "https://deno.land/x/cors@v1.2.2/mod.ts";
import { deleteUserById, getAllUsers, getUserById, updateUser, getAllReservations, getReservationById, updateReservation, deleteReservationById,
getAllSchedules, getScheduleById, updateSchedule, deleteScheduleById } from "./db.ts";


export interface User {
  id: string; // 202008397
  name: string; // Nicolas Plaza
  email: string; // niplinig@espol.edu.ec
}

export interface Schedule {
  id: string;
  place: string; // Gimnacio Tecnología
  building: string; // A1
  date: string; // day-month-year
  capacity: string; // int
  start_hour: string; // hour:minutes
  end_hour: string; // hour:minutes
  description: string; // The activity
  picture_url: string; // ESPOL's pictures
}

export interface Reservation {
  id: string;
  user: string; // user-id
  schedule: string; // schedule-id
}

const { getQuery } = helpers;
const router = new Router();

router
  .get("/", async (ctx: Context) => {
    ctx.response.body = {
      message: "Hello World",
    };
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
    ctx.response.body = await updateUser(user);
  })
  .delete("/users/:id", async (ctx: Context) => {
    const { id } = getQuery(ctx, { mergeParams: true });
    ctx.response.body = await deleteUserById(id);
  })
  .get("/schedules", async  (ctx: Context) => {
    ctx.response.body = await getAllSchedules();
  })
  .get("/schedules/:id", async (ctx: Context) => {
    const { id } = getQuery(ctx, { mergeParams: true });
    ctx.response.body = await getScheduleById(id);
  })
  .post("/schedules", async (ctx: Context) => {
    const body = ctx.request.body();
    const schedule = await body.value;
    ctx.response.body = await updateSchedule(schedule);
  })
  .delete("/schedules/:id", async (ctx: Context) => {
    const { id } = getQuery(ctx, { mergeParams: true });
    ctx.response.body = await deleteScheduleById(id);
  })
  .get("/reservations", async (ctx: Context) => {
    ctx.response.body = await getAllReservations();
  })
  .get("/reservations/:id", async (ctx: Context) => {
  const { id } = getQuery(ctx, { mergeParams: true });
  ctx.response.body = await getReservationById(id);
  })
  .post("/reservations", async (ctx: Context) => {
  const body = ctx.request.body();
  const reservation = await body.value;
  ctx.response.body = await updateReservation(reservation);
  })
  .delete("/reservations/:id", async (ctx: Context) => {
    const { id } = getQuery(ctx, { mergeParams: true });
    ctx.response.body = await deleteReservationById(id);
  });

  // Delete added

const app = new Application();
app.use(oakCors());
app.use(router.routes());
app.use(router.allowedMethods());
console.log("Server Running at http://localhost:8000/users");
await app.listen({ port: 8000 });
