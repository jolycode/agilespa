# AgileSPA

A simple full-stack single page application (SPA) setup with **React**, **Node.js**, and **MariaDB**, containerized with **Docker Compose**.  

Live site: [https://danylo.info](https://danylo.info)

---

## Repository

- HTTPS: [https://github.com/jolycode/agilespa](https://github.com/jolycode/agilespa)  
- SSH: `git@github.com:jolycode/agilespa.git`

---

## Getting Started

### Clone the repository

```bash
git clone git@github.com:jolycode/agilespa.git
cd agilespa
Run with Docker
Make sure Docker is running, then build and start the containers:

bash
docker-compose up --build
Frontend: http://localhost:33012 or https://danylo.info

Backend API: http://localhost:33011

MariaDB: 127.0.0.1:43306 (user: appuser, password: apppass)

Stop and Remove Containers
bash
docker-compose down -v
