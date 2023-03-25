import { kafka } from "./client"

export const producer = kafka.producer({
  allowAutoTopicCreation: true,
})

producer.connect().then(() => {
  console.log('[Purchases] Kafka connected');
})
