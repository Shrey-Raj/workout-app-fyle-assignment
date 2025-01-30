import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { FormsModule } from '@angular/forms';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-workout-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NzTableModule,
    NzInputModule,
    NzSelectModule,
    NzPaginationModule,
    NzCardModule,
    NzDividerModule,
    NzTagModule,
    NzIconModule
  ],
  templateUrl: './workout-list.component.html'
})
export class WorkoutListComponent implements OnChanges {
  @Input() userData: any[] = [];
  
  ngOnChanges(changes: SimpleChanges) {
    if (changes['userData'] && changes['userData'].currentValue) {
      
      this.filteredData = Array.isArray(changes['userData'].currentValue[0]) 
        ? [...changes['userData'].currentValue[0]]
        : [...changes['userData'].currentValue];
      this.filterData();
    }
  }
  

  workoutTypes = ['Running', 'Cycling', 'Swimming', 'Yoga', 'Weight Training','HIIT', 'Walking'];
 
  searchName: string = '';
  selectedWorkoutType: string = '';
  filteredData = [...this.userData];
  pageSize = 5;
  pageIndex = 1;

  filterData() {
    this.filteredData = this.userData.filter(user =>
      user?.name.toLowerCase().includes(this.searchName.toLowerCase()) &&
      (this.selectedWorkoutType ? user?.workouts.some((w:any) => w.type === this.selectedWorkoutType) : true)
    );
    this.pageIndex = 1; 
  }

  calculateTotalDuration(user: any): number {
    return user?.workouts?.reduce((total: number, workout: any) => total + (workout?.minutes || 0), 0) || 0;
  }
}