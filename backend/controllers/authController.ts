import { findUserByEmail, createUser, hashPassword, Role, UserStatus } from "../database/db";

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  role: Role;
  grade?: string;
  subject?: string;
  qualification?: string;
  phone?: string;
  adminSecret?: string;
}

export interface LoginPayload {
  email: string;
  password: string;
  role?: Role;
}

export class AuthController {
  static async register(payload: RegisterPayload) {
    const { name, email, password, role, grade, subject, qualification, phone, adminSecret } = payload;

    if (!name || !name.trim() || !email || !email.trim() || !password) {
      return { status: 400, error: "Please fill in all required fields (Name, Email, Password)." };
    }

    if (password.length < 6) {
      return { status: 400, error: "Password must be at least 6 characters long." };
    }

    const cleanEmail = email.trim().toLowerCase();
    const existingUser = findUserByEmail(cleanEmail);

    if (existingUser) {
      return { status: 400, error: "An account with this email address already exists. Please Sign In instead." };
    }

    let status: UserStatus = "active";
    let message = "Registration successful! You can now sign in to your portal.";

    if (role === "admin") {
      const validAdminPasscode = process.env.ADMIN_SECRET_KEY || "TTC-ADMIN-2026";
      if (!adminSecret || adminSecret.trim() !== validAdminPasscode) {
        return { status: 403, error: "Invalid Admin Security Passcode. Authorization key is required for Admin sign up." };
      }
      status = "active";
      message = "Admin account created successfully! You can now sign in with full administrative privileges.";
    } else if (role === "teacher") {
      status = "pending";
      message = "Your teacher registration has been submitted! An Admin must review and grant permission before you can log in.";
    } else {
      status = "active";
      message = "Student account created successfully! Welcome to Talent Tuition Center.";
    }

    const passwordHash = hashPassword(password);

    const newUser = createUser({
      name: name.trim(),
      email: cleanEmail,
      passwordHash,
      role: role as Role,
      status,
      grade: grade || "Class 10",
      subject: subject || "Science & Mathematics",
      qualification: qualification || "Faculty Member",
      phone: phone || "",
    });

    return {
      status: 200,
      success: true,
      message,
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        status: newUser.status,
      },
    };
  }

  static async login(payload: LoginPayload) {
    const { email, password, role } = payload;

    if (!email || !email.trim() || !password) {
      return { status: 400, error: "Please enter your Email Address and Password." };
    }

    const cleanEmail = email.trim().toLowerCase();
    const user = findUserByEmail(cleanEmail);

    if (!user) {
      return { status: 401, error: "No account found with this email address. Please check your email or Sign Up." };
    }

    if (role && user.role !== role) {
      return { status: 400, error: `This account is registered as a ${user.role.toUpperCase()}. Please select the ${user.role} role tab.` };
    }

    const inputHash = hashPassword(password);
    if (inputHash !== user.passwordHash) {
      return { status: 401, error: "Incorrect password. Please try again." };
    }

    if (user.role === "teacher" && user.status === "pending") {
      return {
        status: 403,
        error: "Account Pending Approval: Your teacher registration has been submitted and is awaiting Admin authorization. Please contact center administration to grant access.",
        isPending: true,
      };
    }

    if (user.status === "rejected") {
      return { status: 403, error: "Access Denied: Your registration request was not approved by administration." };
    }

    const now = Date.now();
    const session = {
      role: user.role,
      name: user.name,
      email: user.email,
      studentId: user.role === "student" ? "std-101" : undefined,
      teacherId: user.role === "teacher" ? "tch-01" : undefined,
      provider: "credentials",
      avatar: user.avatar,
      authTime: now,
      expiresAt: now + 24 * 60 * 60 * 1000,
    };

    return {
      status: 200,
      success: true,
      message: `Welcome back, ${user.name}!`,
      session,
    };
  }
}
