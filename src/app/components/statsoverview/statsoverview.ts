import { Component, OnInit } from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js';
import { Sample } from '../../services/sample';
import { NgChartsModule } from 'ng2-charts'; // ✅ FIXED


@Component({
  selector: 'app-statsoverview',
  standalone: true,
  imports: [NgChartsModule],
  templateUrl: './statsoverview.html',
  styleUrl: './statsoverview.scss'
})
export class Statsoverview implements OnInit {
  selectedView: 'daily' | 'weekly' | 'monthly' = 'daily';

  barChartData: ChartData<'bar'> = {
    labels: [],
    datasets: [{ data: [], label: 'Queue Count' }]
  };

  barChartOptions: ChartOptions<'bar'> = {
    responsive: true,
    scales: {
      x: {},
      y: { beginAtZero: true }
    }
  };

  constructor(private Sample: Sample) {}

  ngOnInit(): void {
    this.loadChartData();
  }

  loadChartData() {
    if (this.selectedView === 'daily') {
      this.Sample.getQueueCounts().subscribe(data => {
        this.barChartData.labels = data.map(item => this.labelMap[item._id] || item._id);
        this.barChartData.datasets[0].data = data.map(item => item.count);
      });
    } else if (this.selectedView === 'weekly') {
      this.Sample.getWeeklyQueueCounts().subscribe(data => {
        this.barChartData.labels = data.map(item => 'Week ' + item._id);
        this.barChartData.datasets[0].data = data.map(item => item.count);
      });
    } else if (this.selectedView === 'monthly') {
      const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                          'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

      this.Sample.getMonthlyQueueCounts().subscribe(data => {
        this.barChartData.labels = data.map(item => monthNames[item._id - 1]);
        this.barChartData.datasets[0].data = data.map(item => item.count);
      });
    }
  }

  private labelMap: Record<string, string> = {
    priority: 'Priority',
    normal: 'Normal',
    walkin: 'Walk-in',
    print: 'Print'
  };
}
