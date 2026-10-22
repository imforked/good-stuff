import "dotenv/config";
import { S3Client } from "@aws-sdk/client-s3";

export const requireEnv = (name: string): string => {
  const value = process.env[name];

  if (value === undefined || value === "") {
    throw new Error(`${name} is undefined`);
  }

  return value;
};

const spacesEndpoint = requireEnv("DIGITAL_OCEAN_SPACES_ENDPOINT");
export const spacesBucket = requireEnv("DIGITAL_OCEAN_SPACES_BUCKET");
export const spacesRegion = requireEnv("DIGITAL_OCEAN_SPACES_REGION");

export const spacesObjectUrl = (key: string): string => {
  const endpoint = new URL(spacesEndpoint);
  const url = new URL(`https://${spacesBucket}.${endpoint.host}/`);
  url.pathname = key.startsWith("/") ? key : `/${key}`;

  return url.toString();
};

export const spacesClient = new S3Client({
  endpoint: spacesEndpoint,
  region: spacesRegion,
  credentials: {
    accessKeyId: requireEnv("DIGITAL_OCEAN_SPACES_KEY"),
    secretAccessKey: requireEnv("DIGITAL_OCEAN_SPACES_SECRET"),
  },
  forcePathStyle: false,
});
