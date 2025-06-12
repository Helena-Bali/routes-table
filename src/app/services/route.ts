
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Route } from '../models/route.model';

@Injectable({
  providedIn: 'root'
})
export class RouteService {

  private mockRoutes: Route[] = [
    { uuid: 'uuid-1', address: '192.168.1.0', mask: '24', gateway: '0.0.0.0', interface: 'Домашняя сеть' },
    { uuid: 'uuid-2', address: '0.0.0.0', mask: '0', gateway: '193.0.174.1', interface: 'Подключение Ethernet' },
    { uuid: 'uuid-3', address: '10.1.30.0', mask: '24', gateway: '0.0.0.0', interface: 'Гостевая сеть' },
    { uuid: 'uuid-4', address: '193.0.175.22', mask: '32', gateway: '193.0.174.1', interface: 'Подключение Ethernet' },
    { uuid: 'uuid-5', address: '193.0.174.0', mask: '24', gateway: '0.0.0.0', interface: 'Подключение Ethernet' },
    { uuid: 'uuid-6', address: '172.16.0.0', mask: '16', gateway: '172.16.0.1', interface: 'VPN-корпоративный' },
    { uuid: 'uuid-7', address: '193.0.175.0', mask: '25', gateway: '193.0.174.10', interface: 'Подключение Ethernet' },
    { uuid: 'uuid-8', address: '10.8.0.0', mask: '16', gateway: '10.8.0.1', interface: 'OpenVPN' },
  ];

  getRoutes(): Observable<Route[]> {
    return of(this.mockRoutes);
  }
}
