"use client";

// =============================================================
// TALENT TUITION CENTER - COMPREHENSIVE DATA & PERSISTENCE ENGINE
// =============================================================

export type Role = "student" | "teacher" | "admin";

export interface UserSession {
  role: Role;
  name: string;
  email: string;
  studentId?: string;
  teacherId?: string;
  provider?: "credentials" | "google";
  avatar?: string;
  googleId?: string;
  authTime?: number;
  expiresAt?: number;
}

// 1. STUDENTS
export interface StudentRecord {
  id: string;
  roll: string;
  name: string;
  class: string;
  phone: string;
  email: string;
  parentName: string;
  parentPhone: string;
  joinedDate: string;
  feeAmount: number;
  feeStatus: "Paid" | "Pending" | "Partial";
  pendingAmount: number;
}

// 2. TEACHERS
export interface TeacherRecord {
  id: string;
  name: string;
  subject: string;
  assignedClasses: string[];
  phone: string;
  email: string;
  qualification: string;
  joinedDate: string;
}

// 3. CLASSES & SCHEDULES
export interface ClassSchedule {
  id: string;
  subject: string;
  time: string;
  room: string;
  instructor: string;
  tag: string;
  classGrade: string;
  color: string;
  dayOfWeek: string;
}

// 4. ATTENDANCE
export interface AttendanceEntry {
  studentId: string;
  studentName: string;
  classGrade: string;
  status: "Present" | "Absent" | "Late";
  remarks?: string;
}

export interface DailyAttendanceRecord {
  date: string; // YYYY-MM-DD
  records: AttendanceEntry[];
}

// 5. TEST RESULTS
export interface StudentScore {
  studentId: string;
  studentName: string;
  marks: number;
  maxMarks: number;
  remarks?: string;
}

export interface TestRecord {
  id: string;
  title: string;
  subject: string;
  classGrade: string;
  date: string;
  maxMarks: number;
  scores: StudentScore[];
}

// 6. FEES
export interface FeePayment {
  id: string;
  studentId: string;
  studentName: string;
  classGrade: string;
  month: string;
  amount: number;
  dueDate: string;
  status: "Paid" | "Pending";
  paidDate?: string;
  receiptNumber?: string;
  paymentMethod?: string;
}

// 7. DOUBTS
export interface DoubtRecord {
  id: string;
  studentId: string;
  studentName: string;
  subject: string;
  question: string;
  status: "Pending" | "Resolved";
  response?: string;
  teacherName?: string;
  resolvedAt?: string;
  createdAt: string;
  attachmentName?: string;
  attachmentUrl?: string; // base64 or object url
  attachmentSize?: string;
}

export const AVAILABLE_CLASSES = ["Class 8", "Class 9", "Class 10"] as const;
export type AvailableClass = (typeof AVAILABLE_CLASSES)[number];

// =============================================================
// DEFAULT SEED DATA
// =============================================================

