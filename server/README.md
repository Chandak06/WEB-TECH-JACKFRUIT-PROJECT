# Backend for SkillSwap - Complete API

A comprehensive Express server for the SkillSwap project with JWT authentication, filtering, messaging, and statistics.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file (see `.env.example`):
```env
PORT=4000
JWT_SECRET=your-secret-key-change-this
CLIENT_ORIGIN=http://localhost:5173
USE_MONGO=false
```

3. Start server:
```bash
npm run dev   # development with nodemon
npm start     # production
```

## Complete API Documentation

### 🔐 Authentication (JWT-based)

#### User Management
- `POST /api/users/signup` - Create account with email/password → returns JWT token
  - Body: `{ "name": "string", "email": "string", "password": "string" }`
  - Returns: `{ "token": "jwt-token", "user": { "id", "name", "email" } }`

- `POST /api/users/login` - Login with email/password → returns JWT token
  - Body: `{ "email": "string", "password": "string" }`
  - Returns: `{ "token": "jwt-token", "user": { "id", "name", "email" } }`

- `GET /api/users/me` - Get current user info (Protected - requires Bearer token)
  - Headers: `Authorization: Bearer <token>`
  - Returns: `{ "id", "name", "email", "createdAt" }`

#### Legacy Demo Auth (no password)
- `POST /api/auth/signup` - Demo signup
- `POST /api/auth/login` - Demo login

---

### 🎓 Skills Endpoints

#### List Skills (with filtering & pagination)
- `GET /api/skills`
  - Query params:
    - `search` - Search in title, description, or provider
    - `tag` - Filter by tag
    - `level` - Filter by level (Beginner/Intermediate/Advanced)
    - `provider` - Filter by provider name
    - `page` - Page number (default: 1)
    - `limit` - Items per page (default: 20)
  - Returns: 
    ```json
    {
      "skills": [...],
      "total": 50,
      "page": 1,
      "totalPages": 3
    }
    ```

#### Individual Skill Operations
- `GET /api/skills/:id` - Get skill by ID
- `POST /api/skills` - Create new skill
  - Body: `{ "title", "level", "tags": [], "desc", "provider" }`
- `PATCH /api/skills/:id` - Update skill
  - Body: `{ "title"?, "level"?, "tags"?, "desc"?, "provider"? }`
- `DELETE /api/skills/:id` - Delete skill

---

### 📋 Requests Endpoints

#### List Requests (with filtering)
- `GET /api/requests`
  - Query params:
    - `status` - Filter by status (pending/accepted/declined)
    - `from` - Filter by sender
    - `to` - Filter by receiver
    - `skill` - Filter by skill name
  - Returns: Array of request objects

#### Request Operations
- `POST /api/requests` - Create new swap request
  - Body: `{ "skill", "from", "message"?, "date"? }`
- `PATCH /api/requests/:id` - Update request status
  - Body: `{ "status": "accepted" | "declined" | "pending" }`
- `DELETE /api/requests/:id` - Delete request

---

### 👤 User-Specific Endpoints

#### User Skills
- `GET /api/users/:identifier/skills` - Get all skills offered by user
  - `identifier` can be email or name

#### User Requests
- `GET /api/users/:identifier/requests` - Get requests for/by user
  - Query params:
    - `type=sent` - Only sent requests
    - `type=received` - Only received requests
    - (no type) - Both sent and received

#### User Stats
- `GET /api/users/:identifier/stats` - Get user statistics
  - Returns:
    ```json
    {
      "offeredSkills": 5,
      "sentRequests": 10,
      "receivedRequests": 8,
      "acceptedRequests": 6,
      "totalSwaps": 6
    }
    ```

---

### 💬 Messaging Endpoints

#### Send/Receive Messages
- `POST /api/messages` - Send a message
  - Body: `{ "from", "to", "message", "relatedSkill"? }`
  - Returns: Message object with ID

- `GET /api/messages` - Get messages
  - Query params:
    - `user` - Get all messages for this user
    - `with` - Get conversation between `user` and this user
  - Example: `/api/messages?user=john@ex.com&with=jane@ex.com`

- `PATCH /api/messages/:id/read` - Mark message as read

