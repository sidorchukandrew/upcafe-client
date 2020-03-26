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

    incrementQuantity(): void {
        this.quantity++;
    }

    decrementQuantity(): boolean {
        if (this.quantity > 1) {
            this.quantity--;
            return true;
        }

        return false;
    }
}