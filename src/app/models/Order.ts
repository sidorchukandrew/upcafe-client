import { OrderItem } from './OrderItem';

export class Order {
    selectedLineItems: Array<OrderItem>;
    totalPrice: number;
    id: string;
}