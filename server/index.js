import { customAlphabet } from 'nanoid';
import { numbers, lowercase } from 'nanoid-dictionary';
import { Router } from 'itty-router';
import { parseJwt } from '@cfworker/jwt';
// import jwksClient from 'jwks-rsa';
// import jwt from 'jsonwebtoken';

const nanoid = customAlphabet(lowercase + numbers, 5);
const router = Router();

const statusCode = 301;
const baseURL = 'https://app.nitr.one/';
const notFoundURL = 'https://app.nitr.one/404';

const allowedKeyRegex = new RegExp('^[0-9a-zA-Z]+$');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET,HEAD,POST,OPTIONS',
  'Access-Control-Max-Age': '86400',
};

addEventListener('fetch', event => {
  event.respondWith(router.handle(event.request));
});
router.get('/userInfo', async request => {
  const jwt = request.headers.get('Authorization').split(' ')[1];
  const issuer = 'https://nitrone.eu.auth0.com/'; // Auth0 origin.
  const audience = 'https://nitrone.eu.auth0.com/api/v2/'; // Auth0 client id.
  try {
    const result = await parseJwt(jwt, issuer, audience);
    if (!result.valid) {
      return new Response(
        JSON.stringify({
          message: `Authorization Failed.`,
        }),
        {
          status: 400,
          headers: {
            'content-type': 'application/json',
            ...corsHeaders,
            Allow: 'POST',
          },
        },
      );
    }
    const sub = result.payload.sub;
    const user = await USER.get(sub);
    const prefix = await PREFIX.get(user.prefix);

    const responsePayload = {
      prefix,
      user,
    };

    return new Response(
      JSON.stringify({
        ...responsePayload,
        message: `Success.`,
      }),
      {
        status: 200,
        headers: {
          'content-type': 'application/json',
          ...corsHeaders,
        },
      },
    );
  } catch (err) {
    console.log(err);
    return new Response(
      JSON.stringify({
        message: `Error: Invalid Request and/or URL.`,
      }),
      {
        status: 400,
        headers: {
          'content-type': 'application/json',
          ...corsHeaders,
          Allow: 'POST',
        },
      },
    );
  }
});
router.get('/:key', async ({ params }) => {
  const { key } = params;
  if (key.length === 0) {
    return Response.redirect(baseURL, 302);
  }
  const value = await QUANTUM.get(key);

  if (value === null) {
    return Response.redirect(notFoundURL, 302);
  }

  const responseURL = new URL(value).toString().trim();

  return Response.redirect(responseURL, statusCode);
});

// router.post('/existsv2', async request => {
//   try {
//     const body = await request.json();
//     const { key, prefix } = body;
//     if (!allowedKeyRegex.test(key)) {
//       return new Response(
//         JSON.stringify({
//           availibility: false,
//           key: key,
//           message: 'Invalid Key, only alphanumeric allowed',
//         }),
//         {
//           status: 400,
//           headers: {
//             'content-type': 'application/json',
//             ...corsHeaders,
//           },
//         },
//       );
//     }
//     const keyToCheck = prefix ? `${prefix}+${key}` : key;

//     const value = await QUANTUM.get(keyToCheck);
//     if (value != null) {
//       return new Response(
//         JSON.stringify({
//           availibility: false,
//           key: keyToCheck,
//           message: 'Short URL unavailable',
//         }),
//         {
//           status: 400,
//           headers: {
//             'content-type': 'application/json',
//             ...corsHeaders,
//           },
//         },
//       );
//     }
//     return new Response(
//       JSON.stringify({
//         availibility: true,
//         key: keyToCheck,
//         message: `Short URL available for ${key}`,
//       }),
//       {
//         status: 200,
//         headers: { 'content-type': 'application/json', ...corsHeaders },
//       },
//     );
//   } catch (err) {
//     return new Response(
//       JSON.stringify({
//         message: `Error: Invalid Request and/or URL.`,
//       }),
//       {
//         status: 400,
//         headers: {
//           'content-type': 'application/json',
//           ...corsHeaders,
//           Allow: 'POST',
//         },
//       },
//     );
//   }
// });

// router.post('/', async request => {
//   try {
//     const { url, customKey } = await request.json();
//     const defaultkey = nanoid().toLowerCase();

//     const key = customKey ? customKey.toLowerCase() : defaultkey;

//     const value = await QUANTUM.get(key);
//     if (value != null) {
//       return new Response(
//         JSON.stringify({
//           availibility: false,
//           key: key,
//           message: 'Invalid Key, already in use',
//         }),
//         {
//           status: 400,
//           headers: {
//             'content-type': 'application/json',
//             ...corsHeaders,
//             Allow: 'POST',
//           },
//         },
//       );
//     }

//     const formattedURL = new URL(url.toString().trim()).href;
//     await QUANTUM.put(key, formattedURL);
//     return new Response(
//       JSON.stringify({
//         message: `Successly added ${key} to route to ${formattedURL}`,
//         key: key,
//       }),
//       {
//         status: 201,
//         headers: { 'content-type': 'application/json', ...corsHeaders },
//       },
//     );
//   } catch (err) {
//     console.log(err);
//     return new Response(
//       JSON.stringify({
//         message: `Error: Invalid Request and/or URL.`,
//       }),
//       {
//         status: 400,
//         headers: {
//           'content-type': 'application/json',
//           ...corsHeaders,
//           Allow: 'POST',
//         },
//       },
//     );
//   }
// });

// router.post('/withPrefix', async request => {
//   try {
//     const { url, customKey, prefix } = await request.json();

