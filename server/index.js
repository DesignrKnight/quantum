const statusCode = 301;

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  const requestURL = new URL(request.url);
  const key = requestURL.pathname.slice(1).toLowerCase();
  const value = await QUANTUM.get(key);

  if (value === null) {
    return new Response('Value not found', { status: 404 });
  }

  const responseURL = new URL(value).toString().trim();

  return Response.redirect(responseURL, statusCode);
}
