import { Component } from '@angular/core';
import { BooksService } from '../../services/books.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from '../../../shared/loader/loader.component';

@Component({
  selector: 'app-book-page',
  standalone: true,
  imports: [CommonModule, RouterModule, LoaderComponent],
  templateUrl: './book-page.component.html',
  styleUrl: './book-page.component.scss'
})
export default class BookPageComponent {
  bookInfo: any;
  showLoader: boolean = true;
  constructor(private api:BooksService, private activatedRoute: ActivatedRoute){

  }

  ngOnInit(): void {
      const id = this.activatedRoute.snapshot.params['id'];
      this.getBookInfo(id)
  }

  getBookInfo(id:any){
    this.api.getInfo('/books/'+id, null).subscribe({
      next: res => {
        this.bookInfo = res.response;
        this.showLoader = false
      }, error: err => {
        console.log(err);
      }
    })
  }
}
