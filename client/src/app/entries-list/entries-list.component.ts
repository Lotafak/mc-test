import { Component, OnInit } from '@angular/core';
import * as Io from 'socket.io-client';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment';

@Component({
  selector: 'app-entries-list',
  templateUrl: './entries-list.component.html',
  styleUrls: ['./entries-list.component.scss']
})
export class EntriesListComponent implements OnInit {
  io: SocketIOClient.Socket;
  entries = [];

  constructor(private http: HttpClient) {
    this.io = Io('http://localhost:3000');
  }

  ngOnInit() {
    // Ask for existing entries
    this.http
      .get<any[]>(`${environment.apiUrl}/time-entries`)
      .subscribe(entries => {
        this.entries = this.reduceEntries(entries).map(this.entryMapper);
      });

    this.io.on('new entry', (entry) => {
      this.entries.unshift(this.entryMapper(entry));
      this.entries = this.reduceEntries(this.entries);
    })
  }

  // The list contains entries from different locations, but we need only 1 entry per chip
  reduceEntries(entries: any[]) {
    console.log(entries);
    return entries.reduce((acc: any[], curr) => {
      const prevIndex = acc.findIndex(entry => entry.chipId === curr.chipId);
      if (prevIndex > -1) {
        // Update only if previous location is 1
        if (acc[prevIndex].location === '1') {
          acc[prevIndex] = curr;
        }
      } else {
        acc.push(curr);
      }
      return acc;
    }, []);
  }

  // Remove or format time entry
  entryMapper(entry: { [x: string]: any; Participant: any; createdAt: any; }) {
    const { Participant, createdAt, ...rest } = entry;
    const time = rest.location === '1'
      ? ''
      : moment(createdAt).format('HH:mm:ss.SSS');
    return {
      ...rest,
      createdAt: time,
      firstName: Participant.firstName,
      lastName: Participant.lastName,
      startNumber: Participant.startNumber,
    }
  };
}
