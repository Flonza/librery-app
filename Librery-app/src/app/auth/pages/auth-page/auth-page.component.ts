import { CommonModule, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
@Component({
  selector: 'app-auth-page',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './auth-page.component.html',
  styleUrl: './auth-page.component.scss'
})
export class AuthPageComponent implements OnInit{
  public animation: any;
  private myUrl: string = ""

  constructor(private router: Router, private Location: Location){
  }

  ngOnInit(): void {
    this.myUrl = this.router.url;
    this.animation = null
    this.Location.onUrlChange(url => {
      this.myUrl = url;

     if(this.myUrl === "/auth/login"){
      this.animation = true
      } else if(this.myUrl == "/auth/register") {
      this.animation = false
    }
    })
  }

}
