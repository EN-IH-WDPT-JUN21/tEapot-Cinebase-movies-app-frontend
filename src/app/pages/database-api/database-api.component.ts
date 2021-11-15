import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment as env } from '../../../environments/environment';
import { AuthService } from '@auth0/auth0-angular';

interface Message {
  message: string;
}

@Component({
  selector: 'app-database-api',
  templateUrl: './database-api.component.html',
  styles: [
  ]
})

export class DatabaseApiComponent implements OnInit {

  message: string = "";
  profileJson: string = '';
  constructor(private http: HttpClient, public auth: AuthService) {}

  ngOnInit(): void {
    this.auth.user$.subscribe(
      (profile) => (this.profileJson = JSON.stringify(profile, null, 2)),
    );
  }

  callApi(): void {
    this.http
      .get(`${env.dev.serverUrl}/api/user`)
      .subscribe((result: any) => {
        this.message = result.message;
      });
  }

  callSecureApi(): void {
    this.http
      .get(`${env.dev.serverUrl}/api/user`)
      .subscribe((result: any) => {
        this.message = result.message;

      });
  }
}
