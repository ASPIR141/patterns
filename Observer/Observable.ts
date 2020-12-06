import { IObservable } from "./IObservable";

export class Observable implements IObservable {
    private subscribers: any[] = [];

    public subscribe(observer: any,
                     error: any,
                     complete?: () => void) {
        this.subscribers.push(observer);
        complete();
    }

    public unsubscribe(observer: any, error: any): void {
        this.subscribers.filter((subscriber: any) => {
            return subscriber !== observer;
        });
    }

    public publish(data: any): void {
        this.subscribers.map((subscriber: any) => subscriber(data));
    }

    public toPromise<T>(): Promise<T> {
        return new Promise((resolve, reject) => {
            let value: any;
            this.subscribe((x: T) => value = x, (err: any) => reject(err), () => resolve(value));
        }) as Promise<T>;
    }
}
