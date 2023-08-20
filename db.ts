import { User, Reservation } from "./main.ts";

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

export async function updateReservation(reservation: Reservation) {
  const reservationKey = ["reservation", reservation.id];
  const oldReservation = await kv.get<Reservation>(reservationKey);
  return await kv.atomic().check(oldReservation).set(reservationKey, reservation).commit();
}
