import { v4 as uuid } from "uuid";
import { redis } from "./redis";

const NONCE_KEY = "nonce";
const getRedisKey = (nonce: string) => `auth:state:${nonce}`;

export const getStateString = async (
  data: Record<string, string | undefined>
): Promise<string> => {
  const nonce = uuid();

  const redisKey = getRedisKey(nonce);

  const stateData = {
    ...data,
    [NONCE_KEY]: nonce,
  };
  const stringifiedData = JSON.stringify(stateData);

  await redis.set(redisKey, stringifiedData);
  await redis.expire(redisKey, 60 * 10); // 10 minutes

  const base64EncodedData = Buffer.from(stringifiedData).toString("base64");

  return base64EncodedData;
};

export const getAndValidateStateData = async (
  state: string
): Promise<Record<string, string> | null> => {
  const decoded = Buffer.from(state, "base64").toString();

  try {
    const data = JSON.parse(decoded);

    const nonce = data[NONCE_KEY];
    if (!nonce) return null;

    const redisKey = getRedisKey(nonce);
    const redisData = await redis.get(redisKey);
    if (!redisData) return null;

    const parsedRedisData = JSON.parse(redisData);

    // Validate the nonce
    if (parsedRedisData.nonce !== nonce) return null;

    return parsedRedisData;
  } catch (e) {
    return null;
  }
};
