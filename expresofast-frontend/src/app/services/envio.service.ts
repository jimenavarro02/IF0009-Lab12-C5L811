import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Envio, CrearEnvioDTO } from '../models/envio.model';

@Injectable({
  providedIn: 'root'
})
export class EnvioService {
  private apiUrl = 'http://localhost:8080/api/v1/envios';

  constructor(private http: HttpClient) {}

  obtenerTodos(): Observable<Envio[]> {
    return this.http.get<Envio[]>(this.apiUrl);
  }

  obtenerEnvios(): Observable<Envio[]> {
    return this.obtenerTodos();
  }

  buscarPorRastreo(codigo: string): Observable<Envio> {
    return this.http.get<Envio>(`${this.apiUrl}/rastreo/${codigo}`);
  }

  obtenerPorRastreo(codigo: string): Observable<Envio> {
    return this.buscarPorRastreo(codigo);
  }

  crear(envio: CrearEnvioDTO): Observable<Envio> {
    return this.http.post<Envio>(this.apiUrl, envio);
  }

  actualizarEstado(id: number, estado: string): Observable<Envio> {
    return this.http.patch<Envio>(`${this.apiUrl}/${id}/estado`, { estado });
  }
}