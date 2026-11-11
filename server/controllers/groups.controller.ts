import { Request, Response } from "express";
import { requireSession } from "../lib/requireSession.js";
import { ERROR } from "../constants/error.js";
import {
  createGroupService,
  getGroupMemberService,
  getGroupService,
  getGroupsService,
} from "../services/groups.service.js";
import {
  createGroupBodySchema,
  getGroupParamsSchema,
} from "../schemas/groups.js";

export const createGroupController = async (req: Request, res: Response) => {
  const session = await requireSession(req, res);

  if (!session) {
    return;
  }

  const parsed = createGroupBodySchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({
      error: ERROR.INVALID_BODY,
      details: parsed.error.flatten(),
    });
  }

  const group = await createGroupService({
    title: parsed.data.title,
    userId: session.user.id,
  });

  return res.status(201).json(group);
};

export const getGroupsController = async (req: Request, res: Response) => {
  const session = await requireSession(req, res);

  if (!session) {
    return;
  }

  const groups = await getGroupsService({ userId: session.user.id });

  return res.status(200).json(groups);
};

export const getGroupController = async (req: Request, res: Response) => {
  const session = await requireSession(req, res);

  if (!session) {
    return;
  }

  const parsedParams = getGroupParamsSchema.safeParse(req.params);

  if (!parsedParams.success) {
    return res.status(400).json({
      error: ERROR.INVALID_PARAMS,
      details: parsedParams.error.flatten(),
    });
  }

  const group = await getGroupService({ groupId: parsedParams.data.groupId });

  if (!group) {
    return res.status(404).send({ error: ERROR.GROUP_NOT_FOUND });
  }

  const groupMember = await getGroupMemberService({
    groupId: parsedParams.data.groupId,
    userId: session.user.id,
  });

  if (!groupMember) {
    return res.status(403).json({
      error: ERROR.FORBIDDEN,
    });
  }

  return res.status(200).json(group);
};
