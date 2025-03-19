export default function getAppNetworkHeaders(
  overwrites: Record<string, string | string[] | number> = {}
): Headers {
  const headers = new Headers();
  setupDefaultHeaders(headers);

  for (const [key, value] of Object.entries(overwrites)) {
    headers.set(
      key,
      Array.isArray(value)
        ? value.join(',')
        : typeof value === 'number'
          ? value.toString()
          : value
    );
  }

  return headers;
}

function setupDefaultHeaders(headers: Headers) {
  headers.set('Content-Type', 'application/json');
  headers.set('Accept', 'application/json');
  headers.set('X-Client-ID', 'lazyollama-gui');
  headers.set('X-Request-ID', Date.now().toString());
}
