import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

import { switchMap } from 'rxjs/operators';

import { Client } from '../shared/client.model';
import { ClientService } from '../shared/client.service';
import { Subscription, of } from 'rxjs';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.sass'],
})
export class ClientComponent implements OnInit, OnDestroy {
  private getClientSubscription: Subscription;
  private saveClientSubscription: Subscription;
  private clientId: string;

  client: Client = new Client();
  maxDate: Date = new Date();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private clientService: ClientService
  ) {}

  ngOnDestroy(): void {
    if (this.getClientSubscription) {
      this.getClientSubscription.unsubscribe();
    }

    if (this.saveClientSubscription) {
      this.saveClientSubscription.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.getClientSubscription = this.route.paramMap
      .pipe(
        switchMap((params: ParamMap) => {
          this.clientId = params.get('id');
          return this.clientId
            ? this.clientService.getById(this.clientId)
            : of(null);
        })
      )
      .subscribe((client) => (this.client = client ? client : new Client()));
  }

  save(clientForm: NgForm) {
    if (clientForm.valid) {
      if (this.saveClientSubscription) {
        this.saveClientSubscription.unsubscribe();
      }

      if (this.clientId) {
        this.saveClientSubscription = this.clientService
          .update(this.clientId, this.client)
          .subscribe(() => this.router.navigate(['/clients']));
      } else {
        this.saveClientSubscription = this.clientService
          .create(this.client)
          .subscribe(() => this.router.navigate(['/clients']));
      }
    }
  }

  cancel() {
    this.router.navigate(['/clients']);
  }
}
