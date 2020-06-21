export default function newPath() {
    let url = location;
    let path = '';
    Array.from(arguments).forEach(argument => {
        argument = argument
            .replace(/(\(.+\))|[\\\?]/g, value => {
                switch (value) {
                    case '\\':
                        return '$bslash';
                    default:
                        return value.replace(/[\\\/\?]/g, value => {
                            switch (value) {
                                case '\\':
                                    return '$bslash';
                                case '/':
                                    return '$slash';
                                case '?':
                                    return '$qmark';
                                default:
                                    return value;
                            }
                        })
                }
            });
        url = new URL(argument || '', url.href);
    });
    path = url.pathname
        .replace(/\$bslash/g, '\\')
        .replace(/\$slash/g, '/')
        .replace(/\$qmark/g, '?');
    return path;
}
