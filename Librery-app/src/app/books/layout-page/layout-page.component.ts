import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
import { UtilService } from '../../shared/util/util.service';
import { MatIconModule } from '@angular/material/icon';
import { MenuItem } from 'primeng/api';
import { menuItems } from '../constants/menu.const';
import { CommonModule } from '@angular/common';
import { trigger, state, style, transition, animate } from '@angular/animations';


@Component({
  selector: 'app-layout-page',
  standalone: true,
  imports: [MatIconModule, CommonModule],
  templateUrl: './layout-page.component.html',
  styleUrl: './layout-page.component.scss',
  animations: [
    trigger('fadeInOut', [
      state('in', style({ opacity: 1 })),
      transition(':enter', [ // :enter es un alias para void => *
        style({ opacity: 0 }),
        animate('150ms ease-in')
      ]),
      transition(':leave', [ // :leave es un alias para * => void
        animate('150ms ease-out', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class LayoutPageComponent implements OnInit{
  public menu: any = menuItems
  public user: any;
  public clickMenu:boolean = false


  constructor(private src:UserService, private util:UtilService){

  }

  ngOnInit(): void {
      this.getData()
  }

  getData(){
    this.src.getData("books").subscribe({
      next: resp => {
        this.user = resp
        console.log(resp);
      }, error: err => {
        this.util.processResponse(err.error)
        console.error(err)
      }
    })
  }

  setClass(){
    if(this.clickMenu == true) {
      return "rotate-open"
    } else {
      return "rotate-close"
    }
  }

  changeClick(val: any){

  }
}
