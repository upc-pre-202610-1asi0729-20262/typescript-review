import {SalesOrderItem} from "./sales-order-item";
import {DateTime} from "../../../shared/domain/model/date-time";
import {Currency} from "../../../shared/domain/model/currency";
import {ProductId} from "./product-id";
import {Money} from "../../../shared/domain/model/money";

export type SalesOrderState = 'PENDING' | 'CONFIRMED' | 'SHIPPED' | 'CANCELED';

export class SalesOrder {
    set state(newState: SalesOrderState) {
        this._state = newState;
    }
    private readonly _customerId: string;
    private readonly _id: string;
    private readonly _items: SalesOrderItem[];
    private readonly _orderedAt: DateTime;
    private readonly _currency: Currency;
    private _state: SalesOrderState;

    constructor(customerId: string, currency: Currency, orderedAt?: Date | string) {
        if (!customerId || customerId.trim() === '')
            throw new Error(`Invalid customer id for ${customerId}`);
        this._customerId = customerId;
        this._id = crypto.randomUUID();
        this._items = [];
        this._orderedAt = new DateTime(orderedAt);
        this._currency = currency;
        this._state = 'PENDING';
    }

    private canAddItems(): boolean {
        return this._state != 'CANCELED' && this._state != 'SHIPPED';
    }

    get customerId(): string {
        return this._customerId;
    }

    get id(): string {
        return this._id;
    }

    get items(): SalesOrderItem[] {
        return this._items;
    }

    get orderedAt(): DateTime {
        return this._orderedAt;
    }

    get currency(): Currency {
        return this._currency;
    }

    get state(): SalesOrderState {
        return this._state;
    }

    public addItem(productId: ProductId, quantity: number, unitPriceAmount: number): void {
        if (!this.canAddItems())
            throw new Error(`Cannot add items to an order that is ${this._state}`);
        if (!productId || productId.id.trim() === '')
            throw new Error(`Invalid product id: ${productId}`);
        if (quantity <= 0)
            throw new Error(`Invalid quantity: ${quantity}`);
        if (unitPriceAmount < 0)
            throw new RangeError('Unit Price Amount must be greater than 0');

        const unitPrice = new Money(unitPriceAmount, this._currency);
        const item = new SalesOrderItem(this._id, productId, quantity, unitPrice);
        this._items.push(item);
    }

}