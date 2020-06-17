import { OrderModifier } from './OrderModifier';


export class OrderItem {
    variationId: string;
    selectedModifiers: OrderModifier[];
    price: number;
    quantity: number;
    name: string;
    imageUrl: string;
    tempId: number;

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
