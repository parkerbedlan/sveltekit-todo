<script lang="ts">
	import { browser } from '$app/environment';
	import type { InferQueryOutput } from '$lib/client/trpcClient';
	import Spinner from '$lib/components/Spinner.svelte';
	import { showCompleted } from '$lib/stores/showCompleted';
	import NewTaskForm from './NewTaskForm.svelte';
	import Task from './Task.svelte';

	export let data: { tasks: InferQueryOutput<'task:getAll'> };
	let tasks = data.tasks.reverse();

	const handleNewTask = (event: any) => {
		const { newTask } = event.detail;
		tasks = [newTask, ...tasks];
	};

	$: noTasks = tasks.length === 0 || (!$showCompleted && tasks.every((task) => task.completed));
</script>

<svelte:head>
	<title>Test</title>
</svelte:head>

<section class="flex flex-col items-center">
	<div class="form-control">
		<label class="label cursor-pointer">
			<span class="label-text m-1">Show completed</span>
			<input type="checkbox" class="toggle toggle-primary" bind:checked={$showCompleted} />
		</label>
	</div>
	<div class="overflow-y-auto max-h-96 border p-2 my-2 flex flex-col-reverse">
		{#if !browser}
			<Spinner />
		{:else if noTasks}<div class="flex flex-col items-center">
				<h1>No tasks? :(</h1>
				<img src="/sad.webp" alt="sad" width="50%" />
			</div>
		{:else}
			{#each tasks as task (`${task.id}+${task.completed}`)}
				{#if $showCompleted || !task.completed}
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
		{/if}
	</div>
	<NewTaskForm on:newTask={handleNewTask} />
</section>
