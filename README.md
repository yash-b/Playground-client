# 🚀 AI Utility Web App

A modern, full-stack web application featuring AI-powered tools and communication utilities. Built with a React + Vite frontend and a Node.js + TypeScript backend, this project showcases real-time object detection, SMS messaging, and secure contact workflows.

---

## ✨ Features

### 🧠 Object Detection (AI)
- Real-time object detection using webcam
- Powered by TensorFlow.js and COCO-SSD
- Canvas overlay with bounding boxes
- Live video processing in the browser

### 📩 SMS Sender
- Send SMS messages via API
- Secure password-protected access
- Emoji keyboard support 😊
- Backend validation using environment variables

### 📬 Contact Me
- Users can send messages directly from the app
- Email delivery using Nodemailer + Gmail
- Spam protection via honeypot field
- Backend validation and error handling

### 🔐 Security
- Password-protected endpoints for sensitive actions
- Environment variable usage for secrets
- Basic anti-spam measures

---

## 🧱 Tech Stack

### Frontend
- React (with TypeScript)
- Vite
- React Router
- TensorFlow.js (`@tensorflow/tfjs`)
- COCO-SSD model (`@tensorflow-models/coco-ssd`)

### Backend
- Node.js
- Express
- TypeScript
- Nodemailer (Gmail SMTP)

---

## 🎨 UI Improvements (Planned / Ideas)

- Dark mode toggle 🌙  
- Animated hover effects  
- Modern font integration  
- Better emoji picker UX  
- Mobile responsiveness  

---

## 🧠 Future Enhancements

- AI chat assistant component  
- Image upload + detection (not just webcam)  
- Message history / logs  
- User authentication (JWT)  
- Rate limiting for APIs  

---

## 🐛 Known Issues

- Emoji picker may overflow container  
- Webcam permissions required for object detection  
- Gmail SMTP may fail without proper setup  

---

## 📌 Notes

- This project is designed as a **modular set of standalone tools**  
- Focused on **real-time interaction + practical utilities**  
- Built to demonstrate both **frontend UX** and **backend API design**