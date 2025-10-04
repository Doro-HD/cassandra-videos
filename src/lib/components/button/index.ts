import type { Snippet } from 'svelte';
import Button from './Button.svelte';

type TProps = {
	variant?: {
		color?: 'error' | 'success';
		shape?: { circle: boolean };
	};
	style?: string;
	popovertarget?: string;
	'aria-label'?: string;
	onclick: () => void;
	children: Snippet;
};

export { Button, type TProps as ButtonProps };
