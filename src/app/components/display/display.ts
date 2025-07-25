import { Component, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Sample } from '../../services/sample';
import { QueueEntry, NowServingMap} from '../../type/queue';

@Component({
  selector: 'app-display',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './display.html',
  styleUrls: ['./display.scss'],
  providers: [Sample]
})
export class Display implements OnInit {
  seniorQueueList = signal<QueueEntry[]>([]);
  normalQueueList = signal<QueueEntry[]>([]);
  walkinQueueList = signal<QueueEntry[]>([]);
  printQueueList = signal<QueueEntry[]>([]);
  nowServing = signal<NowServingMap>({
    priority: null,
    normal: null,
    walkin: null,
    print: null
  });

  constructor(private Sample: Sample) {}

  ngOnInit() {
    setInterval(() => this.loadQueue(), 1000);
  }

  loadQueue() {
    this.Sample.getQueue().subscribe((entries: QueueEntry[]) => {
      const waiting = entries.filter(e => e.status === 'waiting');
      this.seniorQueueList.set(waiting.filter(e => e.type === 'priority'));
      this.normalQueueList.set(waiting.filter(e => e.type === 'normal'));
      this.walkinQueueList.set(waiting.filter(e => e.type === 'walkin'));
      this.printQueueList.set(waiting.filter(e => e.type === 'print'));
    });

    this.Sample.getNowServing().subscribe((data: NowServingMap) => {
      this.nowServing.set(data);
    });
  }
}
