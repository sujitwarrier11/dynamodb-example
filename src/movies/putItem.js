/* Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
SPDX-License-Identifier: Apache-2.0

ABOUT THIS NODE.JS EXAMPLE: This example works with the AWS SDK for JavaScript (v3),
which is available at https://github.com/aws/aws-sdk-js-v3.

Purpose:
putItem.js demonstrates how to use the Amazon DynamoDB document client to put an item in a table.

Inputs (replace in code):
- TABLE_NAME
- primaryKey - The name of the primary key. For example, "title".
- VALUE_1: Value for the primary key. (The format for the datatype must match the schema. For example, if the primaryKey is a number, VALUE_1 has no inverted commas.)
- sortKey - The name of the sort key. Only required if the table has sort key. For example, "year".
- VALUE_2: Value for the primary key. (The format for the datatype must match the schema.)

Running the code:
node putItem.js
*/
// snippet-start:[dynamodb.JavaScript.movies.putItemV3]
import { PutCommand } from "@aws-sdk/lib-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
// Set the AWS Region.
const REGION = "us-east-2"; //e.g. "us-east-1"
// Create an Amazon DynamoDB service client object.
export const ddbClient = new DynamoDBClient({ region: REGION });
const marshallOptions = {
  // Whether to automatically convert empty strings, blobs, and sets to `null`.
  convertEmptyValues: false, // false, by default.
  // Whether to remove undefined values while marshalling.
  removeUndefinedValues: false, // false, by default.
  // Whether to convert typeof object to map attribute.
  convertClassInstanceToMap: false, // false, by default.
};

const unmarshallOptions = {
  // Whether to return numbers as a string instead of converting them to native JavaScript numbers.
  wrapNumbers: false, // false, by default.
};

const translateConfig = { marshallOptions, unmarshallOptions };

// Create the DynamoDB document client.
const ddbDocClient = DynamoDBDocumentClient.from(ddbClient, translateConfig);


export const putItem = async () => {
  // Set the parameters.
 const params = {
    TableName: "customers",
    Item: {

      customer_id: "10",

      display_name: 'Mila',

      channels: {
        sms: [ '+12679396690']
      },

      details:{

          title: "Information",

          content: "Status: Active" + "\n\n" + "Score: 100"

      },

      worker: 'guruprasad.nayak@cigna.com'

   },
  };
  try {
    const data = await ddbDocClient.send(new PutCommand(params));
    console.log("Success - item added or updated", data);
  } catch (err) {
    console.log("Error", err.stack);
  }
};
putItem();
// snippet-end:[dynamodb.JavaScript.movies.putItemV3]
