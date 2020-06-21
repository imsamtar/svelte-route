<script>
  import { onMount, onDestroy, getContext } from "svelte";
  import pagejs from "page";

  export let path = "/";
  export let guard = [() => true];
  export let page = undefined;

  const router = getContext("$router");
  const route = {};
  const guards = typeof guard === "function" ? [guard] : guard;
  let context;

  onMount(function() {
    $router.routes = [...$router.routes, route];
    pagejs(path, function(ctx, next) {
      const pass = guards.reduce((pass, guard) => pass && guard(ctx), true);
      if (!pass) return next();
      $router.active = route;
      context = ctx;
    });
  });
  onDestroy(function() {
    $router.routes = $router.routes.filter(_route => _route !== route);
  });
</script>

{#if $router.active === route}
  {#if page}
    <svelte:component this={page} {...context.params} />
  {:else}
    <slot {context} params={context.params} />
  {/if}
{/if}
