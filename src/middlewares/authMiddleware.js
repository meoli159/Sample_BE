import jwt from 'jsonwebtoken';
import 'dotenv/config';

const verifyToken = (req, res, next) => {
  const userId = req.headers['x-client-id'];
  // console.log(userId);
  if (!userId) return res.status(401).json({ message: 'Invalid request' });

  const access_token = req.cookies.token;
  // console.log(access_token);
  if (!access_token) return res.status(401).json({ message: "You're not authenticated" });

  try {
    jwt.verify(access_token, process.env.SECRET_ACCESS_TOKEN, (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: 'Invalid Token' });
      }
      // console.log('decode>>>', decoded);
      if (userId !== decoded.userId) return res.status(401).json({ message: 'Invalid User' });
      req.user = decoded;
      next();
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const authMiddleware = (req, res, next) => {
  verifyToken(req, res, next);
};
export const isAllowedRoleMiddleware =
  (...allowedRoles) =>
  (req, res, next) => {
    verifyToken(req, res, () => {
      const userRoles = req.user?.roles;
      if (!userRoles) return res.status(401).send({ message: 'User has no role!' });
      const allowedRolesArray = [...allowedRoles];
      const hasMatchingRole = userRoles.some((role) => allowedRolesArray.includes(role));
      if (!hasMatchingRole) return res.status(403).send({ message: 'Require Allowed Role!' });
      next();
    });
  };
// export const isAdminMiddleware = (req, res, next) => {
//   verifyToken(req, res, () => {
//     if (!req.user.payload.role.includes('admin')) {
//       return res.status(403).send({ message: 'Require Admin Role!' });
//     }
//     next();
//   });
// };

// export const isStaffMiddleware = (req, res, next) => {
//   verifyToken(req, res, () => {
//     if (!req.user.payload.role.includes('staff')) {
//       return res.status(403).send({ message: 'Require Staff Role!' });
//     }
//     next();
//   });
// };
