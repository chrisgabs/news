<script lang="ts">
    import "../app.css";
    import CheckBox from "$lib/components/custom/checkbox.svelte";
    import DisposablePill from "$lib/components/custom/disposable-pill.svelte";
    import * as Sheet from "$lib/components/shad/ui/sheet";
    import { Button } from "$lib/components/shad/ui/button";
    import { Collapsible } from "bits-ui";
    import { Button as ButtonBits } from "bits-ui";
    import { ModeWatcher } from "mode-watcher";
    import { Sun, Moon } from "lucide-svelte";
    import { toggleMode } from "mode-watcher";
    import { onMount } from "svelte";
    import { slide } from "svelte/transition";
    import type { LayoutData } from './$types';
    import Checkbox from "$lib/components/custom/checkbox.svelte";
    
    export let data:LayoutData;
    let {allCategories} = data;
    let ignoredTags:string[] = ["NTR", "Android", "Artificial Intelligence", "Android", "Business", "Artificial Intelligence"];
    // let ignoredTags:string[] = [];

    function onSelectAllTrigger(e:MouseEvent) {
        e.stopPropagation();
        console.log("clicked")
    }

</script>

<ModeWatcher defaultMode={"light"} />
<nav class="sticky top-0 z-50 w-full text-center content-center border-b shadow-sm border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
  <div class="container flex justify-between px-2 h-14 max-w-screen-2xl items-center">
    <Sheet.Root open={true}>
        <Sheet.Trigger asChild let:builder>
            <Button builders={[builder]} class="p-2 border-none bg-inherit" variant="outline">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-menu"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
            </Button>
        </Sheet.Trigger>

        <Sheet.Content side="left" class="flex flex-col justify-between pt-10">
        <div id="sheet-options" class="w-full">
            <header class="mb-3">
                <h1 class="text-2xl font-bold text-center">Filters</h1>
            </header>
            <div id="tags-filter" class="flex flex-col gap-4">
                <h2 class="text-xl font-bold">Ignored Tags:</h2>
                {#if ignoredTags.length === 0}
                        <span class="w-full text-center">No ignored tags</span>
                {:else}
                    <div class="flex gap-2 flex-wrap">
                        {#each ignoredTags as ignoredTag}
                            <div class="flex border rounded-full px-2 py-1 gap-1 content-center justify-center align-middle">
                                <span class="leading-none tracking-normal">{ignoredTag}</span>
                            </div>
                        {/each}
                    </div>
                {/if}
                <Collapsible.Root class="transition-all">
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
                                    label = {category}
                                    checked = {false}
                                    class=""
                                />
                                {/each}
                            </div>
                            <div class="flex justify-between">
                                <Button class="" variant="outline">Save Changes</Button>
                                <Button class="" variant="outline">Cancel Edit</Button>
                            </div>
                        </div>
                    </Collapsible.Content>
                </Collapsible.Root>
            <!-- filter tags -->
            </div> 
        <!-- sheet content -->
        </div> 

        <div id="sheet-footer" class="flex flex-col w-full gap-1">
            <span>About</span>
            <span>Github</span>
            <span>Report an Issue</span>
        </div>

        </Sheet.Content>
    </Sheet.Root>

    <h1 class="flex text-xl font-semibold">PH Tech News Digest</h1>

    <Button on:click={toggleMode} variant="outline" size="icon" class="bg-inherit border-none">
      <Sun class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"/>
      <Moon class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"/>
    <span class="sr-only">Toggle theme</span>
    </Button>
  </div>
</nav>


<slot />