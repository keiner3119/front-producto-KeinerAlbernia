import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, NavParams } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { CategoryService } from 'src/app/services/category/category.service';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-add-update-category',
  templateUrl: './add-update-category.component.html',
  styleUrls: ['./add-update-category.component.scss'],
})
export class AddUpdateCategoryComponent  implements OnInit {
  categoryForm: FormGroup;
  selectedImage: File | null = null;
  isEditMode: boolean = false;
  categoryId: string | null = null;

  constructor(private formBuilder: FormBuilder, 
    private navCtrl: NavController, 
    private modalController: ModalController,
    private categoryService: CategoryService,
    private eventService: EventService,
    private navParams: NavParams) { 
    this.categoryForm = this.formBuilder.group({
      id: [''],
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      imagen: ['', Validators.required]
    });
  }

  dismiss() {
    this.modalController.dismiss();
  }

  ngOnInit() {
    const category = this.navParams.get('category');
    if (category) {
      this.isEditMode = true;
      this.categoryId = category.id;
      this.categoryForm.patchValue({
        id: category.id,
        nombre: category.nombre,
        descripcion: category.descripcion,
        imagen: category.imagen
      });
    }
  }

  onSubmit() {
    if (this.categoryForm.valid) {
      const categoryData = this.categoryForm.value;  
      const formData = new FormData();
      formData.append('nombre', categoryData.nombre);
      formData.append('descripcion', categoryData.descripcion);
      formData.append('imagen', this.categoryForm.get('imagen')?.value);
  
      if (this.isEditMode) {
        formData.append('id', categoryData.id);
        this.categoryService.updateCategory(formData).subscribe(
          (response) => {
            console.log('Categoría actualizada con éxito:', response);
            this.modalController.dismiss(categoryData);
            this.eventService.announceCategoryAdded();
          },
          (error) => {
            console.error('Error al actualizar la categoría:', error);
          }
        );
      } else {
        this.categoryService.createCategory(formData).subscribe(
          (response) => {
            console.log('Categoría creada con éxito:', response);
            this.modalController.dismiss(categoryData);
            this.eventService.announceCategoryAdded();
          },
          (error) => {
            console.error('Error al crear la categoría:', error);
          }
        );
      }
    } else {
      alert('Formulario inválido: ' + this.categoryForm.errors);
    }
  }  

  cancel() {
    this.navCtrl.back();  
  }

  onFileSelected(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    
    if (fileInput.files && fileInput.files.length > 0) {
      this.selectedImage = fileInput.files[0];
      
      this.categoryForm.patchValue({
        imagen: this.selectedImage
      });
      
      fileInput.setAttribute('data-filename', this.selectedImage.name);
    }
  }
}
