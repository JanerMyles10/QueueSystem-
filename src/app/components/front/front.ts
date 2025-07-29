import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Sample } from '../../services/sample';
import { NgIf } from '@angular/common';
import { QueueEntry, QueueType } from '../../type/queue';

@Component({
  selector: 'app-front',
  standalone: true,
  templateUrl: './front.html',
  styleUrls: ['./front.scss'],
  imports: [NgIf],
  providers: [Sample]
})
export class Front {
  success = false;
  processing = false;
  addedEntry: QueueEntry | null = null;

  constructor(private Sample: Sample, private router: Router) {}

  enqueue(type: QueueType) {
    this.processing = true;
    this.success = false;

    const prefixMap: Record<QueueType, string> = {
      priority: 'Prio',
      normal: 'Reg',
      walkin: 'Walk',
      print: 'Print'
    };

    const prefix = prefixMap[type];
    const nextNumber = `${prefix}-${Math.floor(Math.random() * 100)}`;

    const entry: QueueEntry = {
      number: nextNumber,
      type,
      status: 'waiting'
    };

    setTimeout(() => {
      this.Sample.addToQueue(entry).subscribe(() => {
        this.processing = false;
        this.success = true;
        this.addedEntry = entry;
        this.printTicket(entry);
        setTimeout(() => this.router.navigate(['/display']), 3000);
      });
    }, 2000);
  }

printTicket(entry: QueueEntry) {
  const printWindow = window.open('', '_blank', 'width=400,height=600');
  if (!printWindow) return;

  printWindow.document.open();
  printWindow.document.write(`
    <html>
      <head>
        <title>Queue Ticket</title>
        <style>
          body {
            font-family: Bold, Arial;
            text-align: center;
            padding: 20x;
          }
          h2 {
            font-size: 18px;
            margin-bottom: 10px;
          }
          p {
            font-size: 14px;
            margin : 6px;
          }
        </style>
      </head>
      <body>
        <h2>QUEUE TICKET</h2>
        <p>Lane: ${entry.type.toUpperCase()}</p>
        <p>Number:<strong>${entry.number}</strong></p>
        <p>Thank you! ❤︎</p>
        <script>
          window.onload = function () {
            window.print();
            setTimeout(function () {
              window.close();
            }, 2000);
          };
        </script>
      </body>
    </html>
  `);
  printWindow.document.close();
}


}
