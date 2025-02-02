// app-header.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, NzIconModule],
  templateUrl: './header.component.html'
})

export class AppHeaderComponent {
  navigationItems = [
    { label: 'Add Workout', route: '#add-workout', icon: 'plus-circle' },
    { label: 'Workout List', route: '#workout-list', icon: 'unordered-list' },
    { label: 'Progress', route: '#workout-chart', icon: 'bar-chart' }
  ];

  // Function to handle smooth scrolling
  scrollToSection(event: Event, route: string) {
    event.preventDefault();  // Prevent default anchor link behavior
    const targetElement = document.querySelector(route);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.getBoundingClientRect().top + window.scrollY,
        behavior: 'smooth'
      });
    }
  }
}
