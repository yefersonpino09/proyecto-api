const uuid = require("uuid");
const AWS = require("aws-sdk");

const updateTask = async (event) => {
  const dynamodb = new AWS.DynamoDB.DocumentClient();
  const { id } = event.pathParameters;

  const { nombre,contrasena, correo, productos, finanzas } = JSON.parse(event.body);

  await dynamodb
    .update({
      TableName: "usuarios",
      Key: { id },
      UpdateExpression: "set nombre = :nombre, contrasena = :contrasena, correo = :correo, productos = :productos, finanzas = :finanzas",
      ExpressionAttributeValues: {
        
        ":nombre": nombre,
        ":contrasena": contrasena,
        ":correo": correo,
        ":productos": productos,
        ":finanzas": finanzas,

      },
      ReturnValues: "ALL_NEW",
    })
    .promise();

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "task updated",
    }),
  };
};

module.exports = {
  updateTask,
};
