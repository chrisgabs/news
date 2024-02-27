import { writable } from 'svelte/store';

export const ignoredTags = writable<string[]>(["Artifical Intelligence", "Android"]);