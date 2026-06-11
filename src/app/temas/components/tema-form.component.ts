import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TemasService } from '../services/temas.service';


@Component({
  selector: 'app-tema-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './tema-form.component.html',
  styleUrls: ['./tema-form.component.scss'],
})
export class TemaFormComponent implements OnInit {
  form!: FormGroup;
  isEditMode = false;
  temaId: string | null = null;  // 👈 era number
  loading = false;
  saving = false;
  error: string | null = null;
  successMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private temasService: TemasService,
    private route: ActivatedRoute,
    private router: Router,
     private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      nombre_tema: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],  // 👈 era "tema"
    });

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.temaId = id;  // 👈 era +id (convertía a number)
      this.loadTema(this.temaId);
    }
  }

loadTema(id: string): void {
  this.loading = true;
  this.temasService.getOne(id).subscribe({
    next: (tema) => {
      this.form.patchValue({ nombre_tema: tema.nombre_tema });
      this.loading = false;
      this.cdr.detectChanges(); // 👈 agregar
    },
    error: (err) => {
      this.error = 'No se pudo cargar el tema.';
      this.loading = false;
      this.cdr.detectChanges(); // 👈 agregar
      console.error(err);
    },
  });
}

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.saving = true;
    this.error = null;

    const dto = this.form.value; // { nombre_tema: string }

    const request$ = this.isEditMode && this.temaId
      ? this.temasService.update(this.temaId, dto)
      : this.temasService.create(dto);

    request$.subscribe({
      next: () => {
        this.saving = false;
        this.router.navigate(['/temas']);
      },
      error: (err) => {
        this.error = this.isEditMode
          ? 'Error al actualizar el tema.'
          : 'Error al crear el tema.';
        this.saving = false;
        console.error(err);
      },
    });
  }

  get temaControl() {
    return this.form.get('nombre_tema');  // 👈 era "tema"
  }
}