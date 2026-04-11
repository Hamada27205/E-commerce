import { Component, inject, OnInit, signal } from '@angular/core';
import { ProductsService } from '../../../../core/services/products.service';
import { Product } from '../../../../core/models/product.interface';
import { RouterLink } from "@angular/router";
import { CartService } from '../../../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { error } from 'console';
import { CardComponent } from '../../../../shared/ui/card/card.component';

@Component({
  selector: 'app-product',
  imports: [ CardComponent],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
})
export class ProductComponent implements OnInit {
  private readonly productsService = inject(ProductsService);


productList = signal<Product[]>([])
ngOnInit(): void {
  this.getAllProtuctsData()
}

getAllProtuctsData():void{
  this.productsService.getAllProducts().subscribe({
    next:(res)=>{
    console.log(res)
    this.productList.set(res.data)
    },
    error:(err)=>{
    console.log(err)

    }
  })
}

}
