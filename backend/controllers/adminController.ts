import { getPendingTeachers, getAllUsers, updateUserStatus } from "../database/db";

export class AdminController {
  static async getPendingTeachers() {
    const pending = getPendingTeachers();
    const allUsers = getAllUsers();
    const activeTeachers = allUsers.filter((u) => u.role === "teacher" && u.status === "active");

    return {
      status: 200,
      success: true,
      pendingTeachers: pending.map((u) => ({
        id: u.id,
        name: u.name,
        email: u.email,
        subject: u.subject || "General Science",
        qualification: u.qualification || "Faculty Candidate",
        phone: u.phone || "+91 98860 00000",
        createdAt: u.createdAt,
        status: u.status,
      })),
      activeTeachersCount: activeTeachers.length,
    };
  }

  static async approveTeacher(userId: string, action: "approve" | "reject") {
    if (!userId || !action || !["approve", "reject"].includes(action)) {
      return { status: 400, error: "Invalid parameters. Specify userId and action ('approve' or 'reject')." };
    }

    const newStatus = action === "approve" ? "active" : "rejected";
    const updatedUser = updateUserStatus(userId, newStatus);

    if (!updatedUser) {
      return { status: 404, error: "Teacher user not found." };
    }

    return {
      status: 200,
      success: true,
      message:
        action === "approve"
          ? `Granted permission! Teacher ${updatedUser.name} can now sign in.`
          : `Registration request for ${updatedUser.name} rejected.`,
      user: {
        id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
        status: updatedUser.status,
      },
    };
  }
}