//     if (!prefix) {
//       return new Response(
//         JSON.stringify({
//           message: 'Invalid prefix',
//         }),
//         {
//           status: 400,
//           headers: {
//             'content-type': 'application/json',
//             ...corsHeaders,
//             Allow: 'POST',
//           },
//         },
//       );
//     }

//     const defaultkey = nanoid().toLowerCase();
//     const keyWithoutPrefix = customKey ? customKey.toLowerCase() : defaultkey;
//     const key = `${prefix}+${keyWithoutPrefix}`;

//     const value = await QUANTUM.get(key);
//     if (value != null) {
//       return new Response(
//         JSON.stringify({
//           availibility: false,
//           key: key,
//           message: 'Invalid Key, already in use',
//         }),
//         {
//           status: 400,
//           headers: {
//             'content-type': 'application/json',
//             ...corsHeaders,
//             Allow: 'POST',
//           },
//         },
//       );
//     }

//     const formattedURL = new URL(url.toString().trim()).href;
//     await QUANTUM.put(key, formattedURL);
//     return new Response(
//       JSON.stringify({
//         message: `Successly added ${key} to route to ${formattedURL}`,
//         key: keyWithoutPrefix,
//         prefix,
//       }),
//       {
//         status: 201,
//         headers: { 'content-type': 'application/json', ...corsHeaders },
//       },
//     );
//   } catch (err) {
//     console.log(err);
//     return new Response(
//       JSON.stringify({
//         message: `Error: Invalid Request and/or URL.`,
//       }),
//       {
//         status: 400,
//         headers: {
//           'content-type': 'application/json',
//           ...corsHeaders,
//           Allow: 'POST',
//         },
//       },
//     );
//   }
// });

// router.post('/applyForPrefix', async request => {
//   const jwt = request.headers.get('Authorization').split(' ')[1];
//   const issuer = 'https://nitrone.eu.auth0.com/'; // Auth0 origin.
//   const audience = 'https://nitrone.eu.auth0.com/api/v2/'; // Auth0 client id.
//   try {
//     const result = await parseJwt(jwt, issuer, audience);
//     if (!result.valid) {
//       return new Response(
//         JSON.stringify({
//           message: `Authorization Failed.`,
//         }),
//         {
//           status: 400,
//           headers: {
//             'content-type': 'application/json',
//             ...corsHeaders,
//             Allow: 'POST',
//           },
//         },
//       );
//     }

//     const { prefix, url, justification } = await request.json();
//     const formattedURL = new URL(url.toString().trim()).href;

//     const user = result.payload.sub;
//     const userPayload = {
//       sub: user,
//       prefix,
//     };

//     const prefixPayload = {
//       prefix,
//       user,
//       url: formattedURL,
//       justification,
//     };

//     const value = await PREFIX.get(prefix);
//     if (value != null) {
//       return new Response(
//         JSON.stringify({
//           message: 'Invalid Prefix, already in use or requested',
//         }),
//         {
//           status: 400,
//           headers: {
//             'content-type': 'application/json',
//             ...corsHeaders,
//             Allow: 'POST',
//           },
//         },
//       );
//     }
//     await PREFIX.put(prefix, JSON.stringify(prefixPayload));
//     await USER.put(user, JSON.stringify(userPayload));

//     return new Response(
//       JSON.stringify({
//         prefix,
//         message: `Success.`,
//       }),
//       {
//         status: 201,
//         headers: {
//           'content-type': 'application/json',
//           ...corsHeaders,
//         },
//       },
//     );
//   } catch (err) {
//     console.log(err);
//     return new Response(
//       JSON.stringify({
//         message: `Error: Invalid Request and/or URL.`,
//       }),
//       {
//         status: 400,
//         headers: {
//           'content-type': 'application/json',
//           ...corsHeaders,
//           Allow: 'POST',
//         },
//       },
//     );
//   }
// });

// router.post('/userInfo', async request => {
//   const jwt = request.headers.get('Authorization').split(' ')[1];
//   const issuer = 'https://nitrone.eu.auth0.com/'; // Auth0 origin.
//   const audience = 'https://nitrone.eu.auth0.com/api/v2/'; // Auth0 client id.
//   try {
//     const result = await parseJwt(jwt, issuer, audience);
//     if (!result.valid) {
//       return new Response(
//         JSON.stringify({
//           message: `Authorization Failed.`,
//         }),
//         {
//           status: 400,
//           headers: {
//             'content-type': 'application/json',
//             ...corsHeaders,
//             Allow: 'POST',
//           },
//         },
//       );
//     }
//     const sub = result.payload.sub;
//     const user = await USER.get(sub, { type: 'json' });
//     const prefix = await PREFIX.get(user.prefix, { type: 'json' });

//     const responsePayload = {
//       prefix,
//       user,
//     };

//     return new Response(
//       JSON.stringify({
//         ...responsePayload,
//         message: `Success.`,
//       }),
//       {
//         status: 200,
//         headers: {
//           'content-type': 'application/json',
//           ...corsHeaders,
//         },
//       },
//     );
//   } catch (err) {
//     console.log(err);
//     return new Response(
//       JSON.stringify({
//         message: `Error: Invalid Request and/or URL.`,
//       }),
//       {
//         status: 400,
//         headers: {
//           'content-type': 'application/json',
//           ...corsHeaders,
//           Allow: 'POST',
//         },
//       },
//     );
//   }
// });

router.options('*', request => {
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
});
router.get('/', () => Response.redirect(baseURL, 302));
router.all('*', () => Response.redirect(notFoundURL, 302));
