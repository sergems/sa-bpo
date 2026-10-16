import express, { type Request, type Response } from "express";
import { processCalculatorIntake } from "../shared/calculator-intake";

export function createCalculatorIntakeRouter() {
  const router = express.Router();

  router.post("/calculator-intake", async (req: Request, res: Response) => {
    const clientAddress = req.ip || req.socket.remoteAddress || "unknown";
    const emailEnvironment = {
      RESEND_API_KEY: process.env.RESEND_API_KEY,
    };
    const result = await processCalculatorIntake(req.body, emailEnvironment, clientAddress);
    res.status(result.status).json(result.body);
  });

  return router;
}
