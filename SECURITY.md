# Security Guide

## Critical Security Notes

⚠️ **IMPORTANT**: This application has security measures in place, but requires proper configuration for production deployment.

## Environment Variables Required

### Essential Security Configuration

Create a `.env` file in the `server` directory with the following variables:

```bash
# REQUIRED: Admin access key for protected endpoints
ADMIN_KEY=your-super-secret-admin-key-change-this

# REQUIRED: Database authentication (for production)
MONGO_USER=admin
MONGO_PASSWORD=strong-password-here

# REQUIRED: JWT secret for future authentication
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Optional: Production URL for CORS
PRODUCTION_URL=https://yourdomain.com
```

## Security Features Implemented

### 1. Admin Endpoint Protection

-   **Contact data access** (`GET /api/contact`) requires `X-Admin-Key` header
-   Rate limiting: 5 requests per hour for contact form submissions
-   General rate limiting: 100 requests per 15 minutes per IP

### 2. Input Sanitization

-   **Email content sanitization** prevents XSS attacks
-   HTML entities escaped in email templates
-   Input length limits on contact form fields

### 3. Database Security

-   **MongoDB authentication** support
-   Database credentials stored in environment variables
-   Connection string authentication automatically added when credentials provided

### 4. Docker Security

-   **MongoDB port removed** from public exposure
-   Database only accessible within Docker network
-   Environment-based authentication configuration

### 5. CORS Protection

-   **Origin restrictions** based on environment
-   Multiple allowed origins for development
-   Production URL support through environment variable

## Production Deployment Checklist

### Before Deploying:

1. **Set Strong Secrets**:

    ```bash
    # Generate strong random keys
    ADMIN_KEY=$(openssl rand -base64 32)
    JWT_SECRET=$(openssl rand -base64 64)
    ```

2. **Configure Database Authentication**:

    ```bash
    # Set in .env
    MONGO_USER=your_admin_user
    MONGO_PASSWORD=very_strong_password_123!
    ```

3. **Set Production URL**:

    ```bash
    NODE_ENV=production
    PRODUCTION_URL=https://yourdomain.com
    CLIENT_URL=https://yourdomain.com
    ```

4. **Enable HTTPS**: Ensure your hosting platform provides SSL/TLS certificates

5. **Regular Security Updates**: Keep all dependencies updated
    ```bash
    npm audit fix
    ```

## API Authentication

### Protected Endpoints

#### Get Contact Messages (Admin Only)

```bash
GET /api/contact
Headers:
  X-Admin-Key: your-admin-key-here
```

**Example**:

```javascript
fetch("/api/contact", {
    headers: {
        "X-Admin-Key": "your-admin-key-here",
    },
});
```

## Security Headers

The application includes security headers via Helmet.js:

-   Content Security Policy (CSP)
-   X-Frame-Options: DENY
-   X-Content-Type-Options: nosniff
-   Referrer-Policy: no-referrer
-   And more...

## Rate Limiting

### Contact Form

-   **5 submissions per hour** per IP address
-   Prevents spam and abuse

### General API

-   **100 requests per 15 minutes** per IP address
-   Protects against brute force attacks

## Input Validation

### Contact Form

-   **Email validation**: Must be valid email format
-   **Required fields**: Name, email, message are required
-   **Length limits**:
    -   Name: max 100 characters
    -   Email: max 254 characters
    -   Message: max 5000 characters

### Email Security

-   **HTML sanitization**: Prevents XSS in email content
-   **Template injection protection**: User input is escaped

## MongoDB Security

### Authentication (Production)

```yaml
# docker-compose.yml
services:
    mongo:
        environment:
            MONGO_INITDB_ROOT_USERNAME: admin
            MONGO_INITDB_ROOT_PASSWORD: ${MONGO_PASSWORD}
        # No exposed ports in production
```

### Connection String

```javascript
// Automatically constructed with authentication
mongodb://username:password@host:port/database?authSource=admin
```

## Future Security Enhancements

### Recommended Additions:

1. **JWT-based authentication** for admin panel
2. **CSRF protection** for state-changing operations
3. **Request logging** and monitoring
4. **API versioning** with deprecation notices
5. **Content validation** for blog posts (if user-generated)

## Security Monitoring

### What to Monitor:

-   Failed admin authentication attempts
-   Unusual rate limit violations
-   Database connection failures
-   Email sending errors

### Logs to Review:

-   Server console logs
-   Rate limiter violations
-   Database authentication failures

## Incident Response

### If Security Breach Suspected:

1. **Immediately change** `ADMIN_KEY` and `JWT_SECRET`
2. **Rotate database credentials**
3. **Review server logs** for suspicious activity
4. **Update all dependencies**
5. **Consider temporary shutdown** if breach confirmed

## Contact

If you discover security vulnerabilities, please report them responsibly:

-   Create a private issue in the repository
-   Email the maintainer directly
-   Do not disclose publicly until fixed

---

**Last Updated**: January 2025
**Security Review**: Complete
**Next Review Due**: Every 3 months or after major updates
