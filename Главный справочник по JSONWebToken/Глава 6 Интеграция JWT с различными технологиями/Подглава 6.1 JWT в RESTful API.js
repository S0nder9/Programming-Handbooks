// Глава 6: Интеграция JWT с различными технологиями

// Подглава 6.1: JWT в RESTful API

// JSON Web Token (JWT) используется для аутентификации и авторизации в RESTful API.
// JWT представляет собой компактный, самодостаточный токен, который можно безопасно передавать между клиентом и сервером.
// В этой подглаве рассмотрим, как использовать JWT для аутентификации в RESTful API и приведем примеры реализации на различных платформах: Node.js, Python и Java.

// Как работает JWT:
// 1. Пользователь отправляет запрос на аутентификацию с учетными данными (например, логин и пароль).
// 2. Сервер проверяет учетные данные и, если они корректны, создает JWT, который включает закодированную информацию о пользователе и сроке действия токена.
// 3. Клиент получает JWT и использует его для доступа к защищенным ресурсам, отправляя токен в заголовке запроса.
// 4. Сервер проверяет JWT в заголовке запроса и предоставляет доступ к ресурсам, если токен действителен.


// Пример реализации JWT на различных платформах:

// Node.js:
const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// Секретный ключ для подписи JWT
const secretKey = 'your-secret-key';

// Аутентификация и создание JWT
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  // Проверка учетных данных (например, проверка в базе данных)
  if (username === 'user' && password === 'pass') {
    const token = jwt.sign({ username }, secretKey, { expiresIn: '1h' });
    res.json({ token });
  } else {
    res.status(401).send('Invalid credentials');
  }
});

// Middleware для проверки JWT
app.use((req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (token) {
    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        return res.status(403).send('Forbidden');
      }
      req.user = decoded;
      next();
    });
  } else {
    res.status(401).send('Unauthorized');
  }
});

// Защищенный маршрут
app.get('/api/protected', (req, res) => {
  res.json({ message: 'This is a protected route', user: req.user });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});


// // Python (с использованием Flask и PyJWT):
// from flask import Flask, request, jsonify
// import jwt
// import datetime

// app = Flask(__name__)
// app.config['SECRET_KEY'] = 'your-secret-key'

// # Аутентификация и создание JWT
// @app.route('/api/login', methods=['POST'])
// def login():
//     data = request.get_json()
//     username = data.get('username')
//     password = data.get('password')
//     # Проверка учетных данных
//     if username == 'user' and password == 'pass':
//         token = jwt.encode({'username': username, 'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=1)}, app.config['SECRET_KEY'], algorithm='HS256')
//         return jsonify({'token': token})
//     else:
//         return 'Invalid credentials', 401

// # Middleware для проверки JWT
// @app.before_request
// def check_token():
//     token = request.headers.get('Authorization')
//     if token:
//         try:
//             token = token.split(' ')[1]
//             decoded = jwt.decode(token, app.config['SECRET_KEY'], algorithms=['HS256'])
//             request.user = decoded
//         except jwt.ExpiredSignatureError:
//             return 'Token has expired', 403
//         except jwt.InvalidTokenError:
//             return 'Invalid token', 403
//     else:
//         return 'Unauthorized', 401

// # Защищенный маршрут
// @app.route('/api/protected', methods=['GET'])
// def protected():
//     return jsonify({'message': 'This is a protected route', 'user': request.user})

// if __name__ == '__main__':
//     app.run(port=3000)


// // Java (с использованием Spring Boot и jjwt):
// import io.jsonwebtoken.Jwts;
// import io.jsonwebtoken.SignatureAlgorithm;
// import io.jsonwebtoken.Claims;
// import org.springframework.boot.SpringApplication;
// import org.springframework.boot.autoconfigure.SpringBootApplication;
// import org.springframework.web.bind.annotation.GetMapping;
// import org.springframework.web.bind.annotation.PostMapping;
// import org.springframework.web.bind.annotation.RequestBody;
// import org.springframework.web.bind.annotation.RequestHeader;
// import org.springframework.web.bind.annotation.RequestMapping;
// import org.springframework.web.bind.annotation.RestController;

// import javax.servlet.FilterChain;
// import javax.servlet.http.HttpServletRequest;
// import javax.servlet.http.HttpServletResponse;
// import org.springframework.web.filter.OncePerRequestFilter;
// import org.springframework.security.config.annotation.web.builders.HttpSecurity;
// import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
// import org.springframework.security.web.SecurityFilterChain;

// import java.util.Date;

// @SpringBootApplication
// public class JwtApplication {
//     public static void main(String[] args) {
//         SpringApplication.run(JwtApplication.class, args);
//     }
// }

// @RestController
// @RequestMapping("/api")
// class JwtController {

//     private final String secretKey = "your-secret-key";

//     @PostMapping("/login")
//     public String login(@RequestBody LoginRequest loginRequest) {
//         if ("user".equals(loginRequest.getUsername()) && "pass".equals(loginRequest.getPassword())) {
//             String token = Jwts.builder()
//                     .setSubject(loginRequest.getUsername())
//                     .setExpiration(new Date(System.currentTimeMillis() + 3600000)) // 1 hour
//                     .signWith(SignatureAlgorithm.HS256, secretKey)
//                     .compact();
//             return token;
//         }
//         throw new RuntimeException("Invalid credentials");
//     }

//     @GetMapping("/protected")
//     public String protectedRoute(@RequestHeader("Authorization") String authHeader) {
//         // JWT is expected to be in the form "Bearer <token>"
//         String token = authHeader.substring(7);
//         Claims claims = Jwts.parser()
//                 .setSigningKey(secretKey)
//                 .parseClaimsJws(token)
//                 .getBody();
//         return "This is a protected route, user: " + claims.getSubject();
//     }
// }

// class LoginRequest {
//     private String username;
//     private String password;

//     // Getters and Setters
// }

// @Configuration
// class SecurityConfig extends WebSecurityConfigurerAdapter {

//     @Override
//     protected void configure(HttpSecurity http) throws Exception {
//         http.csrf().disable()
//                 .authorizeRequests()
//                 .antMatchers("/api/login").permitAll()
//                 .anyRequest().authenticated()
//                 .and()
//                 .addFilterBefore(new JwtFilter(), UsernamePasswordAuthenticationFilter.class);
//     }
// }

// class JwtFilter extends OncePerRequestFilter {

//     private final String secretKey = "your-secret-key";

//     @Override
//     protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
//         String authHeader = request.getHeader("Authorization");
//         if (authHeader != null && authHeader.startsWith("Bearer ")) {
//             String token = authHeader.substring(7);
//             Claims claims = Jwts.parser()
//                     .setSigningKey(secretKey)
//                     .parseClaimsJws(token)
//                     .getBody();
//             // Set user details in security context or handle accordingly
//         }
//         filterChain.doFilter(request, response);
//     }
// }

// Итог:
// Использование JWT для аутентификации в RESTful API позволяет безопасно и удобно передавать данные о пользователе между клиентом и сервером.
// Рассмотренные примеры показывают, как реализовать JWT аутентификацию на различных платформах: Node.js, Python и Java.
