export interface KafkaHandler<T = any> {
    handle: (message: T, topic?: string) => Promise<void>;
}
