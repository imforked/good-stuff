import {
  GetBucketPolicyCommand,
  PutBucketPolicyCommand,
} from "@aws-sdk/client-s3";
import { spacesBucket, spacesClient } from "../lib/digital-ocean-spaces.js";

const policy = {
  Version: "2012-10-17",
  Statement: [
    {
      Sid: "PublicReadUploads",
      Effect: "Allow",
      Principal: "*",
      Action: "s3:GetObject",
      Resource: `arn:aws:s3:::${spacesBucket}/uploads/*`,
    },
  ],
};

const policyText = JSON.stringify(policy);

const readPolicy = async (): Promise<string | undefined> => {
  try {
    const existing = await spacesClient.send(
      new GetBucketPolicyCommand({ Bucket: spacesBucket }),
    );

    return existing.Policy;
  } catch (error) {
    if (error instanceof Error && error.name === "NoSuchBucketPolicy") {
      return undefined;
    }

    throw error;
  }
};

const existing = await readPolicy();

if (existing === undefined) {
  await spacesClient.send(
    new PutBucketPolicyCommand({
      Bucket: spacesBucket,
      Policy: policyText,
    }),
  );
  console.log("Applied public read policy for uploads/*");
} else if (JSON.stringify(JSON.parse(existing)) === policyText) {
  console.log("Bucket policy already matches.");
} else {
  throw new Error("Bucket already has a different policy. Not replacing it.");
}
