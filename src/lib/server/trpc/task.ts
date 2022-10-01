import { prisma } from '$lib/server/prismaClient';
import { router } from '@trpc/server';
import { z } from 'zod';

export const taskRouter = router()
	.query('getAll', {
		resolve: async () => {
			return prisma.task.findMany({ orderBy: { createdAt: 'asc' } });
		}
	})
	.mutation('create', {
		input: z.object({ name: z.string() }),
		resolve: async ({ input: { name } }) => {
			return prisma.task.create({ data: { name } });
		}
	})
	.mutation('update', {
		input: z.object({ id: z.number(), done: z.boolean().optional(), name: z.string().optional() }),
		resolve: async ({ input: { id, done, name } }) => {
			return prisma.task.update({ where: { id }, data: { done, name } });
		}
	});
