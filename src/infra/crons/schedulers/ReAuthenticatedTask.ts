import { schedule } from "node-cron";
import { makeReAuthenticatedCustomer } from "../factories/ReAuthenticatedCustomerFactory";

export const scheduledTaskReAuthenticated = schedule('* */23 * * *', async function () {
    try {
        await makeReAuthenticatedCustomer().execute();
    } catch (err) {
        console.log(err);
    }
});

