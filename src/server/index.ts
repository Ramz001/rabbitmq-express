import amqp from "amqplib";

const connection = amqp.connect("amqp://localhost");
console.log(connection);
console.log('hello')
async function main() {
  console.log("Starting Peril server...");
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
