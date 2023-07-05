import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  @Input() viewMode = false;

  @Input() currentProduct: Product = {
    name: '',
    description: '',
    published: false,
    category: ''
  };

  message = '';

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    if (!this.viewMode) {
      this.message = '';
      this.getProduct(this.route.snapshot.params["id"]);
    }
  }

  EditProduct( name: string, description: string, price : number, published : Boolean, category : string): void {
    const data = {
      name: this.currentProduct.name,
      description: this.currentProduct.description,
      price: this.currentProduct.price,
      published: this.currentProduct.published,
      category: this.currentProduct.category
    };

  }

  UnpublishProduct(): void {
    const data = {
      name: this.currentProduct.name,
      description: this.currentProduct.description,
      category: this.currentProduct.category,
      published: false
    };

  }

  PublishProduct(): void {
    const data = {
      name: this.currentProduct.name,
      description: this.currentProduct.description,
      category: this.currentProduct.category,
      published: true
    };

  }



  UpdateProduct(): void {
    const data = {
      name: this.currentProduct.name,
      description: this.currentProduct.description,
      price: this.currentProduct.price,
      published: this.currentProduct.published,
      category: this.currentProduct.category
    };

  }
  DeleteProduct (): void {
    this.productService.delete(this.currentProduct.id)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.router.navigate(['/products']);
        },
        error: (e) => console.error(e)
      });
  }


  getProduct(id: string): void {
    this.productService.get(id)
      .subscribe({
        next: (data) => {
          this.currentProduct = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  updatePublished(status: boolean): void {
    const data = {
      name: this.currentProduct.name,
      description: this.currentProduct.description,
      category: this.currentProduct.category,
      published: status
    };

    this.message = '';

    this.productService.update(this.currentProduct.id, data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.currentProduct.published = status;
          this.message = res.message ? res.message : 'The status was updated successfully!';
        },
        error: (e) => console.error(e)
      });
  }

  updateProduct(): void {
    this.message = '';

    this.productService.update(this.currentProduct.id, this.currentProduct)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.message = res.message ? res.message : 'This product was updated successfully!';
        },
        error: (e) => console.error(e)
      });
  }

  deleteProduct(): void {
    this.productService.delete(this.currentProduct.id)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.router.navigate(['/products']);
        },
        error: (e) => console.error(e)
      });
  }

}
