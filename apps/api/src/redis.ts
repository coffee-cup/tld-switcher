import Redis from "ioredis";

const REDIS_URL = process.env.REDIS_URL!;

export const redis = new Redis(`${REDIS_URL}?family=0`);
console.log("REDIS_URL: ", REDIS_URL);
