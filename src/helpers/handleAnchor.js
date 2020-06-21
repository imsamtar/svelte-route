import { writable } from "svelte/store";
import routes from "../stores/routes";

export const updateCount = writable(0);

function findAnchor(node) {
    if (node.tagName === "A") return node;
    if (!node.parentNode) return false;
    if (node.parentNode.tagName === "A")
        return node.parentNode;
    return findAnchor(node.parentNode);
}

export default function () {
    window.onclick = function (event) {
        const anchor = findAnchor(event.target);
        if (anchor && anchor.origin === location.origin) {
            const href = anchor.getAttribute("href");
            if (/^(\w+:)?\/\//.test(href)) return;
            event.preventDefault();
            if (anchor.getAttribute('replace') !== null)
                history.replaceState("", document.title, href);
            else history.pushState("", document.title, href);
            updateCount.update(count => ++count);
            routes.get().forEach(router => {
                router.update(router => {
                    router.activeRoute = null;
                    return router;
                });
            });
        }
    }
}
