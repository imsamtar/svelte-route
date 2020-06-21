export default function (pathRegex, path) {
    pathRegex = pathRegex.replace(/\//g, '\\\/');
    const regex = RegExp(`^${pathRegex}$`);
    if (regex.test(path)) {
        let matches = path.matchAll(RegExp(regex, 'g'));
        matches = Array.from(matches)[0];
        let result = {};
        matches.forEach((match, i) => {
            if (i) result[`_${i}`] = match;
            else result['path'] = match;
        });
        return result;
    }
    return false;
}