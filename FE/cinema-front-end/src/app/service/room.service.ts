import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IRoom} from '../model/i-room';


const API_URL = `${environment.api_url}`;

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  constructor(private http: HttpClient) {
  }

  getAllRoom(): Observable<IRoom[]> {
    return this.http.get<IRoom[]>(API_URL + '/room/list');
  }
}
