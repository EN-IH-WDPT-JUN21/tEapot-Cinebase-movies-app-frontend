import UserDetails  from 'src/app/models/user-details.model';
import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  readonly baseURL:string = "http://localhost:8000/api";  

  constructor(
    private http: HttpClient
  ) { }

    getAuthDetails() : Observable<any> {
      return this.http.get<any>("https://dev-2rwayylz.us.auth0.com/userinfo")
    };

    getUserDetails(email:string) : Observable<any> {
      return this.http.get<any>(this.baseURL + '/users/'+email);
    }

    getUserStats(email:string) : Observable<any> {
      return this.http.get<any>(this.baseURL + '/users/'+email+'/stats');
    }
    postUserDetails(userDetails: UserDetails) : Observable<any> {

      return this.http.post<any>(this.baseURL + '/users', userDetails);
    }
    updateUserDetails(email: string, userDetails: UserDetails) : Observable<any> {
      return this.http.put<any>(this.baseURL + '/users/' + email, userDetails);
    }
}