export const DEFAULT_STUDENTS: StudentRecord[] = [
  {
    id: "std-101",
    roll: "TTC-101",
    name: "Aarav Sharma",
    class: "Class 10",
    phone: "+91 98860 11223",
    email: "student@talent.demo",
    parentName: "Rajesh Sharma",
    parentPhone: "+91 98860 99887",
    joinedDate: "2024-06-01",
    feeAmount: 2000,
    feeStatus: "Paid",
    pendingAmount: 0,
  },
  {
    id: "std-102",
    roll: "TTC-102",
    name: "Diya Patel",
    class: "Class 10",
    phone: "+91 98765 22334",
    email: "diya@talent.demo",
    parentName: "Suresh Patel",
    parentPhone: "+91 98765 88776",
    joinedDate: "2024-06-01",
    feeAmount: 2000,
    feeStatus: "Paid",
    pendingAmount: 0,
  },
  {
    id: "std-103",
    roll: "TTC-103",
    name: "Riya Kapoor",
    class: "Class 10",
    phone: "+91 98450 33445",
    email: "riya@talent.demo",
    parentName: "Manish Kapoor",
    parentPhone: "+91 98450 77665",
    joinedDate: "2024-06-15",
    feeAmount: 2000,
    feeStatus: "Pending",
    pendingAmount: 2000,
  },
  {
    id: "std-104",
    roll: "TTC-104",
    name: "Kabir Mehta",
    class: "Class 9",
    phone: "+91 97412 88990",
    email: "kabir@talent.demo",
    parentName: "Vikram Mehta",
    parentPhone: "+91 97412 55443",
    joinedDate: "2024-07-01",
    feeAmount: 1500,
    feeStatus: "Pending",
    pendingAmount: 1500,
  },
  {
    id: "std-105",
    roll: "TTC-105",
    name: "Vihaan Rao",
    class: "Class 9",
    phone: "+91 99001 44556",
    email: "vihaan@talent.demo",
    parentName: "Raghavendra Rao",
    parentPhone: "+91 99001 11223",
    joinedDate: "2024-06-10",
    feeAmount: 1500,
    feeStatus: "Paid",
    pendingAmount: 0,
  },
  {
    id: "std-106",
    roll: "TTC-106",
    name: "Anika Shah",
    class: "Class 8",
    phone: "+91 98800 66778",
    email: "anika@talent.demo",
    parentName: "Deepak Shah",
    parentPhone: "+91 98800 33221",
    joinedDate: "2024-06-20",
    feeAmount: 1500,
    feeStatus: "Paid",
    pendingAmount: 0,
  },
  {
    id: "std-107",
    roll: "TTC-107",
    name: "Tanvi Kulkarni",
    class: "Class 8",
    phone: "+91 98800 11998",
    email: "tanvi@talent.demo",
    parentName: "Mahesh Kulkarni",
    parentPhone: "+91 98800 22334",
    joinedDate: "2024-07-15",
    feeAmount: 1500,
    feeStatus: "Paid",
    pendingAmount: 0,
  },
];

export const DEFAULT_TEACHERS: TeacherRecord[] = [
  {
    id: "tch-01",
    name: "Ms. Ananya Rao",
    subject: "Science & Physics",
    assignedClasses: ["Class 10", "Class 9", "Class 8"],
    phone: "+91 98450 11001",
    email: "teacher@talent.demo",
    qualification: "M.Sc. Physics, B.Ed (10+ Yrs Exp)",
    joinedDate: "2020-04-01",
  },
  {
    id: "tch-02",
    name: "Mr. Rohan Sharma",
    subject: "Mathematics",
    assignedClasses: ["Class 10", "Class 9", "Class 8"],
    phone: "+91 98860 22002",
    email: "rohan@talent.demo",
    qualification: "M.Sc. Mathematics (8 Yrs Exp)",
    joinedDate: "2021-06-01",
  },
  {
    id: "tch-03",
    name: "Mrs. Priya Deshmukh",
    subject: "English & Grammar",
    assignedClasses: ["Class 9", "Class 8"],
    phone: "+91 97412 33003",
    email: "priya@talent.demo",
    qualification: "M.A. English Literature (6 Yrs Exp)",
    joinedDate: "2022-01-15",
  },
  {
    id: "tch-04",
    name: "Mr. Anand Kumar",
    subject: "Social Studies",
    assignedClasses: ["Class 10", "Class 8"],
    phone: "+91 99001 44004",
    email: "anand@talent.demo",
    qualification: "M.A. History, B.Ed (9 Yrs Exp)",
    joinedDate: "2021-08-01",
  },
];

