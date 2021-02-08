function check(request) {
    const methods = ['GET', 'POST', 'DELETE', 'CONECT'];
    const versions = ['HTTP/0.9', 'HTTP/1.0', 'HTTP/1.1', 'HTTP/2.0'];
    const uriRegex = /[a-z0-9]*(\.+[a-z0-9]+)+/gm;
    const messageRegex = /[<>"'\\&]+/;
    if (!methods.includes(request.method)) {
        throw new Error('Invalid request header: Invalid Method');
    } else if (!uriRegex.test(request.uri)) {
        throw new Error('Invalid request header: Invalid URI');
    } else if (!versions.includes(request.version)) { 
        throw new Error('Invalid request header: Invalid Version');
    } else if (messageRegex.test(request.message) && request.message != '' || request.message == undefined) { 
        throw new Error('Invalid request header: Invalid Message');
    } else {
        return request;
    }
}

check({
    method: 'GET',
    uri: 'svn.public.catalog',
    version: 'HTTP/1.1',
    message: ''
});