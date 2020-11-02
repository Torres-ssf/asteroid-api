import { sign, verify as jwtVerify, VerifyCallback } from 'jsonwebtoken';

import ITokenProvider from '../models/ITokenProvider';
import IGenerateTokeDTO from '../dtos/IGenerateTokeDTO';

interface ITokenPayLoad {
  iat: number;
  exp: number;
  sub: string;
}

class JWTTokenProvider implements ITokenProvider {
  generate({ payload, secret, expiresIn }: IGenerateTokeDTO): string {
    return sign({}, secret, { subject: payload.userId, expiresIn });
  }

  verify(token: string, secret: string): string | undefined {
    try {
      const decoded = jwtVerify(token, secret) as ITokenPayLoad;

      return decoded.sub;
    } catch {
      return undefined;
    }
  }
}

export default JWTTokenProvider;