export const DEFAULT_CLASSES: ClassSchedule[] = [
  {
    id: "cls-1",
    subject: "Mathematics",
    time: "4:00 PM – 5:00 PM",
    room: "Room 101 (Main Wing)",
    instructor: "Mr. Rohan Sharma",
    tag: "Board Exam Revision",
    classGrade: "Class 10",
    color: "amber",
    dayOfWeek: "Today",
  },
  {
    id: "cls-2",
    subject: "Science & Physics",
    time: "5:15 PM – 6:15 PM",
    room: "Science Lab B",
    instructor: "Ms. Ananya Rao",
    tag: "Optics & Ray Diagrams",
    classGrade: "Class 10",
    color: "blue",
    dayOfWeek: "Today",
  },
  {
    id: "cls-3",
    subject: "English Grammar",
    time: "6:30 PM – 7:30 PM",
    room: "Room 102",
    instructor: "Mrs. Priya Deshmukh",
    tag: "Tenses & Reported Speech",
    classGrade: "Class 9",
    color: "emerald",
    dayOfWeek: "Today",
  },
  {
    id: "cls-4",
    subject: "Social Studies",
    time: "7:45 PM – 8:30 PM",
    room: "Room 103",
    instructor: "Mr. Anand Kumar",
    tag: "Nationalism & History Map",
    classGrade: "Class 10",
    color: "purple",
    dayOfWeek: "Today",
  },
  {
    id: "cls-5",
    subject: "Science & Physics Basics",
    time: "3:30 PM – 4:30 PM",
    room: "Science Lab A",
    instructor: "Ms. Ananya Rao",
    tag: "Junior Science Lab",
    classGrade: "Class 8",
    color: "emerald",
    dayOfWeek: "Today",
  },
  {
    id: "cls-6",
    subject: "Mathematics Foundation",
    time: "4:30 PM – 5:30 PM",
    room: "Room 104",
    instructor: "Mr. Rohan Sharma",
    tag: "Junior Algebra & Geometry",
    classGrade: "Class 8",
    color: "blue",
    dayOfWeek: "Today",
  },
];

export const DEFAULT_TESTS: TestRecord[] = [
  {
    id: "test-01",
    title: "Monthly Assessment: Mathematics (Quadratics & Trig)",
    subject: "Mathematics",
    classGrade: "Class 10",
    date: "2024-09-15",
    maxMarks: 100,
    scores: [
      { studentId: "std-101", studentName: "Aarav Sharma", marks: 94, maxMarks: 100, remarks: "Outstanding algebra proficiency!" },
      { studentId: "std-102", studentName: "Diya Patel", marks: 88, maxMarks: 100, remarks: "Very good proof structure." },
      { studentId: "std-103", studentName: "Riya Kapoor", marks: 74, maxMarks: 100, remarks: "Needs more practice on formula derivations." },
    ],
  },
  {
    id: "test-02",
    title: "Unit Test 1: Physics (Light & Electricity)",
    subject: "Science & Physics",
    classGrade: "Class 10",
    date: "2024-09-20",
    maxMarks: 50,
    scores: [
      { studentId: "std-101", studentName: "Aarav Sharma", marks: 47, maxMarks: 50, remarks: "Excellent ray diagrams and circuit analysis." },
      { studentId: "std-102", studentName: "Diya Patel", marks: 44, maxMarks: 50, remarks: "Neat ray diagrams." },
      { studentId: "std-103", studentName: "Riya Kapoor", marks: 36, maxMarks: 50, remarks: "Review Ohm's law numericals." },
    ],
  },
  {
    id: "test-03",
    title: "Weekly Quiz: Science (Acids, Bases & Salts)",
    subject: "Science",
    classGrade: "Class 9",
    date: "2024-09-22",
    maxMarks: 25,
    scores: [
      { studentId: "std-104", studentName: "Kabir Mehta", marks: 21, maxMarks: 25, remarks: "Good conceptual clarity." },
      { studentId: "std-105", studentName: "Vihaan Rao", marks: 24, maxMarks: 25, remarks: "Near perfect balance on equations." },
    ],
  },
  {
    id: "test-04",
    title: "Foundation Quiz: Science & Mathematics Basics",
    subject: "Science",
    classGrade: "Class 8",
    date: "2024-09-25",
    maxMarks: 50,
    scores: [
      { studentId: "std-106", studentName: "Anika Shah", marks: 46, maxMarks: 50, remarks: "Outstanding conceptual grasp!" },
      { studentId: "std-107", studentName: "Tanvi Kulkarni", marks: 43, maxMarks: 50, remarks: "Good analytical accuracy." },
    ],
  },
];

