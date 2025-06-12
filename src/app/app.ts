import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { RouterModule } from '@angular/router';
import { BehaviorSubject, Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

import { Route } from './models/route.model';
import { RouteService } from './services/route';
import { ipToNumber } from './utils/ip.utils';

// Тип для ключей, по которым возможна сортировка
type SortableColumn = 'address' | 'gateway' | 'interface';
type SortDirection = 'asc' | 'desc';

interface SortState {
  column: SortableColumn;
  direction: SortDirection;
}


interface ViewModel {
  routes: Route[];
  sortState: SortState;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule], 
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent {
  private routeService = inject(RouteService);

  
  private routes$ = this.routeService.getRoutes();

  
  private sortStateSubject = new BehaviorSubject<SortState>({
    column: 'address', 
    direction: 'asc'
  });


  public vm$: Observable<ViewModel> = combineLatest([
    this.routes$,
    this.sortStateSubject
  ]).pipe(
    
    map(([routes, sortState]) => {
      const sortedRoutes = this.sortRoutes([...routes], sortState);
      return {
        routes: sortedRoutes,
        sortState: sortState
      };
    })
  );

  // --- Методы ---

  
  sortBy(column: SortableColumn): void {
    const currentSortState = this.sortStateSubject.value;
    let nextDirection: SortDirection = 'asc';

    
    if (currentSortState.column === column) {
      nextDirection = currentSortState.direction === 'asc' ? 'desc' : 'asc';
    }

    
    this.sortStateSubject.next({ column, direction: nextDirection });
  }

  
  private sortRoutes(routes: Route[], state: SortState): Route[] {
    const { column, direction } = state;
    const modifier = direction === 'asc' ? 1 : -1;

    routes.sort((a, b) => {
      let result = 0;
      switch (column) {
        case 'address':
          result = ipToNumber(a.address) - ipToNumber(b.address);
          break;
        case 'gateway':
          result = ipToNumber(a.gateway) - ipToNumber(b.gateway);
          break;
        case 'interface':
          result = a.interface.localeCompare(b.interface);
          break;
      }
      return result * modifier;
    });

    return routes;
  }
}