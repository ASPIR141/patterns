export class StringBuilder {
    private readonly _capacity: number;

    private _buffer: Uint16Array;
    private _bufferLenght = 0;

    constructor(capacity: number) {
        this._capacity = capacity | 0;
        this._buffer = new Uint16Array(capacity);
    }

    get capacity() {
        return this._capacity;
    }

    public append(str: string) {
        for (let i = 0; i < str.length; i++) {
            this._buffer[this._bufferLenght++] = str.charCodeAt(i);
        }

        return this;
    }

    public build() {
        return new TextDecoder('utf8')
            .decode(this._buffer);
    }
}
