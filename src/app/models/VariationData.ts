export class VariationData {
    name: string;
    variationPrice: number;
    variationId: string;
    variationImageUrl: string;
    stocked: boolean;

    constructor(name: string, price: number, id: string, imageUrl: string, inStock: boolean) {
        this.name = name;
        this.variationPrice = price;
        this.variationId = id;
        this.variationImageUrl = imageUrl;
        this.stocked = inStock;
    }
}