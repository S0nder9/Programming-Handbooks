// Глава: Полезные библиотеки - Авторизация и аутентификация Google Firebase с использованием Mongoose и React

// Firebase — это облачная платформа, предоставляющая мощные инструменты для аутентификации пользователей.
// В этой главе мы рассмотрим, как настроить аутентификацию с использованием Google Firebase,
// интегрируя его с серверной частью (Node.js с использованием Mongoose) и клиентской частью (React).

// Шаг 1: Установка необходимых библиотек
// На серверной стороне (Node.js) установим следующие библиотеки:
// npm install firebase-admin mongoose express jsonwebtoken bcryptjs

// На клиентской стороне (React) установим библиотеку Firebase для работы с аутентификацией:
// npm install firebase react-firebase-hooks

// Шаг 2: Настройка Firebase в проекте
// 1. Создайте проект Firebase на https://console.firebase.google.com/
// 2. Перейдите в раздел Authentication и включите Google Sign-In в качестве метода входа.
// 3. Настройте учетные данные Firebase на клиенте и сервере.

// Настройка Firebase на клиентской стороне (React):

// src/firebase.js
import firebase from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
};

// Инициализация Firebase
firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const googleProvider = new firebase.auth.GoogleAuthProvider();

// Шаг 3: Реализация авторизации на клиенте (React)

// src/components/Login.js
import React from 'react';
import { auth, googleProvider } from '../firebase';

function Login() {
  const handleGoogleSignIn = async () => {
    try {
      const result = await auth.signInWithPopup(googleProvider);
      console.log("User signed in:", result.user);
      // Здесь можно отправить токен на сервер для дальнейшей верификации
    } catch (error) {
      console.error("Error during sign-in:", error);
    }
  };

  return (
    <div>
      <button onClick={handleGoogleSignIn}>Sign in with Google</button>
    </div>
  );
}

export default Login;

// Шаг 4: Настройка Firebase Admin SDK на сервере (Node.js)
// Firebase Admin SDK необходим для верификации токенов на серверной стороне.

// server/firebaseAdmin.js
const admin = require("firebase-admin");

const serviceAccount = require("./path/to/your-firebase-adminsdk.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;

// Шаг 5: Верификация токена Firebase на серверной стороне (Node.js)
// Создадим middleware для проверки токена на сервере.

const jwt = require("jsonwebtoken");
const admin = require("./firebaseAdmin");

const verifyFirebaseToken = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) return res.status(401).json({ message: "Token is required" });

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token", error });
  }
};

// Пример использования middleware в роуте:
const express = require("express");
const app = express();

app.get("/protected", verifyFirebaseToken, (req, res) => {
  res.status(200).json({ message: "Access granted", user: req.user });
});

// Шаг 6: Интеграция Firebase аутентификации с базой данных (Mongoose)
// После того как пользователь прошел аутентификацию, мы можем сохранить его данные в MongoDB.

// models/User.js
const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  firebaseId: { type: String, required: true, unique: true },
  email: { type: String, required: true },
  name: String,
  profilePicture: String,
});

const User = mongoose.model("User", userSchema);
module.exports = User;

// server/controllers/authController.js
const User = require("../models/User");

exports.handleGoogleSignIn = async (req, res) => {
  const { uid, email, displayName, photoURL } = req.user;
  
  try {
    let user = await User.findOne({ firebaseId: uid });

    if (!user) {
      user = await User.create({
        firebaseId: uid,
        email,
        name: displayName,
        profilePicture: photoURL,
      });
    }

    const token = jwt.sign({ id: user._id }, "your_jwt_secret", { expiresIn: "1h" });
    res.status(200).json({ message: "User authenticated", token });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Итог:
// Мы реализовали аутентификацию с использованием Google Firebase и интегрировали её с базой данных MongoDB с помощью Mongoose.
// На клиенте пользователи могут войти через Google, а на сервере их данные проверяются и сохраняются в базе данных.
// Такая настройка позволяет использовать безопасную и масштабируемую аутентификацию, основанную на Firebase.
