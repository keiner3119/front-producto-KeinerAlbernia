import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { ProductService } from 'src/app/services/product/product.service';
import { EventService } from 'src/app/services/event.service';
import { CategoryService } from 'src/app/services/category/category.service';
import { Category } from 'src/app/entities/category';

@Component({
  selector: 'app-add-update-product',
  templateUrl: './add-update-product.component.html',
  styleUrls: ['./add-update-product.component.scss'],
})
export class AddUpdateProductComponent  implements OnInit {

  productForm: FormGroup;
  products: any[] = []; 
  selectedImage: File | null = null;
  isEditMode: boolean = false;
  productId: string | null = null;

  public Categorys: Category[] = [];
  selectedCategory: Category | null = null;

  constructor(private formBuilder: FormBuilder, 
    private navCtrl: NavController, 
    private modalController: ModalController,
    private productService: ProductService,
    private categoryService: CategoryService,
    private eventService: EventService,
    private navParams: NavParams) {
    this.productForm = this.formBuilder.group({
      id: [''],
      descripcion: ['', [Validators.required, Validators.minLength(3)]],
      precio: ['', [Validators.required, Validators.min(0)]],
      cantidad: ['', [Validators.required, Validators.min(0)]],
      comision: ['', [Validators.required, Validators.min(0), Validators.max(100)]],
      disponible: [true],
      idBussines: ['', Validators.required],
      categoria: ['', Validators.required],
      estaActivo: [true],
      imagen: ['', Validators.required]
    });
  }

  dismiss() {
    this.modalController.dismiss();
  }

  ngOnInit() {
    this.loadCategories();

    this.productForm.get('idCategoria')?.valueChanges.subscribe((value) => {
      this.selectedCategory = value;
    });

    this.productForm.statusChanges.subscribe(status => {
      console.log('Estado del formulario:', status);
    });
    
    const product = this.navParams.get('product');
    if (product) {
      this.isEditMode = true;
      this.productId = product.id;
      this.productForm.patchValue({
        id: product.id,
        descripcion: product.descripcion,
        precio: product.precio,
        cantidad: product.cantidad,
        comision: product.comision,
        disponible: product.disponible,
        idBussines: product.idBussines,
        categoria: product.categoria,
        estaActivo: product.estaActivo,
        imagen: product.imagen
      });
    }
  }

  onSubmit() {
    if (this.productForm.valid) {
      const productData = this.productForm.value;
      const formData = new FormData();
      formData.append('precio', productData.precio);
      formData.append('cantidad', productData.cantidad);
      formData.append('idBussines', productData.idBussines);
      formData.append('categoria', productData.categoria.id);
      formData.append('imagen', this.productForm.get('imagen')?.value);
      formData.append('disponible', productData.disponible);
      formData.append('descripcion', productData.descripcion);
      formData.append('comision', productData.comision);
      formData.append('estaActivo', productData.estaActivo);

      if (this.isEditMode) {
        formData.append('id', productData.id);
        this.productService.updateProduct(formData).subscribe(
          (response) => {
            this.modalController.dismiss(productData);
            this.eventService.announceCategoryAdded(); 
          },
          (error) => {
            console.error('Error al actualizar el producto:', error);
          }
        );
      } else {
        this.productService.createProduct(formData).subscribe(
          (response) => {
            this.modalController.dismiss(productData);
            this.eventService.announceCategoryAdded(); 
          },
          (error) => {
            console.error('Error al crear el producto:', error);
          }
        );
      }
    }
  }

  cancel() {
    this.navCtrl.back();  
  }

  onFileSelected(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      this.selectedImage = fileInput.files[0];
      this.productForm.patchValue({
        imagen: this.selectedImage
      });
    }
  }

  loadCategories(): void {
    this.categoryService.getCategories().subscribe(
      (data: any) => {
        console.log('Datos recibidos:', data);
        if (Array.isArray(data.categories)) {
          this.Categorys = data.categories; 
        } else {
          console.error('El formato de categorias no es un array:', data.categories);
        }
      },
      (error) => {
        console.error('Error al cargar las categorías:', error);
      }
    );
  }
}
