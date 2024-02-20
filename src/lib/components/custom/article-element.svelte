<script lang="ts">
    export let title:string = "Title Title Title Title Title Title Title ";
    export let author:string = "author";
    export let summary:string = "summary";
    export let publishedDate:string = "date";
    export let publisher:string = "publisher";
    export let url:string = "/"
    export let image_url:string = "/"
    export let category: string = "category"

    const dbDate:Date = new Date(publishedDate);
    const currentDate:Date = new Date();

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
    if (timeDifferenceLabel !== "Just now" && difference === 1) {
        timeDifferenceLabel = timeDifferenceLabel.substring(0,timeDifferenceLabel.length-1)
    }

</script>

<div class="flex group w-full rounded-sm p-4 border border-slate-100">
    <div class="flex flex-row w-full gap-2 justify-between items-center">
        <div id="information" class="flex flex-grow flex-col justify-between min-h-full w-full">
            <div class="h-full">
                <div class="flex gap-2 items-center">
                    <figure class="aspect-square max-w-3.5 h-auto overflow-hidden">
                        <img src="/gradient.webp" alt="gradient" class="rounded-sm w-full h-full"/>
                    </figure>
                    <span class="text-sm">
                        {publisher}
                    </span>
                </div>
                <a href="{url}" target="_blank" class="font-bold text-xl text-wrap h-full group-hover:underline underline-offset-2 decoration-1">{title}</a>
            </div>
            <div class="flex gap-2 h-fit items-center">
                <span class="text-sm">
                    {#if timeDifferenceLabel == "Just now"}
                        {timeDifferenceLabel}
                    {:else }
                        {difference} {timeDifferenceLabel} ago
                    {/if}
                </span>
                <div class="rounded-full w-1 h-1 bg-slate-300"/>
                <span class="text-sm">
                    {author}
                </span>
            </div>
        </div>
        <figure class="aspect-square max-w-24 h-auto overflow-hidden">
            <img src={image_url == "" ? "/gradient.webp" : image_url} alt="gradient" class="rounded-sm h-full object-cover"/>
        </figure>
    </div>
</div>
