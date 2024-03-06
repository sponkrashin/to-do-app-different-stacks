import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `<header>
      <h2>To Do App</h2>
    </header>
    <router-outlet />`,
})
export class AppComponent {}
