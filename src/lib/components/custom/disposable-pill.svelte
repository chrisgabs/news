<script lang="ts">
    import { Button } from "bits-ui";

    export let label:string = "";
</script>

<div class="flex border rounded-full px-2 py-1 gap-1 content-center justify-center align-middle">
    <Button.Root class="">
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
    </Button.Root>
    <span class="leading-none tracking-normal">{label}</span>
</div>

