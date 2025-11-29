import { Component } from '@angular/core';
import { DashboardComponent } from './dashboard/dashboard.component';

@Component({
  selector: 'app-root',
  imports: [DashboardComponent],
  template: '<app-dashboard></app-dashboard>',
  styleUrl: './app.css'
})
export class App {
  title = 'airbnb-dashboard';
}
