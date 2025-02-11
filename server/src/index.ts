import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { nanoid } from 'nanoid' // npm install nanoid

// Define your Cloudflare KV namespace binding
type Bindings = {
  dev: KVNamespace
}

const app = new Hono<{ Bindings: Bindings }>()

// Enable CORS (optional, but recommended if you're making requests from different origins)
app.use('*', cors({
  origin: '*', // Adjust this to your needs.  e.g., ['https://your-domain.com']
  allowMethods: ['GET', 'POST'],
  allowHeaders: ['Content-Type'],
}))

// Define a regular expression for basic URL validation
const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;

// Helper function to generate a short ID
const generateShortId = async (): Promise<string> => {
  let id: string
  let exists: boolean

  do {
    id = nanoid(6) 
    exists = await c.env.dev.get(id) !== null;
  } while (exists);

  return id;
};

// POST /shorten - Creates a short URL
app.post('/shorten', async (c) => {
  const { url, slug } = await c.req.json<{ url: string, slug?: string }>()

  if (!url) {
    return c.json({ error: 'URL is required' }, 400)
  }

  if (!urlRegex.test(url)) {
    return c.json({ error: 'Invalid URL format' }, 400)
  }

  let shortId: string;
  if (slug) {
    // Check if custom slug already exists
    const existingURL = await c.env.dev.get(slug);
    if (existingURL) {
      return c.json({ error: 'Custom slug already exists' }, 409); // 409 Conflict
    }
    shortId = slug
  } else {
    shortId = await generateShortId();
  }


  try {
    await c.env.dev.put(shortId, url);
    const shortUrl = `${c.req.url.origin}/${shortId}`; // Construct the full short URL
    return c.json({ shortUrl: shortUrl }, 201) // 201 Created
  } catch (error) {
    console.error("Error storing URL:", error);
    return c.json({ error: 'Failed to shorten URL' }, 500) // 500 Internal Server Error
  }
})

// GET /{shortId} - Redirects to the original URL
app.get('/:shortId', async (c) => {
  const shortId = c.req.param('shortId')

  if (!shortId) {
    return c.json({ error: 'Short ID is required' }, 400)
  }

  const originalUrl = await c.env.dev.get(shortId)

  if (!originalUrl) {
    return c.json({ error: 'Short URL not found' }, 404)
  }

  return c.redirect(originalUrl, 301)
})

// GET / - (Optional)  Show some basic information, or API usage instructions.
app.get('/', async (c) => {
  return c.text(
    `URL Shortener API using Cloudflare Workers and Hono.js.

    Usage:
    - POST /shorten (JSON: { "url": "your-long-url", "slug": "optional-custom-slug" })  -> Returns { "shortUrl": "your-short-url" }
    - GET /{shortId} -> Redirects to the original URL
    `,
    200
  )
})


export default app