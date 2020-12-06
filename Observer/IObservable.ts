export interface IObservable {
    subscribe(observer: any, error: any): any;
    unsubscribe(observer: any, error: any): void;
    publish(data: any): void;
    toPromise<T>(): Promise<T>;
}