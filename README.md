<div align="center">

<img width="100%" src="https://capsule-render.vercel.app/api?type=waving&color=0:151C2C,100:B58A36&height=220&section=header&text=Talent%20Tuition%20Center&fontSize=42&fontColor=ffffff&desc=Learn.%20Grow.%20Excel.&descAlignY=70"/>

# 🎓 Talent Tuition Center

### Digital Tuition Management Platform

**Learn • Grow • Excel**

[![CI](https://github.com/9harshithp/talent-tuition-center/actions/workflows/ci.yml/badge.svg)](https://github.com/9harshithp/talent-tuition-center/actions/workflows/ci.yml)
[![Live Website](https://img.shields.io/badge/Live_Website-Visit_Now-B58A36?style=for-the-badge&logo=vercel)](https://talent-tuition-center.vercel.app/)
[![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vercel](https://img.shields.io/badge/Deployment-Vercel-000000?style=for-the-badge&logo=vercel)](https://talent-tuition-center.vercel.app/)

</div>

---

## 🖥️ Application Showcase

<div align="center">

[![Talent Tuition Center Homepage](./talent-homepage.png)](https://talent-tuition-center.vercel.app/)

*Modern digital education platform for secondary students.*

[![Launch Application](https://img.shields.io/badge/Launch_Application-B58A36?style=for-the-badge&logo=vercel&logoColor=white)](https://talent-tuition-center.vercel.app/)

</div>

---

## 📌 Project Overview

Talent Tuition Center is a web-based tuition management platform designed to digitalize academic coaching, student management, teacher coordination and administrative activities.

The platform focuses on students studying Classes 8, 9 and 10 under CBSE and State Board curricula.

It combines a public-facing educational website with dedicated Student, Teacher and Administrator portal experiences.

**Live website:** https://talent-tuition-center.vercel.app/

---

## 🎯 Project Objectives

- Digitalize tuition center operations.
- Simplify student and teacher management.
- Improve academic performance tracking.
- Provide structured access to educational information.
- Demonstrate AI-assisted learning workflows.
- Create a responsive and accessible user experience.

---

## 🌟 Platform Features

| Module | Features |
|---|---|
| Public Website | Admissions, academic programs, contact information and FAQs |
| Student Portal | Academic information, results and learning resources |
| Teacher Portal | Academic management and teacher approval workflows |
| Admin Portal | Student and teacher administration |
| AI Assistance | Gemini-powered doubt-solving experience |
| Digital Management | Results and receipt management |
| Responsive Design | Desktop, tablet and mobile interfaces |

---

## 💻 Technology Stack

<div align="center">

<img src="https://skillicons.dev/icons?i=nextjs,react,ts,tailwind,html,css&theme=dark" alt="Frontend technologies"/>

<img src="https://skillicons.dev/icons?i=nodejs,docker,git,github,vercel,vscode&theme=dark" alt="Development technologies"/>

![Gemini](https://img.shields.io/badge/Google-Gemini_AI-4285F4?style=for-the-badge&logo=google&logoColor=white)

</div>

| Layer | Technology |
|---|---|
| Application Framework | Next.js |
| Frontend | React |
| Programming Language | TypeScript |
| Styling | Tailwind CSS |
| AI Integration | Google Gemini |
| Containerization | Docker |
| Deployment | Vercel |
| Version Control | Git and GitHub |

---

## 🏗️ System Architecture

### Current Preview Architecture

```mermaid
flowchart TD
    U["Users"] --> W["Next.js Application"]
    W --> P["Public Website"]
    W --> L["Demo Login"]
    L --> R["Browser-side role preview"]
    R --> S["Student Portal"]
    R --> T["Teacher Portal"]
    R --> A["Admin Portal"]
    S --> AI["AI Doubt Solver"]
    V["Vercel Hosting"] -. hosts .-> W
```

The current version demonstrates the application interface and role-specific workflows using a browser-based preview.

---

## 👥 User Roles

### 🎓 Student

- Access academic information.
- View learning resources.
- Explore performance information.
- Use AI-assisted doubt-solving features.

### 👨‍🏫 Teacher

- Explore academic management workflows.
- Manage student-related activities.
- Participate in teacher approval workflows.

### ⚙️ Administrator

- Explore student and teacher administration.
- Access administrative dashboard previews.
- Manage academic and fee-related workflows.

---

## 🗄️ Proposed Production Data Model

```mermaid
erDiagram
    USER ||--o| STUDENT : represents
    USER ||--o| TEACHER : represents
    STUDENT ||--o{ RESULT : receives
    STUDENT ||--o{ FEE_RECORD : has
    TEACHER ||--o{ CLASS : teaches
    CLASS ||--o{ RESULT : generates
```

This diagram represents the proposed production database design. The current preview does not implement a production database-backed authentication system.

---

## 🚀 Local Development

### Prerequisites

- Node.js
- npm
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/9harshithp/talent-tuition-center.git
cd talent-tuition-center
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start the Development Server

```bash
npm run dev
```

### 4. Open the Application

```text
http://localhost:3000
```

### 5. Create a Production Build

```bash
npm run build
```

---

## ☁️ Deployment

Talent Tuition Center is deployed using Vercel.

```mermaid
flowchart TD
    A["GitHub Repository"] --> B["Vercel Build"]
    B --> C["Next.js Deployment"]
    C --> D["Live Application"]
```

| Component | Platform |
|---|---|
| Application | Next.js |
| Source Control | GitHub |
| Hosting | Vercel |

**Production website:** https://talent-tuition-center.vercel.app/

---

## 🔐 Production Readiness

The current application is a functional preview.

Before processing real student information or payment records, the following improvements are required:

- Production authentication.
- Database-backed user accounts.
- Server-side role-based authorization.
- Admin-only access to financial information.
- Secure AI API configuration.
- Persistent academic records.
- Automated testing.
- CI/CD quality checks.

Browser-side role switching and hidden interface elements are not substitutes for server-side authorization.

---

## 🛣️ Development Roadmap

- [x] Responsive public website
- [x] Student portal preview
- [x] Teacher portal preview
- [x] Administrator portal preview
- [x] Vercel deployment
- [ ] Production authentication
- [ ] Persistent database integration
- [ ] Server-side authorization
- [ ] Automated test suite
- [ ] GitHub Actions CI/CD

---

## 🤝 Contributions

Suggestions and improvements are welcome through GitHub issues and pull requests.

---

## 👨‍💻 Developer

<div align="center">

### Harshith P

Backend Engineer | Full Stack Developer

[![GitHub](https://img.shields.io/badge/GitHub-9harshithp-181717?style=for-the-badge&logo=github)](https://github.com/9harshithp)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Harshith_P-0A66C2?style=for-the-badge&logo=linkedin)](https://www.linkedin.com/in/harshithp914)
[![Email](https://img.shields.io/badge/Email-Contact_Me-EA4335?style=for-the-badge&logo=gmail)](mailto:harshithp914@gmail.com)

⭐ If you find this project interesting, consider starring the repository.

<img width="100%" src="https://capsule-render.vercel.app/api?type=waving&color=0:151C2C,100:B58A36&height=120&section=footer"/>

</div>
