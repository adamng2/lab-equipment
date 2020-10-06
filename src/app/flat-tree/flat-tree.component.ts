import { Component, OnInit, Input } from '@angular/core';
import { faChevronRight, faChevronDown, faFolder, faFolderOpen } from '@fortawesome/pro-light-svg-icons';

@Component({
  selector: 'app-flat-tree',
  templateUrl: './flat-tree.component.html',
  styleUrls: ['./flat-tree.component.css']
})
export class FlatTreeComponent implements OnInit {

  @Input() opened : boolean = false;
  @Input() strings : Array<string>;
  @Input() name: string;

  faChevronRight = faChevronRight;
  faChevronDown = faChevronDown;


  constructor() { }

  ngOnInit() {
  }

}
