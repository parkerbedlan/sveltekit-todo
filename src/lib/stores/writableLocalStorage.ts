import { browser } from '$app/environment';
import { writable } from 'svelte/store';

export const writableLocalStorage = <T>(name: string, defaultValue: T, loadingValue?: T) => {
	const safeParse = (json: string) => {
		let output;
		try {
			output = JSON.parse(json);
		} catch (e) {
			output = json;
		}
		return output;
	};

	let value: T | undefined;
	if (!browser) value = loadingValue;
	else {
		const localStorageString = window.localStorage.getItem(name);
		value = localStorageString ? safeParse(localStorageString) : defaultValue;
	}

	const output = writable<T>(value);
	output.subscribe((val) => browser && window.localStorage.setItem(name, String(val)));
	return output;
};
