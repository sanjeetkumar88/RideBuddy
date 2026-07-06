# RideBuddy

RideBuddy is a full-stack application.

## Architecture

- **Frontend:** Next.js (App Router, Tailwind CSS, TypeScript)
- **Backend:** Nest.js (Modular Monolithic, TypeScript)
- **Database:** PostgreSQL (with Prisma ORM)
- **Cache/Events:** Redis
- **Containerization:** Docker & Docker Compose

## Getting Started

1. Clone the repository.
2. Ensure Docker and Docker Compose are installed.
3. Run the application:
   ```bash
   docker-compose up -d --build
   ```
4. Access the frontend at `http://localhost:3000` and the backend at `http://localhost:3001`.
