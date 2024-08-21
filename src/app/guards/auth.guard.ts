import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

import { AuthService } from '../services/auth/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const _router = inject(Router);
  const _auth = inject(AuthService);

  const token = _auth.getToken() || '';

  if (isTokenExpired(token)) {
    localStorage.removeItem(token);
    _router.navigate(['login']);
    return false; // Redirige y evita el acceso a la ruta protegida
  }

  return true;
};

const isTokenExpired = (token: string | null): boolean => {
  if (!token) return true;

  try {
    const decodedToken: any = jwtDecode(token);
    const currentTime = Math.floor(Date.now() / 1000); // Obtén el tiempo actual en segundos

    // Verifica si el token ha expirado
    return decodedToken.exp < currentTime;
  } catch (e) {
    // En caso de error en la decodificación del token
    return false;
  }
};
