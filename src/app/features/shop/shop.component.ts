import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from "@angular/router";
import {NgxPaginationModule} from 'ngx-pagination'; // <-- import the module

import { CardComponent } from "../../shared/ui/card/card.component";
import { ProductsService } from '../../core/services/products.service';
import { Product } from '../../core/models/product.interface';

@Component({
  selector: 'app-shop',
  imports: [RouterLink, CardComponent , NgxPaginationModule ],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css',
})
export class ShopComponent implements OnInit {
private readonly productsService = inject(ProductsService)
productList = signal<Product[]>([])
pageSize = signal<number>(0)
cp = signal<number>(0)
total = signal<number>(0)
  ngOnInit(): void {
    this.getAllProducts()
  }

  getAllProducts():void{
    this.productsService.getAllProducts().subscribe({
      next:(res)=> {
        console.log(res.data)
        this.productList.set(res.data);
        this.pageSize.set(res.metadata.limit)
        this.cp.set(res.metadata.currentPage)
        this.total.set(res.results)
      },
    })
  }

  pageChanged(num:number):void{
      this.productsService.getAllProducts(num).subscribe({
      next:(res)=> {
        console.log(res.data)
        this.productList.set(res.data);
        this.pageSize.set(res.metadata.limit)
        this.cp.set(res.metadata.currentPage)
        this.total.set(res.results)
      },
    })
  }
}
