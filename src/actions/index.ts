import { ActionError, defineAction } from "astro:actions";
import { z } from "astro:schema";
import { db, Users, eq } from "astro:db";
import bcrypt from "bcrypt";

export const server = {
  login: defineAction({
    input: z.object({
      email: z.string().email("Email inválido"),
      password: z
        .string()
        .min(6, "La contraseña debe tener al menos 6 caracteres"),
    }),
    async handler({ email, password }, context) {
      try {
        // Buscar el usuario en la base de datos
        const user = await db
          .select()
          .from(Users)
          .where(eq(Users.email, email))
          .get();

        if (!user) {
          throw new ActionError({
            code: "UNAUTHORIZED",
            message: "Usuario no encontrado",
          });
        }

        // Verificar la contraseña usando bcrypt
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
          throw new ActionError({
            code: "UNAUTHORIZED",
            message: "Contraseña incorrecta",
          });
        }

        // Guardar la sesión con el ID del usuario
        const sessionToken = user.id.toString();
        context.cookies.set("session", sessionToken, {
          httpOnly: true,
          secure: false,
          sameSite: "lax",
          maxAge: 60 * 60 * 24 * 7,
          path: "/",
        });

        return {
          success: true,
          message: `¡Bienvenido ${user.name}!`,
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
          },
        };
      } catch (error) {
        if (error instanceof ActionError) {
          throw error;
        }

        throw new ActionError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Error interno del servidor",
        });
      }
    },
  }),

  logout: defineAction({
    input: z.object({}),
    async handler({}, context) {
      // Eliminar la cookie de sesión
      context.cookies.delete("session", {
        path: "/",
      });

      return {
        success: true,
        message: "Has cerrado sesión exitosamente",
      };
    },
  }),

  register: defineAction({
    input: z
      .object({
        name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
        email: z.string().email("Email inválido"),
        password: z
          .string()
          .min(6, "La contraseña debe tener al menos 6 caracteres"),
        confirmPassword: z.string(),
      })
      .refine((data) => data.password === data.confirmPassword, {
        message: "Las contraseñas no coinciden",
        path: ["confirmPassword"],
      }),
    async handler({ name, email, password }, context) {
      try {
        // Verificar si el usuario ya existe
        const existingUser = await db
          .select()
          .from(Users)
          .where(eq(Users.email, email))
          .get();

        if (existingUser) {
          throw new ActionError({
            code: "CONFLICT",
            message: "Ya existe un usuario con este email",
          });
        }

        // Hashear la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Crear el nuevo usuario
        const [newUser] = await db
          .insert(Users)
          .values({
            name,
            email,
            password: hashedPassword,
            createdAt: new Date(),
            updatedAt: new Date(),
          })
          .returning();

        // Crear sesión automáticamente después del registro
        const sessionToken = newUser.id.toString();
        context.cookies.set("session", sessionToken, {
          httpOnly: true,
          secure: false, // cambiar a true en producción
          sameSite: "lax",
          maxAge: 60 * 60 * 24 * 7, // 7 días
          path: "/",
        });

        return {
          success: true,
          message: `¡Bienvenido ${newUser.name}! Tu cuenta ha sido creada exitosamente.`,
          user: {
            id: newUser.id,
            name: newUser.name,
            email: newUser.email,
          },
        };
      } catch (error) {
        if (error instanceof ActionError) {
          throw error;
        }

        throw new ActionError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Error interno del servidor al crear la cuenta",
        });
      }
    },
  }),
};
