# Fittrack Pro (Assignment from Fyle)

Welcome to **Fittrack Pro**, an Angular 19+ single-page application (SPA) designed to help users track their workouts, stay motivated, and manage their progress!

## Features

- **User Data Input**: Users can add their name, workout type, and workout minutes.
- **User Workout List**: The list of workouts is displayed with options to:
  - **Search by name**
  - **Filter by workout type**
  - **Pagination** (if there are more than 5 users)
- **Workout Progress Visualization**: Optional feature to visualize workout progress using charts.

### Screenshots

#### Add New Workout:
![Screenshot add workout](https://github.com/user-attachments/assets/93ea6e09-660d-4240-8ce0-fa8aed44875f)

#### Workout List (Search, Filter, and Pagination):
![Screenshot 2024-06-26 at 7.03.56 PM.png](https://github.com/user-attachments/assets/884255b1-6cbc-4824-b3dd-b0f4c55beb3e)
![Screenshot 2024-06-26 at 7.03.56 PM.png](https://github.com/user-attachments/assets/1770174e-5605-452f-8ffb-adbcf0c636fe)

#### Workout Progress (Charts):
![Screenshot 2024-06-26 at 7.04.49 PM.png](https://github.com/user-attachments/assets/c6992564-7d2c-48f1-8616-b575be99c09f)


### Demo Video
<video src="https://github.com/user-attachments/assets/4bdb5ed6-db7f-47f4-ab10-6bccfab3715b"></video>

---

## References & Functionalities

- Input fields to **add the user**, **workout type**, and **minutes** with a **button**.
- Display users as a **table grid**.
- **Search** by username and **filter** by workout type.
- Store the data using **localStorage**.
- Initally the app has the following data stored in local storage :

```jsx
userData = [
    {
      id: 1,
      name: 'John Doe',
      workouts: [
        { type: 'Running', minutes: 30 },
        { type: 'Cycling', minutes: 45 }
      ]
    },
    {
      id: 2,
      name: 'Jane Smith',
      workouts: [
        { type: 'Swimming', minutes: 60 },
        { type: 'Running', minutes: 20 }
      ]
    },
    {
      id: 3,
      name: 'Mike Johnson',
      workouts: [
        { type: 'Yoga', minutes: 50 },
        { type: 'Cycling', minutes: 40 }
      ]
    },
    ...3 more such objects
]
```

---


## **Steps to Run the Project Locally**

1. Clone the repository to your local machine:

```bash
git clone https://github.com/Shrey-Raj/workout-app-fyle-assignment.git
```

2. Navigate to the project directory:

```bash
cd workout-app-fyle-assignment
```

3. Install the dependencies:

```bash
npm install
```

4. Run the application:

```bash
npm start
```

5. Open your browser and navigate to `http://localhost:4200` to view the app.

---

## **Assumptions**

The user has to choose from the below set of workouts only : 

- 'Running',
- 'Cycling',
- 'Swimming',
- 'Weight Training',
- 'Yoga',
- 'HIIT',
- 'Walking',

---

## **Live Application**

The **Fittrack Pro** app is hosted on Netlify and can be accessed at:  
[Fittrack Pro - Live App](https://fittrack-pro-fyle.netlify.app/)

---

## **Code Coverage(100%)**

The code coverage for unit tests is **100%**, and the detailed code coverage report is attached below:

- For the **workout-list** component
![Code Coverage Screenshot](https://github.com/user-attachments/assets/7277e4cf-fca1-48c6-9b1b-b626f5553228)

- For the **local-storage** service
![Code Coverage Screenshot](https://github.com/user-attachments/assets/4f321e95-7916-4373-9e71-d67035a7031c)

---

## **Libraries Used**

- [Tailwind CSS](https://tailwindcss.com/)
- [Ng-Zorro](https://ng.ant.design/)
- [Chart.js](https://www.chartjs.org/)

---

## **Design Notes**

- The design is flexible, and modifications were made to ensure better functionality and appearance.

