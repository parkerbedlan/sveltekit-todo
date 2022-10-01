<script lang="ts" context="module">
	type NewTaskEventDetail = { newTask: InferMutationOutput<'task:create'> };
	export type NewTaskEvent = CustomEvent<NewTaskEventDetail>;
</script>

<script lang="ts">
	import { trpc, type InferMutationOutput } from '$lib/client/trpcClient';
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	let name = '';
	let submitting = false;

	const handleSubmit = async () => {
		submitting = true;
		const newTask = await trpc().mutation('task:create', { name: name });
		dispatch('newTask', { newTask } as NewTaskEventDetail);
		name = '';
		submitting = false;
	};
</script>

<div class="flex items-center gap-1">
	<input type="checkbox" class="checkbox checkbox-lg" disabled />
	<form on:submit|preventDefault={handleSubmit}>
		<span class="input-group">
			<!-- svelte-ignore a11y-autofocus -->
			<input
				type="text"
				placeholder="New Task"
				class="input input-bordered"
				bind:value={name}
				disabled={submitting}
				autofocus={true}
			/>
			<button class="btn" disabled={submitting}>Create</button></span
		>
	</form>
</div>
