import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-test-helper',
  templateUrl: './test-helper.component.html',
  styleUrls: ['./test-helper.component.scss']
})
export class TestHelperComponent implements OnInit {
  participants = [];
  locations = [
    { id: 1,  name: 'Entering the finish corridor' },
    { id: 2,  name: 'Leaving the finish corridor' }
  ];
  form = {};
  status = {
    error: false,
    message: ''
  }

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http
      .get<any[]>(`${environment.apiUrl}/participants`)
      .subscribe(participants => this.participants = participants)
  }

  onSubmit() {
    this.http
      .post(`${environment.apiUrl}/time-entries`, { ...this.form, timestamp: new Date() })
      .subscribe(
        timeEntry => this.status = { message: 'Entry created succesfully', error: false },
        err => this.status = { message: err.error.errors[0].msg, error: true },
      );
  }
}
