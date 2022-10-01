<script lang="ts" context="module">
	type UpdateTaskEventDetail = { updatedTask: Task };
	export type UpdateTaskEvent = CustomEvent<UpdateTaskEventDetail>;
</script>

<script lang="ts">
	import { trpc } from '$lib/client/trpcClient';
	import type { Task } from '@prisma/client';
	import clsx from 'clsx';
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	export let task: Task;

	const handleUpdate = async ({ id, done, name }: { id: number } & Partial<Task>) => {
		const updatedTask = await trpc().mutation('task:update', {
			id,
			done,
			name
		});
		dispatch('updateTask', { updatedTask } as UpdateTaskEventDetail);
	};
</script>

<div class="form-control m-2">
	<label class="text-lg flex flex-row items-center gap-2">
		<input
			type="checkbox"
			class="checkbox checkbox-lg"
			checked={task.done}
			on:change={async ({ currentTarget: { checked } }) => {
				handleUpdate({ id: task.id, done: checked });
			}}
		/>
		<span class={clsx('select-none', task.done && 'line-through text-gray-500')}>{task.name}</span>
	</label>
</div>
