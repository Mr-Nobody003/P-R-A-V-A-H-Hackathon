# P-R-A-V-A-H-Hackathon

![Project Banner](https://b2737668.smushcdn.com/2737668/wp-content/uploads/2023/10/android-chrome-192x192-1.png?lossy=1&strip=1&webp=1)  
*A platform celebrating the rich craftsmanship of Northeast India.*

## Overview

**P-R-A-V-A-H-Hackathon** is a full-stack web application crafted to promote and sell artisanal products from Northeast India. Leveraging a modern technology stack, it delivers an intuitive user experience for discovering handcrafted goods, managing shopping carts, and securely completing purchases. The platform highlights the region's cultural heritage through features such as user authentication, product filtering, and payment integration.

This repository encompasses:
- **Backend**: A Node.js/Express server managing API endpoints, database operations, and authentication.
- **Frontend**: A responsive React interface for product exploration, cart management, and user profiles.

## Features

- **User Authentication**: Secure signup and login with JWT and bcrypt.
- **Product Exploration**: Filterable listings by category, region, and price range.
- **Cart & Checkout**: Add items to cart and complete orders with address details.
- **Payment Integration**: Razorpay for seamless transactions (test mode enabled).
- **Profile Management**: Access user details and cart summaries.
- **Regional Highlights**: Discover crafts unique to Northeast Indian regions.
- **Artisan Stories**: Profiles showcasing artisans and their creations.
- **Multilingual Support**: Basic internationalization via `react-i18next`.

## Technology Stack

### Backend
- **Node.js**: Server-side runtime environment.
- **Express**: Framework for API development.
- **MongoDB**: NoSQL database for data persistence.
- **Mongoose**: Object Data Modeling (ODM) for MongoDB.
- **JWT**: JSON Web Tokens for authentication.
- **bcryptjs**: Password hashing for security.
- **Nodemon**: Development tool for auto-restarting the server.
- **dotenv**: Environment variable configuration.

### Frontend
- **React**: Component-based UI library.
- **React Router**: Navigation and routing solution.
- **Tailwind CSS**: Utility-first CSS framework.
- **Axios**: Promise-based HTTP client.
- **Razorpay**: Payment gateway SDK.
- **rc-slider**: Interactive price range slider.
- **react-i18next**: Internationalization framework.

## Prerequisites

- **Node.js**: Version 16.20.1 or later.
- **npm**: Version 6 or later.
- **MongoDB**: Local installation or a cloud instance (e.g., MongoDB Atlas).
- **Razorpay Account**: Optional for payment integration (test mode supported).

## Installation

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/P-R-A-V-A-H-Hackathon.git
cd P-R-A-V-A-H-Hackathon

## Backend Setup

### 1. Navigate to the backend directory:
```bash
cd backend

### 2. Install dependencies:
```bash
npm install

### 3. Create a .env file in the backend directory:
```env
PORT=5556
MONGODB_URI=<your-mongodb-uri>
JWT_SECRET=<your-jwt-secret>

### 4. Start the backend server:
```bash
npm run dev

The server will run on http://localhost:5556.

## Frontend Setup:

### 1. Navigate to the frontend directory:
```bash
cd frontend

### 2. Install dependencies:
```bash
npm install

### 3. Create a .env file in the frontend directory:
```env
VITE_BACKEND_URL=http://localhost:5556

### 4. Start the frontend development server:
```bash
npm run dev

The app will be available at http://localhost:5173 (or another port if specified).

## Database Setup
Ensure MongoDB is running locally or provide a valid MONGODB_URI in the backend .env.
The app uses Mongoose schemas for users, products, carts, and orders.

## Optional: Razorpay Configuration
Replace the dummy key in Payment.jsx with your Razorpay test/live key:

```javascript
key: "" // Replace with your key

## Project Structure

P-R-A-V-A-H-Hackathon/
├── backend/
│   ├── package-lock.json  # Backend dependencies lock file
│   └── node_modules/      # Backend dependencies
├── frontend/
│   ├── src/
│   │   ├── pages/         # React page components (e.g., Home, Checkout, ProductPage)
│   │   ├── components/    # Reusable UI components (e.g., ProductCard, CategoryShowcase)
│   │   └── AuthContext.jsx # Authentication context
│   ├── package-lock.json  # Frontend dependencies lock file
│   └── node_modules/      # Frontend dependencies
└── README.md              # This file


## Usage
Signup/Login: Create an account or log in to access cart and checkout features.
Browse Products: Use the homepage or products page to explore crafts.
Add to Cart: Click "Add to Cart" on product pages (requires login).
Checkout: Enter shipping details and place an order.
Payment: Proceed to payment with Razorpay (test mode by default).
Profile: View your cart and order summary.

## Contributing
Fork the repository.
Create a new branch: git checkout -b feature-name.
Make your changes and commit: git commit -m "Add feature".
Push to your branch: git push origin feature-name.
Open a pull request.

## License
This project is licensed under the ISC License. See the backend/package-lock.json for details.

##Acknowledgments
Built during the P-R-A-V-A-H-Hackathon event.
Inspired by the vibrant artisan community of Northeast India.
