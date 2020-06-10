import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IMembres } from 'app/shared/model/membres.model';

@Component({
  selector: 'jhi-membres-detail',
  templateUrl: './membres-detail.component.html'
})
export class MembresDetailComponent implements OnInit {
  membres: IMembres | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ membres }) => (this.membres = membres));
  }

  previousState(): void {
    window.history.back();
  }
}
