import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Movie } from '../../models/movie.model';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  private readonly apiKey='';
  private readonly baseUrl = 'https://imdb-api.com/en/API';
  
  constructor(private http: HttpClient) { }

  getTvSeries(): Observable<any> {
    return this.http.get<any>(this.baseUrl + '/Top250Tvs/' +this.apiKey)

  }

  getFilms(): Observable<any> {
    return this.http.get<any>(this.baseUrl + '/Top250Movies/' +this.apiKey)
    
  }

  searchSeriesByText(text:string) : Observable<any> {
    return this.http.get<any>(this.baseUrl+'/SearchSeries/'+this.apiKey + '/' +text)
  }

  searchFilmsByText(text:string) : Observable<any> {
    return this.http.get<any>(this.baseUrl+'/SearchMovie/'+this.apiKey + '/' +text)
  }

  getMovieById(id:string) : Observable<any> {
    return this.http.get<any>(this.baseUrl+ '/Title/' + this.apiKey + '/' + id)
  } 


}
