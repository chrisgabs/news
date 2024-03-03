<script lang="ts">
    import { Tooltip } from "bits-ui";
    import { Trigger } from "../shad/ui/sheet";

    export let title:string = "Title Title Title Title Title Title Title ";
    export let author:string = "author";
    export let summary:string = "summary";
    export let publishedDate:string = "date";
    export let publisher:string = "publisher";
    export let url:string = "/"
    export let image_url:string = "/"
    export let category: string = "category"

    let imageLoaded = false;
    let publishedDate_localized = new Date(publishedDate);

    let dbDate:Date = new Date(publishedDate);
    let currentDate:Date = new Date();

    let difference = currentDate.getTime() - dbDate.getTime();
    let timeDifferenceLabel = "Just now";

    // Convert the difference from milliseconds to minutes
    const minutesDifference = difference / 1000 / 60;
    
    if (minutesDifference < 2) {
        difference = minutesDifference;
    }else if (minutesDifference < 60 ) { // minutes
        difference = minutesDifference;
        timeDifferenceLabel = "minutes";
    }else if((minutesDifference / 60) < 24) { // hours
        difference = (minutesDifference / 60);
        timeDifferenceLabel = "hours";
    }else { // days
        difference = ((minutesDifference / 60) / 24);
        timeDifferenceLabel = "days";
    }

    difference = Math.trunc(difference)
    // remove s (e.g. hours -> hour)
    if (timeDifferenceLabel !== "Just now" && difference === 1) {
        timeDifferenceLabel = timeDifferenceLabel.substring(0,timeDifferenceLabel.length-1)
    }

</script>

<div class="flex group w-full rounded-md p-2">
    <div class="flex flex-row w-full gap-4 justify-between items-center">

        <div id="information" class="flex flex-col justify-between min-h-full w-full">
            <div class="flex flex-col gap-1.5">
                <div class="flex gap-1 items-center">
                    <figure class="aspect-square max-w-3 h-auto overflow-hidden">
                        <img src="/gradient.webp" alt="gradient" class="w-full h-full"/>
                    </figure>
                    <span class="text-xs truncate max-w-52 sm:max-w-full">
                        {publisher}
                    </span>
                </div>
                <a href="{url}" target="_blank" class="font-semibold text-lg leading-none tracking-wide text-wrap h-full group-hover:underline underline-offset-2 decoration-1">{title}</a>
            </div>
            <div class="flex gap-2 h-fit items-center mt-2 ">
                <div class="has-tooltip">
                    <span class="tooltip -mt-6 ml-1 p-1 text-xs bg-white border border-slate-300 shadow-md rounded-sm">{publishedDate_localized}</span>
                    <span class="text-xs leading-none">
                        {#if timeDifferenceLabel == "Just now"}
                            {timeDifferenceLabel}
                        {:else }
                            {difference} {timeDifferenceLabel} ago
                        {/if}
                    </span>
                </div>
                <div class="rounded-full w-1 h-1 mt-1 bg-slate-300"/>
                <div>
                    <span class="text-xs">
                        {author}
                    </span>
                </div>
            </div>
        </div>

        <figure class="aspect-square max-w-24 min-w-24 rounded-sm h-auto overflow-hidden">
            <div class="{imageLoaded ? "hidden" : ""} rounded w-24 h-24 overflow-hidden bg-slate-200 animate-pulse"/>
            <a href={url} target="_blank">
                <img
                    src={image_url == "" ? "/gradient.webp" : image_url} 
                    alt="gradient" 
                    class="h-full object-cover cursor-pointer"
                    on:load={() => imageLoaded = true}
                    on:error={() => console.log("error loading image: " + image_url)}
                />
            </a>
        </figure>
    </div>
</div>

<style>
    .tooltip {
        @apply invisible absolute;
    }

    .has-tooltip:hover .tooltip {
        @apply visible z-50;
    }
</style>
