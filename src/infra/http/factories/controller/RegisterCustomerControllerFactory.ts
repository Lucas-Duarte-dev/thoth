import { PrismaCustomerRepository } from '@modules/accounts/repository/prisma/PrismaCustomerRepository';
import { RegisterCustomerController } from '@modules/accounts/useCases/RegisterCustomer/RegisterCustomerController';
import { RegisterCustomer } from '@modules/accounts/useCases/RegisterCustomer/RegisterCustomer';
import { KafkaMessagingHandler } from '../../../messaging/kafka/handler/KafkaMessagingHandler';

export function makeRegisterCustomerController(): RegisterCustomerController {
    const prismaCustomerRepository = new PrismaCustomerRepository();
    const kafkaHandler = new KafkaMessagingHandler();
    const customerRegister = new RegisterCustomer(
        prismaCustomerRepository,
        kafkaHandler
    );
    const registerCustomerController = new RegisterCustomerController(customerRegister);

    return registerCustomerController;
}
