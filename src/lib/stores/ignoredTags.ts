import { writable } from 'svelte/store';

export const ignoredTags = writable<string[]>(["NTR", "Artifical Intelligence"]);