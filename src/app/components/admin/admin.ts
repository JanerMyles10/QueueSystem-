import { Sample } from './../../services/sample';
import { Component, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QueueEntry, QueueType, NowServingMap } from '../../type/queue';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-admin-page',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './admin.html',
  styleUrls: ['./admin.scss'],
  providers: [Sample]
})
export class Admin implements OnInit {
  queues: { [key in QueueType]: QueueEntry[] } = {
    priority: [],
    normal: [],
    walkin: [],
    print: []
  };
  nowServing = signal<NowServingMap>({
    priority: null,
    normal: null,
    walkin: null,
    print: null
  });
  lastServed = signal<QueueEntry[]>([]);
  seniorServeCount = 0;

  constructor(private Sample: Sample) {}

  ngOnInit() {
    this.loadQueue();
    setInterval(() => this.loadQueue(), 1000);
  }

  loadQueue() {
    this.Sample.getQueue().subscribe((entries: QueueEntry[]) => {
      const waiting = entries.filter(e => e.status === 'waiting');
      this.queues.priority = waiting.filter(e => e.type === 'priority');
      this.queues.normal = waiting.filter(e => e.type === 'normal');
      this.queues.walkin = waiting.filter(e => e.type === 'walkin');
      this.queues.print = waiting.filter(e => e.type === 'print');
    });

    this.Sample.getNowServing().subscribe((map: NowServingMap) => {
      this.nowServing.set(map);
    });
  }

  serveNext(type: QueueType) {
  const queue = this.queues[type];
  if (!queue.length) return;

  const next = queue.shift()!;
  this.queues[type] = queue;

  this.lastServed.update(history => [next, ...history]);


  setTimeout(() => {
    this.Sample.markAsServed(next.number).subscribe(() => {
      this.Sample.setNowServing(next).subscribe(() => this.loadQueue());
    });
  }, 3000);
}


undoServe(type: QueueType) {
  const history = this.lastServed();
  const last = history.find(entry => entry.type === type);
  if (!last) return;

  this.lastServed.set(history.filter(e => e !== last));
  this.queues[type].unshift(last);

  this.Sample.setNowServing({ number: null, type }).subscribe(() => this.loadQueue());

}
}

