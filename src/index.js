import handleAnchor from "./helpers/handleAnchor";

export { default as Router } from './Router.svelte';
export { default as Route } from './Route.svelte';
export { default as Error } from './Error.svelte';

export { default as routers } from "./stores/routers";
export { default as routes } from "./stores/routes";


handleAnchor();
