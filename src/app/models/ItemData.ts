export class ItemData {
    name: string;
    description: string;
    inStock: boolean;

    constructor(name: string, description: string, inStock: boolean) {
        this.name = name;
        this.description = description;
        this.inStock = inStock;
    }
}