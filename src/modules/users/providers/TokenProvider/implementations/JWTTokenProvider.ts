import { sign, verify as jwtVerify } from 'jsonwebtoken';

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
    const { sub } = jwtVerify(token, secret) as ITokenPayLoad;

    return sub;
  }
}

export default JWTTokenProvider;
