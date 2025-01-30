import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import sampleUserData from '../../../userData.json';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private storageKey = 'userData';
  private userDataSubject = new BehaviorSubject<any[]>([]);

  constructor() {
    const data = JSON.parse(localStorage.getItem(this.storageKey) || '[]');
    this.userDataSubject.next(data);
  }

  getUserDataObservable() {
    return this.userDataSubject.asObservable();
  }

  addUserData(userData: { id: number; name: string; workouts: { type: string; minutes: number }[] }) {
    let existingData = JSON.parse(localStorage.getItem(this.storageKey) || '[]');

    // console.log("existing data = " , existingData) ; 

    const existingUserIndex = existingData.findIndex((user:any) => user.name === userData.name);

    // console.log("existing user index : " , existingUserIndex) ; 

    if (existingUserIndex === -1) {
      existingData.unshift(userData); 
    } else {

      // let previousData = existingData[existingUserIndex] ; 
      // previousData.workouts.push(...userData.workouts);

      // console.log("Updated previous data = " , previousData); 

      // existingData[existingUserIndex] = previousData;


      let previousData = existingData[existingUserIndex];
    
    // Avoid duplicating workouts by ensuring each workout is unique
    userData.workouts.forEach(workout => {
      const existingWorkout = previousData.workouts.find((w: any) => w.type === workout.type && w.minutes === workout.minutes);
      if (!existingWorkout) {
        previousData.workouts.push(workout);
      }
    });

    existingData[existingUserIndex] = previousData;

    }

    // console.log("new existing data  = " , existingData) ; 

    localStorage.setItem(this.storageKey, JSON.stringify(existingData));

    this.userDataSubject.next(existingData);
  }

  setSampleData() {
    let userData = JSON.parse(localStorage.getItem(this.storageKey) || '[]');
    if (userData.length === 0) {
      userData = sampleUserData;
    }
    localStorage.setItem(this.storageKey, JSON.stringify(userData));

    this.userDataSubject.next(userData);
  }
}
