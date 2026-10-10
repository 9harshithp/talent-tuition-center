import { NextRequest, NextResponse } from "next/server";
import { AdminController } from "@/backend/controllers/adminController";

export async function POST(req: NextRequest) {
  try {
    const { userId, action } = await req.json();
    const result = await AdminController.approveTeacher(userId, action);
    return NextResponse.json(result, { status: result.status });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || "Failed to update teacher approval status." },
      { status: 500 }
    );
  }
}
