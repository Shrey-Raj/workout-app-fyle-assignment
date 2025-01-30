import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { WorkoutListComponent } from './workout-list.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { SimpleChanges } from '@angular/core';

describe('WorkoutListComponent', () => {
  let component: WorkoutListComponent;
  let fixture: ComponentFixture<WorkoutListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        WorkoutListComponent,
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
      providers: [provideNoopAnimations()] // Disable animations for testing
    }).compileComponents();

    fixture = TestBed.createComponent(WorkoutListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update filteredData when userData changes', () => {
    const mockData = [
      { name: 'Johny Doe', workouts: [{ type: 'Running', minutes: 30 }] },
      { name: 'Janey Doe', workouts: [{ type: 'Cycling', minutes: 45 }] }
    ];
  
    // Set the input manually before triggering ngOnChanges
    component.userData = mockData;
  
    const changes: SimpleChanges = { 
      userData: { 
        currentValue: mockData, 
        previousValue: [], 
        firstChange: true, 
        isFirstChange: () => true 
      } 
    };
  
    component.ngOnChanges(changes);
  
    expect(component.filteredData.length).toBe(2);
    expect(component.filteredData).toEqual(mockData);
  });
  
  

  it('should filter filteredData based on searchName and selectedWorkoutType', () => {
    component.userData = [
      { name: 'John Doe', workouts: [{ type: 'Running', minutes: 30 }] },
      { name: 'Jane Doe', workouts: [{ type: 'Cycling', minutes: 45 }] },
      { name: 'Mike Ross', workouts: [{ type: 'Running', minutes: 20 }] }
    ];
  
    // Case 1: Search by name
    component.searchName = 'Jane';
    component.filterData();
    expect(component.filteredData.length).toBe(1);
    expect(component.filteredData[0].name).toBe('Jane Doe');
  
    // Case 2: Filter by workout type
    component.searchName = '';
    component.selectedWorkoutType = 'Running';
    component.filterData();
    expect(component.filteredData.length).toBe(2);
    expect(component.filteredData.some(user => user.name === 'John Doe')).toBeTrue();
    expect(component.filteredData.some(user => user.name === 'Mike Ross')).toBeTrue();
  
    // Case 3: Search name and workout type together
    component.searchName = 'Mike';
    component.selectedWorkoutType = 'Running';
    component.filterData();
    expect(component.filteredData.length).toBe(1);
    expect(component.filteredData[0].name).toBe('Mike Ross');
  });
  
  it('should calculate total workout duration correctly', () => {
    const user = {
      name: 'John Doe',
      workouts: [
        { type: 'Running', minutes: 30 },
        { type: 'Cycling', minutes: 45 },
        { type: 'Swimming', minutes: 25 }
      ]
    };
  
    const totalDuration = component.calculateTotalDuration(user);
    expect(totalDuration).toBe(100);
  });
  
  // Edge case: User with no workouts
  it('should return 0 if user has no workouts', () => {
    const user = { name: 'Jane Doe', workouts: [] };
    const totalDuration = component.calculateTotalDuration(user);
    expect(totalDuration).toBe(0);
  });
  
  // Edge case: User object is null or undefined
  it('should return 0 if user is undefined or workouts is undefined', () => {
    expect(component.calculateTotalDuration(undefined)).toBe(0);
    expect(component.calculateTotalDuration({})).toBe(0);
  });
  
  it('should reset pageIndex to 1 when filtering data', () => {
    component.pageIndex = 3; // Set page index to some higher value
    component.userData = [
      { name: 'John Doe', workouts: [{ type: 'Running', minutes: 30 }] },
      { name: 'Jane Doe', workouts: [{ type: 'Cycling', minutes: 45 }] }
    ];
  
    component.searchName = 'Jane';
    component.filterData();
  
    expect(component.pageIndex).toBe(1);
  });
  
  

});
