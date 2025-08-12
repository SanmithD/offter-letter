### OfferLetter 📋
A modern job portal platform with AI-powered job recommendations and intelligent matching system built with React and Node.js.

## 🚀 Overview
OfferLetter is a comprehensive job portal that connects job seekers with employers through an intuitive interface and AI-driven recommendations. The platform offers personalized job matching, easy job posting, and an integrated AI chat system for enhanced user experience.

## Live
https://offter-letter-client.vercel.app/

## ✨ Features
# For Job Seekers
🔍 Smart Job Search - Find relevant opportunities with advanced filtering

🤖 AI Job Recommendations - Get personalized job suggestions based on your profile

📊 Profile Management - Comprehensive profile creation and editing system

💬 AI Chat Assistant - Get instant help and career guidance

📱 Responsive Design - Seamless experience across all devices

# For Employers
📝 Easy Job Posting - Post jobs with detailed requirements and descriptions

👥 Candidate Discovery - Find the right talent for your organization

⚡ Quick Application Management - Streamlined hiring process

# AI-Powered Features
🎯 Custom AI Agent - Personalized job matching algorithm

💡 Smart Recommendations - AI analyzes user profiles for better job matches

🗨️ Interactive Chat - AI-powered chat for career guidance and support

## 🛠️ Tech Stack
# Frontend
React 18 - Modern UI library with hooks

Vite - Fast build tool and development server

React Router - Client-side routing

Tailwind CSS - Utility-first CSS framework

Lucide React - Beautiful SVG icons

React Hot Toast - Elegant notifications

# Backend
Node.js - Server-side JavaScript runtime

Express.js - Web application framework

Gemini api - Api Key for ai agent

MongoDB - NoSQL database

Multer - File upload handling

bcrypt - Password hashing

JWT - Authentication tokens

## 🚀 Getting Started
Prerequisites
Node.js (v16 or higher)

npm

MongoDB

# Installation
Clone the repository

```bash
git clone https://github.com/SanmithD/offter-letter.git
cd offter-letter
```
## Install dependencies
# Install frontend dependencies
```bash
cd client
npm install
```
# Install backend dependencies (if separate)
```bash 
cd server
npm install
Environment Setup
```

# Create .env file in root directory
cp .env.example .env
Configure your environment variables:

MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
GEMINI_API_KEY=api_key

Start the development server

# Start frontend

```bash
npm run dev
```

# Start backend (in separate terminal)
```bash 
npm run server
Open your browser
```

## 📁 Project Structure

```bash
text
offter-letter/
├── public/
│   ├── offerLogo.png
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Header.jsx
│   │   └── skeletons/
│   ├── pages/
│   │   ├── Profile.jsx
│   │   ├── Signup.jsx
│   │   └── UpdateProfile.jsx
│   ├── store/
│   │   ├── UserStore.js
│   │   └── UseThemeStore.js
│   ├── utils/
│   └── App.jsx
├── server/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── middleware/
└── package.json
```

## 🎯 Key Features Implementation
User Authentication & Profiles
Multi-step registration with file uploads

Secure JWT-based authentication

Comprehensive profile management

Resume and profile picture uploads

Job Management
Advanced job posting system

AI-powered job recommendations

Smart search and filtering

Application tracking

AI Integration
Custom recommendation algorithm

Interactive chat assistant

Profile-based job matching

Career guidance system

## 🔧 Configuration
Vercel Deployment
The project includes a vercel.json configuration for seamless deployment:

```bash
json
{
    "rewrites": [
        { "source": "/(.*)", "destination": "/" }
    ]
}
```

## File Upload Configuration
Supports profile pictures (JPG, PNG, GIF)

Resume uploads (PDF, DOC, DOCX)

Cloudinary integration for file storage

## 🤝 Contributing
We welcome contributions! Please follow these steps:

Fork the repository

Create a feature branch (git checkout -b feature/AmazingFeature)

Commit your changes (git commit -m 'Add some AmazingFeature')

Push to the branch (git push origin feature/AmazingFeature)

Open a Pull Request

## 🎨 UI/UX Features
Dark/Light Mode - Toggle between themes

Responsive Design - Mobile-first approach

Smooth Animations - Enhanced user experience

Modern Interface - Clean and intuitive design

Accessibility - WCAG compliant components

## 🔒 Security Features
Password hashing with bcrypt

JWT token authentication

File upload validation

Input sanitization

CORS protection

## 📊 Performance
Vite for fast development and builds

Code splitting for optimal loading

Image optimization

Lazy loading components

Efficient state management

## 🐛 Known Issues
File upload size limitations

Browser compatibility with older versions

Some AI features may require additional API keys

## 📄 License
This project is licensed under the MIT License - see the LICENSE file for details.

## 👨💻 Author
Sanmith Devadiga

GitHub: @SanmithD

Project Link: https://github.com/SanmithD/offter-letter

## 🙏 Acknowledgments
TanStack for powerful data management tools

React community for excellent libraries

Contributors who helped improve the project

Open source community for inspiration

## Made with ❤️ by Sanmith Devadiga
