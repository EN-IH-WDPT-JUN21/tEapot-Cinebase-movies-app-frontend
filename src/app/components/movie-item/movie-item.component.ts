import { MovieDetailComponent } from './../movie-detail/movie-detail.component';
import { Component, OnInit, Input } from '@angular/core';
import { Movie } from 'src/app/models/movie.model';
import { NgbActiveModal,NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-movie-item',
  templateUrl: './movie-item.component.html',
  styleUrls: ['./movie-item.component.css']
})
export class MovieItemComponent implements OnInit {

  constructor( private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  @Input() 
  movie! : Movie;

  open() {
    const modalRef = this.modalService.open(MovieDetailComponent, {size: 'lg'});
  
    modalRef.componentInstance.movieId=this.movie.id;

  }

}
