import { Kafka as KafkaClient } from 'kafkajs';

export const kafka = new KafkaClient({
    clientId: 'toth',
    brokers: [process.env.KAFKA_BROKERS],
    ...(process.env.KAFKA_USER ? {
      sasl: {
        mechanism: 'scram-sha-256',
        username: process.env.KAFKA_USER ?? '',
        password: process.env.KAFKA_PASS ?? '',
      },
      ssl: true,
    } : {})
})
