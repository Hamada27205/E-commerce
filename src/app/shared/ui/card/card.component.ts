import { Component, inject, input } from '@angular/core';
import { Product } from '../../../core/models/product.interface';
import { CartService } from '../../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-card',
  imports: [RouterLink],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent {
    private readonly cartService = inject(CartService);
  private readonly toastrService = inject(ToastrService)
  product = input.required<Product>()

  addCart(id:string):void{
  if (localStorage.getItem("freshToken")) {
    this.cartService.AddProductToCart(id).subscribe({
    next:(res)=> {
      console.log(res);
      this.toastrService.success(res.message ,"freshCart", {progressBar:true , closeButton:true} )
      this.cartService.cartCount.set(res.numOfCartItems)
    },
  })
  }
  else{
    this.toastrService.warning("login Frist" ,"freshCart", {progressBar:true , closeButton:true} )
  }
}

stars(): string[] {
  const rating = this.product()?.ratingsAverage || 0;

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
