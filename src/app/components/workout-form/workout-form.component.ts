import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { LocalStorageService } from '../../services/local-storage.service';

@Component({
  selector: 'app-workout-form',
  imports: [
    CommonModule,
    FormsModule,
    NzInputModule,
    NzButtonModule,
    NzSelectModule,
    NzFormModule,
    NzCardModule,
    NzDividerModule,
    NzInputNumberModule,
  ],
  standalone: true,
  templateUrl: './workout-form.component.html',
  styleUrl: './workout-form.component.scss',
})
export class WorkoutFormComponent {
  workoutTypes = [
    'Running',
    'Cycling',
    'Swimming',
    'Weight Training',
    'Yoga',
    'HIIT',
    'Walking',
  ];

  name: string = '';
  selectedWorkouts: { type: string, minutes: number }[] = [];
  workoutType: string = '';
  minutes: number = 0;

  constructor(private localStorageService: LocalStorageService) {}

  onSubmit() {
    if (this.name && this.selectedWorkouts.length > 0) {
      const userData = {
        id: Date.now(),
        name: this.name,
        workouts: this.selectedWorkouts
      };
      this.localStorageService.addUserData(userData);
      this.resetForm();
    }
  }

  addWorkout() {

    console.log("Inside the addWorkout with data : " , this.workoutType , " & " , this.minutes , "\n");

    if (this.workoutType && this.minutes > 0) {
      this.selectedWorkouts.push({ type: this.workoutType, minutes: this.minutes });
      console.log("selected workouts = " , this.selectedWorkouts);
      this.workoutType = '';
      this.minutes = 0;
    }
  }

  resetForm() {
    this.name = '';
    this.selectedWorkouts = [];
  }
}
