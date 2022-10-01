// $lib/trpcClient.ts
import type { Router } from '$lib/server/trpc'; // 👈 only the types are imported from the server
import { createTRPCClient } from '@trpc/client';
import type { LoadEvent } from '@sveltejs/kit';
import transformer from 'trpc-transformer';
import type { inferProcedureInput, inferProcedureOutput } from '@trpc/server';
import { browser } from '$app/environment';

// export const trpc = trpc.createTRPCClient<Router>({ url: '/trpc', transformer });

const url = browser ? '/trpc' : 'http://localhost:3000/trpc';
export const trpc = (loadFetch?: LoadEvent['fetch']) =>
	createTRPCClient<Router>({
		url: loadFetch ? '/trpc' : url,
		transformer,
		...(loadFetch && { fetch: loadFetch as typeof fetch })
	});

type Query = keyof Router['_def']['queries'];
type Mutation = keyof Router['_def']['mutations'];

// Useful types 👇👇👇
export type InferQueryOutput<RouteKey extends Query> = inferProcedureOutput<
	Router['_def']['queries'][RouteKey]
>;
export type InferQueryInput<RouteKey extends Query> = inferProcedureInput<
	Router['_def']['queries'][RouteKey]
>;
export type InferMutationOutput<RouteKey extends Mutation> = inferProcedureOutput<
	Router['_def']['mutations'][RouteKey]
>;
export type InferMutationInput<RouteKey extends Mutation> = inferProcedureInput<
	Router['_def']['mutations'][RouteKey]
>;
