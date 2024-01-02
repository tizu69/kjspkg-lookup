import { localStorageStore } from '@skeletonlabs/skeleton';
import { writable } from 'svelte/store';

export const packageListStore = writable<{ [key: string]: string } | undefined>();
export const packageStatStore = writable<{
	[key in 'views' | 'downloads']: { [key: string]: number };
}>({
	downloads: {},
	views: {}
});
export const packageStatusStore = writable<{
	[key: string]: { d: [string, string][]; v: boolean; hidePaths: string[] };
}>({
	// back: { d: [], v: true, hidePaths: [] },
	search: { d: [], v: false, hidePaths: ['/s'] }
});
export const currentAuthorStore = writable<string>('');
export const currentSearchStore = writable<string>('');

export const userPreferencesStore = localStorageStore<{
	sortBy: '' | 'name' | 'author' | 'downloads' | 'views';
	theme: string;
	lightMode: boolean;
	compact: boolean;
	/* 0 = first visit, 1 = second visit, 2 = unchosen but visited
	   4 = prefers /home, 5 = prefers /s */
	visitState: number;
	// lastSearched: string;
}>('preferences', {
	sortBy: 'name',
	theme: 'kjspkg',
	lightMode: false,
	compact: false,
	visitState: 0,
	// lastSearched: ''
});
