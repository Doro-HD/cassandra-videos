import { createAuthClient } from 'better-auth/svelte';
import { passkeyClient } from 'better-auth/client/plugins';
import { PUBLIC_BETTER_AUTH_URL } from '$env/static/public';

const authClient = createAuthClient({
	plugins: [passkeyClient()],
	baseURL: PUBLIC_BETTER_AUTH_URL
});

export { authClient };
