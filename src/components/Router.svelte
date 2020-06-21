<script>
  import { onMount, onDestroy, setContext } from "svelte";
  import { writable } from "svelte/store";
  import routers from "../stores/routers";
  import pagejs from "page";

  const router = writable({ routes: [], active: null });

  setContext("$router", router);

  onMount(function() {
    pagejs.start();
    $routers = [...$routers, router];
  });
  onDestroy(function() {
    $routers = $routers.filter(_router => _router !== router);
  });
</script>

<slot />
