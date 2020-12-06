export abstract class ProviderFactory {
    abstract create(config);
}

export class MongoDBProviderFactory extends ProviderFactory {
    public create(config) {
        console.log('mongo', config);
    }
}

export class PostgresProviderFactory extends ProviderFactory {
    public create(config) {
        console.log('postgres', config);
    }
}

enum ProviderType {
    MongoDB = 'MongoDB',
    PostgresSQL = 'PostgresSQL',
    Redis = 'Redis'
}

class Factory {
    private readonly factories = new Map<string, ProviderFactory>();

    constructor(providers) {
        for (const type in ProviderType) {
            const provider = providers.get(type);
            const factory = this.create<ProviderFactory>(provider, {});
            this.factories.set(type, factory);
        }
    }

    private create<T>(type: (new (config) => T), config): T {
        if (!type) {
            throw new Error('Provider is not defined');
        }

        return new type(config);
    }

    public static initializeFactories(providers: Map<string, any>) {
        return new Factory(providers);
    }

    public executeCreation(providerType: string, config) {
        return this.factories.get(providerType).create(config);
    }
}

const providers = new Map<string, any>([
    [ProviderType.MongoDB, MongoDBProviderFactory],
    [ProviderType.PostgresSQL, PostgresProviderFactory]
]);

const database = Factory
    .initializeFactories(providers)
    .executeCreation(ProviderType.MongoDB, {});
