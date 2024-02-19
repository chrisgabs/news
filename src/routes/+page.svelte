<script lang="ts">
	import type { PageData } from './$types';
	
	export let data: PageData;
    console.log(data);
    // data = {
    //     articles: [1,2,3]
    // }
    
</script>

<div class="h-dvh ">
    {#each data["articles"] as article}
         {article["author"]}
    {/each}
</div>