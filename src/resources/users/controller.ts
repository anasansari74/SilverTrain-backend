import { Request, Response } from "express";

import primsa from "../../utils/database";

export const getUserById = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);

  try {
    const result = await primsa.user.findUnique({
      where: { id },
      include: { userInfo: true },
    });
    if (result) res.json(result);
    if (!result) res.json({ msg: "User not found" });
  } catch (e) {
    console.log(e);
    // res.json(e.message);
  }
};
