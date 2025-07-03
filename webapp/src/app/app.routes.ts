import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { Categories } from './components/manage/categories/categories';
import { CategoryForm } from './components/manage/category-form/category-form';
import { Brands } from './components/manage/brands/brands';
import { BrandForm } from './components/manage/brand-form/brand-form';
import { Products } from './components/manage/products/products';
import { ProductForm } from './components/manage/product-form/product-form';
import { ProductList } from './components/product-list/product-list';
import { ProductDetail } from './components/product-detail/product-detail';
import { Register } from './components/register/register';
import { Login } from './components/login/login';
import { AuthGuard } from './core/auth-guard';
import { AdminDashboard } from './components/manage/admin-dashboard/admin-dashboard';
import { AdminGuard } from './core/admin-guard';
import { CustomerProfile } from './components/customer-profile/customer-profile';
import { Wishlists } from './components/wishlists/wishlists';
import { ShoppingCart } from './components/shopping-cart/shopping-cart';

export const routes: Routes = [
    {
        path: "",
        component: Home,
        canActivate: [AuthGuard]
    },
    {
        path: "admin/categories",
        component: Categories,
        canActivate: [AdminGuard]
    },
    {
        path: "admin/categories/add",
        component: CategoryForm,
        canActivate: [AdminGuard]
    },
    {
        path: "admin/categories/:id",
        component: CategoryForm,
        canActivate: [AdminGuard]
    },
    {
        path: "admin/brands",
        component: Brands,
        canActivate: [AdminGuard]
    },
    {
        path: "admin/brands/add",
        component: BrandForm,
        canActivate: [AdminGuard]
    },
    {
        path: "admin/brands/:id",
        component: BrandForm,
        canActivate: [AdminGuard]
    },
    {
        path: "admin/products",
        component: Products,
        canActivate: [AdminGuard]
    },
    {
        path: "admin/products/add",
        component: ProductForm,
        canActivate: [AdminGuard]
    },
    {
        path: "admin/products/:id",
        component: ProductForm,
        canActivate: [AdminGuard]
    },
    {
        path: "products",
        component: ProductList,
        canActivate: [AuthGuard]
    },
    {
        path: "product/:id",
        component: ProductDetail,
        canActivate: [AuthGuard]
    },
    {
        path: "register",
        component: Register
    },
    {
        path: "login",
        component: Login
    },
    {
        path: "admin",
        component: AdminDashboard,
        canActivate: [AdminGuard]
    },
    {
        path: "profile",
        component: CustomerProfile,
        canActivate: [AuthGuard]
    },
    {
        path: "wishlist",
        component: Wishlists,
        canActivate: [AuthGuard]
    },
    {
        path: "cart",
        component: ShoppingCart,
        canActivate: [AuthGuard]
    }
];
