import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { single } from 'rxjs';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-checkout',
  imports: [RouterLink , ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
})
export class CheckoutComponent implements OnInit {
private readonly activatedRoute = inject(ActivatedRoute)
private readonly fb = inject(FormBuilder)
private readonly cartservice = inject(CartService)
private readonly router = inject(Router)
cartid = signal<string>("")
flag = signal<string>("cash")

  ngOnInit(): void {
    this.getCard()
  }

  getCard():void{
    this.activatedRoute.paramMap.subscribe((parems)=>{
    console.log(parems.get("id"))
    this.cartid.set(parems.get("id")!)
    })
  }

  checkOut:FormGroup = this.fb.group({
    shippingAddress:this.fb.group({
      details: ["" , Validators.required],
      phone: ["" ,[ Validators.required  , Validators.pattern(/^01[0125][0-9]{8}$/)]],
      city: ["" , Validators.required],
    })
  })

  changeFlag(el:HTMLInputElement):void{
      this.flag.set(el.value)
  }

  submitForm():void{
    if (this.checkOut.valid) {
      // console.log(this.checkOut.value);
      if (this.flag() === 'cash') {
        // console.log('cash');
        this.cartservice.createCashOrder(this.cartid() , this.checkOut.value).subscribe({
          next:(res)=> {
            console.log(res);
            if (res.status === 'success') {
              this.router.navigate(["/allorders"])
            }
          },
        })
      }else{
        // console.log("visa");
        this.cartservice.createVisaOrder(this.cartid() , this.checkOut.value).subscribe({
          next:(res)=> {
            console.log(res);
            if (res.status === 'success') {
              window.open(res.session.url , '_self')
            }
          },
        })
      }
    }
    
  }
}
