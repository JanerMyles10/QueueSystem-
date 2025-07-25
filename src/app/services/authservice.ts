import { Injectable } from '@angular/core';
import { Router } from '@angular/router';


interface User{
  username: string;
  password: string;
  role: 'manager';
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private currentUser: User | null = null;

  constructor(private router: Router) {}

  login(username: string, password: string): boolean {
    if (username === 'manager' && password === 'staff') {
      this.currentUser = { username, password, role: 'manager' };
      return true;
    }
    return false;
  }

  logout() {
    this.currentUser = null;
    this.router.navigate(['/login']);
  }

  isManager(): boolean {
    return this.currentUser?.role === 'manager';
  }

  getUser(): User | null {
    return this.currentUser;
  }


  isLoggedIn(): boolean {
    return this.currentUser !== null;
  }
}

