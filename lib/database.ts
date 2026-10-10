import fs from "fs";
import path from "path";
import crypto from "crypto";

export type Role = "student" | "teacher" | "admin";
export type UserStatus = "active" | "pending" | "rejected";

export interface DbUser {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  role: Role;
  status: UserStatus;
  createdAt: string;
  phone?: string;
  grade?: string;
  subject?: string;
  qualification?: string;
  avatar?: string;
}

export interface DbSchema {
  users: DbUser[];
}

const DB_DIR = path.join(process.cwd(), "data");
const DB_FILE = path.join(DB_DIR, "ttc_db.json");

const SALT = "TTC_SECURE_SALT_2026_V1";

export function hashPassword(password: string): string {
  return crypto.createHash("sha256").update(password + SALT).digest("hex");
}

// Initial seed database with Default Admin & Initial Verified Users
const INITIAL_DB: DbSchema = {
  users: [
    {
      id: "usr-admin-01",
      name: "Center Administrator",
      email: "admin@talent.org",
      passwordHash: hashPassword("admin123"),
      role: "admin",
      status: "active",
      createdAt: new Date().toISOString(),
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=120&q=80",
    },
    {
      id: "usr-std-101",
      name: "Aarav Sharma",
      email: "aarav.sharma@gmail.com",
      passwordHash: hashPassword("student123"),
      role: "student",
      status: "active",
      grade: "Class 10",
      phone: "+91 98860 11223",
      createdAt: new Date().toISOString(),
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80",
    },
    {
      id: "usr-tch-01",
      name: "Ms. Ananya Rao",
      email: "ananya.rao@gmail.com",
      passwordHash: hashPassword("teacher123"),
      role: "teacher",
      status: "active", // Pre-approved lead teacher
      subject: "Science & Physics",
      qualification: "M.Sc. Physics (Gold Medalist)",
      phone: "+91 98450 33445",
      createdAt: new Date().toISOString(),
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&q=80",
    },
  ],
};

function ensureDb(): DbSchema {
  try {
    if (!fs.existsSync(DB_DIR)) {
      fs.mkdirSync(DB_DIR, { recursive: true });
    }
    if (!fs.existsSync(DB_FILE)) {
      fs.writeFileSync(DB_FILE, JSON.stringify(INITIAL_DB, null, 2), "utf-8");
      return INITIAL_DB;
    }
    const raw = fs.readFileSync(DB_FILE, "utf-8");
    const parsed = JSON.parse(raw);
    if (!parsed || !Array.isArray(parsed.users)) {
      fs.writeFileSync(DB_FILE, JSON.stringify(INITIAL_DB, null, 2), "utf-8");
      return INITIAL_DB;
    }
    return parsed;
  } catch (e) {
    console.error("Database initialization error:", e);
    return INITIAL_DB;
  }
}

export function saveDb(data: DbSchema): void {
  try {
    if (!fs.existsSync(DB_DIR)) {
      fs.mkdirSync(DB_DIR, { recursive: true });
    }
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), "utf-8");
  } catch (e) {
    console.error("Failed to write to database:", e);
  }
}

export function findUserByEmail(email: string): DbUser | null {
  const db = ensureDb();
  const cleanEmail = email.trim().toLowerCase();
  return db.users.find((u) => u.email.toLowerCase() === cleanEmail) || null;
}

export function findUserById(id: string): DbUser | null {
  const db = ensureDb();
  return db.users.find((u) => u.id === id) || null;
}

export function createUser(userData: {
  name: string;
  email: string;
  passwordHash: string;
  role: Role;
  status: UserStatus;
  phone?: string;
  grade?: string;
  subject?: string;
  qualification?: string;
  avatar?: string;
}): DbUser {
  const db = ensureDb();
  const newUser: DbUser = {
    ...userData,
    id: `usr-${userData.role.substring(0, 3)}-${Date.now()}`,
    email: userData.email.trim().toLowerCase(),
    createdAt: new Date().toISOString(),
    avatar: userData.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(userData.name)}`,
  };

  db.users.push(newUser);
  saveDb(db);
  return newUser;
}

export function updateUserStatus(userId: string, newStatus: UserStatus): DbUser | null {
  const db = ensureDb();
  const index = db.users.findIndex((u) => u.id === userId);
  if (index === -1) return null;

  db.users[index].status = newStatus;
  saveDb(db);
  return db.users[index];
}

export function getPendingTeachers(): DbUser[] {
  const db = ensureDb();
  return db.users.filter((u) => u.role === "teacher" && u.status === "pending");
}

export function getAllUsers(): DbUser[] {
  const db = ensureDb();
  return db.users;
}
