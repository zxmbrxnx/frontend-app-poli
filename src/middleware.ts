import { defineMiddleware } from "astro/middleware";
import { db, Users, eq } from "astro:db";

export const onRequest = defineMiddleware(
  async ({ url, cookies, redirect }, next) => {
    const session = cookies.get("session")?.value;
    const pathname = url.pathname;

    const isPrivate = pathname.startsWith("/dashboard");

    if (isPrivate) {
      if (!session) {
        return redirect("/auth/login");
      }

      try {
        const userId = parseInt(session);
        const user = await db
          .select()
          .from(Users)
          .where(eq(Users.id, userId))
          .get();

        if (!user) {
          cookies.delete("session", { path: "/" });
          return redirect("/auth/login");
        }
      } catch (error) {
        cookies.delete("session", { path: "/" });
        return redirect("/auth/login");
      }
    }

    return next();
  }
);
