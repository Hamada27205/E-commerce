import { Component } from '@angular/core';
import { ProductComponent } from './components/product/product.component';
import { CategoryHomeComponent } from './components/category-home/category-home.component';
import { SliderComponent } from './components/slider/slider.component';

@Component({
  selector: 'app-home',
  imports: [ProductComponent,CategoryHomeComponent,SliderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}
