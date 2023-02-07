const { v4 } = require("uuid");
const AWS = require("aws-sdk");

const createUser = async (event) => {
    const dynamodb = new AWS.DynamoDB.DocumentClient();

    const { email, name } = JSON.parse(event.body);
    const createdAt = new Date();
    const id = v4();

    const newUser = {
        name,
        email,
        id,
        createdAt,
    };

    try {
        await dynamodb
            .put({
                TableName: "UserTable",
                Item: newUser,
            })
            .promise();
        return {
            status: 200,
            body: JSON.stringify(newUser),
        };
    } catch (error) {
        return {
            status: 500,
            body: {
                message: "Error creating user",
                error
            }
        }
    }
};

module.exports = {
    createUser,
};
