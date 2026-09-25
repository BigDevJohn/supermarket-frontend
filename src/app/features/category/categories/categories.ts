import { Component, inject, OnInit, signal } from '@angular/core';
import { Category, CategoryService } from '../category.service';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-categories',
  imports: [MatListModule, MatTableModule, MatIconModule, MatButtonModule],
  templateUrl: './categories.html',
  styleUrl: './categories.scss'
})
export class Categories implements OnInit {

  private readonly categoryService = inject(CategoryService);

  categories = signal<Category[]>([]);
  displayedColumns: string[] = ['id', 'name', 'actions'];

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