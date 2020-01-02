module.exports = async function (context, req) {
    context.log('JS HTTP trigger function processed for expense submitted (microservice)');
    context.log(`Data Received in body: ${JSON.stringify(req.body)}`)
    if (req.body) {
        const data = { expenseItems: req.body };
        context.log(`Data to be sent to queue: ${JSON.stringify(data)}`);
        // Add messages to the Storage queue, to update transactions microservice
        context.bindings.outputQueueExpenseReceived = data;
        context.res = {
            // status: 200, /* Defaults to 200 */
            body: `Update transactions successfully added in Azure Queue.}`
        };
    }
    else {
        context.res = {
            status: 400,
            body: "Please send expense items in the body"
        };
    }
};
