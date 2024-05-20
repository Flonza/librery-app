import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxChange, MatCheckboxModule } from '@angular/material/checkbox';
import { CalendarModule } from 'primeng/calendar'
import { MatSelectModule } from '@angular/material/select'
import { ChipsModule } from 'primeng/chips';
import { BooksService } from '../../services/books.service';
import { BookCardComponent } from '../../components/book-card/book-card.component';
import { UtilService } from '../../../shared/util/util.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatTooltipModule} from '@angular/material/tooltip';
import { LoaderComponent } from '../../../shared/loader/loader.component';

@Component({
  selector: 'app-books-search',
  standalone: true,
  imports: [
    MatAutocompleteModule,
    MatFormFieldModule,
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    MatCheckboxModule,
    CalendarModule,
    MatSelectModule,
    ChipsModule,
    BookCardComponent,
    NgxPaginationModule,
    MatTooltipModule,
    LoaderComponent
  ],
  templateUrl: './books-search.component.html',
  styleUrl: './books-search.component.scss',
})
export default class BooksSearchComponent {
  showAdvOptions: boolean = false
  showLoader:boolean = true;
  books: any;
  editoriales: any
  p: number = 1; // Página actual
  total: any;

  forRent: boolean = false;
  forBuy: boolean = false;
  editSlect: boolean = false
  formFilters: FormGroup = {} as FormGroup;
  values: any;

  constructor(private builder: FormBuilder, private api:BooksService, private util:UtilService) {
    this.formFilters = this.builder.group({
      title: [undefined],
      rent: [undefined],
      buy: [undefined],
      publication_date: [undefined],
      genres: [undefined],
      editorial: [undefined],
    });
  }


  ngOnInit(): void {
    this.getEditoriales();
    this.getBooks();
  }


  handleRentChange(event: MatCheckboxChange) {
    this.forRent = event.checked;
    if (event.checked) {
      this.forBuy = false;
      this.formFilters.get('buy')?.setValue(0)
      this.formFilters.get('rent')?.setValue(1)
    }
    console.log(this.formFilters.value);
  }

  handleBuyChange(event: MatCheckboxChange) {
    this.forBuy = event.checked;
    if (event.checked) {
      this.forRent = false; // Desmarcar el checkbox de alquiler si se marca el de compra
      this.formFilters.get('buy')?.setValue(1)
      this.formFilters.get('rent')?.setValue(0)
    }
    console.log(this.formFilters.value);

  }

  getBooks() {
    const data = this.formFilters.value;
    this.api.getInfo("/books", data).subscribe({
      next: res => {
        this.books = res.response
        this.util.processResponse(res)
        this.total = this.books.length;
        this.showLoader = false
      }, error: err => {
        console.log(err);
      }
    })
  }
  onPageChange(page: number): void {
    this.p = page;
  }

  private getEditoriales(){
    this.api.getInfo('/books/publishers', null).subscribe({
      next: res => {
        this.editoriales = res.response
      }, error: err => {
        console.error(err);
      }
    })
  }
}
