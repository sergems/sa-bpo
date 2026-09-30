import express, { type Request, type Response } from "express";
import { processCalculatorIntake } from "../shared/calculator-intake";

export function createCalculatorIntakeRouter() {
  const router = express.Router();

  router.post("/calculator-intake", async (req: Request, res: Response) => {
    const clientAddress = req.ip || req.socket.remoteAddress || "unknown";
    const emailEnvironment = {
      CF_ACCOUNT_ID: process.env.CF_ACCOUNT_ID,
      CF_EMAIL_API_TOKEN: process.env.CF_EMAIL_API_TOKEN,
      CF_EMAIL_FROM: process.env.CF_EMAIL_FROM,
    };
    const result = await processCalculatorIntake(req.body, emailEnvironment, clientAddress);
    res.status(result.status).json(result.body);
  });

  return router;
}
