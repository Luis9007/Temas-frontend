import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { TemaAprendiz, CreateTemaAprendizDto } from '../models/tema-aprendiz.model';

@Injectable({ providedIn: 'root' })
export class TemaAprendizService {
  private readonly apiUrl = `${environment.apiUrl}/tema-aprendiz`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<TemaAprendiz[]> {
    return this.http.get<TemaAprendiz[]>(this.apiUrl);
  }
  getByAprendiz(id_aprendiz: string): Observable<TemaAprendiz[]> {
    return this.http.get<TemaAprendiz[]>(`${this.apiUrl}/aprendiz/${id_aprendiz}`);
  }
  create(dto: CreateTemaAprendizDto): Observable<TemaAprendiz> {
    return this.http.post<TemaAprendiz>(this.apiUrl, dto);
  }
  remove(id: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.apiUrl}/${id}`);
  }
}