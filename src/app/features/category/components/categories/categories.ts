import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink } from '@angular/router';
import { Category, CategoryService } from '../../category.service';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [
    FormsModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatTooltipModule,
    MatChipsModule,
    MatProgressSpinnerModule,
    RouterLink,
  ],
  templateUrl: './categories.html',
  styleUrl: './categories.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Categories implements OnInit {
  private readonly categoryService = inject(CategoryService);

  readonly categories = signal<Category[]>([]);
  readonly searchTerm = signal<string>('');
  readonly isLoading = signal<boolean>(false);
  readonly errorMessage = signal<string | null>(null);

  readonly displayedColumns: string[] = ['id', 'name', 'actions'];
  readonly totalCategories = computed(() => this.categories().length);

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.isLoading.set(true);
    this.errorMessage.set(null);

    this.categoryService.getAll().subscribe({
      next: (categories) => {
        this.categories.set(categories || []);
        this.isLoading.set(false);
      },
      error: (error) => {
        console.error('Erro ao carregar categorias:', error);
        this.errorMessage.set('Não foi possível carregar as categorias. Tente novamente mais tarde.');
        this.isLoading.set(false);
      },
    });
  }

  onSearch(term: string): void {
    this.searchTerm.set(term);
    // TODO: Adicione a chamada ao CategoryService para busca no back-end
    // Exemplo: this.categoryService.search(term).subscribe(...)
  }

  clearSearch(): void {
    this.searchTerm.set('');
    this.loadCategories();
  }

  createCategory(): void {

  }

  deleteCategory(categoryId: number): void {
    this.categoryService.delete(categoryId).subscribe({
      next: () => {
        // Atualiza a lista de categorias após a exclusão
        this.loadCategories();
      },
      error: (error) => {
        console.error('Erro ao excluir categoria:', error);
        this.errorMessage.set('Não foi possível excluir a categoria. Tente novamente mais tarde.');
      },
    });
  }
}