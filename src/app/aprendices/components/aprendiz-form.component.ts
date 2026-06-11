import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AprendicesService } from '../services/aprendices.service';

@Component({
  selector: 'app-aprendiz-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './aprendiz-form.component.html',
  styleUrls: ['./aprendiz-form.component.scss'],
})
export class AprendizFormComponent implements OnInit {
  form!: FormGroup;
  isEditMode = false;
  aprendizId: string | null = null;
  loading = false;
  saving = false;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private aprendicesService: AprendicesService,
    private route: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      cedula:           ['', [Validators.required, Validators.maxLength(20)]],
      nombre_completo:  ['', [Validators.required, Validators.maxLength(150)]],
      fecha_nacimiento: ['', [Validators.required]],
    });

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.aprendizId = id;
      this.loading = true;
      this.aprendicesService.getOne(this.aprendizId).subscribe({
        next: (a) => {
          this.form.patchValue({
            cedula: a.cedula,
            nombre_completo: a.nombre_completo,
            fecha_nacimiento: a.fecha_nacimiento?.split('T')[0] ?? a.fecha_nacimiento,
          });
          this.loading = false;
          this.cdr.detectChanges();
        },
        error: () => {
          this.error = 'No se pudo cargar el aprendiz.';
          this.loading = false;
          this.cdr.detectChanges();
        },
      });
    }
  }

  submit(): void {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.saving = true;
    this.error = null;

    const request$ = this.isEditMode && this.aprendizId
      ? this.aprendicesService.update(this.aprendizId, this.form.value)
      : this.aprendicesService.create(this.form.value);

    request$.subscribe({
      next: () => { this.saving = false; this.router.navigate(['/aprendices']); },
      error: () => { this.error = 'Error al guardar el aprendiz.'; this.saving = false; },
    });
  }

  get f() { return this.form.controls; }
}