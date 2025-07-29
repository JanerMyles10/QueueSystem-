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
    this.Sample.getQueueCounts().subscribe(data => {
      this.barChartData.labels = data.map(item => item._id.toUpperCase());
      this.barChartData.datasets[0].data = data.map(item => item.count);
    });
  }
}
