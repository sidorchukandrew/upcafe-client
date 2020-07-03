import { OrderItem } from './OrderItem';
import { User } from './User';

export class Order {
    orderItems: Array<OrderItem>;
    totalPrice: number;
    id: string;
    pickupTime: string;
    pickupDate: string;
    placedAt: string;
    completedAt: string;
    customer: User;
    status: string;
    saving ?: boolean = false
}
