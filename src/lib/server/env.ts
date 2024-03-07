// let API_ENDPOINT = import.meta.env.VITE_API_URL;
import { dev } from '$app/environment';

let API_ENDPOINT = "http://127.0.0.1:8080"

if (!dev) {
    API_ENDPOINT = import.meta.env.VITE_API_URL;
}


export { API_ENDPOINT };