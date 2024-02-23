<script lang="ts">
	import type { PageData } from './$types';
    import Article from "$lib/components/custom/article-element.svelte";
    import ArticleSkeleton from "$lib/components/custom/article-skeleton.svelte";
    import * as Pagination from '$lib/components/shad/ui/pagination';
    import ChevronLeft from "lucide-svelte/icons/chevron-left";
    import ChevronRight from "lucide-svelte/icons/chevron-right";
	  import { onMount } from 'svelte';
    
    let API_ADDRESS = "localhost";
    let API_PORT = "6969";
	  // export let data: PageData;
    
    // let itemsPerPage:number = 5;
    // let currentPage:number = 1;

    let articles:any[] = [];
    let count = 10;
    let perPage = 10;
    let siblingCount = 1;
    let currentPage = 0;

    onMount(async () => {
      getTotalArticlesNum().then((e) => {
        count = e;
      })
      currentPage = 1;
    })
    
    $: if (currentPage >= 1) {     
      let offset = (currentPage-1)*perPage;
      console.log("i am running")
      articles = [];
      window.scrollTo({top: 0, behavior: 'smooth'});
      // queryArticles(offset, perPage).then((e) => {
      //     setTimeout(() => {
      //         console.log("waiting for me");
      //         articles = e;
      //     }, 2000);
      // });
      queryArticles(offset, perPage).then((e) => {
        setTimeout(() => {
          articles = e;
        }, 200);
      });
    }

    async function queryArticles(offset:number, limit:number) {
        const url = "api/articles?" + "offset=" + offset + "&limit=" + limit;
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            // credentials: "include",
        });
        
        if (response.ok) {
            const data = await response.json();
            // console.log(data);
            return data;
        }
    }

    async function getTotalArticlesNum() {
        const url = "api/metadata";
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            // credentials: "include",
        });
        
        if (response.ok) {
            const data = await response.json();
            // console.log(data);
            return data;
        }
    }
    

</script>

<div class="flex flex-col gap-2 px-4 pt-4">
    {#if articles.length === 0}
      {#each {length: perPage} as i}
        <ArticleSkeleton/>
      {/each}
    {:else}
      {#each articles as article}
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
    {/if}
</div>

<Pagination.Root {count} {perPage} {siblingCount} bind:page={currentPage} let:pages let:currentPage class="my-4">
  <Pagination.Content>
    <Pagination.Item>
      <Pagination.PrevButton>
        <ChevronLeft class="h-4 w-4" />
        <span class="hidden sm:block">Previous</span>
      </Pagination.PrevButton>
    </Pagination.Item>
    {#each pages as page (page.key)}
      {#if page.type === "ellipsis"}
        <Pagination.Item>
          <Pagination.Ellipsis />
        </Pagination.Item>
      {:else}
        <Pagination.Item>
          <Pagination.Link {page} isActive={currentPage == page.value}>
            {page.value}
          </Pagination.Link>
        </Pagination.Item>
      {/if}
    {/each}
    <Pagination.Item>
      <Pagination.NextButton>
        <span class="hidden sm:block">Next</span>
        <ChevronRight class="h-4 w-4" />
      </Pagination.NextButton>
    </Pagination.Item>
  </Pagination.Content>
</Pagination.Root>