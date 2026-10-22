import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import {
  spacesBucket,
  spacesClient,
  spacesObjectUrl,
} from "./digital-ocean-spaces.js";
import { CONTENT_TYPE_WHITE_LIST } from "../constants/contentTypeWhiteList.js";

export const createPresignedUpload = async (
  userId: string,
  contentType: (typeof CONTENT_TYPE_WHITE_LIST)[number],
): Promise<{ uploadUrl: string; objectUrl: string; key: string }> => {
  const extension = contentType.replace("image/", "");
  const key = `uploads/${userId}/${crypto.randomUUID()}.${extension}`;

  const command = new PutObjectCommand({
    Bucket: spacesBucket,
    Key: key,
    ContentType: contentType,
  });

  const uploadUrl = await getSignedUrl(spacesClient, command, {
    expiresIn: 60,
  });

  return {
    uploadUrl,
    objectUrl: spacesObjectUrl(key),
    key,
  };
};
