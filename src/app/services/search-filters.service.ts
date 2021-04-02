import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchFiltersService {
  filters$ = new BehaviorSubject<any>({});

  constructor() {}
}
