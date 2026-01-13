import type { Context } from "@portfolio/api";
import { auth } from "@portfolio/auth";

export async function authenticate(ctx: Context): Promise<{ userId: string } | null> {
    // TODO: Implement with Better-auth session validation
    // const session = await auth.api.getSession({ headers: ctx.headers });
    // return session?.user ? { userId: session.user.id } : null;
    return null;
}
