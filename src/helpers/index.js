import pagejs from "page";

export function goto(url, replace) {
    return function () {
        if (replace) return pagejs.replace(url);
        pagejs.redirect(url);
    }
}
