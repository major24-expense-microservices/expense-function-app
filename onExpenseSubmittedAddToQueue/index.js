module.exports = async function (context, req) {
    context.log('JS HTTP trigger function processed for expense submitted (microservice)');

    if (req.body && req.body.user && req.body.expenseId) {
        const data = { user: req.body.user, expenseId: req.body.expenseId, expenseItems: req.body.expenseItems };
        context.log(`Data retrieved from request body: ${JSON.stringify(data)}`);
        // Add messages to the Storage queue, to update transactions microservice
        context.bindings.outputQueueExpenseReceived = data;
        // Add messages to queue, to create pdf
        context.bindings.outputQueueExpenseReceivedToCreatePdf = data;
        context.res = {
            // status: 200, /* Defaults to 200 */
            body: `Expense Id ${req.body.expenseId}, successfully added in Azure Queue for ${req.body.user.userId}`
        };
    }
    else {
        context.res = {
            status: 400,
            body: "Please pass a userid and expense id in the body"
        };
    }
};
