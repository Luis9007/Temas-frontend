import { Component, OnInit, ChangeDetectorRef } from '@angular/core'; // 👈
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TemasService } from '../services/temas.service';
import { Tema } from '../models/tema.model';

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

  constructor(
    private temasService: TemasService,
    private cdr: ChangeDetectorRef // 👈
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
        this.loading = false;
        this.cdr.detectChanges(); // 👈
      },
      error: (err) => {
        this.error = 'Error al cargar los temas.';
        this.loading = false;
        this.cdr.detectChanges(); // 👈
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
        this.cdr.detectChanges(); // 👈
      },
      error: (err) => {
        this.error = 'Error al eliminar el tema.';
        console.error(err);
      },
    });
  }
}