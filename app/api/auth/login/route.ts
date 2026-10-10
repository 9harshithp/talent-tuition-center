import { NextRequest, NextResponse } from "next/server";
import { AuthController } from "@/backend/controllers/authController";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const result = await AuthController.login(body);
    return NextResponse.json(result, { status: result.status });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || "Authentication failed." },
      { status: 500 }
    );
  }
}
