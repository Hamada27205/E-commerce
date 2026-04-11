
import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private readonly httpClient = inject(HttpClient)
  cartCount = signal<number>(0)

  AddProductToCart(productId:string):Observable<any>{
    return this.httpClient.post(environment.baseUrl + `/api/v2/cart` ,{
  "productId": productId,
} )
  }
  GetLoggedUserCart():Observable<any>{
    return this.httpClient.get(environment.baseUrl + `/api/v2/cart`)
  }

  RemoveProductFromCart(id:string):Observable<any>{
    return this.httpClient.delete(environment.baseUrl + `/api/v2/cart/${id}`)
  }

  UpdateCartProductQuantity(id:string , count:number):Observable<any>{
    return this.httpClient.put(environment.baseUrl + `/api/v2/cart/${id}` , {
  "count": count,
})
  }
  ClearUserCart():Observable<any>{
    return this.httpClient.delete(environment.baseUrl + `/api/v2/cart`)
  }

  createCashOrder(cartid:string , data:object):Observable<any>{
  return this.httpClient.post(environment.baseUrl + `/api/v1/orders/${cartid}` , data)
  }
  
  createVisaOrder(cartid:string , data:object):Observable<any>{
  return this.httpClient.post(environment.baseUrl + `/api/v1/orders/checkout-session/${cartid}?url=${environment.url}` , data)
  }

}
