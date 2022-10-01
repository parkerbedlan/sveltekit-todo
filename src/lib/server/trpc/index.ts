import { router } from '@trpc/server';
import trpcTransformer from 'trpc-transformer';
import { taskRouter } from './task';

// optional
// export const createContext = () => {
// 	// ...
// 	return {
// 		/** context data */
// 	};
// };

// optional
// export const responseMeta = () => {
// 	// ...
// 	return {
// 		// { headers: ... }
// 	};
// };

// export const trpcRouter = router<inferAsyncReturnType<typeof createContext>>()
export const trpcRouter = router()
	.query('hello', {
		resolve: () => 'world'
	})
	.merge('task:', taskRouter)
	.transformer(trpcTransformer);

export type Router = typeof trpcRouter;
