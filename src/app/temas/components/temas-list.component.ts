import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TemasService } from '../services/temas.service';
import { Tema, Tip } from '../models/tema.model';

@Component({
  selector: 'app-temas-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './temas-list.component.html',
  styleUrls: ['./temas-list.component.scss'],
})
export class TemasListComponent implements OnInit {
  temas: Tema[] = [];
  loading = false;
  error: string | null = null;
  deleteConfirmId: string | null = null;

  // Tips panel state
  expandedTipsId: string | null = null;
  tipsLoading: string | null = null;   // id del tema cargando tips
  tipsError: string | null = null;
  tipsCache: Record<string, Tip[]> = {};

  constructor(
    private temasService: TemasService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.loadTemas();
  }

  loadTemas(): void {
    this.loading = true;
    this.error = null;
    this.temasService.getAll().subscribe({
      next: (data) => {
        this.temas = data;
        // Precarga tips del backend si ya existen en la BD
        for (const t of data) {
          if (t.tips && t.tips.length) {
            this.tipsCache[t.id] = t.tips;
          }
        }
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.error = 'Error al cargar los temas.';
        this.loading = false;
        this.cdr.detectChanges();
        console.error(err);
      },
    });
  }

  confirmDelete(id: string): void {
    this.deleteConfirmId = id;
  }

  cancelDelete(): void {
    this.deleteConfirmId = null;
  }

  deleteTema(id: string): void {
    this.temasService.remove(id).subscribe({
      next: () => {
        this.temas = this.temas.filter((t) => t.id !== id);
        this.deleteConfirmId = null;
        delete this.tipsCache[id];
        if (this.expandedTipsId === id) this.expandedTipsId = null;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.error = 'Error al eliminar el tema.';
        console.error(err);
      },
    });
  }

  // ─── Tips ──────────────────────────────────────────────────────────────────

  toggleTips(tema: Tema): void {
    if (this.expandedTipsId === tema.id) {
      this.expandedTipsId = null;
      return;
    }
    this.expandedTipsId = tema.id;
    if (this.tipsCache[tema.id]) return; // Ya cargados
    this.loadTips(tema.id);
  }

  loadTips(id: string, force = false): void {
    this.tipsLoading = id;
    this.tipsError = null;
    const req$ = force
      ? this.temasService.regenerateTips(id)
      : this.temasService.getTips(id);

    req$.subscribe({
      next: (res) => {
        this.tipsCache[id] = res.tips;
        // Actualiza también el objeto en la lista
        const tema = this.temas.find((t) => t.id === id);
        if (tema) tema.tips = res.tips;
        this.tipsLoading = null;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.tipsError = 'No se pudieron cargar los tips. Verifica la API KEY de Gemini.';
        this.tipsLoading = null;
        this.cdr.detectChanges();
        console.error(err);
      },
    });
  }

  regenerateTips(id: string): void {
    this.loadTips(id, true);
  }

  getTipsForTema(id: string): Tip[] {
    return this.tipsCache[id] ?? [];
  }
}
