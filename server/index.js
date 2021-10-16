const statusCode = 301;
const baseURL = 'https://app.nitr.one/';
const notFoundURL = 'https://app.nitr.one/404';

addEventListener('fetch', (event) => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  const requestURL = new URL(request.url);
  const key = requestURL.pathname.slice(1).toLowerCase();
  if (key.length === 0) {
    return Response.redirect(baseURL, 302);
  }
  const value = await QUANTUM.get(key);

  if (value === null) {
    return Response.redirect(notFoundURL, 302);
  }

  const responseURL = new URL(value).toString().trim();

  return Response.redirect(responseURL, statusCode);
}
