interface CorsOptions {
  origin?: string | string[] | ((origin: string) => boolean);
  methods?: string[];
  allowedHeaders?: string[];
  exposedHeaders?: string[];
  credentials?: boolean;
  maxAge?: number;
}

export function cors(options: CorsOptions = {}) {
  const defaultOptions: CorsOptions = {
    origin: '*',
    methods: ['OPTIONS', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
    exposedHeaders: [],
    credentials: false,
    maxAge: 86400
  };

  const corsOptions = { ...defaultOptions, ...options };

  return function (request: Request): Response {
    let origin = request.headers.get('Origin') || request.headers.get('origin');

    if (origin == null) {
      return new Response(null, {
        status: 204,
        headers: {
          'Access-Control-Allow-Origin': '',
          'Access-Control-Allow-Methods': '',
          'Access-Control-Allow-Headers': ''
        }
      });
    }

    let allowOrigin: string = '*';

    if (typeof corsOptions.origin === 'string') {
      allowOrigin = corsOptions.origin;
    } else if (Array.isArray(corsOptions.origin)) {
      allowOrigin = corsOptions.origin.includes(origin) ? origin : '';
    } else if (typeof corsOptions.origin === 'function') {
      allowOrigin = corsOptions.origin(origin) ? origin : '';
    }

    const headers = new Headers({
      'Access-Control-Allow-Origin': allowOrigin,
      'Access-Control-Allow-Methods': corsOptions.methods!.join(', '),
      'Access-Control-Allow-Headers': corsOptions.allowedHeaders!.join(', ')
    });

    // Add optional headers
    if (corsOptions.exposedHeaders && corsOptions.exposedHeaders.length > 0) {
      headers.set('Access-Control-Expose-Headers', corsOptions.exposedHeaders.join(', '));
    }

    if (corsOptions.credentials) {
      headers.set('Access-Control-Allow-Credentials', 'true');
    }

    if (corsOptions.maxAge) {
      headers.set('Access-Control-Max-Age', corsOptions.maxAge.toString());
    }

    return new Response(null, {
      status: 204,
      headers
    });
  };
}
