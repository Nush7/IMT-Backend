# IMT-Backend
A small backend application to manage inventory for a small business.

## Features
- User authentication (JWT-based)
- Role-based access (admin, user)
- Product CRUD (Create, Read, Update, Delete)
- Inventory management and analytics
- Input validation

## Getting Started

To start the backend locally:

1. **Clone the repository:**
   ```sh
   git clone https://github.com/Nush7/IMT-Backend.git
   cd IMT-Backend
   ```
2. **Install dependencies:**
   ```sh
   npm install
   ```
3. **Set up environment variables:**
   - Copy `.env.example` to `.env` and fill in the required values.
   ```sh
   cp .env.example .env
   ```
   - Or create a `.env` file manually using the variables listed above.
4. **Start the backend server:**
   ```sh
   npm start
   ```
   The server will run on `http://localhost:3000` by default.

### To run with Docker:
1. **Build the Docker image:**
   ```sh
   docker build -t imt-backend .
   ```
2. **Run the container:**
   ```sh
   docker run --env-file .env -p 3000:3000 imt-backend
   ```
   The backend will be available at `http://localhost:3000`.

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
