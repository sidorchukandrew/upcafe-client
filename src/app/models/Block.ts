export class Block {
    open: string;
    close: string;
    day: string;
    id: string;

    constructor(open: string, close: string, day: string, id: string) {
        this.open = open;
        this.close = close;
        this.day = day;
        this.id = id;
    }
}