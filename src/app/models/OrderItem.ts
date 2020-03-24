import { VariationData } from './VariationData';
import { ModifierData } from './ModifierData';

export class OrderItem {
    variationData: VariationData;
    selectedModifiers: Array<ModifierData>;
    price: number;
    quantity: number;

    constructor() {
        this.quantity = 1;
    }
}