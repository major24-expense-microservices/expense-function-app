# expensejs-fn

## Azure function app with Node JS/Javascript for expense app. When a user submits expense, below functions (serverless) should run in squence.

### Function: onExpenseSubmittedAddToQueue
#### [INPUT] HTTP Trigger by web app, to notify an expense has been submitted.
#### [OUTPUT] Queue: [expense-data], Name: outputQueueExpenseReceived
#### What it does: Writes the incoming data queue, so it can be processed. { "userId": "user1", "expenseId": 1 }
#### To test from PShell.
    // Create expense object to reflect
    /** iwr - Method POST - Uri https://ms-expense-react-func-app.azurewebsites.net/api/onExpenseSubmittedAddToQueue?code=<......>
      * -Headers @{ "content-type"="application/json" }
      * -Body '{"user": {"userId": "user1","email": "maj@gmail.com"},
      *          "expenseId": 2,
      *          "expenseItems": [
      *                  { "id": "aa2612d0-626c-4fbc-bd2c-052837a9fa0e", "status": "Processed1" }, {"id": "c5204ebf-23fe-40e3-b582-4887cebdf796", "status": "Processed1"}
      *                  ]
      *        }'`
      */


### Function: onExpenseReceivedInQueueCreatePdf
#### [INPUT] Queue Trigger by queue [expense-data]
#### [OUTPUT] Queue: [pdf-created-in-local], Name: outputQueuePdfCreatedInLocal
#### What it does: Calls REST api to get expense items, submitted user info using Axios. Creates a PDF file based on the expense items retrieved and saves it to local folder (/reports). Then writes to queue  with PDF file name.

### Function: onPdfCreatedInLocalFolderUploadToStorage
#### [INPUT] Queue Trigger by [pdf-created-in-local]
#### [OUTPUT] Queue: [pdf-uploaded-to-storage], Name: outputQueuePdfUploadedToStorage
#### What it does: Uploads the PDF file from local folder to Azure Blob storage. Container: [expenses-report]

### Function: onPdfUploadedToStorageSendEmail
#### [INPUT]: Queue trigger by [pdf-uploaded-to-storage]
#### [OUTPUT]: Send Email via SendGrid service.
#### [OUTPUT]: Queue: [pdf-emailed-to-user], Name: outputQueuePdfEmailedToUser
#### What it does: Calls REST api to get user info and email address and send an email to user with PDF attachment. PDF attachment is read from local folder. NOTE: Reading directly from blob is NOT supported, atleast for node js app.

### Function: onPdfUploadedToStorageRemoveLocalFile
#### [INPUT]: Queue trigger by [pdf-emailed-to-user]
#### [OUTPUT]: None
#### What it does: Removes the file from local folder

