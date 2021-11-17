import { Movie } from 'src/app/models/movie.model';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MoviesService } from 'src/app/service/movie-service/movies.service';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieDetail } from 'src/app/models/movie-detail.model';
import movieDetailed from './../movie-list/mock-files/testFilmsItem-detail.json'
import { Subject } from 'rxjs';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent implements OnInit {



  @Input() movie: MovieDetail;
  destroy = new Subject

  getMovieId(movieId: string) {
    return movieId;

  }

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private movieService: MoviesService,public activeModal: NgbActiveModal) {
    this.movie = {
      id: '',
      title: '',
      fullTitle: '',
      type: '',
      year: '',
      image: '',
      releaseDate: '',
      runtimeMins: '',
      runtimeStr: '',
      plot: '',
      awards: '',
      directors: '',
      writers: '',
      stars: '',
      genres: '',
      imdbRating: '',
      tvSeriesInfo: {
        yearEnd: 0,
        creators: '',
        seasons: []
      }
    }
  }

  ngOnInit(): void {

    const movieId: string = this.activatedRoute.snapshot.params['movieId'];
    const movieId2: string = this.activatedRoute.snapshot.params['id'];
    const movieId4: string | null = this.activatedRoute.snapshot.paramMap.get('id')
    const movieId3: string | null = this.activatedRoute.snapshot.paramMap.get('movieId')
    console.log(movieId)
    console.log(movieId2)
    console.log(movieId3)
    console.log(movieId4)
    
    // this.movieService.getMovieById(movieId).subscribe(
    //   result => {
    //     this.movie = {
    //       id: result.id,
    //       title: result.title,
    //       fullTitle: movieDetailed.fullTitle,
    //       type: movieDetailed.type,
    //       year: movieDetailed.year,
    //       image: movieDetailed.image,
    //       releaseDate: movieDetailed.releaseDate,
    //       runtimeMins: movieDetailed.runtimeMins,
    //       runtimeStr: movieDetailed.runtimeStr,
    //       plot: movieDetailed.plot,
    //       awards: movieDetailed.awards,
    //       directors: movieDetailed.directors,
    //       writers: movieDetailed.writers,
    //       stars: movieDetailed.stars,
    //       genres: movieDetailed.genres,
    //       imdbRating: movieDetailed.imDbRating,
    //       tvSeriesInfo: {
    //         yearEnd: 123,
    //         creators: '',
    //         seasons: []
    //       }
    //     }

    //   }
    // )
  }
}

