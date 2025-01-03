# **MERN E-Commerce Platform**

A full-featured e-commerce platform built with the MERN (MongoDB, Express.js, React.js, Node.js) stack. This platform allows users to browse products, manage their cart, place orders, and perform authentication (register/login). Admin users can manage products, view orders, and handle users.

## **Features**

### **User Features**
- **Product Catalog**: View products with details such as name, price, description, and images.
- **Shopping Cart**: Add, update, and remove items in the cart.
- **Order Management**: Place orders and track order progress.
- **Responsive Design**: User-friendly and mobile-responsive interface.

## **Tech Stack**
- **Frontend**: React.js, React Router, React Context API, Axios, Bootstrap
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose)
- **Authentication**: JWT (JSON Web Tokens)
- **Styling**: Bootstrap
- **File Upload**: Multer for image handling
- **Notifications**: React Toastify for user feedback

---

## **Project Structure**

### **Frontend**
- `/src/components`: Reusable React components
- `/src/pages`: Pages like Home, Cart, Product Details, Login, Register
- `/src/context`: Context API for global state management (CartContext)

### **Backend**
- `/routes`: API routes for products, users, and orders
- `/models`: Mongoose models for Product, User, and Order

---

## **Getting Started**

### **Prerequisites**
- Node.js (>= 14.x)
- MongoDB (local or cloud instance)
- npm or yarn package manager

### **Installation**

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/mern-ecommerce.git
   cd mern-ecommerce
   ```

2. Install dependencies for the frontend:
   ```bash
   cd frontend
   npm install
   ```

3. Install dependencies for the backend:
   ```bash
   cd ../backend
   npm install
   ```

4. Create a `.env` file in the `/backend` directory with the following variables:
   ```env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/mern-ecommerce
   JWT_SECRET=your_jwt_secret
   ```

5. Start the backend server:
   ```bash
   npm start
   ```

6. Start the frontend development server:
   ```bash
   cd ../frontend
   npm start
   ```

---

## **API Endpoints**

### **User Routes**
- `POST /api/users/register`: Register a new user
- `POST /api/users/login`: Authenticate user and return token
- `GET /api/users/profile`: Get the authenticated user's profile
- `PUT /api/users/profile`: Update the authenticated user's profile

### **Product Routes**
- `GET /api/products`: Fetch all products
- `POST /api/products/upload`: Admin-only, upload a new product
- `PUT /api/products/:id`: Admin-only, update product details
- `DELETE /api/products/:id`: Admin-only, delete a product

### **Order Routes**
- `POST /api/orders`: Create a new order
- `GET /api/orders/:id`: Fetch a specific order by ID
- `PUT /api/orders/:id/status`: Admin-only, update order status

---

## **Contributing**
1. Fork the repository
2. Create a new branch: `git checkout -b feature-name`
3. Make your changes and commit: `git commit -m 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request


## **Contact**
- **Author**: Mohanprasath.R  
- **Email**: mohanprasathr64@gmail.com  
- **GitHub**: [github.com/Mohanprasath-R)](https://github.com/Mohanprasath-R))
