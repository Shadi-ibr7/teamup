const firebaseService = require('../services/firebaseService');

const authMiddleware = async (req, res, next) => {
          const header = req.headers.authorization;
          if (!header || !header.startsWith('Bearer ')) {
                    return res.status(401).json({ error: 'Token manquant' });
          }
          const token = header.split(' ')[1];
          try {
                    const decoded = await firebaseService.verifyIdToken(token);
                    req.user = {
                              uid: decoded.uid,
                              email: decoded.email,
                              claims: decoded.claims || {},
                    };
                    next();
          } catch (error) {
                    res.status(401).json({ error: 'Token invalide' });
          }
};

module.exports = authMiddleware; 