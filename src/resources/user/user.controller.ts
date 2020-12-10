import { Request, Response } from "express";
import { UserDoc, Users } from "./user.model";
import { THandler } from "@utils/models";
import { ICreateUserBody } from "@resources/user/models/requests";

export const me = (req: Request, res: Response): void => {
  res.send(req.user);
};

export const findById: THandler<UserDoc> = async (req, res, _next) => {
  try {
    await Users.findOne({ _id: req.params.id }).exec();
  } catch (error) {
    console.log(error);
    return res.status(500).send();
  }
};

export const listManagers: THandler<UserDoc> = async (req, res, _next) => {
  try {
    await Users.findOne({ role: 'manager' }).exec();
  } catch (error) {
    console.log(error);
    return res.status(500).send();
  }
};


export const create: THandler<ICreateUserBody> = async (req, res, _next) => {
  try {
    const foundedUser = await Users.findOne({ email: req.body.email }).exec();
    if (foundedUser) {
      return res.status(409).json("User already exists");
    }
    const newUser = new Users({...req.body, authentication: {
      local: { password: req.body.password }
    }});
    await newUser.save();
    return res.status(200).send();
  } catch (error) {
    console.log(error);
    return res.status(500).send();
  }
};

export const remove: THandler<UserDoc> = async (req, res, _next) => {
  try {
    await Users.remove({ _id: req.params.id }).exec();
    return res.status(200).send();
  } catch (error) {
    console.log(error);
    return res.status(500).send();
  }
};

