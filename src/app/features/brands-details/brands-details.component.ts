import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { BrandsService } from '../../core/services/brands.service';
import { Product } from '../../core/models/product.interface';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../core/services/products.service';

@Component({
  selector: 'app-brands-details',
  imports: [],
  templateUrl: './brands-details.component.html',
  styleUrl: './brands-details.component.css',
})
export class BrandsDetailsComponent implements OnInit  {
private readonly brandsService = inject(BrandsService)
private readonly productsService = inject(ProductsService)
 private readonly activatedRoute = inject(ActivatedRoute);
brandsid = signal<Product>({} as  Product)
ngOnInit(): void {
   this.activatedRoute.paramMap.subscribe((param)=>{
    this.brandsDetails(param.get("id") !)
  })
}
// brandsDetails(id:string):void{
//   this.productsService.getSpecificProducts2(id).subscribe({
//     next:(res) =>{
//       console.log(res.data)
//       this.brandsid.set(res.data);
      
//     },
//   })
// }
brandsDetails(id:string):void{
  this.brandsService.Getspecificbrand(id).subscribe({
    next:(res) =>{
      console.log(res.data)
      this.brandsid.set(res.data);
      
    },
  })
}
stars = computed(() => {
  const rating = this.brandsid()?.ratingsAverage || 0;
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const starsArray: string[] = [];

  for (let i = 0; i < Math.min(fullStars, 5); i++) {
    starsArray.push('fas fa-star text-yellow-400');
  }

  if (hasHalfStar && starsArray.length < 5) {
    starsArray.push('fas fa-star-half-alt text-yellow-400');
  }

  while (starsArray.length < 5) {
    starsArray.push('far fa-star text-gray-300');
  }

  return starsArray;
});
}
