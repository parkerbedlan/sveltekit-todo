import { trpc } from '$lib/client/trpcClient';
import type { Load } from '@sveltejs/kit';

export const load: Load = async ({ fetch }) => {
	const tasks = await trpc(fetch).query('task:getAll');
	return { tasks };
};
