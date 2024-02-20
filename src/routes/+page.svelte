<script lang="ts">
	import type { PageData } from './$types';
    import Article from "$lib/components/custom/article-element.svelte";
	
	export let data: PageData;
    console.log(data);
    
</script>

<div class="flex flex-col gap-3 p-4">
    {#each data["articles"] as article}
        <Article 
            author={article["author"]}
            title={article["title"]}
            publisher={article["publisher"]}
            url={article["url"]}
            publishedDate={article["publishedDate"]}
            summary={article["summary"]}
            image_url={article["image_url"]}
            category={article["category"]}
        />
    {/each}
</div>