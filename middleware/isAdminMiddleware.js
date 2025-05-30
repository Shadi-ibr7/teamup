const { db } = require('../services/firebaseService');

const isAdminMiddleware = async (req, res, next) => {
          const uid = req.user.uid;
          const userSnap = await db.collection('users').doc(uid).get();
          if (!userSnap.exists || userSnap.data().role !== 'admin') {
                    return res.status(403).json({ error: 'Accès réservé aux administrateurs' });
          }
          next();
};

module.exports = isAdminMiddleware; 