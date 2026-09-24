import { Component, inject, OnInit, signal } from '@angular/core';
import { Category, CategoryService } from '../category.service';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-categories',
  imports: [MatListModule],
  templateUrl: './categories.html',
  styleUrl: './categories.scss'
})
export class Categories implements OnInit {

  private readonly categoryService = inject(CategoryService);

  categories = signal<Category[]>([]);

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.categoryService.getAll().subscribe({
      next: categories => {
        this.categories.set(categories);
      },
      error: error => {
        console.error('Erro ao carregar categorias:', error);
      }
    });
  }
}