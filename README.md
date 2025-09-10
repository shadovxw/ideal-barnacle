
# Vy Foundation (In Progress)

A **full-stack web platform** that enables users to **discover charities, organize fundraisers, and streamline donation logistics**.

🔗 **Live Demo:** [vyfoundation-ui](https://vyfoundation-ui.onrender.com)

---

## 🚀 Features

* 🔍 **Charity Discovery** — browse and explore verified charities.
* 💰 **Fundraiser Management** — create, manage, and track fundraisers.
* 💳 **Donations Workflow** — structured donation logistics.
* 🔐 **Authentication** — JWT + HttpOnly cookies for secure sessions.
* 📧 **Email Verification** — user verification with Nodemailer + OTP.
* 🛡️ **Security** — input validation, Helmet, and CORS policies.
* ⚡ **Deployment** — React, Express/Flask backend, and Postgres DB deployed on **Render free tier**.
* 🗄️ **Database Management** — Sequelize ORM with migrations & seed scripts.

---

## 🛠️ Tech Stack

**Frontend:** React
**Backend:** Flask / Express.js (Node.js), Sequelize ORM
**Database:** PostgreSQL (Render free tier)
**Auth & Security:** JWT, HttpOnly Cookies, Nodemailer, Helmet, CORS
**Deployment:** Render (Static Site, Web Service, Postgres)
**Other Tools:** Docker (local dev), dotenv, Express Validator

---

## ⚙️ System Architecture
<img width="1191" height="449" alt="image" src="https://github.com/user-attachments/assets/50651f83-af63-45fd-a6eb-a2eb98044ef9" />

<img width="1583" height="439" alt="image" src="https://github.com/user-attachments/assets/88319b95-37d3-4cb5-a5ca-69804fbab071" />


---

## 📦 Installation & Setup (Local)

### 1. Clone repos

```bash
git clone <frontend-repo>
git clone <backend-repo>
```

### 2. Backend setup

```bash
cd backend
npm install
cp .env.example .env   # Add DATABASE_URL, JWT_SECRET, SMTP_USER, SMTP_PASS
npm run db:migrate     # run migrations
npm run dev            # start in dev mode
```

### 3. Frontend setup

```bash
cd frontend
npm install
npm start              # runs on http://localhost:3000
```

---

## 🚀 Deployment (Render Free Tier)

### Database

* Provisioned **Postgres** instance on Render.
* Used **internal `DATABASE_URL`** for backend.
* Managed schema with Sequelize migrations & seeds.

### Backend

* Deployed as a **Web Service**.
* **Build Command:**

  ```bash
  npm install && npm run db:migrate:prod
  ```
* **Start Command:**

  ```bash
  npm start
  ```
* Environment Variables: `DATABASE_URL`, `JWT_SECRET`, `SMTP_USER`, `SMTP_PASS`, `NODE_ENV=production`.

### Frontend

* Deployed as a **Static Site**.
* **Build Command:**

  ```bash
  npm install && npm run build
  ```
* **Publish Directory:**

  ```
  build
  ```
* Environment Variables: `BACKEND_URL`.

---

## 📸 Screenshots
<img width="1902" height="940" alt="image" src="https://github.com/user-attachments/assets/f05d599e-b110-4fdd-983d-6d93852bab02" />
<img width="1899" height="932" alt="image" src="https://github.com/user-attachments/assets/aed18a25-d1ad-4cda-8787-938b197e109d" />
<img width="1898" height="938" alt="image" src="https://github.com/user-attachments/assets/698045c3-9318-4cf4-a474-09fe2d302200" />

---

## 📌 Roadmap

* ✅ Charity & fundraiser CRUD
* ✅ Secure authentication & email verification
* ✅ Deployment on Render free tier
* 🔜 Payment integration (Stripe/PayPal)
* 🔜 Admin dashboard & analytics
* 🔜 User donation history

---
