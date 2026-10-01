import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  input,
  OnInit,
  output,
  signal,
} from '@angular/core';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Category } from '../../category.service';

@Component({
  selector: 'app-category-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatProgressSpinnerModule,
    RouterLink,
  ],
  templateUrl: './category-form.html',
  styleUrl: './category-form.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryForm implements OnInit {
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  /**
   * Route parameter or @Input property id for editing an existing category.
   */
  readonly id = input<string | number | undefined>();

  /**
   * Optional category input when used as a child/dialog component.
   */
  readonly category = input<Category | null>(null);

  /**
   * Output events for standalone/modal component usage.
   */
  readonly save = output<{ id?: number | string; name: string }>();
  readonly cancel = output<void>();

  readonly isLoading = signal(false);
  readonly errorMessage = signal<string | null>(null);

  readonly categoryForm = this.fb.group({
    name: [
      '',
      [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50),
      ],
    ],
  });

  readonly isEditMode = computed(() => {
    return Boolean(this.id() || this.category() || this.route.snapshot.paramMap.get('id'));
  });

  readonly currentId = computed(() => {
    return this.id() ?? this.category()?.id ?? this.route.snapshot.paramMap.get('id');
  });

  constructor() {
    // When category input changes, update form
    effect(() => {
      const cat = this.category();
      if (cat) {
        this.categoryForm.patchValue({ name: cat.name });
      }
    });
  }

  ngOnInit(): void {
    const routeId = this.route.snapshot.paramMap.get('id');
    if (routeId || this.id()) {
      const activeId = this.id() ?? routeId;
      this.loadCategoryData(activeId);
    }
  }

  loadCategoryData(id: string | number | null | undefined): void {
    if (!id) return;
    // TODO: Adicione a chamada ao CategoryService para buscar por ID se necessário
    // Exemplo: this.categoryService.getById(id).subscribe(...)
  }

  onSubmit(): void {
    if (this.categoryForm.invalid) {
      this.categoryForm.markAllAsTouched();
      return;
    }

    const formValues = this.categoryForm.getRawValue();
    const payload = {
      ...(this.currentId() ? { id: this.currentId()! } : {}),
      name: formValues.name.trim(),
    };

    // Emit event for component integration
    this.save.emit(payload);

    // TODO: Adicione a chamada ao CategoryService para criar/editar a categoria
    // Exemplo:
    // if (this.isEditMode()) {
    //   this.categoryService.update(payload).subscribe(...);
    // } else {
    //   this.categoryService.create(payload).subscribe(...);
    // }
  }

  onCancel(): void {
    this.cancel.emit();
    this.router.navigate(['/categories']);
  }
}
