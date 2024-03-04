import { writable } from 'svelte/store';

export const ignoredTags = writable<string[]>(["Accessories", "Android", "Appliances", "Gadgets"]);