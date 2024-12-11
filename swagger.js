const swaggerAutogen = require("swagger-autogen");
const doc = {
  info: {
    title: "My library API",
    description: "An API showing book data",
  },
  host: "node-routes-sx4z.onrender.com",
  schemes: ["https"],
};

const outputfile = "./swagger.json";
const endpointFiles = ["./routes/index.js"];

// Run to
swaggerAutogen(outputfile, endpointFiles, doc);

// Generates the swagger.json file
swaggerAutogen(outputfile, endpointFiles, doc).then(async () => {
  await import("./server.js");
});
