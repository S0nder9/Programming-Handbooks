// Глава 6: Интеграция JWT с различными технологиями
// Подглава 6.3: JWT в SPA (Single Page Applications)

// Интеграция JWT в SPA (Single Page Applications) является важной частью обеспечения безопасности и управления пользовательскими сессиями.
// В этой подглаве мы рассмотрим, как интегрировать JWT в различные SPA-фреймворки: Angular, React и Vue.js.
// Также обсудим лучшие практики для безопасного хранения и использования JWT в SPA.

// 1. Интеграция JWT в Angular

// Для использования JWT в Angular, нужно настроить Angular Service для управления токенами и защиты маршрутов.

// Пример Angular Service для хранения и управления JWT:
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api';
  private tokenKey = 'authToken';

  private currentUserSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public currentUser: Observable<any> = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { username, password });
  }

  storeToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
    this.currentUserSubject.next(token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.currentUserSubject.next(null);
  }
}

// Пример защиты маршрутов с помощью JWT в Angular:
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.getToken()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}

// 2. Интеграция JWT в React

// В React можно использовать контекст для управления состоянием аутентификации и хранить JWT в localStorage или sessionStorage.

// Пример React контекста для управления JWT:
import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('authToken'));

  const login = (newToken) => {
    localStorage.setItem('authToken', newToken);
    setToken(newToken);
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

// Пример защиты маршрутов с помощью JWT в React:
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from './AuthProvider';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { token } = useAuth();

  return (
    <Route
      {...rest}
      render={props =>
        token ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

export default PrivateRoute;

// 3. Интеграция JWT в Vue.js

// В Vue.js можно использовать Vuex для управления состоянием аутентификации и хранить JWT в localStorage.

// Пример Vuex Store для управления JWT:
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: localStorage.getItem('authToken') || null
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
      localStorage.setItem('authToken', token);
    },
    removeToken(state) {
      state.token = null;
      localStorage.removeItem('authToken');
    }
  },
  actions: {
    login({ commit }, token) {
      commit('setToken', token);
    },
    logout({ commit }) {
      commit('removeToken');
    }
  }
});

// Пример защиты маршрутов с помощью JWT в Vue.js:
import Vue from 'vue';
import Router from 'vue-router';
import store from './store';

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/protected',
      component: ProtectedComponent,
      beforeEnter: (to, from, next) => {
        if (store.state.token) {
          next();
        } else {
          next('/login');
        }
      }
    },
    // другие маршруты...
  ]
});

export default router;

// 4. Безопасное хранение и использование JWT в SPA

// Основные рекомендации для безопасного хранения и использования JWT в SPA:
// - Храните JWT в `localStorage` или `sessionStorage`.
// - Избегайте хранения JWT в `localStorage` для высоко чувствительных данных, так как это может сделать токен уязвимым для XSS-атак.
// - Используйте HTTPS для защиты передачи данных между клиентом и сервером.
// - Регулярно обновляйте и инвалидируйте токены.
// - Используйте короткие сроки действия токенов и обеспечивайте возможность их обновления.

