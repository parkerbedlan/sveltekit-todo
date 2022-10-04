import { router, type inferAsyncReturnType } from '@trpc/server';
import type { ResponseMetaFn } from 'trpc-sveltekit/dist/types';
import trpcTransformer from 'trpc-transformer';
import { taskRouter } from './task';

// optional
export const createContext = () => {
	// ...
	return {
		/** context data */
	};
};

//  optional
export const responseMeta: ResponseMetaFn<Router> = ({ type, errors }) => {
	if (type === 'query' && errors.length === 0) {
		const ONE_DAY_IN_SECONDS = 60 * 60 * 24;
		return {
			headers: {
				'cache-control': `s-maxage=1, stale-while-revalidate=${ONE_DAY_IN_SECONDS}`
			}
		};
	}
	return {};
};

// export const trpcRouter = router()
export const trpcRouter = router<inferAsyncReturnType<typeof createContext>>()
	.query('hello', {
		resolve: () => 'world'
	})
	.merge('task:', taskRouter)
	.transformer(trpcTransformer);

export type Router = typeof trpcRouter;
