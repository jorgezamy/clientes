import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
// import { Router, RouterOutlet } from '@angular/router';
// import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'clientes';

  // constructor(private _router: Router) {}

  // ngOnInit(): void {
  //   this.checkLocalStorage();
  // }

  // checkLocalStorage() {
  //   if (typeof window !== 'undefined' && localStorage.getItem('token')) {
  //     const token = localStorage.getItem('token') || '';

  //     if (this.isTokenExpired(token)) {
  //       localStorage.removeItem(token);
  //       this._router.navigate(['login']);
  //     } else {
  //       this._router.navigate(['dashboard']);
  //     }
  //   }
  // }

  // isTokenExpired(token: string | null): boolean {
  //   if (!token) return true;

  //   try {
  //     const decodedToken: any = jwtDecode(token);
  //     const currentTime = Math.floor(Date.now() / 1000); // Obtén el tiempo actual en segundos

  //     // Verifica si el token ha expirado
  //     return decodedToken.exp < currentTime;
  //   } catch (e) {
  //     // En caso de error en la decodificación del token
  //     return true;
  //   }
  // }
}
