import { writable } from 'svelte/store';

export const packageListStore = writable<{ [key: string]: string } | undefined>();
export const filteredPackagesStore = writable<[string, string][]>([]);
export const currentAuthorStore = writable<string>('');
