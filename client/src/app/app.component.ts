import { Component, OnInit } from '@angular/core';
import * as Io from 'socket.io-client';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  io;

  constructor() {
    this.io = Io('http://localhost:3000');
  }

  ngOnInit(): void {
    this.io.on('connection', (socket) => {
      console.log(socket);
    });

    this.io.on('message', (msg) => {
      console.log(msg);
    })
  }
  title = 'client';
}
