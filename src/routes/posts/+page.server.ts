import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = () => {
	const posts = [
		{
			id: "foo",
			title: "Foo",
			description: "Bar",
			url: "foo"
		}
	];

	return {
		posts
	}
}
