<script lang="ts">
    import { Collapsible } from "bits-ui";
    import { Button as ButtonBits } from "bits-ui";
    import { slide } from "svelte/transition";
    import Checkbox from "$lib/components/custom/checkbox.svelte";
    import { Button } from "$lib/components/shad/ui/button";
    import {ignoredTags} from "$lib/stores/ignoredTags";

    export let allCategories:string[];

    let editTagsOpen:boolean = false;
    let allIgnoredTagsSelected:boolean = false;

    
    let ignoredTagValues:string[] = [];
    ignoredTags.subscribe((values) => {
        ignoredTagValues = values;
    })
    
    let filterMapping:{[key: string]: boolean} = {};
    allCategories.forEach((e:string) => {
        filterMapping[e] = ignoredTagValues.includes(e);
    });
    // let ignoredTags:string[] = [];

    function onSelectAllTrigger(e:MouseEvent) {
        e.stopPropagation();
        for (let key in filterMapping) {
            filterMapping[key] = !allIgnoredTagsSelected;
        }
        allIgnoredTagsSelected = !allIgnoredTagsSelected;
    }

    function onSaveChanges(e:MouseEvent) {
        e.stopPropagation();
        let ignoredTagsTemp = [];
        for (let key in filterMapping) {
            if (filterMapping[key]) {
                ignoredTagsTemp.push(key);
            }
        }
        ignoredTags.set(ignoredTagsTemp);
        editTagsOpen = false;
    }

    function onEditIgnoredTags(e:MouseEvent) {
        e.stopPropagation();
        editTagsOpen = !editTagsOpen;
        
        console.log("edit ignored tags")
    }

    function onCloseTagFilters(e: MouseEvent) {
        e.stopPropagation();
        editTagsOpen = false;
    }
</script>

<div id="sheet-options" class="w-full">
    <header class="mb-3">
        <h1 class="text-2xl font-bold text-center">Filters</h1>
    </header>
    <div id="tags-filter" class="flex flex-col gap-4">
        <div class="flex justify-between items-end">
            <h2 class="text-xl font-bold">Ignored Tags:</h2>
            <ButtonBits.Root on:click={onEditIgnoredTags} class="font-semibold text-left underline">Edit Tags</ButtonBits.Root>
        </div>
        {#if !editTagsOpen}
            {#if ignoredTagValues.length === 0}
                    <span class="w-full text-center">No ignored tags</span>
            {:else}
                <div class="flex gap-2 flex-wrap">
                    {#each ignoredTagValues as ignoredTag}
                        <div class="flex border rounded-full px-2 py-1 gap-1 content-center justify-center align-middle">
                            <span class="leading-none tracking-normal">{ignoredTag}</span>
                        </div>
                    {/each}
                </div>
            {/if}
        {/if}
        <Collapsible.Root class="transition-all" bind:open={editTagsOpen}>
            <!-- TODOL: transition={slide} -->
            <Collapsible.Content transition={slide}>
                <div class="flex flex-col items-end gap-2">
                    <div class="flex flex-col w-full items-end">
                        <div class="flex flex-col gap-2 overflow-auto w-full h-72">
                            {#each allCategories as category (category)}
                            <Checkbox
                                label={category}
                                bind:checked={filterMapping[category]}
                                class="max-w-40"
                            />
                            {/each}
                        </div>
                        <ButtonBits.Root on:click={onSelectAllTrigger} class="text-sm w-fit text-right">
                            {allIgnoredTagsSelected ? "Unselect All" : "Select All"}
                        </ButtonBits.Root>
                    </div>
                    <div class="flex justify-between w-full">
                        <Button class="" on:click={onSaveChanges} variant="outline">Save Changes</Button>
                        <Button class="" on:click={onCloseTagFilters} variant="outline">Cancel Edit</Button>
                    </div>
                </div>
            </Collapsible.Content>
        </Collapsible.Root>
    <!-- filter tags -->
    </div> 
<!-- filter component -->
</div> 