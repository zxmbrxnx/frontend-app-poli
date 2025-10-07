import { db, Users } from "astro:db";
import bcrypt from "bcrypt";

// https://astro.build/db/seed
export default async function seed() {
  // Hash de la contraseña por defecto
  const defaultPasswordHash = await bcrypt.hash("password123", 10);
  await db.insert(Users).values([
    {
      id: 1,
      name: "Administrador",
      email: "admin@ejemplo.com",
      password: defaultPasswordHash,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);
}
