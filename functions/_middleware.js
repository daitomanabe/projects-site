export async function onRequest(context) {
  // Get credentials from environment variables
  // If not set, default to admin:password (CHANGE THIS IN PRODUCTION)
  const user = context.env.BASIC_USER || "admin";
  const pass = context.env.BASIC_PASS || "password";

  const credentials = btoa(`${user}:${pass}`);
  const authHeader = context.request.headers.get("Authorization");

  if (!authHeader || authHeader !== `Basic ${credentials}`) {
    return new Response("Unauthorized", {
      status: 401,
      headers: {
        "WWW-Authenticate": 'Basic realm="Restricted Access"',
      },
    });
  }

  return context.next();
}
