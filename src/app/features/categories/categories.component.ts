import { Category } from './../../core/models/category.interface';
import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from "@angular/router";
import { CategoriesService } from '../../core/services/categories.service';

@Component({
  selector: 'app-categories',
  imports: [RouterLink],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css',
})
export class CategoriesComponent implements OnInit {
  private readonly categoriesService = inject(CategoriesService)
  categoriesAllData = signal<Category[]>([])

ngOnInit(): void {
  this.categoriesData()
}

categoriesData():void{
  this.categoriesService.getAllCategories().subscribe({
    next:(res)=> {
      console.log(res.data);
      this.categoriesAllData.set(res.data)
    },
  })
}
}
