async function primary() {
  console.log("Starting Peril client...");
}

primary().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
