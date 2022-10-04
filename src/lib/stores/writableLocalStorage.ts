import { browser } from '$app/environment';
import { writable } from 'svelte/store';

// NOTE: defaultValue will flash on screen before hydration.
// Another version of this could be implemented, which would take a third optional parameter loadingValue, and flashes that instead.
export const writableLocalStorage = <T = any>(name: string, defaultValue: T) => {
	const safeParse = (json: string) => {
		let output: any;
		try {
			output = JSON.parse(json);
		} catch (e) {
			output = json;
		}
		return output;
	};

	const localStorageString = browser && window.localStorage.getItem(name);
	const value: T = localStorageString ? safeParse(localStorageString) : defaultValue;

	const output = writable<T>(value);
	output.subscribe((val) => browser && window.localStorage.setItem(name, String(val)));
	return output;
};
