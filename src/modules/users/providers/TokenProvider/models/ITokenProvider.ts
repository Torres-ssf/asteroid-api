import IGenerateTokenDTO from '../dtos/IGenerateTokeDTO';

export default interface ITokenProvider {
  generate({ payload, secret, expiresIn }: IGenerateTokenDTO): string;
  verify(token: string, secret: string): string | undefined;
}
