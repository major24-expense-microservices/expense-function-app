module.exports = async function (context, req) {
    context.log('JS HTTP trigger function processed for expense submitted (microservice)');

    if (req.body && req.body.id && req.body.expenseItems) {
        const data = { expenseId: req.body.id, expenseItems: req.body.expenseItems };
        context.log(`Data retrieved from request body: ${JSON.stringify(data)}`);
        // Add messages to the Storage queue, to update transactions microservice
        context.bindings.outputQueueExpenseReceived = data;
        context.res = {
            // status: 200, /* Defaults to 200 */
            body: `Expense Id ${req.body.expenseId}, successfully added in Azure Queue.}`
        };
    }
    else {
        context.res = {
            status: 400,
            body: "Please send expense id and expense items in the body"
        };
    }
};
