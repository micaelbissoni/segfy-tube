import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'SegfyTube';
  searchBarIsVisible = true;

  toggleSearchBar() {
    this.searchBarIsVisible = !this.searchBarIsVisible;
  }
}
