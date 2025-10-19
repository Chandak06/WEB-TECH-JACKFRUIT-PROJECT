# Login Page - Skill Swap

## Overview
A modern, professional login page with glassmorphism effects, gradient styling, and comprehensive form validation. Matches the design system of the home page.

## Features

### Design Elements
- **Glassmorphism Card**: Frosted glass effect for the login form
- **Gradient Background**: Animated gradient orbs with radial gradients
- **Gradient Button**: Violet → Purple → Pink gradient CTA
- **Hover Effects**: Smooth transitions and scale effects
- **Professional Typography**: Inter font with proper hierarchy

### Form Features
1. **Email Input**
   - Email validation (HTML5)
   - Icon indicator
   - Focus states with violet ring

2. **Password Input**
   - Toggle visibility (show/hide password)
   - Eye icon button
   - Secure input type

3. **Remember Me**
   - Checkbox with custom styling
   - Hover effects

4. **Forgot Password**
   - Link with hover state
   - Ready for password reset flow

5. **Social Login**
   - Google, GitHub, Facebook buttons
   - Icon-only design
   - Hover effects

### Navigation
- **Back to Home**: Arrow button to return to landing page
- **Sign Up Link**: Navigate to registration page
- **Logo**: Clickable to return home

### Responsive Design
- Mobile-first approach
- Optimized for all screen sizes
- Centered layout with max-width container
- Touch-friendly buttons and inputs

## Form State Management
```javascript
const [formData, setFormData] = useState({
  email: '',
  password: '',
  rememberMe: false
});
```

## Color Scheme
Matches the home page:
- **Primary Gradient**: Violet (#8b5cf6) → Purple (#a855f7) → Pink (#ec4899)
- **Background**: Slate-950 (#0f172a)
- **Card Background**: White with 5% opacity + backdrop blur
- **Borders**: White with 10% opacity
- **Text**: White, Slate-300, Slate-400

## Interactions

### Input Focus States
- 2px violet ring
- Border color transition
- Smooth animation (transition-all)

### Button Hover
- Scale transform (1.02x)
- Shadow enhancement
- Gradient color shift

### Social Buttons
- Background color change
- Icon color transition (slate-400 → white)
- Border color shift

## Accessibility
- ✅ Semantic HTML labels
- ✅ ARIA attributes on inputs
- ✅ Keyboard navigation support
- ✅ Focus indicators
- ✅ Color contrast compliance

## Security Features
- Password toggle visibility
- Remember me checkbox
- Forgot password flow
- Form validation (HTML5 + custom)

## Integration Points

### Navigate to Sign Up
```javascript
onClick={() => navigate('/signup')}
```

### Navigate to Home
```javascript
onClick={() => navigate('/')}
```

### Form Submit Handler
```javascript
const handleSubmit = (e) => {
  e.preventDefault();
  console.log('Login attempt:', formData);
  // Add your authentication logic here
};
```

## Next Steps for Backend Integration

1. **Add API Call**
```javascript
const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    const data = await response.json();
    // Handle success/error
  } catch (error) {
    console.error('Login error:', error);
  }
};
```

2. **Add Error Handling**
   - Display error messages
   - Field-level validation
   - API error responses

3. **Add Loading State**
   - Disable button during submission
   - Show loading spinner
   - Prevent double submission

4. **Implement Social Login**
   - OAuth integration
   - Redirect flows
   - Token management

## File Structure
```
src/
└── components/
    └── Login.jsx          # Login page component
```

## Dependencies
- React 19.1.1
- react-router-dom 7.9.4
- Tailwind CSS 4.1.14

## Usage
```javascript
import Login from './components/Login';

// In your router
<Route path="/login" element={<Login/>}/>
```

## Customization

### Change Colors
Edit the gradient classes:
```javascript
// Button gradient
className="bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600"

// Change to blue gradient
className="bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600"
```

### Modify Form Fields
Add new fields in the form:
```javascript
<div>
  <label htmlFor="username">Username</label>
  <input
    type="text"
    id="username"
    name="username"
    // ... other props
  />
</div>
```

## Browser Support
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Performance
- Lightweight component
- CSS animations (GPU accelerated)
- No heavy dependencies
- Fast page load

---

**Version**: 1.0.0  
**Last Updated**: October 19, 2025
