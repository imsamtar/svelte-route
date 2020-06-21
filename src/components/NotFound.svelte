<script>
  import { onMount, onDestroy, getContext } from "svelte";
  import pagejs from "page";

  const router = getContext("$router");
  let context;

  onMount(function() {
    pagejs("*", function() {
      $router.active = null;
    });
  });
</script>

{#if !$router.active}
  <slot />
{/if}
