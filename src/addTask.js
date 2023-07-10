const { v4 } = require("uuid");
const AWS = require("aws-sdk");

const addTask = async (event) => {
    const dynamodb = new AWS.DynamoDB.DocumentClient();

    const { nombre,contrasena, correo, productos, finanzas } = JSON.parse(event.body);
    const id = v4();

    console.log("created id: ", id);

    const newTask = {
        id,
        nombre,
        contrasena,
        correo,
        productos,
        finanzas,
        
    };

    await dynamodb
        .put({
            TableName: "usuarios",
            Item: newTask,
        })
        .promise();

    return {
        statusCode: 200,
        body: JSON.stringify(newTask),
    };
};

module.exports = {
    addTask,
};
