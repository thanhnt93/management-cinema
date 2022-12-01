import {Component, OnInit} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {IMovie} from '../../../model/i-movie';
import {MovieService} from '../../../service/movie.service';
import {Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {

  name = '';
  page = 1;
  size = 5;
  movieList$: Observable<IMovie[]> | undefined;
  total$: Observable<number>;
  nameDelete: string;
  idDelete: number;


  constructor(private movieService: MovieService,
              private router: Router,
              private title: Title) {
    this.title.setTitle('Danh sách phim');
  }

  ngOnInit(): void {
    this.getAllMovie();
  }

  getAllMovie() {
    this.movieService.getMovieList(this.page, this.size, this.name).subscribe(value => {
      console.log(this.page);
      this.movieList$ = new BehaviorSubject<IMovie[]>(value.content);
      this.total$ = new BehaviorSubject<number>(value.totalElements);
      console.log(this.size);
    });
  }

  searchMovie() {
    this.movieService.getMovieList(1, this.size, this.name).subscribe(value => {
      this.movieList$ = new BehaviorSubject<IMovie[]>(value.content);
      this.total$ = new BehaviorSubject<number>(value.totalElements);
      this.router.navigate(['/movie/list'], {
        queryParams: {page: 1, size: this.size, name: this.name}
      });
    });
  }

  confirmDelete(value) {
    this.nameDelete = value.name;
    this.idDelete = value.id;
    Swal.fire({
      title: 'Bạn có muốn xóa ' + this.nameDelete + '?',
      text: 'Tác vụ này không thể hoàn tác !',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Đồng Ý',
      cancelButtonText: 'Hủy Bỏ',
    }).then((result) => {
      if (result.isConfirmed) {
        this.movieService.deleteMovie(this.idDelete).subscribe(value1 => {
          console.log(this.idDelete);
          Swal.fire(
            'Đã xóa!',
            'Thông tin này đã được xóa.'
          );
        });
      }
    });
    this.ngOnInit();
  }

}
