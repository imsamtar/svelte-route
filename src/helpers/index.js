import pagejs from "page";

export function goto(url, replace) {
    if (replace) return pagejs.replace(url);
    pagejs.redirect(url);
}

export function _goto(url, replace) {
    return () => goto(url, replace);
}
