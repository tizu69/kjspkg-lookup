import { localStorageStore } from '@skeletonlabs/skeleton';
import { writable } from 'svelte/store';

export const packageListStore = writable<{ [key: string]: string } | undefined>();
export const packageStatusStore = writable<{
	[key: string]: { d: [string, string][]; v: boolean; hidePaths: string[] };
}>({
	// back: { d: [], v: true, hidePaths: [] },
	search: { d: [], v: false, hidePaths: ['/s'] }
});
export const currentAuthorStore = writable<string>('');

export const userPreferencesStore = localStorageStore<{
	sortBy: '' | 'name' | 'author' | 'downloads' | 'views';
	theme: string;
	lightMode: boolean;
	compact: boolean;
}>('preferences', { sortBy: 'name', theme: 'kjspkg', lightMode: false, compact: false });
