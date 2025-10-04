import { goto } from '$app/navigation';
import { authClient } from './client';

function allowAuthorizedUsers() {
	const session = authClient.useSession();

	$effect(() => {
		if (!session.value?.data) {
			goto('/');
		}
	});
}

function denyAuthorizedUsers() {
	const session = authClient.useSession();

	$effect(() => {
		if (session.value?.data) {
			goto('/');
		}
	});
}

export { allowAuthorizedUsers, denyAuthorizedUsers };
