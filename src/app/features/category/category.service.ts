import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Observable } from 'rxjs';

export interface Category {
    id: number;
    name: string;
}

export interface CreateCategoryRequest {
    name: string;
}

@Service()
export class CategoryService {

    private readonly http = inject(HttpClient);
    private readonly apiUrl = 'http://localhost:8080/supermarket/category';


    getAll(): Observable<Category[]> {
        return this.http.get<Category[]>(`${this.apiUrl}/all`);
    }

    create(category: CreateCategoryRequest): Observable<Category> {
        return this.http.post<Category>(`${this.apiUrl}/save`, category);
    }
}
