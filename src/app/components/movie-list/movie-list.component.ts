
import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/models/movie.model';
import { MoviesService } from 'src/app/services/movie-service/movies.service';
import testFilms from './mock-files/testFilms.json';
import testTvShows from './mock-files/testTvSeries.json';
@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {

  private readonly mock = false; // Remove before submit the project 

  listOfMovies: any[];
  loading = true;
  filmsEnabled = true;
  searchString: string = '';

  constructor(private movieService: MoviesService) {
    this.listOfMovies = [];
  }

  ngOnInit(): void {
    this.getFilms();
  }

   getFilms():void {       
    if (!this.mock) {     // Remove before submit the project  
      this.movieService.getFilms().subscribe(
         result => {
          console.log(result.items);
          this.listOfMovies = result.items;
          this.loading = false;
        }
      )
    } else {
      this.listOfMovies = testFilms.items;
      this.loading = false;
    }
  }

   getTvSeries(): void {           
    if (!this.mock) {     // Remove before submit the project  
      this.movieService.getTvSeries().subscribe(
         result => {
          console.log(result.items);
          this.listOfMovies = result.items;
          this.loading = false;
        }
      )
    } else {
      this.listOfMovies = testTvShows.items;
      this.loading = false;
    }
  }

  filterFilms(): void {
      this.movieService.searchFilmsByText(this.searchString).subscribe(
        result => {
          console.log(result);
          this.listOfMovies = result.results;
          this.loading = false;
        }
      )
    
  }

   filterTvSeries(): void {
    this.movieService.searchSeriesByText(this.searchString).subscribe(
       result => {
        console.log(result);
         this.delay(500);
        this.listOfMovies = result.results;
        this.loading = false;
      }
    )
  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  filterResults() {
    this.loading = true;
    if (this.filmsEnabled) {
      if (this.searchString === '' || this.searchString === null) {
        this.getFilms();
      } else {
        this.filterFilms();
      }
    } else {
      if (this.searchString === '' || this.searchString === null) {
        this.getTvSeries();
      } else {
        this.filterTvSeries();
      }

      this.getTvSeries();
    }
  }

  enableFilms() {
    if(this.filmsEnabled===false) {
      this.filmsEnabled = true;
      this.searchString='';
    }

  }

  enableTvSeries() {
    if(this.filmsEnabled===true) {
      this.filmsEnabled = false;
      this.searchString='';
    }

  }
}
