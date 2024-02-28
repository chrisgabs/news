<script lang="ts">
    import "../app.css";
    import * as Sheet from "$lib/components/shad/ui/sheet";
    import { Button } from "$lib/components/shad/ui/button";
    import FiltersSection from "$lib/components/custom/filters-section/+page.svelte";
    import { ModeWatcher } from "mode-watcher";
    import { Sun, Moon } from "lucide-svelte";
    import { toggleMode } from "mode-watcher";
    import { onMount } from "svelte";
    import type { LayoutData } from './$types';
    
    export let data:LayoutData;
    let {allCategories} = data;

</script>

<ModeWatcher defaultMode={"light"} />
<nav class="sticky top-0 z-50 w-full text-center content-center border-b shadow-sm border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
  <!-- <div class="w-full h-1 sm:bg-yellow-300 md:bg-blue-300 lg:bg-red-300 xl:bg-green-300"></div> -->
  <div class="container flex justify-between px-2 h-14 max-w-screen-lg items-center">
    <Sheet.Root open={false}>
        <Sheet.Trigger asChild let:builder>
            <Button builders={[builder]} class="p-2 border-none bg-inherit lg:hidden" variant="outline">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-menu"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
            </Button>
        </Sheet.Trigger>

        <Sheet.Content side="left" class="flex flex-col justify-between pt-10">

        <FiltersSection allCategories={allCategories} />

        <div id="sheet-footer" class="flex flex-col gap-1 w-full">
            <span class="text-xs">About</span>
            <span class="text-xs">Github</span>
            <span class="text-xs">Report an Issue</span>
        </div>

        </Sheet.Content>
    </Sheet.Root>

    <h1 class="text-xl text-center font-semibold w-full ">PH Tech News Digest</h1>

    <Button on:click={toggleMode} variant="outline" size="icon" class="bg-inherit border-none lg:relative lg:right-0">
      <Sun class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"/>
      <Moon class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"/>
    </Button>
  </div>
</nav>


<slot />