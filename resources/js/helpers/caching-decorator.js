
export default function cachingDecorator(func, hashFn) {
    let cache = new Map();

    return function (...args) {
        let hash = hashFn(...args);

        let savedValue = cache.get(hash);
        if (savedValue) return savedValue;

        let result = func(...args);
        cache.set(hash, result);

        return result;
    }
}

