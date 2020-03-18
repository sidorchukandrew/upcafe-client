export class VariationData {
    name: string;
    variationPrice: number;
    id: string;
    imageUrl: string;
    inStock: boolean;

    constructor(name: string, price: number, id: string, imageUrl: string, inStock: boolean) {
        this.name = name;
        this.variationPrice = price;
        this.id = id;
        this.imageUrl = imageUrl;
        this.inStock = inStock;
    }
}