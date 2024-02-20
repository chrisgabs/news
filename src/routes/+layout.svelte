<script>
  import "../app.css";
  import * as Sheet from "$lib/components/shad/ui/sheet";
  import { Button } from "$lib/components/shad/ui/button";
  import { ModeWatcher } from "mode-watcher";
  import { Sun, Moon } from "lucide-svelte";
  import { toggleMode } from "mode-watcher";
</script>

<ModeWatcher defaultMode={"light"} />
<nav class="sticky top-0 z-50 w-full text-center content-center border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
  <div class="container flex justify-between px-2 h-14 max-w-screen-2xl items-center">
    <Sheet.Root>
      <Sheet.Trigger asChild let:builder>
        <Button builders={[builder]} class="p-2 border-none bg-inherit" variant="outline">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-menu"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
        </Button>
      </Sheet.Trigger>
      <Sheet.Content side="left">
        <!-- <Sheet.Header>
          <Sheet.Title>Menu</Sheet.Title>
          <Sheet.Description>
            About
          </Sheet.Description>
        </Sheet.Header>
        <Sheet.Footer>
          <Sheet.Close asChild let:builder>
            <Button builders={[builder]} type="submit">Save changes</Button>
          </Sheet.Close>
        </Sheet.Footer> -->
      </Sheet.Content>
    </Sheet.Root>

    <h1 class="flex text-xl font-semibold ml-4">PH Tech News Digest</h1>

    <Button on:click={toggleMode} variant="outline" size="icon" class="bg-inherit border-none">
      <Sun class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"/>
      <Moon class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"/>
    <span class="sr-only">Toggle theme</span>
    </Button>
  </div>
</nav>


<slot />