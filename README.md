# IMT-Backend
A small backend application to manage inventory for a small business.

## Features
- User authentication (JWT-based)
- Role-based access (admin, user)
- Product CRUD (Create, Read, Update, Delete)
- Inventory management and analytics
- Input validation

## Getting Started

### Prerequisites
- Node.js (v16 or higher recommended)
- MongoDB database (local or Atlas)

### Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/Nush7/IMT-Backend.git
   cd IMT-Backend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Copy `.env.example` to `.env` and fill in your environment variables:
   ```sh
   cp .env.example .env
   ```

### Environment Variables
| Variable              | Description                        |
|---------------------- |------------------------------------|
| PORT                  | Server port (default: 3000)        |
| NODE_ENV              | Environment (development/production)|
| JWT_SECRET            | Secret key for JWT                 |
| JWT_EXPIRES_IN        | JWT expiration (e.g., 7d, 24h)     |
| DB_CONNECTION_STRING  | MongoDB connection string          |
| CORS_ORIGIN           | Allowed CORS origin                |

### Running the Server
```sh
npm start
```
The server will run on `http://localhost:3000` by default.

## API Endpoints

### Auth
- `POST /api/auth/v1/signup` – Register a new user
- `POST /api/auth/v1/signin` – Login and receive JWT
- `POST /api/auth/v1/logout` – Logout (client-side only)

### Products
- `GET /api/products/v1/` – List products
- `POST /api/products/v1/` – Create product (admin only)
- `PUT /api/products/v1/:id` – Update product (admin only)
- `PUT /api/products/v1/:id/quantity` – Update product quantity (admin only)
- `POST /api/products/v1/checkout` – Checkout product (user)
- `GET /api/products/v1/analytics` – Inventory analytics (admin only)

### Health Check
- `GET /health` – Check server status

## Authentication
All protected routes require a JWT in the `Authorization` header:
```
Authorization: Bearer <token>
```
