const firebaseService = require('../services/firebaseService');

exports.signup = async (req, res) => {
          const { email, password, fullName, preferredSport, level } = req.body;
          try {
                    // Créer l'utilisateur dans Firebase Auth
                    const userRecord = await firebaseService.createUser({ email, password, fullName });
                    // Créer le document Firestore
                    await firebaseService.createUserDoc(userRecord.uid, { fullName, email, preferredSport, level });
                    res.status(201).json({ uid: userRecord.uid, email });
          } catch (error) {
                    let msg = error.message;
                    if (msg.includes('email-already-exists')) msg = 'Email déjà utilisé';
                    if (msg.includes('Password should be at least')) msg = 'Mot de passe trop faible';
                    res.status(400).json({ error: msg });
          }
};

exports.login = async (req, res) => {
          const { idToken } = req.body;
          try {
                    // Vérifier le token JWT Firebase
                    const decoded = await firebaseService.verifyIdToken(idToken);
                    res.status(200).json({
                              uid: decoded.uid,
                              email: decoded.email,
                              claims: decoded.claims || {},
                    });
          } catch (error) {
                    res.status(401).json({ error: 'Token invalide' });
          }
};

exports.refreshToken = async (req, res) => {
          const { idToken } = req.body;
          try {
                    const decoded = await firebaseService.verifyIdToken(idToken);
                    res.status(200).json({
                              uid: decoded.uid,
                              email: decoded.email,
                              claims: decoded.claims || {},
                              exp: decoded.exp,
                    });
          } catch (error) {
                    res.status(401).json({ error: 'Token invalide ou expiré' });
          }
}; 