export class DateTime {
    private readonly _date: Date;

    constructor(value?: Date | string) {
        const now = new Date();
        if (value) {
            const parsedDate = new Date(value);
            if (isNaN(parsedDate.getTime()))
                throw new RangeError(`Invalid date: ${parsedDate}`);
            if (parsedDate > now) throw new RangeError(`Date cannot be in the future: ${parsedDate}`);
            this._date = parsedDate;
        } else this._date = now;
    }

    public get value(): Date {
        return this._date;
    }

    public format(locale: string = 'en-US'): string {
        return this._date.toLocaleDateString(locale, {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
    }

    public toString(): string {
        return this._date.toISOString();
    }
}