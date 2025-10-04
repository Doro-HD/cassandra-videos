import { getRequestEvent } from '$app/server';
import { betterAuth } from 'better-auth';
import { sveltekitCookies } from 'better-auth/svelte-kit';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { username } from 'better-auth/plugins';
import { passkey } from 'better-auth/plugins/passkey';

import { connectDB } from '$lib/server/db';
import { sessionTable } from '$lib/server/db/session/schema';
import { userTable } from '$lib/server/db/user/schema';
import { accountTable } from '$lib/server/db/account/schema';
import { passkeyTable } from '$lib/server/db/passkey/schema';
import { verificationTable } from '$lib/server/db/verification/schema';

const db = connectDB();

const auth = betterAuth({
	emailAndPassword: {
		enabled: true
	},
	plugins: [sveltekitCookies(getRequestEvent), username(), passkey()],
	database: drizzleAdapter(db, {
		provider: 'pg',
		schema: {
			session: sessionTable,
			user: userTable,
			account: accountTable,
			passkey: passkeyTable,
			verification: verificationTable
		}
	})
});

type TAuthSession = typeof auth.$Infer.Session.session;
type TAuthUser = typeof auth.$Infer.Session.user;

export { auth, type TAuthSession, type TAuthUser };