// =============================================================
// AUTO-INCREMENTING DATE & RECEIPT NUMBER GENERATORS
// =============================================================

export function getAutoDate(daysAgo: number = 0): string {
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function getCurrentFeeMonth(): string {
  const d = new Date();
  return d.toLocaleDateString("en-US", { month: "long", year: "numeric" });
}

export function generateAutoReceiptNumber(sequence: number): string {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  return `TTC-REC-${y}-${m}-${String(sequence).padStart(3, "0")}`;
}

export const createDefaultFees = (): FeePayment[] => {
  const currentMonth = getCurrentFeeMonth();
  const y = new Date().getFullYear();
  const m = String(new Date().getMonth() + 1).padStart(2, "0");
  const due10 = `${y}-${m}-10`;
  const due15 = `${y}-${m}-15`;

  return [
    {
      id: "fee-01",
      studentId: "std-101",
      studentName: "Aarav Sharma",
      classGrade: "Class 10",
      month: currentMonth,
      amount: 2000,
      dueDate: due10,
      status: "Paid",
      paidDate: getAutoDate(3),
      receiptNumber: generateAutoReceiptNumber(101),
      paymentMethod: "UPI / Online",
    },
    {
      id: "fee-02",
      studentId: "std-102",
      studentName: "Diya Patel",
      classGrade: "Class 10",
      month: currentMonth,
      amount: 2000,
      dueDate: due10,
      status: "Paid",
      paidDate: getAutoDate(2),
      receiptNumber: generateAutoReceiptNumber(102),
      paymentMethod: "Cash / Desk",
    },
    {
      id: "fee-03",
      studentId: "std-103",
      studentName: "Riya Kapoor",
      classGrade: "Class 10",
      month: currentMonth,
      amount: 2000,
      dueDate: due10,
      status: "Pending",
    },
    {
      id: "fee-04",
      studentId: "std-104",
      studentName: "Kabir Mehta",
      classGrade: "Class 9",
      month: currentMonth,
      amount: 1500,
      dueDate: due15,
      status: "Pending",
    },
    {
      id: "fee-05",
      studentId: "std-105",
      studentName: "Vihaan Rao",
      classGrade: "Class 9",
      month: currentMonth,
      amount: 1500,
      dueDate: due15,
      status: "Paid",
      paidDate: getAutoDate(1),
      receiptNumber: generateAutoReceiptNumber(105),
      paymentMethod: "UPI / Online",
    },
    {
      id: "fee-06",
      studentId: "std-106",
      studentName: "Anika Shah",
      classGrade: "Class 8",
      month: currentMonth,
      amount: 1500,
      dueDate: due15,
      status: "Paid",
      paidDate: getAutoDate(4),
      receiptNumber: generateAutoReceiptNumber(106),
      paymentMethod: "UPI / Online",
    },
    {
      id: "fee-07",
      studentId: "std-107",
      studentName: "Tanvi Kulkarni",
      classGrade: "Class 8",
      month: currentMonth,
      amount: 1500,
      dueDate: due15,
      status: "Paid",
      paidDate: getAutoDate(0),
      receiptNumber: generateAutoReceiptNumber(107),
      paymentMethod: "Cash / Desk",
    },
  ];
};

export const DEFAULT_FEES: FeePayment[] = createDefaultFees();

export const DEFAULT_ATTENDANCE: DailyAttendanceRecord[] = [
  {
    date: new Date().toISOString().split("T")[0],
    records: [
      { studentId: "std-101", studentName: "Aarav Sharma", classGrade: "Class 10", status: "Present" },
      { studentId: "std-102", studentName: "Diya Patel", classGrade: "Class 10", status: "Present" },
      { studentId: "std-103", studentName: "Riya Kapoor", classGrade: "Class 10", status: "Present" },
      { studentId: "std-104", studentName: "Kabir Mehta", classGrade: "Class 9", status: "Present" },
      { studentId: "std-105", studentName: "Vihaan Rao", classGrade: "Class 9", status: "Late" },
      { studentId: "std-106", studentName: "Anika Shah", classGrade: "Class 8", status: "Present" },
      { studentId: "std-107", studentName: "Tanvi Kulkarni", classGrade: "Class 8", status: "Present" },
    ],
  },
];

// =============================================================
// STORAGE HELPER FUNCTIONS (Safe localStorage with auto fallback)
// =============================================================

function normalizeClassString(str: string): string {
  if (!str) return "Class 10";
  if (str.includes("8")) return "Class 8";
  if (str.includes("9")) return "Class 9";
  if (str.includes("10")) return "Class 10";
  return str;
}

function getItem<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(key);
    if (!raw) {
      localStorage.setItem(key, JSON.stringify(fallback));
      return fallback;
    }
    const parsed = JSON.parse(raw);
    // Auto-normalize legacy section suffixes if loading array data
    if (Array.isArray(parsed)) {
      parsed.forEach((item: any) => {
        if (item && typeof item === "object") {
          if (item.class) item.class = normalizeClassString(item.class);
          if (item.classGrade) item.classGrade = normalizeClassString(item.classGrade);
          if (Array.isArray(item.assignedClasses)) {
            item.assignedClasses = item.assignedClasses.map((c: string) => normalizeClassString(c));
          }
        }
      });
    }
    return parsed as T;
  } catch {
    return fallback;
  }
}

