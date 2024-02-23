// import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

let API_ADDRESS = "localhost";
let API_PORT = "6969";

export const GET: RequestHandler = async ({ request, url }) => {
	// const { offset, limit } = await request.json();
    const offset = url.searchParams.get("offset");
    const limit = url.searchParams.get("limit");
    const urlRequest = "http://" + API_ADDRESS + ":" + API_PORT + "/articles?" + "offset=" + offset + "&limit=" + limit;
    const response = await fetch(urlRequest, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
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