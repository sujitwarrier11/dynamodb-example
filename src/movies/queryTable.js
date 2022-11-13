/* Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
SPDX-License-Identifier: Apache-2.0

ABOUT THIS NODE.JS EXAMPLE: This example works with the AWS SDK for JavaScript (v3),
which is available at https://github.com/aws/aws-sdk-js-v3.

Purpose:
queryTable.js demonstrates how to use the Amazon DynamoDB document client to query items from an Amazon DynamoDB table.

Inputs (replace in code):
- TABLE_NAME
- MOVIE_NAME
- MOVIE_YEAR
- MOVIE_RANK

Running the code:
node queryTable.js
*/
// snippet-start:[dynamodb.JavaScript.movies.queryV3]
import { QueryCommand } from "@aws-sdk/lib-dynamodb";
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

// Set the parameters.
const params = {
  TableName: "customers",
  ExpressionAttributeValues: {
   ":w": "guruprasad.nayak@cigna.com",
   ":num": '+12679396690'
  },
  KeyConditionExpression: "worker = :w",
  FilterExpression: "contains(channels.sms, :num) or contains(channels.email, :num) or contains(channels.whatsapp, :num)"
};

export const queryTable = async () => {
  try {
    const data = await ddbDocClient.send(new QueryCommand(params));
    console.log(data);
  } catch (err) {
    console.log("Error", err);
  }
};
queryTable();
// snippet-end:[dynamodb.JavaScript.movies.queryV3]
