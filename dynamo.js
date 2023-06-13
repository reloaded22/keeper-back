const AWS = require("aws-sdk");
const {v4:uuidv4} = require("uuid");
// require("dotenv").config();


AWS.config.update({
  region: process.env.REGION,
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
});

const dynamoClient = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = "keeper-table";

const readNotesDynamo = async () => {
  const params = {
    TableName: TABLE_NAME
  }
  const notes = await dynamoClient.scan(params).promise();
  console.log("\nnotes:");
  console.log(notes);
  return notes;
}

const createNoteDynamo = async (reqBody) => {
  const params = {
    TableName: TABLE_NAME,
    Item: { id:uuidv4(), ...reqBody }
  };
  console.log("\nAdded note:");
  console.log(reqBody);
  return await dynamoClient.put(params).promise();
}

const deleteNoteDynamo = async (id) => {
  const params = {
    TableName: TABLE_NAME,
    Key: { id }
  };
  console.log("\nDeleted id:");
  console.log(id);
  return await dynamoClient.delete(params).promise();
};

module.exports = {
  readNotesDynamo,
  createNoteDynamo,
  deleteNoteDynamo
}