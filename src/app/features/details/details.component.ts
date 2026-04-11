import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../core/services/products.service';
import { Observable } from 'rxjs';
import { error, log } from 'console';
import { Product } from '../../core/models/product.interface';

@Component({
  selector: 'app-details',
  imports: [],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css',
})
export class DetailsComponent implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly productsService = inject(ProductsService);
  productDetails = signal<Product>({} as  Product)

ngOnInit(): void {
  this.activatedRoute.paramMap.subscribe((param)=>{
    this.getProductDetails(param.get("id") !)
  })
}

getProductDetails(id:string):void{
  this.productsService.getSpecificProducts(id).subscribe({
next:(res)=>{
  console.log(res.data);
  this.productDetails.set(res.data)
},
error:(err)=>{
  console.log(err);
}
  })
}

stars(): string[] {
  const rating = this.productDetails()?.ratingsAverage || 0;

  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  const starsArray: string[] = [];

  // full stars
  for (let i = 0; i < fullStars; i++) {
    starsArray.push('fas fa-star');
  }

  // half star
  if (hasHalfStar) {
    starsArray.push('fas fa-star-half-alt');
  }

  // empty stars
  while (starsArray.length < 5) {
    starsArray.push('far fa-star text-gray-300');
  }

  return starsArray;
}
}
