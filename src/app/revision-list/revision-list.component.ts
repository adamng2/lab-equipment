import { Component, OnInit, Inject, ViewChild, LOCALE_ID } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { EquipmentService } from '../_services/equipment.service';
import { ChangelogService } from '../_services/changelog.service';

@Component({
  selector: 'app-revision-list',
  templateUrl: './revision-list.component.html',
  styleUrls: ['./revision-list.component.css'],
})
export class RevisionListComponent implements OnInit {
  equipmentID: number;
  revisions: any = [];
  displayedColumns: string[] = [
    'date',
    'action',
    'field',
    'old_value',
    'new_value',
  ];

  dataSource = new MatTableDataSource<any>([]);

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
    if (this.equipmentID) {
      this.equipmentService
        .getEquipmentRevisions(this.equipmentID)
        .subscribe((result) => {
          this.revisions = this.changelogService.getChangelog(result);
          this.dataSource = new MatTableDataSource<any>(
            this.revisions.reverse()
          );
          this.dataSource.paginator = this.paginator;
        });
    }
  }

  showEquipment(id: number): void {
    this.router.navigate([]).then(() => {
      window.open('#/equipment/' + id, '_blank');
    });
  }
}
