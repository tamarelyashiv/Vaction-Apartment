
# 🏖️ Vacation Rental Marketing Website
## Overview
This project is a **Vacation Rental Marketing Website** that allows users to **browse, filter, and view vacation rental listings securely**. It includes both **Admin and Client interfaces**, with a strong focus on security using **bcrypt** for password hashing and **JWT** for secure session management.

---

## Features

### 🔐 Security & Authentication:
- Password hashing with **bcrypt**
- Session management with **JWT (JSON Web Tokens)**

### 🛠️ Admin Interface:
- Add new vacation rentals
- Update existing rental details
- Delete rentals (optional)

### 👤 Client Interface:
- View list of vacation rentals
- View detailed information for each rental
- Filter rentals based on various criteria (price, location, size, dates, etc.)

---

## 🧰 Technologies

- **Backend**: Node.js with Express.js  
- **Frontend**: React  
- **Database**: MongoDB  
- **Security**: bcrypt + JWT  

---

## 🛠️ Installation and Running

### 🔧 Backend

1. Navigate to the server folder:
   ```bash
   cd server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set environment variables (e.g., in `.env` file):
   ```env
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   ```

4. Start the server:
   ```bash
   npm start
   ```

---

### 💻 Frontend

1. Navigate to the client folder:
   ```bash
   cd client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the React application:
   ```bash
   npm start
   ```

4. Open your browser at:
   [http://localhost:3000](http://localhost:3000)

---

## 📁 Project Structure

```
/server
  /controllers
  /models
  /routes
  /middleware
  server.js

/client
  /src
    /components
    /services
    /pages
    App.js
```

---

## 🔒 Security

- Passwords are hashed with **bcrypt** before storing in the database.
- User authentication uses **JWT** to protect sensitive routes.
- Role-based access control (Admin / Client).

---

## 🚀 Usage

- Users can register and log in.
- Admins can add, update, and delete vacation rentals.
- Clients can browse, filter, and view detailed rental information.

---

## 🤝 Contributions

Contributions and suggestions are welcome!  
Please open an issue or submit a pull request.

---

## 📄 License

This project is licensed under the **MIT License**.

---

## 📬 Contact

For questions or support:  
📧 tamar29455@gmail.com
