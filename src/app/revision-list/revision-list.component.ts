import { forkJoin } from 'rxjs';
import {
  faClipboard,
  faUserEdit,
  faPen,
} from '@fortawesome/pro-duotone-svg-icons';
import { Component, OnInit, Inject, ViewChild, LOCALE_ID } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';



import { EquipmentService } from '../_services/equipment.service';
import { ChangelogService } from '../_services/changelog.service';
import { UserService } from '../_services/user.service';

import {User} from "../_model/user";

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
  users: User[];

  displayedColumns: string[] = [
    'action_by',
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
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.equipmentID = this.route.snapshot.params.id;
    this.assetID = this.route.snapshot.queryParams.assetID;
    if (this.equipmentID) {
      forkJoin([...this.equipmentService.getEquipmentRevisions(this.equipmentID, this.assetID), this.userService.getUsers()]).subscribe(results => {
        this.revisions = this.changelogService.getChangelog(results[0]);
        this.assetRevisions = this.changelogService.getChangelog(results[1]);
        this.users = results[2];

        let sorted_revisions = [...this.revisions,...this.assetRevisions].sort((a,b) => Date.parse(b.date) - Date.parse(a.date) );
        sorted_revisions = sorted_revisions.map(revision => {
          let action_by_full_name = "Unknown"
          
          const action_by_user = this.users.find(user => {
            return user.id === revision.action_by
          })
          if (action_by_user) {
            action_by_full_name = `${action_by_user.firstName} ${action_by_user.lastName}` 
          }

          return {
            ...revision,
            action_by: action_by_full_name
          }
          
          
        });
        this.dataSource = new MatTableDataSource<any>(
          sorted_revisions
        );
        this.dataSource.paginator = this.paginator;
      })
    }
  }

  showEquipment(id: number): void {
    this.router.navigateByUrl(`equipment/${id}`);
  }
}
