import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Category } from 'src/app/entities/category';
import { CategoryService } from 'src/app/services/category/category.service';
import { EventService } from 'src/app/services/event.service';
import { AddUpdateCategoryComponent } from 'src/app/shared/components/add-update-category/add-update-category.component';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
})
export class CategoriesPage implements OnInit {

  public Categorys: Category[] = [];
 
  constructor(private modalController: ModalController,
    private categoryService: CategoryService,
    private eventService: EventService
  ) { }

  ngOnInit() {
    this.loadCategories();
    this.eventService.categoryAdded$.subscribe(() => {
      this.loadCategories();
    });
  }

  async addCategory() {
    const modal = await this.modalController.create({
      component: AddUpdateCategoryComponent,
    });
    await modal.present();

    const { data } = await modal.onDidDismiss();
    console.log('Modal cerrado con datos:', data);
  }

  loadCategories(): void {
    this.categoryService.getCategories().subscribe(
      (data: any) => {
        console.log(data);
        if (Array.isArray(data.categories)) {
          this.Categorys = data.categories;
          this.Categorys.map(cat => {
            cat.imagen.imageBase64 = "data:image/jpeg;base64," + cat.imagen.imageBase64;
          });
        } else {
          console.error('El formato de categorias no es un array:', data.categories);
        }
      },
      (error) => {
        console.error('Error al cargar las categorías:', error);
      }
    );
  }
  
  async editCategory(id: string) {
    const category = this.Categorys.find(cat => cat.id === id);
    if (category) {
      const modal = await this.modalController.create({
        component: AddUpdateCategoryComponent,
        componentProps: {
          category: category
        }
      });
      await modal.present();
      const { data } = await modal.onDidDismiss();
    }
  }

  deleteCategory(id: string) {
    this.categoryService.deleteCategory(id).subscribe(
      (response) => {
        console.log('Categoría eliminada con éxito:', response);
        this.loadCategories(); 
      },
      (error) => {
        console.error('Error al eliminar la categoría:', error);
      }
    );
  }

  deleteAllCategories() {
    this.categoryService.DeleteAllCategories().subscribe(
      (response) => {
        console.log('Todas las categorías eliminadas con éxito:', response);
        this.loadCategories();
      },
      (error) => {
        console.error('Error al eliminar todas las categorías:', error);
      }
    );
  }
}
