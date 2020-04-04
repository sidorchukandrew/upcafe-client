import { OrderItem } from './OrderItem';
import { Customer } from './Customer';

export class Order {
    selectedLineItems: Array<OrderItem>;
    totalPrice: number;
    id: string;
    pickupTime: string;
    pickupDate: string;
    createdAt: string;
    closedAt: string;
    customer: Customer;
    state: string;
}