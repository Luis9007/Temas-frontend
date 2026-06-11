import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TemaAprendizService } from '../services/tema-aprendiz.service';
import { AprendicesService } from '../../aprendices/services/aprendices.service';
import { TemasService } from '../../temas/services/temas.service';
import { TemaAprendiz } from '../models/tema-aprendiz.model';
import { Aprendiz } from '../../aprendices/models/aprendiz.model';
import { Tema } from '../../temas/models/tema.model';

@Component({
  selector: 'app-tema-aprendiz-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './tema-aprendiz-list.component.html',
  styleUrls: ['./tema-aprendiz-list.component.scss'],
})
export class TemaAprendizListComponent implements OnInit {
  asignaciones: TemaAprendiz[] = [];
  aprendices: Aprendiz[] = [];
  temas: Tema[] = [];

  selectedAprendiz: string | null = null;
  selectedTema: string | null = null;

  loading = false;
  saving = false;
  error: string | null = null;
  successMsg: string | null = null;
  deleteConfirmId: string | null = null;

  constructor(
    private temaAprendizService: TemaAprendizService,
    private aprendicesService: AprendicesService,
    private temasService: TemasService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.loadAll();
    this.aprendicesService.getAll().subscribe({
      next: (d) => { this.aprendices = d; this.cdr.detectChanges(); }
    });
    this.temasService.getAll().subscribe({
      next: (d) => { this.temas = d; this.cdr.detectChanges(); }
    });
  }

  loadAll(): void {
    this.loading = true;
    this.error = null;
    this.temaAprendizService.getAll().subscribe({
      next: (d) => {
        this.asignaciones = d;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.error = 'Error al cargar las asignaciones.';
        this.loading = false;
        this.cdr.detectChanges();
      },
    });
  }

  asignar(): void {
    if (!this.selectedAprendiz || !this.selectedTema) return;
    this.saving = true;
    this.error = null;
    this.successMsg = null;
    this.temaAprendizService.create({
      id_aprendiz: +this.selectedAprendiz,  // 👈 convierte a number
      id_tema: +this.selectedTema           // 👈 convierte a number
    }).subscribe({
      next: () => {
        this.saving = false;
        this.successMsg = 'Tema asignado correctamente.';
        this.selectedAprendiz = null;
        this.selectedTema = null;
        this.loadAll();
        this.cdr.detectChanges(); // 👈 faltaba
        setTimeout(() => { this.successMsg = null; this.cdr.detectChanges(); }, 3000);
      },
      error: (err) => {
        this.saving = false;
        this.error = err.error?.message ?? 'Error al asignar el tema.';
        this.cdr.detectChanges(); // 👈 faltaba
      },
    });
  }

  confirmDelete(id: string): void { this.deleteConfirmId = id; }
  cancelDelete(): void { this.deleteConfirmId = null; }

  eliminarAsignacion(id: string): void {
    this.temaAprendizService.remove(id).subscribe({
      next: () => {
        this.asignaciones = this.asignaciones.filter(a => a.id !== id);
        this.deleteConfirmId = null;
        this.cdr.detectChanges();
      },
      error: () => { this.error = 'Error al eliminar la asignación.'; },
    });
  }
}