import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  constructor(private router: Router) {}

  logout() {
    // si quieres limpiar sessionStorage/localStorage lo haces aquí
    // localStorage.clear();
    this.router.navigate(['/login']);
  }

}
