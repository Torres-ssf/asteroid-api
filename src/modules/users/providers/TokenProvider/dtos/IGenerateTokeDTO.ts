interface Payload {
  userId: string;
}

export default interface IGenerateTokenDTO {
  payload: Payload;
  secret: string;
  expiresIn: string;
}
