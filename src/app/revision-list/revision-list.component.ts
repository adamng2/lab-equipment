import { forkJoin } from 'rxjs';
import { Component, OnInit, Inject, ViewChild, LOCALE_ID } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import {
  faClipboard,
  faUserEdit,
  faPen,
} from '@fortawesome/pro-duotone-svg-icons';

import { EquipmentService } from '../_services/equipment.service';
import { ChangelogService } from '../_services/changelog.service';



@Component({
  selector: 'app-revision-list',
  templateUrl: './revision-list.component.html',
  styleUrls: ['./revision-list.component.css'],
})
export class RevisionListComponent implements OnInit {
  title = "Revisions";

  equipmentID: number;
  assetID: string;
  revisions: any = [];
  assetRevisions: any = [];
  displayedColumns: string[] = [
    'date',
    'collection',
    'action',
    'field',
    'old_value',
    'new_value',
  ];

  dataSource = new MatTableDataSource<any>([]);

  // icons
  faUserEdit = faUserEdit;  
  faPen = faPen;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    @Inject(LOCALE_ID) private locale: string,
    private route: ActivatedRoute,
    private equipmentService: EquipmentService,
    private changelogService: ChangelogService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.equipmentID = this.route.snapshot.params.id;
    this.assetID = this.route.snapshot.queryParams.assetID;
    console.log(this.assetID)
    if (this.equipmentID) {
      forkJoin(this.equipmentService.getEquipmentRevisions(this.equipmentID, this.assetID)).subscribe(results => {
        this.revisions = this.changelogService.getChangelog(results[0]);
        this.assetRevisions = this.changelogService.getChangelog(results[1]);
        console.log(this.assetRevisions)
        this.dataSource = new MatTableDataSource<any>(
          [...this.revisions,...this.assetRevisions].sort((a,b) => Date.parse(b.date) - Date.parse(a.date) )
        );
        this.dataSource.paginator = this.paginator;
      })
    }
  }

  showEquipment(id: number): void {
    this.router.navigateByUrl(`equipment/${id}`);
  }
}
