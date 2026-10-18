import "dotenv/config";
import { S3Client } from "@aws-sdk/client-s3";

const requireEnv = (name: string): string => {
  const value = process.env[name];

  if (value === undefined || value === "") {
    throw new Error(`${name} is undefined`);
  }

  return value;
};

export const spacesBucket = requireEnv("DIGITAL_OCEAN_SPACES_BUCKET");

export const spacesClient = new S3Client({
  endpoint: requireEnv("DIGITAL_OCEAN_SPACES_ENDPOINT"),
  region: requireEnv("DIGITAL_OCEAN_SPACES_REGION"),
  credentials: {
    accessKeyId: requireEnv("DIGITAL_OCEAN_SPACES_KEY"),
    secretAccessKey: requireEnv("DIGITAL_OCEAN_SPACES_SECRET"),
  },
  forcePathStyle: false,
});
