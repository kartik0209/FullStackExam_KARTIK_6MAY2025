# Full-Stack E-Commerce Application

This repository hosts both the **Back-End** (Node.js + Express) and **Front-End** (Next.js) for a mini E-Commerce application adhering to an MVC architecture and integrating both SQL and MongoDB.


## Features

* **Authentication**: JWT-based secure registration/login.
* **Product Catalog**: CRUD operations, search/filter, pagination (MongoDB).
* **Shopping Cart & Checkout**: Cart management, order creation (SQL).
* **Reports**: Daily revenue, top spenders (SQL); sales by category (MongoDB).
* **SSR & SEO**: Next.js Server-Side Rendering for product listing.
* **Dynamic Routing**, **TypeScript**, basic responsive UI.

## Tech Stack

* **Back End**: Node.js, Express, Sequelize (SQL), Mongoose (MongoDB).
* **Front End**: Next.js (React), TypeScript, Tailwind CSS.
* **Databases**: PostgreSQL/MySQL (users, orders), MongoDB (products, cart).
* **Auth**: bcrypt, JSON Web Tokens.
* **Testing**: Jest, Supertest (Back End); React Testing Library (Front End).

## Prerequisites

* Node.js >=14
* npm or yarn
* PostgreSQL or MySQL
* MongoDB (local or Atlas)

## Installation

```bash
# Clone repository
git clone https://github.com/YourUsername/FullStackExamYourName2025-05-06.git
cd FullStackExamYourName2025-05-06

# Install dependencies for both back-end and front-end\ n
npm install        # root scripts will install workspaces
```

## Environment Variables

Create `.env` files in both subfolders:

### Back-End (`backend/.env`)

```env
SQL_DIALECT=postgres
SQL_HOST=localhost
SQL_PORT=5432
SQL_USERNAME=db_user
SQL_PASSWORD=db_pass
SQL_DATABASE=db_name

MONGODB_URI=mongodb://localhost:27017/ecommerce
PORT=5000
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=1d
```

### Front-End (`frontend/.env.local`)

```env
NEXT_PUBLIC_API_URL=http://localhost:4000/api
```

## Database Setup

1. **SQL**: Create database matching `SQL_DATABASE`.
2. **MongoDB**: Ensure your URI is reachable.

## Running Migrations & Seeding

```bash
# Back-End
cd backend
npm run migration    # create tables
npm run seed         # seed sample data
```

## Running the Application

```bash
# In separate terminals:
cd backend
npm run dev           # start Express server on port 4000

cd frontend
npm run dev           # start Next.js on port 3000
```

* Visit `http://localhost:3000` for the front-end.
* API available at `http://localhost:5000`.

## Scripts

* **Back-End** (in `/backend`):

  * `npm run dev` - Nodemon server
  * `npm run start` - Production server
  * `npm run migration` - Sequelize migrations
  * `npm run seed` - Seed SQL & MongoDB
  * `npm test` - Jest & Supertest

* **Front-End** (in `/frontend`):

  * `npm run dev` - Next.js dev
  * `npm run build` - Build for production
  * `npm start` - Start production server
  * `npm test` - React Testing Library

## Directory Structure

```plaintext
FullStackExamYourName2025-05-06/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   │   ├── sql/        # Sequelize models, migrations, seeders
│   │   │   └── mongodb/    # Mongoose schemas
│   │   ├── routes/
│   │   ├── middlewares/
│   │   ├── services/
│   │   ├── utils/
│   │   ├── config/
│   │   └── app.ts
│   ├── .env
│   └── package.json
|
├── frontend/
│   ├── src/app/
│   │   ├── page.tsx
│   │   ├── products/
│   │   │   ├── page.tsx
│   │   │   └── [id]/page.tsx
│   │   ├── cart/page.tsx
│   │   ├── checkout/page.tsx
│   │   ├── reports/page.tsx
│   │   ├── login/page.tsx
│   │   ├── register/page.tsx
│   │   ├── layout.tsx
│   │   └── globals.css
│   ├── src/components/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── ProductCard.tsx
│   │   ├── ProductList.tsx
│   │   ├── CartItem.tsx
│   │   └── Pagination.tsx
│   ├── src/types/index.ts
│   ├── public/images/
│   ├── .env.local
│   ├── package.json
│   └── tsconfig.json

└── README.md
```



## Testing

* Run back-end tests:

  ```bash
  cd backend && npm test
  ```
* Run front-end tests:

  ```bash
  cd frontend && npm test
  ```


