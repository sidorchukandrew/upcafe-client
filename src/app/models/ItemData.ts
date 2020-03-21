import { Image } from './Image';

export class ItemData {
    name: string;
    description: string;
    inStock: boolean;
    imageData: Image;

    constructor(name: string, description: string, inStock: boolean, imageData: Image) {
        this.name = name;
        this.description = description;
        this.inStock = inStock;
        this.imageData = imageData;
    }
}