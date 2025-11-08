import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Registro } from '../models/registro.model';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private baseUrl = 'http://localhost:5000/api'; 

  constructor(private http: HttpClient) {}

   // Obtener lista de usuarios para filtros
  getUsuarios(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/User/obtenerUsuarios`);
  }
  // Obtener lista de operaciones disponibles
  getOperaciones(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/Operacion/obtener`);
  }

  // Obtener oficinas registradas
  getOficinas(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/Oficina/obtener`);
  }

  // Obtener sistemas disponibles
  getSistemas(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/Sistema/sistemas`);
  }

  // Obtener lista de comandos (para Filtro Comando)
  getComandos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/Comando/obtener`);
  }

  // Crear nuevo registro (se registra también en bitácora automáticamente)
  insertarBitacora(data: Registro): Observable<any> {
    return this.http.post(`${this.baseUrl}/Bitacora/insertar`, data);
  }

}
