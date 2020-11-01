import { v4 } from 'uuid';
import ITokenProvider from '../models/ITokenProvider';
import IGenerateTokeDTO from '../dtos/IGenerateTokeDTO';

interface ITokenObject {
  token: string;
  secret: string;
  userId: string;
}

class FakeTokenProvider implements ITokenProvider {
  private tokenRepository: Array<ITokenObject>;

  constructor() {
    this.tokenRepository = [];
  }

  generate({ payload, secret, expiresIn }: IGenerateTokeDTO): string {
    const token = v4();
    const { userId } = payload;

    this.tokenRepository.push({
      token: v4(),
      secret,
      userId,
    });

    return token;
  }

  verify(token: string, secret: string): string | undefined {
    const tokenObjectExists = this.tokenRepository.find(
      item => item.token === token,
    );

    if (!tokenObjectExists || tokenObjectExists.secret !== secret) {
      return undefined;
    }

    return tokenObjectExists.userId;
  }
}

export default FakeTokenProvider;
