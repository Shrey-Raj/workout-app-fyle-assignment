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
    // Initialize with data from localStorage when the service is first created
    const data = JSON.parse(localStorage.getItem(this.storageKey) || '[]');
    this.userDataSubject.next(data);
  }

  // Method to get the current user data as an observable
  getUserDataObservable() {
    return this.userDataSubject.asObservable();
  }

  addUserData(userData: { id: number; name: string; workouts: { type: string; minutes: number }[] }) {
    let existingData = JSON.parse(localStorage.getItem(this.storageKey) || '[]');

    console.log("existing data = " , existingData) ; 

    const existingUserIndex = existingData.findIndex((user:any) => user.name === userData.name);

    if (existingUserIndex === -1) {
      existingData.unshift(userData); //add to front
    } else {
      existingData[existingUserIndex] = userData;
    }

    console.log("new existing data  = " , existingData) ; 

    localStorage.setItem(this.storageKey, JSON.stringify(existingData));

    // Emit the updated user data
    this.userDataSubject.next(existingData);
  }

  setSampleData() {
    let userData = JSON.parse(localStorage.getItem(this.storageKey) || '[]');
    if (userData.length === 0) {
      userData.push(sampleUserData);
    }
    localStorage.setItem(this.storageKey, JSON.stringify(userData));

    // Emit the updated user data
    this.userDataSubject.next(userData);
  }
}
