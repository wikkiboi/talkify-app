import app from "./app";

const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3001;

app.listen(PORT, function () {
  console.log(`Server listening on PORT ${PORT}`);
});

process.on("SIGTERM", function () {
  console.log(`SIGTERM signal received: closing HTTP server`);
  process.exit();
});

process.on("SIGINT", function () {
  console.log(`SIGINT signal received: closing HTTP server`);
  process.exit();
});
