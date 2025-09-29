import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = () => {
	const post = {
		title: "Hello World!",
		blocks: [
			{
				type: "text" as const,
				text: "This video covers how to create a basic \"Hello World!\" program in Java. Be aware of the fact that he is not using Intellij as his editor but rather one known as Eclipse. If he says anything that is editor specific, like how to run the program, ignore him."
			},
			{
				type: "text" as const,
				text: "The video will play the interval 02:20-07:50, roughly 5 minutes. The video should stop by itself."
			},
			{
				type: "youtube" as const,
				vidioID: "LldhjFkwfmI",
				// in seconds
				startTime: 140,
				endTime: 470,
			}
		]
	}
	return {
		post
	};
}
