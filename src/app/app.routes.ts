import { provideRouter, Routes } from '@angular/router';
import { authGuardGuard } from './Guards/AuthGuard/auth-guard.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    loadComponent: () => import('./pages/auth/auth.page').then( m => m.AuthPage)
  },
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.page').then( m => m.HomePage)
  },
  {
    path: 'reset-password',
    loadComponent: () => import('./pages/reset-password/reset-password.page').then( m => m.ResetPasswordPage)
  },
  {
    path: 'chat',
    loadComponent: () => import('./pages/chat/chat.page').then( m => m.ChatPage),
    canActivate: [authGuardGuard]
  },  {
    path: 'create-news',
    loadComponent: () => import('./pages/create-news/create-news.page').then( m => m.CreateNewsPage)
  },

];


export const appRouting = provideRouter(routes);