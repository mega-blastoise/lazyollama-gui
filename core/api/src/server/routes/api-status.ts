export function handleGETAPIStatusRequest(r: Request | Response): Response {
  if (r instanceof Response) return r;
  else return new Response('OK', { status: 200 });
}
