import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AprendicesService } from '../services/aprendices.service';
import { Aprendiz } from '../models/aprendiz.model';

@Component({
  selector: 'app-aprendices-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './aprendices-list.component.html',
  styleUrls: ['./aprendices-list.component.scss'],
})
export class AprendicesListComponent implements OnInit {
  aprendices: Aprendiz[] = [];
  loading = false;
  error: string | null = null;
  deleteConfirmId: string | null = null;

  constructor(
    private aprendicesService: AprendicesService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void { this.loadAprendices(); }

  loadAprendices(): void {
    this.loading = true;
    this.error = null;
    this.aprendicesService.getAll().subscribe({
      next: (data) => {
        this.aprendices = data;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.error = 'Error al cargar los aprendices.';
        this.loading = false;
        this.cdr.detectChanges();
      },
    });
  }

  confirmDelete(id: string): void { this.deleteConfirmId = id; }
  cancelDelete(): void { this.deleteConfirmId = null; }

  deleteAprendiz(id: string): void {
    this.aprendicesService.remove(id).subscribe({
      next: () => {
        this.aprendices = this.aprendices.filter(a => a.id !== id);
        this.deleteConfirmId = null;
        this.cdr.detectChanges();
      },
      error: () => { this.error = 'Error al eliminar el aprendiz.'; },
    });
  }

  formatFecha(fecha: string): string {
    if (!fecha) return '';
    const d = new Date(fecha);
    return d.toLocaleDateString('es-CO', { day: '2-digit', month: '2-digit', year: 'numeric' });
  }
}