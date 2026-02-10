# High-Scale Energy Ingestion Engine
Backend API's for ingesting high-frequency energy telemetry from Smart Meters and EVs/Chargers, and providing analytical insights into charging efficiency.

# Features
Telemetry ingestion for Meter (AC) and Vehicle (DC) data
DTO-based request validation
Hot & Cold data separation (Live vs History)
24-hour efficiency analytics
PostgreSQL database
NestJS REST API
Docker-based local setup

# Prerequisites
Node.js (v16 or higher)
Docker & Docker Compose
npm or yarn

# Installation
Clone the repository and navigate to the project directory:
git clone <repo-url>
cd energy-ingestion
Install dependencies:
npm install

# Environment Configuration
Create a .env file:
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=zynetics
DB_USER=admin
DB_PASSWORD=admin123

# Database
PostgreSQL is started using Docker.
Schema includes:
Meter telemetry history
Vehicle telemetry history
Vehicle live status
All historical data is append-only, and live data is maintained using UPSERT.

# Running the Application
Start API and database using Docker:
docker-compose up
The API will be available at:
http://localhost:3000

# API Endpoints
Ingestion
POST /v1/ingest/meter
POST /v1/ingest/vehicle
Analytics
GET /v1/analytics/performance/:vehicleId

# Out of Scope
Authentication / Authorization
UI / Frontend
These are intentionally excluded to focus on ingestion scalability and analytics performance.

# Tech Stack
Node.js
NestJS (TypeScript)
PostgreSQL
Docker / Docker Compose
