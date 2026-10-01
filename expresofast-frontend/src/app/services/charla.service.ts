import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Charla } from '../models/charla.model';

@Injectable({
  providedIn: 'root'
})
export class CharlaService {
  private apiUrl = 'http://localhost:8080/api/v1/charlas';

  constructor(private http: HttpClient) {}

  obtenerTodas(): Observable<Charla[]> {
    return this.http.get<Charla[]>(this.apiUrl);
  }

  obtenerCharlas(): Observable<Charla[]> {
    return this.obtenerTodas();
  }

  obtenerPorId(id: number): Observable<Charla> {
    return this.http.get<Charla>(`${this.apiUrl}/${id}`);
  }

  crear(charla: Charla): Observable<Charla> {
    return this.http.post<Charla>(this.apiUrl, charla);
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  eliminarCharla(id: number): Observable<void> {
    return this.eliminar(id);
  }
}