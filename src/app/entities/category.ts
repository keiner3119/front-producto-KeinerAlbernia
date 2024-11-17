import { Imagen } from "./imagen";

export class Category {
    private _id: any;
    private _nombre: any;
    private _descripcion: any;
    private _imagen: any;

    private static _instancia: Category;

    public static ObtenerInstancia() : Category {
        if(this._instancia === null || this._instancia === undefined) {
            this._instancia = new Category;
        }
        return this._instancia;
    }

    set id(value: string) {
        this._id = value;
    }

    get id(): string {
        return this._id;
    }

    set nombre(value: string) {
        this._nombre = value;
    }

    get nombre(): string {
        return this._nombre;
    }

    set descripcion(value: string) {
        this._descripcion = value;
    }

    get descripcion(): string {
        return this._descripcion;
    }

    set imagen(value: Imagen) {
        this._imagen = value;
    }

    get imagen(): Imagen {
        return this._imagen;
    }
}
