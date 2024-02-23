import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({fetch}) => {
    const response = await fetch("api/metadata", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        // credentials: "include",
    });
    
    if (response.ok) {
        const data = await response.json();
        return data
    } else {
        return {
            "error": "fetching metadata"
        }
    }
};