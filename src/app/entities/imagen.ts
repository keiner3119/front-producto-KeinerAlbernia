export class Imagen {
    private _id: any;
    private _pathImage: any;
    private _imageBase64: any;

    private static _instancia: Imagen;

    public static ObtenerInstancia() : Imagen {
        if(this._instancia === null || this._instancia === undefined) {
            this._instancia = new Imagen;
        }
        return this._instancia;
    }

    set id(value: string) {
        this._id = value;
    }

    get id(): string {
        return this._id;
    }

    set pathImage(value: string) {
        this._pathImage = value;
    }

    get pathImage(): string {
        return this._pathImage;
    }

    set imageBase64(value: string) {
        this._imageBase64 = value;
    }

    get imageBase64(): string {
        return this._imageBase64;
    }
}