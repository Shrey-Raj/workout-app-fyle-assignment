import { Component, Input, OnChanges, OnInit, SimpleChanges, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzCardModule } from 'ng-zorro-antd/card';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-workout-chart',
  standalone: true,
  imports: [CommonModule, NzCardModule],
  templateUrl: './workout-chart.component.html'
})
export class WorkoutChartComponent implements OnChanges, OnInit, AfterViewInit {
  @Input() userData: any[] = [];
  selectedUser: any = null;
  chart: any;

  ngOnInit() {
    if (this.userData.length > 0) {
      this.selectedUser = this.userData[0]; 
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['userData'] && changes['userData'].currentValue.length > 0) {
      this.selectedUser = this.userData[0]; 
      this.createChart();
    }
  }

  ngAfterViewInit() {
    setTimeout(() => {
      if (this.selectedUser) {
        this.createChart();
      }
    }, 0);
  }

  selectUser(user: any) {
    this.selectedUser = user;
    if (this.chart) {
      this.chart.destroy();
    }
    this.createChart();
  }

  createChart() {
    if (!this.selectedUser || !this.selectedUser.workouts) return;

    const ctx = document.getElementById('workoutChart') as HTMLCanvasElement;
    if (!ctx) return; 

    if (this.chart) {
      this.chart.destroy();
    }

    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: this.selectedUser?.workouts?.map((w: any) => w.type),
        datasets: [{
          label: 'Minutes',
          data: this.selectedUser.workouts.map((w: any) => w.minutes),
          backgroundColor: 'rgba(255, 127, 80,0.6)',
          borderColor: 'rgba(248, 131, 121,1)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: 'top'
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              color: 'rgba(0, 0, 0, 0.1)'
            },
            ticks: {
              stepSize: 15
            }
          },
          x: {
            grid: {
              display: false
            }
          }
        }
      }
    });
  }
}
