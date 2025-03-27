export const CORS_HEADERS: RequestInit = {
  headers: {
    'Access-Control-Allow-Origin': 'http://localhost:4040,', // Gatekeep this to the client host within Docker
    'Access-Control-Allow-Methods': 'OPTIONS, POST, GET',
    'Access-Control-Allow-Headers':
      'Content-Encoding, Content-Length, Content-Type, Authorization, Accept, Accept-Encoding, X-Forwarded-For, X-Request-ID, X-Client-Request-ID',
    Vary: 'Origin'
  }
};

export const ALLOWED_ORIGINS = [
  'http://localhost:4040',
  'http://0.0.0.0:40404',
  'http://lazyollama.gui:4040',
  'http://lazyollama.docker:4040'
] as const;
