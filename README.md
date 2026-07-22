# Employee Management System

A modern **Employee Management System** built with **React, TypeScript, Redux Toolkit, Tailwind CSS, Node.js, Express.js, MongoDB, and JWT Authentication**.

The application provides secure authentication, employee management, analytics dashboard, search & filtering, pagination, and responsive UI.

---

## 🚀 Features

### 🔐 Authentication

- Admin Login
- JWT Authentication
- HTTP Only Cookies
- Access Token & Refresh Token
- Protected Routes
- Logout

---

### 👨‍💼 Employee Management

- View Employees
- Add Employee
- Edit Employee
- Delete Employee
- Employee Details

Employee Fields

- Name
- Email
- Phone
- Department
- Designation
- Status
- Joining Date
- Salary

---

### 🔍 Search & Filter

- Search by Name
- Search by Email
- Filter by Department
- Filter by Status
- Debounced Search

---

### 📄 Pagination

- Server-side Pagination
- Dynamic Page Navigation

---

### 📊 Dashboard Analytics

Dashboard includes

- Total Employees
- Active Employees
- Inactive Employees
- Employees on Leave
- Department-wise Employee Count
- Monthly Joined Employees
- Employee Status Distribution

Charts are built using **Recharts**.

---

### 🎨 UI Features

- Responsive Design
- Mobile Friendly
- Sidebar Navigation
- Dashboard Layout
- Toast Notifications
- Form Validation
- Loading States
- Empty States
- Delete Confirmation Modal

---

## 🛠 Tech Stack

### Frontend

- React
- TypeScript
- React Router DOM
- Redux Toolkit
- Axios
- React Hook Form
- Zod Validation
- Tailwind CSS
- Recharts
- React Hot Toast
- React Icons

---

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- Cookie Parser
- CORS

---

## 📁 Project Structure

### Frontend

```
src
│
├── api
├── components
├── features
│   ├── auth
│   ├── dashboard
│   └── employee
├── hooks
├── layouts
├── pages
├── routes
├── store
├── types
└── utils
```

### Backend

```
backend
│
├── config
├── controller
├── middleware
├── models
├── routes
├── utils
└── server.js
```

---

## ⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/yourusername/employee-management-system.git
```

---

## Backend Setup

```bash
cd backend
npm install
```

Create `.env`

```env
PORT=5000

MONGODB_URI=

ACCESS_TOKEN_SECRET=

REFRESH_TOKEN_SECRET=

NODE_ENV=development
```

Start Backend

```bash
npm run dev
```

---

## Frontend Setup

```bash
cd frontend
npm install
```

Create `.env`

```env
VITE_API_URL=http://localhost:5000/api/v1
```

Start Frontend

```bash
npm run dev
```

---

## Authentication Flow

```
Login
      │
      ▼
JWT Generated
      │
      ▼
Access Token (Cookie)
Refresh Token (Cookie)
      │
      ▼
Protected Routes
      │
      ▼
Refresh Token generates new Access Token automatically
```

---

## API Endpoints

### Authentication

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | /api/v1/auth/login | Login |
| POST | /api/v1/auth/logout | Logout |
| GET | /api/v1/auth/profile | Get Profile |

---

### Dashboard

| Method | Endpoint |
|---------|----------|
| GET | /api/v1/dashboard |

---

### Employees

| Method | Endpoint |
|---------|----------|
| GET | /api/v1/employees |
| GET | /api/v1/employees/:id |
| POST | /api/v1/employees |
| PUT | /api/v1/employees/:id |
| DELETE | /api/v1/employees/:id |

---

## Validation

Employee validation includes

- Name
- Email
- Phone Number
- Department
- Designation
- Status
- Joining Date
- Salary

Validation is implemented using **Zod** on the frontend and **Mongoose** schema validation on the backend.

---

## Author

**Barathraj M**

GitHub: https://github.com/Mbarathraj

LinkedIn: https://linkedin.com/in/barathrajm

