import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import {API_ADDRESS, API_PORT} from '$env/static/private';

export const load: PageServerLoad = async ({ params }) => {

    const response = await fetch("http://" + API_ADDRESS + ":" + API_PORT + "/articles", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        // credentials: "include",
    });

	if (response.ok) {
        const data = await response.json();
        // console.log(data);
		return {
            articles: data
        };
	}

	error(404, 'Not found');
};