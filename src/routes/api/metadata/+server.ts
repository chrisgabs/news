import type { RequestHandler } from './$types';
import { API_ENDPOINT } from '$lib/server/env';

let API_ADDRESS = "localhost";
let API_PORT = "6969";

export const GET: RequestHandler = async ({ request }) => {
    const url = API_ENDPOINT + "/metadata";
    const response = await fetch(url, {
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