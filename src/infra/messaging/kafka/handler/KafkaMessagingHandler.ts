import { KafkaHandler } from '@core/infra/KafkaHandler';
import { producer } from '../producer';

export class KafkaMessagingHandler implements KafkaHandler {
    async handle(message: any, topic?: string): Promise<void> {
        await producer.send({
            topic,
            messages: [
                {value: JSON.stringify(message)}
            ]
        })
    }
}
