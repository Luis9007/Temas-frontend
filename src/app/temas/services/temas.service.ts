import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Tema, CreateTemaDto, UpdateTemaDto } from '../models/tema.model';

@Injectable({ providedIn: 'root' })
export class TemasService {
  private readonly apiUrl = `${environment.apiUrl}/temas`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Tema[]> {
    return this.http.get<Tema[]>(this.apiUrl);
  }

  getOne(id: string): Observable<Tema> {
    return this.http.get<Tema>(`${this.apiUrl}/${id}`);
  }

  create(dto: CreateTemaDto): Observable<Tema> {
    return this.http.post<Tema>(this.apiUrl, dto);
  }

  update(id: string, dto: UpdateTemaDto): Observable<Tema> {
    return this.http.patch<Tema>(`${this.apiUrl}/${id}`, dto);
  }

  remove(id: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.apiUrl}/${id}`);
  }
}
