# 🎓 Skill Swap - Peer-to-Peer Learning Platform

A modern, professional skill-sharing platform where users can learn from peers and share their expertise. Built with React, Vite, and Tailwind CSS.

## ✨ Features

### 🏠 Landing Page
- Professional hero section with gradient effects
- Feature highlights with glassmorphism cards
- User testimonials
- Responsive design optimized for all devices

### 🔐 Authentication
- **Login Page**: Secure sign-in with social login options (Google, GitHub, Facebook)
- **Sign Up Page**: User registration with password confirmation and terms acceptance
- Password visibility toggles
- Form validation

### 📊 Dashboard
- **Quick Stats**: Sessions completed, hours learned, skills mastered, points earned
- **Upcoming Sessions**: View next scheduled mentorship sessions
- **Recommended Skills**: Personalized skill recommendations
- **Quick Actions**: Fast navigation to browse, messages, and profile

### 🔍 Browse Page
- **Dual View Mode**: Switch between Skills and Mentors view
- **Advanced Filters**: Filter by category, level, price range
- **Real-time Search**: Search skills or mentors instantly
- **Skill Cards**: Beautiful cards showing ratings, sessions, pricing
- **Mentor Cards**: User profiles with skills, ratings, and availability

### 📅 My Sessions Page
- **Tabbed Interface**: Upcoming, Completed, and Cancelled sessions
- **Session Stats**: Total sessions, hours, and status tracking
- **Session Management**: Join, reschedule, or cancel sessions
- **Review System**: Leave reviews for completed sessions

### 🧩 Shared Components
- **Navbar**: Responsive navigation with user profile dropdown
- **SkillCard**: Reusable skill display component
- **UserCard**: Mentor/user profile cards
- **SessionCard**: Session information display

## 🎨 Design System

### Color Palette
- **Primary Gradient**: `violet-600 → purple-600 → pink-600`
- **Background**: `slate-950` with gradient overlays
- **Glassmorphism**: `backdrop-blur-xl` with `bg-white/5-10`
- **Borders**: `border-white/10-20`

### Typography
- **Font**: Inter (Google Fonts)
- **Headings**: Bold, gradient text effects
- **Body**: `text-slate-300/400`

### Effects
- **Hover States**: Scale transformations, color transitions
- **Shadows**: Colored shadows (`shadow-violet-500/30`)
- **Animations**: Pulse, fade-in, floating orbs
- **Blur**: Backdrop blur for glassmorphism

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1. **Navigate to client directory:**
```bash
cd client
```

2. **Install dependencies:**
```bash
npm install
```

3. **Start development server:**
```bash
npm run dev
```

4. **Open browser:**
Navigate to `http://localhost:5173`

## 📁 Project Structure

```
client/
├── public/              # Static assets
├── src/
│   ├── components/
│   │   ├── shared/      # Reusable components
│   │   │   ├── Navbar.jsx
│   │   │   ├── SkillCard.jsx
│   │   │   ├── UserCard.jsx
│   │   │   └── SessionCard.jsx
│   │   ├── Home.jsx     # Landing page
│   │   ├── Login.jsx    # Login page
│   │   ├── SignUp.jsx   # Registration page
│   │   ├── Dashboard.jsx # Main dashboard
│   │   ├── Browse.jsx   # Browse skills/mentors
│   │   └── MySessions.jsx # Sessions management
│   ├── App.jsx          # Main app component
│   ├── main.jsx         # Entry point
│   └── index.css        # Global styles
├── package.json
└── vite.config.js
```

## 🛠️ Technologies Used

### Frontend
- **React 19.1.1**: UI library
- **React Router DOM 7.9.4**: Client-side routing
- **Tailwind CSS 4.1.14**: Utility-first CSS framework
- **Vite**: Build tool and dev server

### Design
- **Glassmorphism**: Modern UI design pattern
- **Gradient Effects**: Beautiful color transitions
- **SVG Icons**: Custom inline icons
- **Google Fonts**: Inter font family

## 🔮 Upcoming Features

### Pages to Build
- [ ] User Profile Page (`/profile/:id`)
- [ ] Messages/Chat Page (`/messages`)
- [ ] Booking/Schedule Page (`/book/:mentorId`)
- [ ] Settings Page (`/settings`)
- [ ] Help/FAQ Page (`/help`)

### Features to Add
- [ ] Authentication Context (JWT tokens)
- [ ] Protected Routes
- [ ] API Integration
- [ ] Real-time Messaging
- [ ] Video Call Integration
- [ ] Payment Processing
- [ ] Notification System
- [ ] Reviews & Ratings
- [ ] Calendar Integration
- [ ] User Analytics

## 🎯 Available Routes

### Public Routes
- `/` - Landing page
- `/login` - Login page
- `/signup` - Registration page

### Protected Routes (Auth required)
- `/dashboard` - Main dashboard
- `/browse` - Browse skills and mentors
- `/sessions` - My sessions management
- `/profile/:id` - User profile (Coming soon)
- `/messages` - Messaging (Coming soon)
- `/settings` - User settings (Coming soon)

## 📝 Scripts

```json
{
  "dev": "vite",           // Start development server
  "build": "vite build",   // Build for production
  "preview": "vite preview" // Preview production build
}
```

## 🎨 Customization

### Colors
Edit Tailwind configuration to change color scheme:
```javascript
// tailwind.config.js
theme: {
  extend: {
    colors: {
      // Add custom colors here
    }
  }
}
```

### Layout
All components use the same layout pattern:
- Fixed background with gradients
- Navbar at top
- Content wrapper with max-width
- Responsive padding

## 🐛 Known Issues

- Social login buttons are UI only (OAuth integration pending)
- Sessions data is mock data (API integration needed)
- No real-time updates yet
- File upload not implemented

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is part of a web technology course assignment.

## 👥 Team

- **Project**: Skill Swap Platform
- **Repository**: WEB-TECH-JACKFRUIT-PROJECT
- **Owner**: Chandak06

## 🙏 Acknowledgments

- Design inspiration from modern SaaS platforms
- Tailwind CSS for the amazing utility classes
- React team for the powerful UI library
- Vite for the blazing-fast dev experience

---

**Built with ❤️ using React, Tailwind CSS, and modern web technologies**
