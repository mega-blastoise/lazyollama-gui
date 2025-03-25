export const CORS_HEADERS = {
  headers: {
    'Access-Control-Allow-Origin': '*', // Gatekeep this to the client host within Docker
    'Access-Control-Allow-Methods': 'OPTIONS, POST, GET',
    'Access-Control-Allow-Headers':
      'Content-Type, Authorization, Accept, X-Request-ID, X-Client-Request-ID'
  }
};
