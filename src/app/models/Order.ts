import { OrderItem } from './OrderItem';
import { Time } from '@angular/common';

export class Order {
    selectedLineItems: Array<OrderItem>;
    totalPrice: number;
    id: string;
    pickupTime: string;
}