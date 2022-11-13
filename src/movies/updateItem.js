/* Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
SPDX-License-Identifier: Apache-2.0

ABOUT THIS NODE.JS EXAMPLE: This example works with the AWS SDK for JavaScript (v3),
which is available at https://github.com/aws/aws-sdk-js-v3.

Purpose:
updateItem.js demonstrates how to use the Amazon DynamoDB document client to create or update an item in an Amazon DynamoDB table.

Inputs (replace in code):
- TABLE_NAME
- MOVIE_NAME
- MOVIE_YEAR
- MOVIE_PLOT
- MOVIE_RANK

Running the code:
node updateItem.js
*/
// snippet-start:[dynamodb.JavaScript.movies.updateItemV3]
import { UpdateCommand } from "@aws-sdk/lib-dynamodb";
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

export const updateItem = async () => {
  // Set the parameters.
  const params = {
    TableName: "customers",
    Key: {
      worker: "guruprasad.nayak@cigna.com",
      customer_id: "98",
    },
    UpdateExpression: "set channels = :ch",
    ExpressionAttributeValues: {
      ":ch": {
        email: ['bobby@example.com'],
        sms: ['+123456789'],
        whatsapp: ['whatsapp:+123456789']
      }
    },
  };
  try {
    const data = await ddbDocClient.send(new UpdateCommand(params));
    console.log("Success - item added or updated", data);
    return data;
  } catch (err) {
    console.log("Error", err);
  }
};
updateItem();
// snippet-end:[dynamodb.JavaScript.movies.updateItemV3]
