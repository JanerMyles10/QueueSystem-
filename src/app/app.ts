import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './components/header/header';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,Header,FormsModule],
  template: `
    <router-outlet><app-header /></router-outlet>
  `,
  styles: []
})
export class App {
  protected title = 'login';
}
