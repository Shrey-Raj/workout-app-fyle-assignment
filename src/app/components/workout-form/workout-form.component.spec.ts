import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WorkoutFormComponent } from './workout-form.component';
import { LocalStorageService } from '../../services/local-storage.service';
import { FormsModule } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';

describe('WorkoutFormComponent', () => {
  let component: WorkoutFormComponent;
  let fixture: ComponentFixture<WorkoutFormComponent>;
  let localStorageService: LocalStorageService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WorkoutFormComponent],
      imports: [
        FormsModule,
        NzInputModule,
        NzButtonModule,
        NzSelectModule,
        NzFormModule,
        NzCardModule,
        NzDividerModule,
        NzInputNumberModule,
      ],
      providers: [LocalStorageService],
    }).compileComponents();

    fixture = TestBed.createComponent(WorkoutFormComponent);
    component = fixture.componentInstance;
    localStorageService = TestBed.inject(LocalStorageService);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default values', () => {
    expect(component.name).toBe('');
    expect(component.selectedWorkouts).toEqual([]);
    expect(component.workoutType).toBe('');
    expect(component.minutes).toBe(0);
  });

  it('should add a workout to selectedWorkouts', () => {
    component.workoutType = 'Running';
    component.minutes = 30;
    component.addWorkout();
    expect(component.selectedWorkouts).toEqual([{ type: 'Running', minutes: 30 }]);
    expect(component.workoutType).toBe('');
    expect(component.minutes).toBe(0);
  });

  it('should not add a workout if workoutType or minutes is invalid', () => {
    component.workoutType = '';
    component.minutes = 0;
    component.addWorkout();
    expect(component.selectedWorkouts).toEqual([]);
  });

  it('should submit the form and call localStorageService.addUserData', () => {
    spyOn(localStorageService, 'addUserData');
    component.name = 'John Doe';
    component.selectedWorkouts = [{ type: 'Running', minutes: 30 }];
    component.onSubmit();
    expect(localStorageService.addUserData).toHaveBeenCalledWith({
      id: jasmine.any(Number),
      name: 'John Doe',
      workouts: [{ type: 'Running', minutes: 30 }],
    });
    expect(component.name).toBe('');
    expect(component.selectedWorkouts).toEqual([]);
  });

  it('should not submit the form if name or selectedWorkouts is empty', () => {
    spyOn(localStorageService, 'addUserData');
    component.name = '';
    component.selectedWorkouts = [];
    component.onSubmit();
    expect(localStorageService.addUserData).not.toHaveBeenCalled();
  });

  it('should reset the form', () => {
    component.name = 'John Doe';
    component.selectedWorkouts = [{ type: 'Running', minutes: 30 }];
    component.resetForm();
    expect(component.name).toBe('');
    expect(component.selectedWorkouts).toEqual([]);
  });
});