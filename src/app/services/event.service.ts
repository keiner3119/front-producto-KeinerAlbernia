import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private categoryAddedSource = new Subject<void>();
  categoryAdded$ = this.categoryAddedSource.asObservable();

  constructor() { }

  announceCategoryAdded() {
    this.categoryAddedSource.next();
  }
}
