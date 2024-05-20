import { trigger, state, style, transition, animate } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home-ly-page',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home-ly-page.component.html',
  styleUrl: './home-ly-page.component.scss',
  animations: [
    trigger('fadeInOut', [
      state('in', style({ opacity: 1 })),
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms ease-in')
      ]),
      transition(':leave', [
        animate('300ms ease-out', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class HomeLyPageComponent {
  clickBooks: boolean = false
  isMenuVisible = true;
  lastScrollTop = 0;
    onScroll(): void {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        if (scrollTop > this.lastScrollTop && scrollTop > 50) {
            this.isMenuVisible = false;
        } else {
            this.isMenuVisible = true;
        }
        this.lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    }

  changeClick(){
    console.log('object');
    this.clickBooks = !this.clickBooks
  }


}

// TODO Hacer que si el token es invalido se elimine y se regrese al login
