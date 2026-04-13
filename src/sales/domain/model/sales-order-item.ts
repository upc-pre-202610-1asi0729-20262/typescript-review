import {ProductId} from "./product-id";
import {Money} from "../../../shared/domain/model/money";

export class SalesOrderItem {
    private readonly _orderId: string;
    private readonly _itemId: string;
    private readonly _productId: ProductId;
    private readonly _quantity: number;
    private readonly _unitPrice: Money;

    constructor(orderId: string, productId: ProductId, quantity: number, unitPrice: Money) {
        if (quantity <= 0) throw new Error("Quantity must be greater than 0");
        this._orderId = orderId;
        this._itemId = crypto.randomUUID();
        this._productId = productId;
        this._quantity = quantity;
        this._unitPrice = unitPrice;
    }

    get orderId(): string {
        return this._orderId;
    }

    get itemId(): string {
        return this._itemId;
    }

    get productId(): ProductId {
        return this._productId;
    }

    get quantity(): number {
        return this._quantity;
    }

    get unitPrice(): Money {
        return this._unitPrice;
    }

    public calculateItemTotal(): Money {
        return this._unitPrice.multiply(this._quantity);
    }
}