export class ModifierData {

    name: string;
    price: number;
    onByDefault: boolean;
    inStock: boolean;
    id: string;

    constructor(name: string, price: number, onByDefault: boolean, inStock: boolean, id: string) {
        this.name = name;
        this.price = price;
        this.onByDefault = onByDefault;
        this.inStock = inStock;
        this.id = id;
    }
}