<script lang="ts">
	type TProps = {
		videoID: string;
		startTime: number;
		endTime: number;
	};
	const { videoID, startTime, endTime }: TProps = $props();
</script>

<iframe
	width="1024"
	height="650"
	src={`https://www.youtube.com/embed/${videoID}?start=${startTime}&end=${endTime}`}
	title="Your First Java Program | Java | Tutorial 3"
	allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
	referrerpolicy="strict-origin-when-cross-origin"
	allowfullscreen
></iframe>
