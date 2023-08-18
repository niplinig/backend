export interface User {
  id: number; // 202008397
  name: string; // Nicolas Plaza
  email: string; // niplinig@espol.edu.ec
}

const kv = await Deno.openKv();

export async function getAllUsers() {
  let users = [];
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
