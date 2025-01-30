import { TestBed } from '@angular/core/testing';
import { LocalStorageService } from './local-storage.service';
import sampleUserData from '../../../userData.json';

describe('LocalStorageService', () => {
  let service: LocalStorageService;
  let getItemSpy: jasmine.Spy;
  let setItemSpy: jasmine.Spy;

  beforeEach(() => {
    localStorage.clear();
    getItemSpy = spyOn(Storage.prototype, 'getItem').and.returnValue('[]');
    setItemSpy = spyOn(Storage.prototype, 'setItem');

    TestBed.configureTestingModule({
      providers: [LocalStorageService]
    });

    service = TestBed.inject(LocalStorageService);
  });

  it('should initialize with empty array when localStorage is empty', () => {
    expect(getItemSpy).toHaveBeenCalledWith('userData');
    
    service.getUserDataObservable().subscribe(value => {
      expect(value).toEqual([]);
    });
  });

  it('should add new user data when user does not exist', () => {
    const newUser = {
      id: 1,
      name: 'Test User',
      workouts: [{ type: 'Running', minutes: 30 }],
    };
  
    service.addUserData(newUser);
  
    expect(setItemSpy).toHaveBeenCalledWith(
      'userData',
      JSON.stringify([newUser])
    );
  
    service.getUserDataObservable().subscribe(value => {
      expect(value).toEqual([newUser]);
    });
  });



  it('should add a new workout to existing user data when user exists', () => {
    const existingUser = {
      id: 1,
      name: 'Test User',
      workouts: [{ type: 'Running', minutes: 30 }],
    };
  
    const updatedUser = {
      id: 1,
      name: 'Test User',
      workouts: [{ type: 'Running', minutes: 30 }, { type: 'Swimming', minutes: 30 }],
    };

    service.addUserData(updatedUser);
    
    expect(setItemSpy).toHaveBeenCalledWith(
      'userData',
      JSON.stringify([updatedUser])
    );
    
    service.getUserDataObservable().subscribe(value => {
      expect(value).toEqual([updatedUser]);
    });
  });
  

  it('should set sample data when localStorage is empty', () => {
    const sampleData = sampleUserData;  
    
    service.setSampleData();
  
    expect(setItemSpy).toHaveBeenCalledWith('userData', JSON.stringify(sampleData));
  
    service.getUserDataObservable().subscribe(value => {
      expect(value).toEqual(sampleData);
    });
  });

  
  it('should update existing user data when user already exists', () => {
    const existingData = [
      { id: 1, name: 'Test User', workouts: [{ type: 'Running', minutes: 30 }] }
    ];
    
    // Mock localStorage to have existing data
    getItemSpy.and.returnValue(JSON.stringify(existingData));
  
    const updatedUser = {
      id: 1,
      name: 'Test User',
      workouts: [{ type: 'Running', minutes: 30 }, { type: 'Swimming', minutes: 30 }]
    };
  
    service.addUserData(updatedUser);  
  
    expect(setItemSpy).toHaveBeenCalledWith(
      'userData',
      JSON.stringify([updatedUser])
    );
  
    service.getUserDataObservable().subscribe(value => {
      expect(value).toEqual([updatedUser]); 
    });
  });
  
  
  
});
