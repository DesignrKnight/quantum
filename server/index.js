import { customAlphabet } from 'nanoid';
import { numbers, lowercase } from 'nanoid-dictionary';

const nanoid = customAlphabet(lowercase + numbers, 5);

const statusCode = 301;
const baseURL = 'https://app.nitr.one/';
const notFoundURL = 'https://app.nitr.one/404';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET,HEAD,POST,OPTIONS',
  'Access-Control-Max-Age': '86400',
};

addEventListener('fetch', event => {
  if (event.request.method === 'GET') {
    event.respondWith(handleRequestGET(event.request));
  } else if (event.request.method === 'POST') {
    event.respondWith(handleRequestPOST(event.request));
  } else if (event.request.method === 'OPTIONS') {
    event.respondWith(handleRequestOPTIONS(event.request));
  } else {
    event.respondWith(handleRequest(event.request));
  }
});

async function handleRequestGET(request) {
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

async function handleRequestPOST(request) {
  try {
    const body = await request.json();
    const url = body.url;
    const defaultKey = nanoid();
    const key = body.key ? body.key.toLowerCase() : defaultKey.toLowerCase();

    const value = await QUANTUM.get(key);
    if (value != null) {
      return new Response(`Invalid key. Already taken.`, {
        status: 400,
        headers: {
          'content-type': 'application/json',
          ...corsHeaders,
          Allow: 'POST',
        },
      });
    }

    const formattedURL = new URL(url.toString().trim()).href;
    await QUANTUM.put(key, formattedURL);
    return new Response(
      JSON.stringify({
        message: `Successly added ${key} to route to ${formattedURL}`,
        key: key,
      }),
      {
        status: 201,
        headers: { 'content-type': 'application/json', ...corsHeaders },
      },
    );
  } catch (err) {
    console.log(err);
    return new Response(`Error: Invalid Request and/or URL.`, {
      status: 400,
      headers: {
        'content-type': 'application/json',
        ...corsHeaders,
        Allow: 'POST',
      },
    });
  }

  console.log(body);

  return new Response(`Invalid Request and/or URL.`, {
    status: 400,
    headers: {
      Allow: 'POST',
    },
  });
}

async function handleRequest(request) {
  return new Response(`Method ${request.method} not allowed.`, {
    status: 405,
    headers: {
      Allow: 'GET',
      'content-type': 'application/json',
      ...corsHeaders,
    },
  });
}

function handleRequestOPTIONS(request) {
  // Make sure the necessary headers are present
  // for this to be a valid pre-flight request
  let headers = request.headers;
  if (
    headers.get('Origin') !== null &&
    headers.get('Access-Control-Request-Method') !== null &&
    headers.get('Access-Control-Request-Headers') !== null
  ) {
    // Handle CORS pre-flight request.
    // If you want to check or reject the requested method + headers
    // you can do that here.
    let respHeaders = {
      ...corsHeaders,
      // Allow all future content Request headers to go back to browser
      // such as Authorization (Bearer) or X-Client-Name-Version
      'Access-Control-Allow-Headers': request.headers.get(
        'Access-Control-Request-Headers',
      ),
    };

    return new Response(null, {
      headers: respHeaders,
    });
  } else {
    // Handle standard OPTIONS request.
    // If you want to allow other HTTP Methods, you can do that here.
    return new Response(null, {
      headers: {
        Allow: 'GET, HEAD, POST, OPTIONS',
      },
    });
  }
}
