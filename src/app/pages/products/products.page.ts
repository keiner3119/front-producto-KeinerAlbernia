import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Product } from 'src/app/entities/product';
import { EventService } from 'src/app/services/event.service';
import { ProductService } from 'src/app/services/product/product.service';
import { AddUpdateProductComponent } from 'src/app/shared/components/add-update-product/add-update-product.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {

  public Products: Product[] = [];

  constructor(private modalController: ModalController,
    private productService: ProductService,
    private eventService: EventService
  ) { }

  ngOnInit() {
    this.loadProducts();
    this.eventService.categoryAdded$.subscribe(() => {
      this.loadProducts();
    });
  }

  async addProduct() {
    const modal = await this.modalController.create({
      component: AddUpdateProductComponent,
    });
    await modal.present();

    const { data } = await modal.onDidDismiss();
    console.log('Modal cerrado con datos:', data);
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe(
      (data: any) => {
        console.log('Datos recibidos:', data);
        if (Array.isArray(data.products)) {
          this.Products = data.products;
          this.Products.map(prod => {
            prod.imagen.imageBase64 = "data:image/jpeg;base64," + prod.imagen.imageBase64;
          });
          console.log(this.Products);
        } else {
          console.error('El formato de productos no es un array:', data.products);
        }
      },
      (error) => {
        console.error('Error al cargar los productos:', error);
      }
    );
  }

  async editProduct(id: string) {
    const product = this.Products.find(cat => cat.id === id);
    if (product) {
      const modal = await this.modalController.create({
        component: AddUpdateProductComponent,
        componentProps: {
          product: product
        }
      });
      await modal.present();

      const { data } = await modal.onDidDismiss();
      console.log('Modal cerrado con datos:', data);
    }
  }

  deleteProduct(id: string) {
    this.productService.deleteProduct(id).subscribe(
      (response) => {
        console.log('Producto eliminada con éxito:', response);
        this.loadProducts(); 
      },
      (error) => {
        console.error('Error al eliminar el producto:', error);
      }
    );
  }

  deleteAllProducts() {
    this.productService.DeleteAllProducts().subscribe(
      (response) => {
        console.log('Todas los productos eliminados con éxito:', response);
        this.loadProducts();
      },
      (error) => {
        console.error('Error al eliminar todos los productos:', error);
      }
    );
  }
}
