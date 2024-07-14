export abstract class StorageService implements Storage {
    abstract setItem(key: string, value: unknown): void;
    abstract getItem<T>(key: string): T | null;
    abstract clear(): void;
    abstract key(index: number): string | null;
    abstract removeItem(key: string): void;
    abstract get length(): number;
}