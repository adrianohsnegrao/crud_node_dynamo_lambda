const AWS = require('aws-sdk');
const uuid = require('uuid');

const dynamoDb = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
    const { name, description } = JSON.parse(event.body);
    const id = uuid.v4();

    const params = {
        TableName: 'crud_node',
        Item: {
            id,
            name,
            description
        }
    };

    try {
        await dynamoDb.put(params).promise();
        return {
            statusCode: 200,
            body: JSON.stringify({ id, name, description })
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Erro ao criar item' })
        };
    }
};