<script>
  import { onMount, onDestroy, getContext } from "svelte";
  import pagejs from "page";

  export let route = "/";
  export let src = undefined;
  export let guard = [];

  const router = getContext("$router");
  const page = {};
  const guards = typeof guard === "function" ? [guard] : guard;
  let context;

  onMount(function() {
    $router.routes = [...$router.routes, page];
    pagejs(route, function(ctx, next) {
      const pass = guards.reduce((pass, guard) => pass && guard(ctx), true);
      if (!pass) return next();
      $router.active = page;
      context = ctx;
    });
  });
  onDestroy(function() {
    $router.routes = $router.routes.filter(_page => _page !== page);
  });
</script>

{#if $router.active === page}
  {#if src}
    <svelte:component this={src} {...context.params} />
  {:else}
    <slot {context} params={context.params} />
  {/if}
{/if}
