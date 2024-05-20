import { Component, Input } from '@angular/core';
import { BookInterface } from '../../interfaces/book.interface';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-book-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './book-card.component.html',
  styleUrl: './book-card.component.scss'
})
export class BookCardComponent {
  @Input() book: BookInterface;


  constructor(){
    this.book = {
      identificador: '',
      titulo: '',
      author: '',
      fecha_publicacion: "",
      genero_principal: '',
      descripcion:
        '',
      editorial: '',
      alquilar: 0,
      comprar: 0,
      valor: 0,
      url: ''
    }
  }
}
