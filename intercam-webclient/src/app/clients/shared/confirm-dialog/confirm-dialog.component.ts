import {
  Component,
  OnInit,
  Inject,
  OnDestroy,
  EventEmitter,
} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Subscription } from 'rxjs';

import { ClientService } from '../client.service';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.sass'],
})
export class ConfirmDialogComponent implements OnInit, OnDestroy {
  private clientDeleteSubscription: Subscription;

  clientDeleted = new EventEmitter();

  constructor(
    private clientService: ClientService,
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnDestroy(): void {
    if (this.clientDeleteSubscription) {
      this.clientDeleteSubscription.unsubscribe();
    }
  }

  ngOnInit() {}

  cancel(): void {
    this.dialogRef.close();
  }

  delete(): void {
    if (this.clientDeleteSubscription) {
      this.clientDeleteSubscription.unsubscribe();
    }

    this.clientDeleteSubscription = this.clientService
      .delete(this.data.client.id)
      .subscribe(() => {
        this.dialogRef.close();
        this.clientDeleted.emit();
      });
  }
}
