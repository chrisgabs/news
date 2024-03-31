<script lang="ts">
    import type { PageData } from './$types';
    import Article from "$lib/components/custom/article-element.svelte";
    import ArticleSkeleton from "$lib/components/custom/article-skeleton.svelte";
    import DatePartition from "$lib/components/custom/date-partition.svelte";
    import FiltersSection from "$lib/components/custom/filters-section/+page.svelte";
    import * as Pagination from '$lib/components/shad/ui/pagination';
    import ChevronLeft from "lucide-svelte/icons/chevron-left";
    import ChevronRight from "lucide-svelte/icons/chevron-right";
    import {ignoredTags as ignoredTagsStore} from "$lib/stores/ignoredTags";
    import { onMount } from 'svelte';
    
    export let data: PageData;
    let {articlesCount, allCategories} = data;
    
    let idxOfDateBreakpoints:number[] = [];
    
    let ignoredTags:string = "";
    let articles:any[] = [];
    let perPage = 15;
    let siblingCount = 1;
    let currentPage = 0;

    onMount(async () => {
        if (articlesCount) {
            // trigger articles fetch
            currentPage = 1;
        }
        // TODO: ensure that the tags themselves dont have commas
        ignoredTagsStore.subscribe((values) => {
            currentPage = 1;
            let ignoredTagsString = "";
            values.forEach((e, i) => {
                if (i < values.length-1) {
                    ignoredTagsString += e + ",";
                }else {
                    ignoredTagsString += e;
                }
            })
            queryArticlesCount(ignoredTagsString).then((e) => {
                articlesCount = e;
            }) 
            ignoredTags = ignoredTagsString;
        })
    })
    
    $: if (currentPage >= 1) {
        let offset = (currentPage-1)*perPage;
        articles = [];
        // TODO: if dev, turn timeout to 200
        queryArticles(offset, perPage, ignoredTags).then((e) => {
            setTimeout(() => {
                // e can be null
                articles = e;
                window.scrollTo({top: 0, behavior: 'smooth'});
            }, 50);
        });
    }

    $: if (articles) {
        idxOfDateBreakpoints = findDateBreakpoints(articles);
    }

    // ------ TODO: put all functions below this comment in lib folder ------

    async function queryArticles(offset:number, limit:number, ignoredTags:string) {
        let url = "api/articles?" + "offset=" + offset + "&limit=" + limit + "&ignoredTags=" + ignoredTags;
        url = encodeURI(url);
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

    async function queryArticlesCount(ignoredTags: string) {
        let url = "api/articlesCount?ignoredTags=" + ignoredTags;
        url = encodeURI(url);
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            // credentials: "include",
        });
        
        if (response.ok) {
            const data = await response.json();
            return data;
        }
    }

    function findDateBreakpoints(articles:any[]) : number[] {
      let indexes:number[] = []
      let prevDate:null|number = null;

      articles.forEach((article, i) => {
        const articleDate = new Date(article["publishedDate"]).getDate();
        if (prevDate === null || prevDate !== articleDate) {
          indexes.push(i);
          prevDate = articleDate;
        }
      })
      return indexes
    }
    
</script>

<div id="main-body" class="flex justify-center gap-5 mt-5 mx-4 md:ml-8">
    <div id="articles-cointainer" class="flex flex-col gap-4 w-full md:max-w-2xl ">
        {#if articles === null}
            <span class="w-full text-2xl text-center mt-10">
                No articles match given filters :(
            </span>
        {:else if articles.length === 0}
            {#each {length: perPage} as i}
                <ArticleSkeleton/>
            {/each}
        {:else}
            {#each articles as article, i}
                {#if idxOfDateBreakpoints.includes(i)}
                    <DatePartition
                        date={article["publishedDate"]}
                    />
                {/if}
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
        {#if articles !== null}
            <Pagination.Root bind:count={articlesCount} {perPage} {siblingCount} bind:page={currentPage} let:pages let:currentPage class="my-4">
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
        {/if}
    </div>
  
    <div class="hidden lg:flex flex-col min-w-72 p-4">
        <FiltersSection allCategories={allCategories} />
        <div class="w-full h-px bg-slate-200 mt-6 mb-2"/>
        <div id="sheet-footer" class="flex flex-col gap-1 w-full">
            <!-- <span class="text-xs">About</span> -->
            <a href="https://github.com/chrisgabs/news" target="_blank" class="text-xs">Github</a>
            <!-- <span class="text-xs">Report an Issue</span> -->
        </div>
    </div>

</div>