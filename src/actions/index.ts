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
};
