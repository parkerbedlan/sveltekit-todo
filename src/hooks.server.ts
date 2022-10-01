// src/hooks.server.ts
import { createContext, responseMeta, trpcRouter } from '$lib/server/trpc';
import type { Handle } from '@sveltejs/kit';
import { createTRPCHandle } from 'trpc-sveltekit';

export const handle: Handle = async ({ event, resolve }) => {
	const response = await createTRPCHandle({
		url: '/trpc', // optional; defaults to '/trpc'
		router: trpcRouter,
		createContext, // optional
		responseMeta,
		event,
		resolve
	});

	return response;
};
