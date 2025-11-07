# Meal Tracker API

A simple RFID-enabled meal tracking API built with **TypeScript**, **Express**, and **Prisma**.  
Designed to log meal prep containers and track macros via RFID/NFC tags.

---

## 🚀 Tech Stack
- **TypeScript**
- **Express.js**
- **Prisma ORM**
- **SQLite** (dev)
- **REST Client / Postman** for testing

---

## API Endpoints

### Meals
- `GET /api/meals` — Fetch all meals
- `POST /api/meals` — Add a new meal

### Logs
- `GET /api/logs` — Fetch all logs
- `POST /api/logs` — Record a scan
- `PUT /api/logs/:id` — Update status (prepped/eaten)
- `DELETE /api/logs/:id` — Delete specific log
- `DELETE /api/logs/tag/:tagId` — Delete all logs for a tag

---

## 🧠 Setup

```bash
npm install
npx prisma migrate dev --name init
npm run dev