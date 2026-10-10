import { NextRequest, NextResponse } from "next/server";
import { AdminController } from "@/backend/controllers/adminController";

export async function GET(req: NextRequest) {
  try {
    const result = await AdminController.getPendingTeachers();
    return NextResponse.json(result, { status: result.status });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || "Failed to fetch pending teachers." },
      { status: 500 }
    );
  }
}
