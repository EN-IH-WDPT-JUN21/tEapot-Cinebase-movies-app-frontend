import UserDetails  from 'src/app/models/user-details.model';
import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  readonly baseURL:string = "http://localhost:8100/api";  

  constructor(
    private http: HttpClient
  ) { }

    getAuthDetails() : Observable<any> {
      console.log(this.http.get<any>("https://dev-2rwayylz.us.auth0.com/userinfo"));
      return this.http.get<any>("https://dev-2rwayylz.us.auth0.com/userinfo")
    };

    getUserDetails(username:string) : Observable<any> {
      console.log(this.http.get<any>(this.baseURL + '/users/'+username));
      return this.http.get<any>(this.baseURL + '/users/'+username);
    }
    postUserDetails(userDetails: UserDetails) : Observable<any> {
      return this.http.post<any>(this.baseURL + '/users', userDetails);
    }
    updateUserDetails(username: string, userDetails: UserDetails) : Observable<any> {
      console.log("details from update" + userDetails);
      console.log("test from return "+this.http.patch<any>(this.baseURL + '/users/' + username, userDetails.username))
      return this.http.post<any>(this.baseURL + '/users/' + username, userDetails);
    }
}
