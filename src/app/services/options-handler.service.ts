import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OptionsHandlerService {

  darkMode$ = new BehaviorSubject<boolean>(false) 

  constructor() { }
}