---

### 📊 Dashboard & Statistics

#### Global Stats
- `GET /api/stats` - Get platform-wide statistics
  - Returns:
    ```json
    {
      "totalSkills": 50,
      "totalUsers": 100,
      "totalRequests": 75,
      "pendingRequests": 20,
      "acceptedRequests": 40,
      "activeSwaps": 40,
      "skillsByLevel": {
        "Beginner": 20,
        "Intermediate": 25,
        "Advanced": 5
      },
      "popularTags": [
        { "tag": "react", "count": 15 },
        { "tag": "design", "count": 12 }
      ]
    }
    ```

---

### 👤 Profile Endpoints

- `GET /api/profile` - Get current profile
- `PUT /api/profile` - Update profile
  - Body: `{ "name"?, "email"?, "location"?, "bio"?, "offered"?, "wanted"? }`

---

### ❤️ Health Check

- `GET /api/health` - Server health check
  - Returns: `{ "ok": true, "time": timestamp, "useMongo": boolean }`

---

## Frontend Integration

### JWT Token Flow

1. **After Login/Signup:**
```javascript
const response = await fetch('http://localhost:4000/api/users/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email, password })
});

const { token, user } = await response.json();
localStorage.setItem('token', token);
localStorage.setItem('user', JSON.stringify(user));
// Redirect to dashboard
```

2. **Making Protected Requests:**
```javascript
const token = localStorage.getItem('token');
const response = await fetch('http://localhost:4000/api/users/me', {
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  }
});
```

3. **Filtering Skills:**
```javascript
// Search + filter
fetch('/api/skills?search=react&level=Beginner&tag=web&page=1&limit=10')

// By provider
fetch('/api/skills?provider=John Doe')
```

---

## Page-to-Endpoint Mapping

### 1. **HomePage** (`/`)
- `GET /api/stats` - Show platform stats
- `GET /api/skills?limit=5` - Featured skills preview

### 2. **LoginPage** (`/login`)
- `POST /api/users/login` - Login endpoint

### 3. **SignupPage** (`/signup`)
- `POST /api/users/signup` - Signup endpoint

### 4. **DashboardPage** (`/dashboard`)
- `GET /api/users/:id/skills` - User's offered skills
- `GET /api/users/:id/requests` - User's requests
- `GET /api/users/:id/stats` - User stats

### 5. **SkillsPage** (`/skills`)
- `GET /api/skills` - List all skills with filters
- Use query params: `?search=...&tag=...&level=...`

### 6. **SkillDetailsPage** (`/skill/:id`)
- `GET /api/skills/:id` - Get specific skill
- `POST /api/requests` - Request this skill
- `POST /api/messages` - Message skill provider

### 7. **OfferSkillPage** (`/offer`)
- `POST /api/skills` - Create new skill offer

### 8. **RequestsPage** (`/requests`)
- `GET /api/requests?status=pending` - Pending requests
- `PATCH /api/requests/:id` - Accept/Decline
- `DELETE /api/requests/:id` - Delete request

### 9. **ProfilePage** (`/profile`)
- `GET /api/profile` - Get profile
- `PUT /api/profile` - Update profile
- `GET /api/users/:id/skills` - Skills offered
- `GET /api/users/:id/stats` - User stats

---

## Storage Options

### File-based (Default)
Uses `data.json` for persistence. Good for development and demos.

### MongoDB
Set `USE_MONGO=true` in `.env` and provide `SERVERLINK`.

```env
USE_MONGO=true
SERVERLINK=mongodb+srv://user:pass@cluster.mongodb.net/
DB_NAME=skillswap
```

---

## Security Notes

1. **Change JWT_SECRET** in production to a strong random string
2. Passwords are hashed with bcryptjs (10 salt rounds)
3. JWT tokens expire in 7 days
4. Use HTTPS in production
5. Add rate limiting for auth endpoints in production

---

## Error Responses

All errors follow this format:
```json
{
  "error": "Error message here"
}
```

Common status codes:
- `400` - Bad Request (missing/invalid parameters)
- `401` - Unauthorized (no token)
- `403` - Forbidden (invalid token)
- `404` - Not Found
- `500` - Internal Server Error