function setItem<T>(key: string, data: T): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(key, JSON.stringify(data));
    // Trigger custom window event for instant cross-component updates
    window.dispatchEvent(new Event("ttc_data_updated"));
  } catch (err) {
    console.warn("Storage quota exceeded or error writing data:", err);
  }
}

// ---------------- API ACCESSORS ----------------

export const DataStore = {
  // Students
  getStudents: (): StudentRecord[] => getItem("ttc_students", DEFAULT_STUDENTS),
  saveStudents: (data: StudentRecord[]) => setItem("ttc_students", data),
  addStudent: (s: Omit<StudentRecord, "id" | "roll">): StudentRecord => {
    const list = DataStore.getStudents();
    const nextNum = list.length + 101;
    const newStudent: StudentRecord = {
      ...s,
      id: `std-${nextNum}`,
      roll: `TTC-${nextNum}`,
    };
    const updated = [newStudent, ...list];
    DataStore.saveStudents(updated);
    return newStudent;
  },
  updateStudent: (id: string, updates: Partial<StudentRecord>) => {
    const list = DataStore.getStudents().map((s) => (s.id === id ? { ...s, ...updates } : s));
    DataStore.saveStudents(list);
  },
  deleteStudent: (id: string) => {
    const list = DataStore.getStudents().filter((s) => s.id !== id);
    DataStore.saveStudents(list);
  },

  // Teachers
  getTeachers: (): TeacherRecord[] => getItem("ttc_teachers", DEFAULT_TEACHERS),
  saveTeachers: (data: TeacherRecord[]) => setItem("ttc_teachers", data),
  addTeacher: (t: Omit<TeacherRecord, "id">): TeacherRecord => {
    const list = DataStore.getTeachers();
    const newTeacher: TeacherRecord = {
      ...t,
      id: `tch-${Date.now().toString().slice(-4)}`,
    };
    DataStore.saveTeachers([newTeacher, ...list]);
    return newTeacher;
  },
  updateTeacher: (id: string, updates: Partial<TeacherRecord>) => {
    const list = DataStore.getTeachers().map((t) => (t.id === id ? { ...t, ...updates } : t));
    DataStore.saveTeachers(list);
  },
  deleteTeacher: (id: string) => {
    const list = DataStore.getTeachers().filter((t) => t.id !== id);
    DataStore.saveTeachers(list);
  },

  // Classes & Schedule
  getClasses: (): ClassSchedule[] => getItem("ttc_classes", DEFAULT_CLASSES),
  saveClasses: (data: ClassSchedule[]) => setItem("ttc_classes", data),
  addClass: (cls: Omit<ClassSchedule, "id">): ClassSchedule => {
    const list = DataStore.getClasses();
    const newClass: ClassSchedule = {
      ...cls,
      id: `cls-${Date.now().toString().slice(-4)}`,
    };
    DataStore.saveClasses([...list, newClass]);
    return newClass;
  },
  updateClass: (id: string, updates: Partial<ClassSchedule>) => {
    const list = DataStore.getClasses().map((c) => (c.id === id ? { ...c, ...updates } : c));
    DataStore.saveClasses(list);
  },
  deleteClass: (id: string) => {
    const list = DataStore.getClasses().filter((c) => c.id !== id);
    DataStore.saveClasses(list);
  },

  // Tests & Results
  getTests: (): TestRecord[] => getItem("ttc_tests", DEFAULT_TESTS),
  saveTests: (data: TestRecord[]) => setItem("ttc_tests", data),
  addTest: (test: Omit<TestRecord, "id">): TestRecord => {
    const list = DataStore.getTests();
    const newTest: TestRecord = {
      ...test,
      id: `test-${Date.now().toString().slice(-5)}`,
    };
    DataStore.saveTests([newTest, ...list]);
    return newTest;
  },
  updateScore: (testId: string, studentId: string, marks: number, remarks?: string) => {
    const list = DataStore.getTests().map((test) => {
      if (test.id !== testId) return test;
      const existingScoreIdx = test.scores.findIndex((s) => s.studentId === studentId);
      let updatedScores = [...test.scores];
      if (existingScoreIdx >= 0) {
        updatedScores[existingScoreIdx] = {
          ...updatedScores[existingScoreIdx],
          marks: Math.max(0, Math.min(test.maxMarks, marks)),
          remarks: remarks ?? updatedScores[existingScoreIdx].remarks,
        };
      } else {
        const student = DataStore.getStudents().find((s) => s.id === studentId);
        updatedScores.push({
          studentId,
          studentName: student?.name || "Student",
          marks: Math.max(0, Math.min(test.maxMarks, marks)),
          maxMarks: test.maxMarks,
          remarks: remarks || "",
        });
      }
      return { ...test, scores: updatedScores };
    });
    DataStore.saveTests(list);
  },

  // Fees
  getFees: (): FeePayment[] => {
    const raw = getItem("ttc_fees", DEFAULT_FEES);
    const currentMonth = getCurrentFeeMonth();
    
    // Auto-update any stale or hardcoded old dates so they automatically increment/follow current date
    const updated = raw.map((fee, idx) => {
      let feeObj = { ...fee };
      if (!feeObj.month || feeObj.month.includes("2024") || feeObj.month.includes("September 2024")) {
        feeObj.month = currentMonth;
      }
      if (feeObj.status === "Paid" && (!feeObj.paidDate || feeObj.paidDate.startsWith("2024-"))) {
        feeObj.paidDate = getAutoDate(Math.min(idx, 4));
      }
      if (!feeObj.dueDate || feeObj.dueDate.startsWith("2024-")) {
        const y = new Date().getFullYear();
        const m = String(new Date().getMonth() + 1).padStart(2, "0");
        feeObj.dueDate = `${y}-${m}-${idx % 2 === 0 ? "10" : "15"}`;
      }
      if (feeObj.status === "Paid" && (!feeObj.receiptNumber || feeObj.receiptNumber.includes("2024"))) {
        feeObj.receiptNumber = generateAutoReceiptNumber(101 + idx);
      }
      return feeObj;
    });
    return updated;
  },
  saveFees: (data: FeePayment[]) => setItem("ttc_fees", data),
  markFeePaid: (feeId: string, paymentMethod = "Online / Cash") => {
    const today = getAutoDate(0);
    const fees = DataStore.getFees();
    const existingRecNums = fees
      .map((f) => f.receiptNumber)
      .filter(Boolean)
      .map((r) => {
        const parts = r!.split("-");
        return parseInt(parts[parts.length - 1], 10);
      })
      .filter((n) => !isNaN(n));
    const nextSeq = existingRecNums.length > 0 ? Math.max(...existingRecNums) + 1 : 108;
    const recNum = generateAutoReceiptNumber(nextSeq);

    const list = fees.map((f) => {
      if (f.id === feeId) {
        return {
          ...f,
          status: "Paid" as const,
          paidDate: today,
          receiptNumber: recNum,
          paymentMethod,
        };
      }
      return f;
    });
    DataStore.saveFees(list);

    // Also update student record pendingAmount
    const feeItem = list.find((f) => f.id === feeId);
    if (feeItem) {
      const students = DataStore.getStudents().map((s) => {
        if (s.id === feeItem.studentId) {
          return { ...s, feeStatus: "Paid" as const, pendingAmount: 0 };
        }
        return s;
      });
      DataStore.saveStudents(students);
    }
  },

  // Attendance
  getAttendance: (): DailyAttendanceRecord[] => getItem("ttc_attendance", DEFAULT_ATTENDANCE),
  saveAttendance: (data: DailyAttendanceRecord[]) => setItem("ttc_attendance", data),
  markStudentAttendance: (date: string, studentId: string, status: "Present" | "Absent" | "Late") => {
    const list = DataStore.getAttendance();
    const existingDayIdx = list.findIndex((a) => a.date === date);
    const students = DataStore.getStudents();
    const student = students.find((s) => s.id === studentId);
    const studentName = student?.name || "Student";
    const classGrade = student?.class || "Class 10";

    if (existingDayIdx >= 0) {
      const day = list[existingDayIdx];
      const recIdx = day.records.findIndex((r) => r.studentId === studentId);
      const updatedRecs = [...day.records];
      if (recIdx >= 0) {
        updatedRecs[recIdx] = { ...updatedRecs[recIdx], status };
      } else {
        updatedRecs.push({ studentId, studentName, classGrade, status });
      }
      list[existingDayIdx] = { ...day, records: updatedRecs };
    } else {
      list.unshift({
        date,
        records: [{ studentId, studentName, classGrade, status }],
      });
    }
    DataStore.saveAttendance(list);
  },

  // Doubts
  getDoubts: (): DoubtRecord[] => {
    const fallback: DoubtRecord[] = [
      {
        id: "dbt-1",
        studentId: "std-101",
        studentName: "Aarav Sharma",
        subject: "Mathematics",
        question: "How do I prove that root 5 is irrational using contradiction method?",
        status: "Resolved",
        response:
          "Assume root 5 = a/b where a and b are coprime integers. Squaring both sides gives 5b² = a², which means 5 divides a² and therefore 5 divides a. Substituting a = 5k gives 5b² = 25k², so b² = 5k², showing 5 also divides b. This contradicts that a and b are coprime.",
        teacherName: "Mr. Rohan Sharma",
        resolvedAt: "Today, 11:30 AM",
        createdAt: "Today, 10:15 AM",
      },
      {
        id: "dbt-2",
        studentId: "std-102",
        studentName: "Diya Patel",
        subject: "Science & Physics",
        question: "Please explain the difference between concave lens and convex mirror ray diagrams.",
        status: "Pending",
        teacherName: "Ms. Ananya Rao",
        createdAt: "Today, 2:15 PM",
        attachmentName: "ray_diagram_doubt.jpg",
        attachmentSize: "1.2 MB",
      },
      {
        id: "dbt-3",
        studentId: "std-105",
        studentName: "Vihaan Rao",
        subject: "Science",
        question: "What is the balanced equation for the reaction of sodium hydrogen carbonate with ethanoic acid?",
        status: "Resolved",
        response:
          "NaHCO₃ + CH₃COOH → CH₃COONa + H₂O + CO₂↑. The brisk effervescence is due to the evolution of carbon dioxide gas.",
        teacherName: "Ms. Ananya Rao",
        resolvedAt: "Yesterday, 4:00 PM",
        createdAt: "Yesterday, 3:20 PM",
      },
    ];
    return getItem("ttc_doubts_v2", fallback);
  },
  saveDoubts: (data: DoubtRecord[]) => setItem("ttc_doubts_v2", data),
  addDoubt: (d: Omit<DoubtRecord, "id" | "status" | "createdAt">): DoubtRecord => {
    const list = DataStore.getDoubts();
    const newDbt: DoubtRecord = {
      ...d,
      id: `dbt-${Date.now()}`,
      status: "Pending",
      createdAt: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) + ", Today",
    };
    DataStore.saveDoubts([newDbt, ...list]);
    return newDbt;
  },
  replyDoubt: (id: string, response: string, teacherName: string) => {
    const list = DataStore.getDoubts().map((d) => {
      if (d.id === id) {
        return {
          ...d,
          response,
          teacherName,
          status: "Resolved" as const,
          resolvedAt: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) + ", Today",
        };
      }
      return d;
    });
    DataStore.saveDoubts(list);
  },
};

