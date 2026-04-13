import {Currency} from "./currency";

export class Money {
    private readonly _amount: number;
    private _currency: Currency;

    constructor(amount: number, currency: Currency) {
        if (amount < 0) throw new RangeError('Amount must be greater than 0');
        this._amount = amount;
        this._currency = currency;
    }

    get amount(): number {
        return this._amount;
    }

    get currency(): Currency {
        return this._currency;
    }

    public format = (locale: string = 'en-US'): string =>
        this._currency.formatAmount(this._amount, locale);

    public toString(): string {
        return `${this._currency.code} ${this._amount.toFixed(2)}`;
    }

    public add = (other: Money): Money => {
        if (this._currency.code !== other.currency.code)
            throw new Error(`Cannot add amounts with different currencies: ${this._currency.code} and ${other.currency.code}`);
        return new Money(this._amount + other.amount, this._currency);
    }

    public multiply = (factor: number): Money => {
        if (factor < 0) throw new RangeError('Amount must be greater than 0');
        return new Money(this._amount * factor, this._currency);
    }

}