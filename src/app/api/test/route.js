// app/api/test/route.ts
export async function GET() {
    return Response.json({
      message: "API is working!",
      timestamp: new Date().toISOString(),
      route: "/api/test"
    })
  }