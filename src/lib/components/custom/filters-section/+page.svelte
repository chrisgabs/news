<script lang="ts">
    import DisposablePill from "$lib/components/custom/disposable-pill.svelte";
    import { Collapsible } from "bits-ui";
    import { Button as ButtonBits } from "bits-ui";
    import { slide } from "svelte/transition";
    import Checkbox from "$lib/components/custom/checkbox.svelte";
    import { Button } from "$lib/components/shad/ui/button";
    import {ignoredTags} from "$lib/stores/ignoredTags";

    export let allCategories:string[];

    let filterMapping:{[key: string]: boolean} = {};
    allCategories.forEach((e:string) => {
        filterMapping[e] = false;
    });
    
    let ignoredTagValues:string[] = [];
    ignoredTags.subscribe((values) => {
        ignoredTagValues = values;
    })
    
    // let ignoredTags:string[] = [];

    function onSelectAllTrigger(e:MouseEvent) {
        e.stopPropagation();
        console.log("clicked")
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
    }
</script>

<div id="sheet-options" class="w-full">
    <header class="mb-3">
        <h1 class="text-2xl font-bold text-center">Filters</h1>
    </header>
    <div id="tags-filter" class="flex flex-col gap-4">
        <h2 class="text-xl font-bold">Ignored Tags:</h2>
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
        <Collapsible.Root class="transition-all" open={true}>
            <Collapsible.Trigger class="flex justify-between items-end w-full mb-4">
                <div class="font-semibold text-left underline">Edit Ignored Tags</div>
                <ButtonBits.Root on:click={onSelectAllTrigger} class="text-sm">
                    Select All
                </ButtonBits.Root>
            </Collapsible.Trigger>
            <Collapsible.Content transition={slide}>
                <div class="flex flex-col gap-4">
                    <div class="flex gap-2 flex-wrap">
                        {#each allCategories as category (category)}
                        <Checkbox
                            label={category}
                            bind:checked={filterMapping[category]}
                            class=""
                        />
                        {/each}
                    </div>
                    <div class="flex justify-between">
                        <Button class="" on:click={onSaveChanges} variant="outline">Save Changes</Button>
                        <Button class="" variant="outline">Cancel Edit</Button>
                    </div>
                </div>
            </Collapsible.Content>
        </Collapsible.Root>
    <!-- filter tags -->
    </div> 
<!-- filter component -->
</div> 