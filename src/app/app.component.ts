import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WorkoutFormComponent } from './components/workout-form/workout-form.component';
import { WorkoutListComponent } from './components/workout-list/workout-list.component';
import { WorkoutChartComponent } from './components/workout-chart/workout-chart.component';
import { AppHeaderComponent } from './components/header/header.component';
import { LocalStorageService } from './services/local-storage.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    WorkoutFormComponent,
    WorkoutListComponent,
    WorkoutChartComponent,
    AppHeaderComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'workout-app';
  userData: any[] = [];
  private userDataSubscription!: Subscription;  // Use definite assignment assertion

  constructor(private localStorageService: LocalStorageService) {}

  ngOnInit() {
    // Set the sample data if it's not available
    this.localStorageService.setSampleData();

    // Subscribe to the user data observable to listen for changes
    this.userDataSubscription = this.localStorageService.getUserDataObservable().subscribe((data) => {
      this.userData = Array.isArray(data[0]) ? data[0] : data;
      console.log('User Data:', this.userData);  
    });
  }

  ngOnDestroy() {
    // Unsubscribe from the observable to prevent memory leaks
    this.userDataSubscription.unsubscribe();
  }
}
