<script lang="ts">
    import { Checkbox } from "$lib/components/shad/ui/checkbox";
    import { Label } from "$lib/components/shad/ui/label";

    export let label:string = "tag";
    export let checked:boolean = false;
    export let className:string = "";
	export { className as class };

</script>

<div class="flex flex-row {className}">
    <div class="flex items-center space-x-2">
    <Checkbox
        id={label + "-checkbox"}
        bind:checked
        aria-labelledby="terms-label"
        class="rounded-none"
    />
    <Label
        id="terms-label"
        for={label + "-checkbox"}
        class="md:min-w-11 text-sm font-medium leading-4 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
        {label}
    </Label>
  </div>
</div>
