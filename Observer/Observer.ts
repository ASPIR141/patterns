import { Observable } from "./Observable";

const observable = new Observable();

observable.subscribe(
    values => console.log(values),
    error => console.error(error)
);

observable
    .toPromise()
    .then(values => console.log(values))
    .catch(error => console.error(error));
