export default function getAppNetworkHeaders(overwrites: Record<string, string | string[] | number> = {}): Headers {
    const headers = new Headers();

}

function setupDefaultHeaders(headers: Headers) {
    headers.set('Content-Type', 'application/json');
    headers.set('Accept', 'application/json');
    headers.set()
}