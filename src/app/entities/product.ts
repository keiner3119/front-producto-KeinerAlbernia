import { Category } from "./category";
import { Imagen } from "./imagen";

export class Product {
    private _id: any;
    private _precio: any;
    private _cantidad: any;
    private _idBussines: any;
    private _categoria: any;
    private _imagen: any;
    private _disponible: any;
    private _descripcion: any;
    private _comision: any;
    private _estaActivo: any;

    private static _instancia: Product;

    public static ObtenerInstancia() : Product {
        if(this._instancia === null || this._instancia === undefined) {
            this._instancia = new Product;
        }
        return this._instancia;
    }

    set id(value: string) {
        this._id = value;
    }

    get precio(): string {
        return this._precio;
    }

    set precio(value: string) {
        this._precio = value;
    }

    get id(): string {
        return this._id;
    }

    set cantidad(value: string) {
        this._cantidad = value;
    }

    get cantidad(): string {
        return this._cantidad;
    }

    set idBussines(value: string) {
        this._idBussines = value;
    }

    get idBussines(): string {
        return this._idBussines;
    }

    set categoria(value: Category) {
        this._categoria = value;
    }

    get categoria(): Category {
        return this._categoria;
    }

    set imagen(value: Imagen) {
        this._imagen = value;
    }

    get imagen(): Imagen {
        return this._imagen;
    }

    set disponible(value: string) {
        this._disponible = value;
    }

    get disponible(): string {
        return this._disponible;
    }

    set descripcion(value: string) {
        this._descripcion = value;
    }

    get descripcion(): string {
        return this._descripcion;
    }

    set comision(value: string) {
        this._comision = value;
    }

    get comision(): number {
        return this._comision;
    }

    set estaActivo(value: boolean) {
        this._estaActivo = value;
    }

    get estaActivo(): boolean {
        return this._estaActivo;
    }
}
