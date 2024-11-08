import { neon } from "@neondatabase/serverless";
export async function POST(request: Request) {
  const databaseUrl = process.env.DATABASE_URL;

  // Check if DATABASE_URL is defined
  if (!databaseUrl) {
    return Response.json(
      { error: "DATABASE_URL environment variable is not defined." },
      { status: 500 }
    );
  }

  const sql = neon(databaseUrl);
  try {
    const { name, email, clerkId } = await request.json();
    if (!name || !email || !clerkId) {
      return Response.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }
    const response = await sql`
INSERT INTO users (name, email, clerk_id) VALUES (${name}, ${email}, ${clerkId})`;
    return new Response(JSON.stringify({ data: response }), { status: 201 });
  } catch (error) {
    console.error(error);
    return Response.json(
      { error: error },
      {
        status: 500,
      }
    );
  }
}
