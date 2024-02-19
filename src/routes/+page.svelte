<script lang="ts">
	import type { PageData } from './$types';
    import Article from "$lib/components/custom/article-element.svelte";
	
	export let data: PageData;
    console.log(data);
    
</script>

<div class="p-3 ">
    {#each data["articles"] as article}
        <Article 
            author={article["author"]}
            title={article["title"]}
            publisher={article["publisher"]}
            url={article["url"]}
            publishedDate={article["publishedDate"]}
            summary={article["summary"]}
        />
        
    {/each}
</div>