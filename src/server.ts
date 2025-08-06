import express, { Request, Response } from "express";
import { runProducer } from "./producer";
import { runConsumer } from "./consumer";

const app = express();
const PORT = 3000;

app.get("/", (req: Request, res: Response) => {
  res.status(200).send("OK");
});

app.post("/produce", async (req: Request, res: Response) => {
  try {
    await runProducer();
    res.status(200).json({ message: "Producer triggered and messages sent." });
  } catch (error) {
    console.error("Error in /produce:", error);
    res.status(500).json({ error: "Failed to trigger producer." });
  }
});

app.post("/consume", async (req: Request, res: Response) => {
  try {
    // Start the consumer without awaiting, as it runs indefinitely
    runConsumer();
    return res.status(200).json({ message: "Consumer started." });
  } catch (error) {
    console.error("Error in /consume:", error);
    return res.status(500).json({ error: "Failed to start consumer." });
  }
});

app.listen(PORT, () => {
  console.log(`Express server running on http://localhost:${PORT}`);
});
