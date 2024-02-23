import type { RequestHandler } from './$types';

let API_ADDRESS = "localhost";
let API_PORT = "6969";

export const GET: RequestHandler = async ({ request }) => {
    const url = "http://" + API_ADDRESS + ":" + API_PORT + "/metadata";
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