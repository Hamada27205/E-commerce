import { Routes } from '@angular/router';
import { authGuard } from './core/auth/guards/auth-guard';

export const routes: Routes = [
  {
    path: "",
    loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent),
    title: "Home page"
  },
  {
    path: "shop",
    loadComponent: () => import('./features/shop/shop.component').then(m => m.ShopComponent),
    title: "Shop page"
  },
  {
    path: "categories",
    loadComponent: () => import('./features/categories/categories.component').then(m => m.CategoriesComponent),
    title: "Categories page"
  },
  {
    path: "brands",
    loadComponent: () => import('./features/brands/brands.component').then(m => m.BrandsComponent),
    title: "Brands page"
  },
  {
    path: "brands-details/:id/:slug",
    loadComponent: () => import('./features/brands-details/brands-details.component').then(m => m.BrandsDetailsComponent),
    title: "brands-details page"
  },
  {
    path: "cart",
    loadComponent: () => import('./features/cart/cart.component').then(m => m.CartComponent),
    title: "Cart page",
    canActivate:[authGuard]
  },
  {
    path: "checkout/:id",
    loadComponent: () => import('./features/checkout/checkout.component').then(m => m.CheckoutComponent),
    title: "Checkout page",
    canActivate:[authGuard]
  },
  {
    path: "details/:id/:slug",
    loadComponent: () => import('./features/details/details.component').then(m => m.DetailsComponent),
    title: "Details page"
  },
  {
    path: "login",
    loadComponent: () => import('./features/login/login.component').then(m => m.LoginComponent),
    title: "Login page"
  },
  {
    path: "register",
    loadComponent: () => import('./features/register/register.component').then(m => m.RegisterComponent),
    title: "Register page"
  },
  {
    path: "wishlist",
    loadComponent: () => import('./features/wishlist/wishlist.component').then(m => m.WishlistComponent),
    title: "Wishlist page",
    canActivate:[authGuard]
  },
  {
    path: "allorders",
    loadComponent: () => import('./features/orders/orders.component').then(m => m.OrdersComponent),
    title: "Orders page",
    canActivate:[authGuard]
  },
  {
    path: "forgot",
    loadComponent: () => import('./features/forgot/forgot.component').then(m => m.ForgotComponent),
    title: "Forgot password page"
  },
  {
    path: "**",
    loadComponent: () => import('./features/notfound/notfound.component').then(m => m.NotfoundComponent),
    title: "Not found page"
  }
];
