import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SmCliente } from '../../shared/models/Clientes/SmClientes';
import { SmContribuyente } from '../../shared/models/Clientes/SmContribuyente';
import { SmDocumento } from '../../shared/models/Clientes/SmDocumento';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SmClienteService {
  private readonly baseUrl = 'http://localhost:8080/api';
  constructor(private readonly http: HttpClient) {}

  list(): Observable<SmCliente[]> {
    return this.http.get<SmCliente[]>(`${this.baseUrl}/clientes`);
  }

  get(id: number): Observable<SmCliente> {
    return this.http.get<SmCliente>(`${this.baseUrl}/clientes/${id}`);
  }

  create(cliente: SmCliente): Observable<SmCliente> {
    return this.http.post<SmCliente>(`${this.baseUrl}/clientes`, cliente);
  }

  update(id: number, cliente: SmCliente): Observable<SmCliente> {
    return this.http.put<SmCliente>(`${this.baseUrl}/clientes/${id}`, cliente);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/clientes/${id}`);
  }

  getTiposContribuyentes(): Observable<SmContribuyente[]> {
    return this.http.get<SmContribuyente[]>(`${this.baseUrl}/contribuyentes`);
  }

  getTiposDocumentos(): Observable<SmDocumento[]> {
    return this.http.get<SmDocumento[]>(`${this.baseUrl}/documentos`);
  }
}
