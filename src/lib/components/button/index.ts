import type { Snippet } from 'svelte';
import Button from './Button.svelte';

type TProps = {
	variant?: {
		color?: 'error' | 'success';
		shape?: { circle: boolean };
		size?: "xs" | "sm" | "md" | "lg" | "xl"
	};
	style?: string;
	popovertarget?: string;
	'aria-label'?: string;
	type?: "submit";
	form?: string;
	onclick?: () => void;
	children: Snippet;
};

export { Button, type TProps as ButtonProps };
