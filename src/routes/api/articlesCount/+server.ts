import type { RequestHandler } from './$types';
import { API_ENDPOINT } from '$lib/server/env';

let API_ADDRESS = "localhost";
let API_PORT = "6969";

export const GET: RequestHandler = async ({ request, url }) => {
    //     let data = {
    //     hello: "world"
    // }

    // return new Response(JSON.stringify(data), {
    //     headers: {
    //         "Content-Type": "application/json",
    //     },
    // });
    const ignoredTags = encodeURIComponent(url.searchParams.get("ignoredTags") as string);
    const urlString = API_ENDPOINT + "/articlesCount?ignoredTags=" + ignoredTags;
    const response = await fetch(urlString, {
        method: "GET",
        // headers: {
        //     "Content-Type": "application/json",
        // },
        // credentials: "include",
    });
    
    if (response.ok) {
        const data = await response.json();
        return new Response(JSON.stringify(data), {
            status: response.status,
            headers: {
                "Content-Type": "application/json",
            },
        });
    } else {
        return new Response("Error occurred", { status: response.status });
    }
};