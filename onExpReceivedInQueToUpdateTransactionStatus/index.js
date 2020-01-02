const axios = require('axios');
const settings = require('../local.settings.json');

module.exports = async function (context, queueItem) {
    context.log('JavaScript queue trigger function processed work item');
    let expenseItems = queueItem.expenseItems;
    context.log(`Data received in queue to update trans: ${JSON.stringify(expenseItems)}`);
    if (!expenseItems || expenseItems.length === 0) {
        context.log('expenseItems are required');
        return;
    }
    const transactionUpdateApiUrl = settings.Api.TransactionUpdateStatus;
    context.log('Api url to put transaction update status: ', transactionUpdateApiUrl);

    try {
        const response = await axios({
            url: transactionUpdateApiUrl,
            method: "PUT",
            data: expenseItems

        });
        context.log('>>>', response.data);
    } catch(err) {
        context.log(err);
        context.res = {
            status: 500,
            body: err
        }
    }

};
