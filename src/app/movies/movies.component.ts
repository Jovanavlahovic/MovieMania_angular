import { Component, OnInit } from '@angular/core';
import { MovieService } from '../service/movie.service';
import { MovieList } from './model/movie.model';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css'],
})
export class MoviesComponent implements OnInit {
  movieList: MovieList;
  numbOfPages: number;
  activePage: number = 1;

  params = {
    sort: 'rating',
    sortDirection: 'desc',
    page: 1,
    pageSize: 6,
  };
  constructor(private service: MovieService) {}

  ngOnInit(): void {
    this.getMovies();
  }

  getMovies(): void {
    this.service.getMovies(this.params).subscribe((x) => {
      this.movieList = x;
      this.numbOfPages = Math.ceil(this.movieList.count / this.params.pageSize);
    });
  }

  setPage(page): void {
    if (page > 0 || page <= this.numbOfPages) {
      this.params.page = page;
      this.getMovies();
    }
  }

  changeDirection(){
    if(this.params.sortDirection == 'desc'){
      this.params.sortDirection = 'asc'
    }
    else if(this.params.sortDirection == 'asc'){
      this.params.sortDirection = 'desc'
    }
    this.getMovies();
  }
}
