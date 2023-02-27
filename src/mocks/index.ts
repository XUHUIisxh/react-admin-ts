import { setupWorker } from "msw";
import { handlers } from "./post";

export const worker = setupWorker(...handlers);
