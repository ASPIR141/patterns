interface IDisposable {
    dispose(): void;
}

export function dispose<T extends IDisposable>(disposable: T): T;
export function dispose<T extends IDisposable>(disposable: T | undefined): T | undefined;
export function dispose<T extends IDisposable>(disposables: Array<T>): Array<T>;
export function dispose<T extends IDisposable>(disposables: ReadonlyArray<T>): ReadonlyArray<T>;
export function dispose<T extends IDisposable>(disposables: T | T[] | undefined): T | T[] | undefined {
	if (Array.isArray(disposables)) {
		disposables.forEach(d => {
			if (d) {
				d.dispose();
			}
		});
		return [];
	} else if (disposables) {
		disposables.dispose();
		return disposables;
	} else {
		return undefined;
	}
}

export function isDisposable<E extends object>(thing: E): thing is E & IDisposable {
	return typeof (<IDisposable><any>thing).dispose === 'function'
		&& (<IDisposable><any>thing).dispose.length === 0;
}

function using<T extends IDisposable>(resource: T, func: (resource: T) => void) {
    try {
        func(resource);
    } finally {
        resource.dispose();
    }
}

// Example use:

class Camera implements IDisposable {
    takePicture() { /* omitted */ }
    // etc...
    dispose() {
        console.log(1);

        // navigator.camera.cleanup();
    }
}

using(new Camera(), (camera) => {
    camera.takePicture();
});