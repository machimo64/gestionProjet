import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IListe } from 'app/shared/model/liste.model';

@Component({
  selector: 'jhi-liste-detail',
  templateUrl: './liste-detail.component.html'
})
export class ListeDetailComponent implements OnInit {
  liste: IListe | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ liste }) => (this.liste = liste));
  }

  previousState(): void {
    window.history.back();
  }
}
