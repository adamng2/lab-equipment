import { Component, OnInit } from '@angular/core';
// import { faPlus, faSearch } from '@fortawesome/pro-light-svg-icons';
import { faPlus, faSearch, faMap } from '@fortawesome/pro-duotone-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  faPlus = faPlus;
  faSearch = faSearch;
  faMap = faMap;

  constructor() { }

  ngOnInit(): void {
  }

}
