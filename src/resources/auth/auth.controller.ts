import passport from 'passport';
import { THandler } from '@utils/models';
import crypto from 'crypto';
import {
  generateToken,
  decodeToken,
  JwtTokenTypeEnum,
} from '@shared/services/jwt';
import { Unauthorized } from '@utils/responses';

import { Users } from '@resources/user/user.model';

const generateRedisKey = (userId, refreshToken) =>
  `${process.env.JWT_REDIS_REFRESH_TOKEN_PREFIX}${userId}_${refreshToken}`;

export const login: THandler = async (req, res, next) => {
  passport.authenticate('local', { session: false }, (err, user, _info) => {
    if (err || !user) return Unauthorized(res);
    return req.login(user, { session: false }, async (err) => {
      if (err) res.send(err);
      const token = generateToken(user, JwtTokenTypeEnum.token);
      const refreshToken = generateToken(user, JwtTokenTypeEnum.refreshToken);
      res.json({ userId: user._id, token, refreshToken });
    });
  })(req, res, next);
};

export const refresh: THandler = async (req, res) => {
  const refreshToken = req.body.refreshToken;
  try {
    const validDecodedJwt = decodeToken(
      refreshToken,
      JwtTokenTypeEnum.refreshToken
    );
    const userId = (validDecodedJwt as any).userId;
    const newToken = generateToken({ _id: userId }, JwtTokenTypeEnum.token);
    const newRefreshToken = generateToken(
      { _id: userId },
      JwtTokenTypeEnum.refreshToken
    );
    return res.json({ token: newToken, refreshToken: newRefreshToken });
  } catch (error) {
    return Unauthorized(res);
  }
};

export const passwordRecovery: THandler = async (req, res, next) => {
  try {
    const foundedUser = await Users.findOne({
      email: req.body.email,
    }).exec();
    if (foundedUser) {
      foundedUser.authentication.local.resetPasswordToken = crypto
        .randomBytes(32)
        .toString('hex');
      foundedUser.authentication.local.resetPasswordExpires =
        Date.now() + 3600000 * 3;
      await foundedUser.save();
    }
    return res.status(200).send();
  } catch (error) {
    console.log(error);
    return res.status(500).send();
  }
};
