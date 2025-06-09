# 🏭 Product Life Management (PLM) Platform

[![TypeScript](https://img.shields.io/badge/TypeScript-4.x-blue?logo=typescript&style=flat-square)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/Frontend-React-blue?logo=react&style=flat-square)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Backend-Node.js-green?logo=node.js&style=flat-square)](https://nodejs.org/)
[![PostgreSQL](https://img.shields.io/badge/Database-PostgreSQL-336791?logo=postgresql&style=flat-square)](https://www.postgresql.org/)
[![Docker](https://img.shields.io/badge/Dockerized-Yes-2496ED?logo=docker&style=flat-square)](https://www.docker.com/)


---

## 📦 Overview

This project is a **Product Life Management (PLM)** application designed using a **microservices architecture**. It includes inventory management, production planning, suppliers, quality control, and more.



---

## ⚙️ Tech Stack

- **Frontend:** React, TypeScript, HTML/CSS
- **Backend:** Node.js, Express, TypeScript
- **Database:** PostgreSQL
- **ORM:** Sequelize
- **API Auth:** express-session (cookie-based)
- **DevOps:** Docker, Docker Compose

---

## 🚀 Features

- ✅ Stock management (CRUD operations)
    
![Stock management](https://github.com/user-attachments/assets/f01ccbb7-63af-49d0-b061-ed0ea2b5b967)

- ✅ Supplier & quality control management
  
 ![Supplier](https://github.com/user-attachments/assets/091b5d9d-f25b-45e1-a40c-885491dc81e4)
 ![QualityTab](https://github.com/user-attachments/assets/37d0b02e-30e6-41f3-9f07-d0844515347a)
 ![Quality Graph](https://github.com/user-attachments/assets/b679c046-cd13-4f66-924b-9a14e9eba3cb)

- ✅ Recipe planning and ingredients tracking
   
 ![Recipe](https://github.com/user-attachments/assets/b8c33b5b-7103-4123-9b9a-1d0775a9bab7)

- ✅ User login and authentication system
  
- ✅ Production schedule overview
  
![History](https://github.com/user-attachments/assets/36344d0c-10d2-4439-993e-941a61fe19cc)

- ✅ Fully containerized using Docker Compose  

## Database Schema
  
![DatabaseSchema](https://github.com/user-attachments/assets/2207b0e6-d132-4ac6-a8b4-46a2bb2d9bb7)

---

## 🐳 How to run the app

Make sure you have **Docker**  installed.

and the .env file with the following information
```bash
DB_HOST=plm_postgres
DB_PORT=5432
POSTGRES_USER=admin
POSTGRES_PASSWORD=mypassword
POSTGRES_DB=PLM
```

Build the docker
```bash
docker compose up -d
```

Open [https://localhost:80](https://localhost:80)


## 📡 API Endpoints (example: /stocks)

| Method | Endpoint           | Description                           |
|--------|--------------------|---------------------------------------|
| GET    | `/stocks`          | Get all stock items                   |
| GET    | `/stocks/:id`      | Get a single stock item by ID         |
| POST   | `/stocks`          | Create a new stock item               |
| PUT    | `/stocks/:id`      | Update a stock item                   |
| DELETE | `/stocks/:id`      | Delete a stock item                   |

> Additional resources:
> - `/recettes` (recipes)
> - `/controlequalite` (quality control)
> - `/fournisseurs` (suppliers)
> - `/production_planifiee` (planned production)
> - `/login` & `/user` (authentication)

---

## 👥 Authors
- Manon Gardin
- Matias Ottensen
- Paul Lacoutiere



