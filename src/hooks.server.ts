// src/hooks.server.ts or src/hooks.ts on older SvelteKit versions
import type { Handle } from '@sveltejs/kit';
import { createContext, responseMeta, trpcRouter } from '$lib/server/trpc';
import { createTRPCHandle } from 'trpc-sveltekit';

export const handle: Handle = async ({ event, resolve }) => {
	const response = await createTRPCHandle({
		url: '/trpc', // optional; defaults to '/trpc'
		router: trpcRouter,
		createContext, // optional
		responseMeta, // optional
		event,
		resolve
	});

	return response;
};
