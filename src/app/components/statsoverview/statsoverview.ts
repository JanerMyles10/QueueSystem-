import { Component, OnInit } from '@angular/core';
import { TitleCasePipe, NgFor } from '@angular/common';
import { Sample } from '../../services/sample';

@Component({
  selector: 'app-statsoverview',
  standalone: true,
  imports: [TitleCasePipe, NgFor],
  templateUrl: './statsoverview.html',
  styleUrl: './statsoverview.scss'
})
export class Statsoverview implements OnInit {
   totalServed = 0;
  totalWaiting = 0;
  queueCounts: Record<string, number> = {};

  constructor(private sample: Sample) {}

  ngOnInit(): void {
    this.fetchStats();


    setInterval(() => this.fetchStats(), 5000);
  }

  fetchStats(): void {
    this.sample.getStats().subscribe(data => {
      this.totalServed = data.totalServed;
      this.totalWaiting = data.totalWaiting;

      this.queueCounts = {};
      for (const item of data.byType) {
        this.queueCounts[item._id] = item.count;
      }
    });
  }
}
