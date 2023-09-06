import { Reservation, Schedule, User } from "./main.ts";

const kv = await Deno.openKv();

export async function getAllUsers() {
  let users: User[] = [];
  for await (const res of kv.list<User>({ prefix: ["user"] })) {
    users = users.concat(res.value);
  }
  return users;
}

export async function getUserById(id: string): Promise<User> {
  const key = ["user", id];
  return (await kv.get<User>(key)).value!;
}

export async function updateUser(user: User) {
  const userKey = ["user", user.id];
  const oldUser = await kv.get<User>(userKey);
  return await kv.atomic().check(oldUser).set(userKey, user).commit();
}

export async function deleteUserById(id: string) {
  const userKey = ["user", id];
  const userRes = await kv.get<User>(userKey);
  return await kv.atomic().check(userRes).delete(userKey).commit();
}

export async function getAllSchedules() {
  let schedules: Schedule[] = [];
  for await (const res of kv.list<Schedule>({ prefix: ["schedule"] })) {
    schedules = schedules.concat(res.value);
  }
  return schedules;
}

export async function getScheduleById(id: string): Promise<Schedule> {
  const key = ["schedule", id];
  return (await kv.get<Schedule>(key)).value!;
}

export async function updateSchedule(schedule: Schedule) {
  const scheduleKey = ["schedule", schedule.id];
  const oldSchedule = await kv.get<Schedule>(scheduleKey);
  return await kv.atomic().check(oldSchedule).set(scheduleKey, schedule)
    .commit();
}

export async function deleteScheduleById(id: string) {
  const scheduleKey = ["schedule", id];
  const scheduleRes = await kv.get<Schedule>(scheduleKey);
  return await kv.atomic().check(scheduleRes).delete(scheduleKey).commit();
}

export async function getAllReservations() {
  let reservations: Reservation[] = [];
  for await (const res of kv.list<Reservation>({ prefix: ["reservation"] })) {
    reservations = reservations.concat(res.value);
  }
  return reservations;
}

export async function getReservationById(id: string): Promise<Reservation> {
  const key = ["reservation", id];
  return (await kv.get<Reservation>(key)).value!;
}

export async function getReservationByUser(user_id: string) {
  let reservations: Reservation[] = [];
  for await (const res of kv.list<Reservation>({ prefix: ["reservation"] })) {
    if (user_id.localeCompare(res.value.user) == 0) {
      reservations = reservations.concat(res.value);
    }
  }
  return reservations;
}

export async function updateReservation(reservation: Reservation) {
  const reservationKey = ["reservation", reservation.id];
  const oldReservation = await kv.get<Reservation>(reservationKey);
  return await kv.atomic()
  .check(oldReservation)
  .set(reservationKey, reservation)
  .commit();
}

export async function deleteReservationById(id: string) {
  const reservationId = ["reservation", id];
  const reservationRes = await kv.get<Reservation>(reservationId);
  return await kv.atomic()
  .check(reservationRes)
  .delete(reservationId)
  .commit();
}
