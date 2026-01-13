# 🏠 Real Estate Management System - v2.1.0

A comprehensive real estate property management system with advanced security features, built with Node.js, Express, and MongoDB.

## 🚀 Version 2.1.0 - Security Enhanced Release

This release introduces comprehensive security implementations including JWT authentication, password hashing, input sanitization, and rate limiting.

---

## 📋 Table of Contents

- [Features](#features)
- [Security Features](#security-features)
- [Technology Stack](#technology-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Test Credentials](#test-credentials)
- [Security Testing](#security-testing)
- [Production Deployment Considerations](#production-deployment-considerations)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

---

## ✨ Features

### Core Functionality
- **User Management**: Multi-role support (Admin/Agent) with secure authentication
- **Property Listings**: Complete CRUD operations for property management
- **Inquiry System**: Track and manage customer inquiries
- **Dashboard Analytics**: Real-time statistics and insights
- **Responsive Design**: Mobile-friendly interface

### Business Features
- Property search and filtering
- Image upload and management
- Agent assignment to properties
- Inquiry tracking and management
- Activity monitoring and audit logs

---

## 🔒 Security Features

### Authentication & Authorization
- **JWT Authentication**: Secure token-based authentication with 8-hour session expiration
- **Role-Based Access Control (RBAC)**: Granular permissions for admin and agent roles
- **Secure Session Management**: HTTP-only cookies with automatic token refresh

### Password Security
- **Bcrypt Password Hashing**: Industry-standard hashing with 10 salt rounds
- **Automatic Password Migration**: Utility to convert legacy plain-text passwords to hashed format
- **Password Complexity**: Enforced strong password requirements

### Input Validation & Sanitization
- **Express-Validator Integration**: Comprehensive input sanitization middleware
- **XSS Protection**: Automatic escaping and sanitization of user inputs
- **SQL Injection Prevention**: Parameterized queries and input validation

### Rate Limiting
- **Login Attempt Limiting**: Maximum 5 login attempts per 15 minutes per IP
- **Inquiry Submission Limiting**: Maximum 3 inquiries per hour per IP
- **DDoS Protection**: Prevents automated abuse and brute force attacks

### Additional Security Measures
- **CORS Configuration**: Restricted cross-origin resource sharing
- **Helmet.js Integration**: Security headers and best practices
- **Password Field Protection**: Automatic exclusion from API responses
- **Audit Logging**: Track security-relevant events and access attempts

---

## 🛠 Technology Stack

### Backend
- **Node.js** (v14+) - JavaScript runtime
- **Express.js** (v4.18+) - Web application framework
- **MongoDB** (v5+) - NoSQL database
- **Mongoose** (v7+) - MongoDB object modeling

### Security Packages
- **jsonwebtoken** (v9.0+) - JWT authentication
- **bcryptjs** (v2.4+) - Password hashing
- **express-validator** (v7.0+) - Input validation and sanitization
- **express-rate-limit** (v6.0+) - Rate limiting middleware
- **helmet** (v7.0+) - Security headers
- **cors** - Cross-origin resource sharing

### Frontend
- **EJS** - Template engine
- **Bootstrap 5** - CSS framework
- **JavaScript (ES6+)** - Client-side scripting

### Development Tools
- **Nodemon** - Auto-restart development server
- **dotenv** - Environment variable management

---

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14.0.0 or higher)
- **MongoDB** (v5.0 or higher)
- **npm** or **yarn** package manager
- **Git** for version control

---

## 🔧 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/HansLagmay/SIAfrontendonlyFINAL.git
cd SIAfrontendonlyFINAL
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env` file in the root directory:

```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/real-estate-db
JWT_SECRET=your-super-secure-jwt-secret-key-min-32-characters
NODE_ENV=development
```

### 4. Initialize Database

Start MongoDB service:

```bash
# On Windows
net start MongoDB

# On macOS/Linux
sudo systemctl start mongod
```

### 5. Run Password Migration (If Upgrading from v2.0)

If you're upgrading from a previous version with plain-text passwords:

```bash
node utils/migrate-passwords.js
```

This utility will:
- Identify all users with plain-text passwords
- Hash passwords using bcrypt with 10 salt rounds
- Update database records
- Provide migration report

---

## 🌍 Environment Variables

### Required Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | Server port number | `3000` |
| `MONGODB_URI` | MongoDB connection string | `mongodb://localhost:27017/real-estate-db` |
| `JWT_SECRET` | Secret key for JWT signing (min 32 chars) | `your-super-secure-secret-key-here` |
| `NODE_ENV` | Environment mode | `development` or `production` |

### Optional Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `JWT_EXPIRES_IN` | JWT token expiration time | `8h` |
| `BCRYPT_ROUNDS` | Bcrypt salt rounds | `10` |
| `LOGIN_RATE_LIMIT` | Max login attempts per window | `5` |
| `LOGIN_RATE_WINDOW` | Login rate limit window (ms) | `900000` (15 min) |
| `INQUIRY_RATE_LIMIT` | Max inquiries per window | `3` |
| `INQUIRY_RATE_WINDOW` | Inquiry rate limit window (ms) | `3600000` (1 hour) |

### Security Best Practices for Environment Variables

⚠️ **IMPORTANT**:
- Never commit `.env` files to version control
- Use strong, randomly generated JWT_SECRET (minimum 32 characters)
- Rotate JWT_SECRET periodically in production
- Use different secrets for development and production
- Consider using environment-specific secret management tools (AWS Secrets Manager, Azure Key Vault, etc.)

---

## ▶️ Running the Application

### Development Mode

```bash
npm run dev
```

This starts the server with nodemon for auto-reloading on file changes.

### Production Mode

```bash
npm start
```

The application will be available at: `http://localhost:3000`

---

## 🔌 API Endpoints

### Authentication Endpoints (Public)

| Method | Endpoint | Description | Rate Limited |
|--------|----------|-------------|--------------|
| POST | `/api/auth/login` | User login | ✅ 5/15min |
| POST | `/api/auth/register` | User registration | ❌ |
| POST | `/api/auth/logout` | User logout | ❌ |

### User Endpoints (Protected - JWT Required)

| Method | Endpoint | Description | Roles |
|--------|----------|-------------|-------|
| GET | `/api/users` | Get all users | Admin |
| GET | `/api/users/:id` | Get user by ID | Admin |
| PUT | `/api/users/:id` | Update user | Admin |
| DELETE | `/api/users/:id` | Delete user | Admin |
| GET | `/api/users/profile` | Get current user profile | All |

### Property Endpoints (Protected - JWT Required)

| Method | Endpoint | Description | Roles |
|--------|----------|-------------|-------|
| GET | `/api/properties` | Get all properties | All |
| GET | `/api/properties/:id` | Get property by ID | All |
| POST | `/api/properties` | Create property | Admin, Agent |
| PUT | `/api/properties/:id` | Update property | Admin, Agent (own) |
| DELETE | `/api/properties/:id` | Delete property | Admin |

### Inquiry Endpoints

| Method | Endpoint | Description | Rate Limited | Auth |
|--------|----------|-------------|--------------|------|
| POST | `/api/inquiries` | Submit inquiry | ✅ 3/hour | ❌ |
| GET | `/api/inquiries` | Get all inquiries | ❌ | ✅ Admin |
| GET | `/api/inquiries/:id` | Get inquiry by ID | ❌ | ✅ Admin |
| PUT | `/api/inquiries/:id` | Update inquiry status | ❌ | ✅ Admin |

### Dashboard Endpoints (Protected - Admin Only)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/dashboard/stats` | Get dashboard statistics |
| GET | `/api/dashboard/recent-activities` | Get recent activities |

---

## 🔑 Test Credentials

### Admin Account
- **Email**: `admin@realestate.com`
- **Password**: `Admin123!` (hashed in database)
- **Role**: Admin
- **Permissions**: Full system access

### Agent Account
- **Email**: `agent@realestate.com`
- **Password**: `Agent123!` (hashed in database)
- **Role**: Agent
- **Permissions**: Property management, view inquiries

### Security Notes
- ⚠️ All passwords are now **hashed** using bcrypt with 10 salt rounds
- Plain-text passwords are no longer stored in the database
- Passwords must meet complexity requirements (8+ chars, uppercase, lowercase, number, special char)
- Failed login attempts are tracked and rate-limited
- Change default passwords immediately in production

---

## 🧪 Security Testing

### Testing Authentication

```bash
# Test login with valid credentials
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@realestate.com","password":"Admin123!"}'

# Test protected endpoint with JWT token
curl -X GET http://localhost:3000/api/users \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### Testing Rate Limiting

```bash
# Test login rate limiting (should block after 5 attempts)
for i in {1..6}; do
  curl -X POST http://localhost:3000/api/auth/login \
    -H "Content-Type: application/json" \
    -d '{"email":"test@test.com","password":"wrong"}'
done
```

### Testing Input Sanitization

```bash
# Test XSS protection
curl -X POST http://localhost:3000/api/inquiries \
  -H "Content-Type: application/json" \
  -d '{"name":"<script>alert(\"XSS\")</script>","email":"test@test.com"}'
```

### Security Audit Checklist

- [ ] JWT tokens expire after 8 hours
- [ ] Passwords are hashed (not stored in plain text)
- [ ] Rate limiting is active on login and inquiry endpoints
- [ ] Input sanitization prevents XSS attacks
- [ ] Protected routes require valid JWT tokens
- [ ] Role-based access control is enforced
- [ ] Security headers are present (Helmet.js)
- [ ] CORS is properly configured
- [ ] Environment variables are secured

---

## 🚀 Production Deployment Considerations

### Security Hardening

1. **Environment Configuration**
   - Use strong, randomly generated JWT_SECRET (minimum 32 characters)
   - Set `NODE_ENV=production`
   - Enable HTTPS/TLS encryption
   - Configure proper CORS whitelist

2. **Database Security**
   - Enable MongoDB authentication
   - Use connection string with credentials
   - Implement database backups
   - Enable MongoDB encryption at rest
   - Restrict database network access

3. **Rate Limiting Adjustments**
   - Consider stricter rate limits for production
   - Implement IP whitelisting for admin access
   - Use Redis for distributed rate limiting (multi-server deployments)

4. **Monitoring & Logging**
   - Implement centralized logging (Winston, Bunyan)
   - Set up security event monitoring
   - Configure alerts for suspicious activities
   - Enable audit trails for sensitive operations

5. **Infrastructure Security**
   - Use reverse proxy (Nginx, Apache)
   - Implement firewall rules
   - Enable intrusion detection systems
   - Regular security patches and updates

### Performance Optimization

- Enable response compression (gzip)
- Implement caching strategies (Redis)
- Use CDN for static assets
- Database indexing for frequently queried fields
- Connection pooling for database
- Load balancing for horizontal scaling

### Deployment Platforms

- **Docker**: Containerize the application
- **Cloud Platforms**: AWS, Azure, Google Cloud
- **PaaS**: Heroku, DigitalOcean App Platform
- **Kubernetes**: For orchestration at scale

### Pre-Deployment Checklist

- [ ] All environment variables configured
- [ ] Database migrations completed
- [ ] Passwords migrated to bcrypt
- [ ] SSL/TLS certificates installed
- [ ] Security headers verified
- [ ] Rate limiting tested
- [ ] Backup strategy implemented
- [ ] Monitoring and alerts configured
- [ ] Load testing completed
- [ ] Security audit performed

---

## 📁 Project Structure

```
SIAfrontendonlyFINAL/
├── config/
│   ├── database.js          # MongoDB connection configuration
│   └── auth.js              # JWT and authentication config
├── middleware/
│   ├── auth.js              # JWT authentication middleware
│   ├── roleCheck.js         # Role-based access control
│   ├── rateLimiter.js       # Rate limiting configuration
│   └── validator.js         # Input validation and sanitization
├── models/
│   ├── User.js              # User model with bcrypt hashing
│   ├── Property.js          # Property model
│   └── Inquiry.js           # Inquiry model
├── routes/
│   ├── auth.js              # Authentication routes
│   ├── users.js             # User management routes
│   ├── properties.js        # Property routes
│   ├── inquiries.js         # Inquiry routes
│   └── dashboard.js         # Dashboard routes
├── controllers/
│   ├── authController.js    # Authentication logic
│   ├── userController.js    # User CRUD operations
│   ├── propertyController.js # Property CRUD operations
│   └── inquiryController.js # Inquiry handling
├── utils/
│   ├── migrate-passwords.js # Password migration utility
│   └── tokenUtils.js        # JWT helper functions
├── views/
│   ├── login.ejs
│   ├── dashboard.ejs
│   └── ...
├── public/
│   ├── css/
│   ├── js/
│   └── images/
├── .env.example             # Example environment variables
├── .gitignore
├── package.json
├── server.js                # Application entry point
├── SECURITY_IMPLEMENTATION_COMPLETE.md  # Security documentation
└── README.md                # This file
```

---

## 🤝 Contributing

Contributions are welcome! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Security Contributions

If you discover a security vulnerability:
1. **DO NOT** open a public issue
2. Email security concerns to: [your-email@example.com]
3. Allow 48 hours for initial response
4. Provide detailed information about the vulnerability

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 📞 Support

For questions or support:
- **GitHub Issues**: [Open an issue](https://github.com/HansLagmay/SIAfrontendonlyFINAL/issues)
- **Email**: support@realestate.com
- **Documentation**: [Wiki](https://github.com/HansLagmay/SIAfrontendonlyFINAL/wiki)

---

## 🎯 Roadmap

### v2.2.0 (Planned)
- Two-factor authentication (2FA)
- OAuth integration (Google, Facebook)
- Advanced audit logging
- Email notification system
- Real-time chat support

### v2.3.0 (Future)
- GraphQL API
- Mobile application (React Native)
- Advanced analytics dashboard
- Property valuation ML model
- Multi-language support

---

## 🙏 Acknowledgments

- MongoDB team for excellent database documentation
- Express.js community for middleware packages
- JWT.io for authentication best practices
- OWASP for security guidelines

---

**Version**: 2.1.0  
**Last Updated**: January 13, 2026  
**Maintained by**: HansLagmay

---

⭐ If you find this project helpful, please consider giving it a star on GitHub!
