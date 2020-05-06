import { Component, OnInit, OnDestroy } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';

import { Client } from './shared/client.model';
import { ClientService } from './shared/client.service';
import { ConfirmDialogComponent } from './shared/confirm-dialog/confirm-dialog.component';
import { Subscription, Subject } from 'rxjs';
import {
  switchMap,
  debounceTime,
  distinctUntilChanged,
  takeUntil,
} from 'rxjs/operators';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.sass'],
})
export class ClientsComponent implements OnInit, OnDestroy {
  private clientGetAllSubscription: Subscription;
  private clientGetByIdSubscription: Subscription;
  private searchTerms = new Subject<string>();

  displayedColumns: string[] = [
    'id',
    'name',
    'fatherName',
    'motherName',
    'birthDate',
    'postalCode',
    'income',
    'delete',
  ];
  dataSource: MatTableDataSource<Client>;
  pageSize: number = 10;
  pageLength: number = 0;
  pageEvent: PageEvent;

  terms = '';

  constructor(private clientService: ClientService, private dialog: MatDialog) {
    this.pageEvent = {
      length: this.pageLength,
      pageIndex: 0,
      pageSize: this.pageSize,
    };
  }

  ngOnDestroy(): void {
    if (this.clientGetAllSubscription) {
      this.clientGetAllSubscription.unsubscribe();
    }

    if (this.clientGetByIdSubscription) {
      this.clientGetByIdSubscription.unsubscribe();
    }
  }

  ngOnInit() {
    this.clientGetByIdSubscription = this.searchTerms
      .pipe(
        debounceTime(350),
        distinctUntilChanged(),
        switchMap((term) => this.clientService.getById(term))
      )
      .subscribe((client) => {
        if (client) {
          this.dataSource = new MatTableDataSource([client]);
          this.pageLength = 1;
        } else {
          this.dataSource = new MatTableDataSource([]);
          this.pageLength = 0;
        }
      });

    this.clientGetAllSubscription = this.clientService
      .getAll(
        new HttpParams().set('page', '0').set('size', this.pageSize.toString())
      )
      .subscribe((clientPage) => {
        this.dataSource = new MatTableDataSource(clientPage.clientList);
        this.pageLength = clientPage.totalElements;
      });
  }

  delete(client: Client) {
    if (this.clientGetAllSubscription) {
      this.clientGetAllSubscription.unsubscribe();
    }

    const ref = this.dialog.open(ConfirmDialogComponent, {
      width: '250px',
      data: { client },
    });

    this.clientGetAllSubscription = ref.componentInstance.clientDeleted
      .pipe(switchMap(() => this.clientService.getAll(
        new HttpParams()
          .set('page', this.pageEvent.pageIndex.toString())
          .set('size', this.pageEvent.pageSize.toString())
      )))
      .subscribe((clientPage) => {
        this.dataSource = new MatTableDataSource(clientPage.clientList);
        this.pageLength = clientPage.totalElements;
      });

    ref.afterClosed().subscribe(() => {
      if (this.clientGetAllSubscription) {
        this.clientGetAllSubscription.unsubscribe();
      }
    });
  }

  sortData(sort: Sort) {
    let params = new HttpParams()
      .set('page', this.pageEvent.pageIndex.toString())
      .set('size', this.pageEvent.pageSize.toString());

    if (sort.direction) {
      params = params.set('sort', `${sort.active},${sort.direction}`);
    }

    if (this.clientGetAllSubscription) {
      this.clientGetAllSubscription.unsubscribe();
    }

    this.clientGetAllSubscription = this.clientService
      .getAll(params)
      .subscribe((clientPage) => {
        this.dataSource = new MatTableDataSource(clientPage.clientList);
        this.pageLength = clientPage.totalElements;
      });
  }

  onPageChange(pageEvent: PageEvent) {
    this.pageEvent = pageEvent;

    if (this.clientGetAllSubscription) {
      this.clientGetAllSubscription.unsubscribe();
    }

    this.clientGetAllSubscription = this.clientService
      .getAll(
        new HttpParams()
          .set('page', this.pageEvent.pageIndex.toString())
          .set('size', this.pageEvent.pageSize.toString())
      )
      .subscribe((clientPage) => {
        this.dataSource = new MatTableDataSource(clientPage.clientList);
        this.pageLength = clientPage.totalElements;
      });
  }

  applyFilter() {
    if (this.terms) {
      this.searchTerms.next(this.terms);
    } else {
      if (this.clientGetAllSubscription) {
        this.clientGetAllSubscription.unsubscribe();
      }

      this.clientGetAllSubscription = this.clientService
        .getAll(
          new HttpParams()
            .set('page', this.pageEvent.pageIndex.toString())
            .set('size', this.pageEvent.pageSize.toString())
        )
        .subscribe((clientPage) => {
          this.dataSource = new MatTableDataSource(clientPage.clientList);
          this.pageLength = clientPage.totalElements;
        });
    }
  }
}
