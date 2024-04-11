import jwt from 'jsonwebtoken';
import 'dotenv/config';
export const generateAccessToken = (payload) => {
  const accessToken = jwt.sign(payload, process.env.SECRET_ACCESS_TOKEN, { expiresIn: '1h' });
  return accessToken;
};

export const generateRefreshToken = (payload) => {
  const accessToken = jwt.sign(payload, process.env.SECRET_REFRESH_TOKEN, { expiresIn: '30d' });
  return accessToken;
};
