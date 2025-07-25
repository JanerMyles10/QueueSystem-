import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Sample } from '../../services/sample';
import { QueueEntry } from '../../type/queue';

@Component({
  selector: 'app-dailyhistory',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dailyhistory.html',
  styleUrls: ['./dailyhistory.scss']
})
export class Dailyhistory implements OnInit {
  history: QueueEntry[] = [];

  constructor(private sample: Sample) {}

  ngOnInit(): void {
    this.sample.getHistory().subscribe(data => {
      this.history = data;
    });
  }
}
