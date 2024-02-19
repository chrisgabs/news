<script lang="ts">
    export let title:string = "Title Title Title Title Title Title Title ";
    export let author:string = "author";
    export let summary:string = "summary";
    export let publishedDate:string = "date";
    export let publisher:string = "publisher";
    export let url:string = "/"
</script>

<div class="group w-full rounded-sm p-3 border border-slate-100">
    <div class="flex flex-row gap-2  justify-between items-center">
        <div id="information" class="flex flex-grow flex-col min-h-full w-full ">
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
                <span class="text-sm">8 hours ago</span>
                <div class="rounded-full w-1 h-1 bg-slate-300"/>
                <span class="text-sm">
                    {author}
                </span>
            </div>
        </div>
        <figure class="aspect-square max-w-24 h-auto overflow-hidden">
            <img src="/gradient.webp" alt="gradient" class="rounded-sm w-full h-full"/>
        </figure>
    </div>
</div>
