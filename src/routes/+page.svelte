<script lang="ts">
	import type { InferQueryOutput } from '$lib/client/trpcClient';
	import NewTaskForm from './NewTaskForm.svelte';
	import Task from './Task.svelte';

	export let data: { tasks: InferQueryOutput<'task:getAll'> };
	let tasks = data.tasks.reverse();

	const handleNewTask = (event: any) => {
		const { newTask } = event.detail;
		tasks = [newTask, ...tasks];
		// tasks = [...tasks, newTask];
	};

	let showCompleted = true;
</script>

<svelte:head>
	<title>Test</title>
</svelte:head>

<section class="flex flex-col items-center">
	<div class="form-control">
		<label class="label cursor-pointer">
			<span class="label-text m-1">Show completed</span>
			<input type="checkbox" class="toggle toggle-primary" bind:checked={showCompleted} />
		</label>
	</div>
	<div class="overflow-y-auto max-h-96 border p-2 my-2 flex flex-col-reverse">
		{#if tasks.length === 0}
			<div class="flex flex-col items-center">
				<h1>No tasks? :(</h1>
				<img src="/sad.webp" alt="sad" width="50%" />
			</div>
		{/if}
		{#each tasks as task (`${task.id}+${task.done}`)}
			{#if showCompleted || !task.done}
				<Task
					{task}
					on:updateTask={(event) => {
						const { updatedTask } = event.detail;
						task = updatedTask;
						tasks = tasks;
					}}
				/>
			{/if}
		{/each}
	</div>
	<NewTaskForm on:newTask={handleNewTask} />
</section>
