import { Request, Response, NextFunction } from 'express';
import { container } from 'tsyringe';

import ITokenProvider from '@modules/users/providers/TokenProvider/models/ITokenProvider';
import AppError from '@shared/errors/AppError';
import authConfig from '@config/auth';

export default (
  request: Request,
  response: Response,
  next: NextFunction,
): void => {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('JWT token is missing', 401);
  }

  const [, token] = authHeader.split(' ');

  const { secret } = authConfig;

  const tokenProvider = container.resolve('TokenProvider') as ITokenProvider;

  const decodedUserId = tokenProvider.verify(token, secret);

  if (!decodedUserId) {
    throw new AppError('Invalid JWT token', 401);
  }

  request.user = {
    id: decodedUserId,
  };

  next();
};
