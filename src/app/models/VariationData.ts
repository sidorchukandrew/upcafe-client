export class VariationData {
    name: string;
    variationPrice: number;
    variationId: string;
    imageUrl: string;
    inStock: boolean;

    constructor(name: string, price: number, id: string, imageUrl: string, inStock: boolean) {
        this.name = name;
        this.variationPrice = price;
        this.variationId = id;
        this.imageUrl = imageUrl;
        this.inStock = inStock;
    }
}