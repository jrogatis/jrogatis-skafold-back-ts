import jwt from "jsonwebtoken";

export enum JwtTokenTypeEnum {
  token = "token",
  refreshToken = "refreshToken"
}

const jwtTokenPrivateSecret =
  process.env.JWT_PRIVATE_KEY ||
  "-----BEGIN RSA PRIVATE KEY-----\nMIICWwIBAAKBgFvbxh4tg6qVVpCEvMwliqTOh584+Yk7OJOU7qUwwkghhoqOTR1v\no4OAVEIwSL5TFXG5lC3lbvwkRLI6ypU7XfVDINwMFg8of0yLwuA95tPQ08jjWaIT\nU1NgDGopIj4Cw6WsDdj6zvK/DnRSOricAIm1czXEGEviJZZTr9KQakn3AgMBAAEC\ngYAC5xwIohmSD2wP3xH0RY9vC9O/VVaVXpi4GTG9aKALFXwh7sNDFd8N7cU73ji+\nQvPfhyTGmoR6VU8SbscuFhUu/DvNO4vATZblYnmUVtUCpKLEncQX4G6+DFI/LYz8\nbQjwnkNKeUqLOSlRzCpFOfSBBBH9QTwcpL4GaRaclojtMQJBAKSFx/kyUquyhrC5\ne7wycYCrkyW3fdpbz5vwSLyuq/dByCS9FxkvtU+AcrWQZ52Kon6staX9okO3rWPH\nW/6v6A8CQQCO7vQD70A3Lo2Q/2cs3R3/4df6HYzbUPNBihVVr8W2SyXwpNiNz6HY\nT3a8bNU7EExB5lokHaTwjGxSjCpIXNeZAkEAjUi1qjKk+/2b3TfsInnPLwgonUMu\nOM6PQwLd8+qskvFSxvn7VA28TkGoQHN6B7h+QvpeI+Xj6vNZW05gmh7F0QJARFM1\nkivsJnS6d3WffHK2xHrRI1681pn7rnizeiJsAJgrqr0iR6fZVe2mdKwRwgooadgT\nfvAsyFBX953JGI5JAQJAMuCpVRqjHUUSFIA3TSVRfh1yumezeoM7a4YGIfIpYIK3\nIBoatXRBeNHLMtOAvFmlDV4C/C8nBiDNng+OAb2xXA==\n-----END RSA PRIVATE KEY-----";

const jwtTokenPublicSecret =
  process.env.JWT_PUBLIC_KEY ||
  "-----BEGIN PUBLIC KEY-----\nMIGeMA0GCSqGSIb3DQEBAQUAA4GMADCBiAKBgFvbxh4tg6qVVpCEvMwliqTOh584\n+Yk7OJOU7qUwwkghhoqOTR1vo4OAVEIwSL5TFXG5lC3lbvwkRLI6ypU7XfVDINwM\nFg8of0yLwuA95tPQ08jjWaITU1NgDGopIj4Cw6WsDdj6zvK/DnRSOricAIm1czXE\nGEviJZZTr9KQakn3AgMBAAE=\n-----END PUBLIC KEY-----";

const jwtRefreshTokenPrivateSecret =
  process.env.JWT_REFRESH_SECRET ||
  "-----BEGIN RSA PRIVATE KEY-----\nMIICXAIBAAKBgQCIZcEor039DDIwFpbukxH2+07etL9T3kdVb/qC80c0ps4SyQNB\n699zz5nFP0G7xgsVGpyejLFT9R0zKt+Mri+v8G3jqa6mCRm8EUNApTODHcAnQ+F8\n8pTN2l9dlRjWKANcta7zXzIuoKqetpW/EY4bv+YDFqjT7YaEoEhmRUIqswIDAQAB\nAoGAVIzHBOJOdMsHnVmTbAZMv44e4NyoMWP7UhHc9ym4/QFdgrWKSGXfmRmaV3QT\n2kM0gXuClKHgFow98obkFn+vXPI9DgkIb6iOHVhvKDLKln8QGkZj0h3d7BQqiJIS\nmFp2Wr73FGCK0s4x1aQPiiBMR5v0cXprENo9x8+saPYpPtECQQDpdhIRTdYV2wpu\nui/rkd/v5UKHMxjbN1VewaRn43q7OQa3Br+QGDoGf98t5FvBY8NZhExA7AiUr/Vz\nHMSD2sCJAkEAlZDH0ixEBkohvftTv6T4GDSbO5f16smsuNnA4seoQl7JR4XYH72s\nbjqHPJaOCETDDuwctnc/s/eMKVTXBM9qWwJAbjeLuBejJpZOio/j57bqnfsCOYnq\nBjRNXXrV/yXp31HA1c+dyI1nd4IO/z98AgTzSOOojE3ijy+zFTFTpVw04QJAOiBg\naEAn18Hrxyfr7mkwukeHpOtz+WGTrOuD2R77N4Aa/Z741a0jXFuGv3dLj88Zd60v\no4JI0ap9YHrGbeomTQJBAIDFLgaPVhqf4dgYXIuWrbsCEHFkGoK1XTNIh4smzNy+\nPn6x1S1Y8KWN5jzmxK8t0hvAfHYdtLVF2Lfwc27k1+I=\n-----END RSA PRIVATE KEY-----";

const jwtRefreshTokenPublicSecret =
  process.env.JWT_REFRESH_SECRET ||
  "-----BEGIN PUBLIC KEY-----\nMIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCIZcEor039DDIwFpbukxH2+07e\ntL9T3kdVb/qC80c0ps4SyQNB699zz5nFP0G7xgsVGpyejLFT9R0zKt+Mri+v8G3j\nqa6mCRm8EUNApTODHcAnQ+F88pTN2l9dlRjWKANcta7zXzIuoKqetpW/EY4bv+YD\nFqjT7YaEoEhmRUIqswIDAQAB\n-----END PUBLIC KEY-----";

export const generateExpiresIn = (type: JwtTokenTypeEnum) => {
  const expiresIn =
    type === "token"
      ? process.env.JWT_EXPIRES_IN || "900"
      : process.env.JWT_REFRESH_EXPIRES_IN || "86400";
  return parseInt(expiresIn, 10);
};

const generateTokerUserData = user => ({ userId: user._id });

export const generateToken = (user, type: JwtTokenTypeEnum) => {
  const secret =
    type === "token" ? jwtTokenPrivateSecret : jwtRefreshTokenPrivateSecret;
  return jwt.sign(generateTokerUserData(user), secret, {
    expiresIn: generateExpiresIn(type),
    algorithm: "RS512"
  });
};

export const decodeToken = (token, type: JwtTokenTypeEnum) => {
  const secret =
    type === "token" ? jwtTokenPublicSecret : jwtRefreshTokenPublicSecret;
  return jwt.verify(token, secret, { algorithms: ["RS512"] });
};
