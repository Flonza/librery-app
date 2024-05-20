import { Component, Inject, PLATFORM_ID, ViewChild, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule, isPlatformBrowser } from '@angular/common';



@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export default class HomePageComponent {
  loginVisible: boolean = true
  resVisible:boolean = true
  @ViewChild('logBotton') logBotton: any;
  @ViewChild('resBotton') resBotton: any;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting === true) {
            this.loginVisible = true;
          } else {
            this.loginVisible = false;
          }
        },
        { threshold: [0] }
      );
      const resObserver = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting === true) {
            this.resVisible = true;
          } else {
            this.resVisible = false;
          }
        },
        { threshold: [0] }
      );

      observer.observe(this.logBotton.nativeElement);
      resObserver.observe(this.resBotton.nativeElement);
    }
  }
}