// =============================================================
// ROLE ACCESS & AUTHORIZATION GUARDS (Point 1 & 8 Security)
// =============================================================

export const ROLE_PERMISSIONS: Record<Role, string[]> = {
  admin: [
    "overview",
    "notifications",
    "workflow",
    "students",
    "teachers",
    "classesTimetable",
    "attendance",
    "fees", // Admin has full financial ledger
    "results",
    "doubts",
  ],
  teacher: [
    "overview",
    "notifications",
    "workflow",
    "myClasses",
    "students", // Sanitized view without fee amounts
    "attendance",
    "results",
    "doubts",
    // NOTE: Strictly NO 'fees' or 'myFees' permission for teacher
  ],
  student: [
    "overview",
    "notifications",
    "workflow",
    "timetable",
    "results",
    "myFees", // Student can ONLY view their own personal fees/receipt
    "doubts",
  ],
};

export function canAccessTab(role: Role, tabId: string): boolean {
  const allowed = ROLE_PERMISSIONS[role] || [];
  return allowed.includes(tabId);
}

export function validateSession(stored: string | null): { valid: boolean; session?: UserSession; error?: string } {
  if (!stored) return { valid: false, error: "No active session found." };
  try {
    const session: UserSession = JSON.parse(stored);
    if (!session.role || !session.email || !session.name) {
      return { valid: false, error: "Invalid session structure." };
    }
    if (!["student", "teacher", "admin"].includes(session.role)) {
      return { valid: false, error: "Invalid user role." };
    }
    // Session Expiration check (24 hours window)
    if (session.expiresAt && Date.now() > session.expiresAt) {
      return { valid: false, error: "Session expired. Please sign in again." };
    }
    return { valid: true, session };
  } catch {
    return { valid: false, error: "Corrupted session data." };
  }
}

export function createGoogleSession(
  email: string,
  name: string,
  role: Role,
  avatar?: string,
  googleId?: string
): UserSession {
  const now = Date.now();
  const session: UserSession = {
    role,
    name,
    email,
    provider: "google",
    avatar: avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(name)}`,
    googleId: googleId || `goog_${Math.random().toString(36).substring(2, 10)}`,
    authTime: now,
    expiresAt: now + 24 * 60 * 60 * 1000, // 24 hours validity
  };
  if (role === "student") session.studentId = "std-101";
  if (role === "teacher") session.teacherId = "tch-01";
  return session;
}

