const { db } = require('../services/firebaseService');
const userService = require('../services/userService');

exports.getUserStats = async (req, res) => {
          const uid = req.params.uid;
          try {
                    // Nombre d'événements créés
                    const createdSnap = await db.collection('events').where('organizerId', '==', uid).get();
                    const createdCount = createdSnap.size;

                    // Nombre d'événements rejoints
                    const joinedSnap = await db.collection('events').where('participants', 'array-contains', uid).get();
                    const joinedCount = joinedSnap.size;

                    // Sports les plus pratiqués (créés + rejoints)
                    const sports = {};
                    createdSnap.forEach(doc => {
                              const sport = doc.data().sport;
                              if (sport) sports[sport] = (sports[sport] || 0) + 1;
                    });
                    joinedSnap.forEach(doc => {
                              const sport = doc.data().sport;
                              if (sport) sports[sport] = (sports[sport] || 0) + 1;
                    });
                    // Classement des sports
                    const sportsList = Object.entries(sports)
                              .sort((a, b) => b[1] - a[1])
                              .map(([sport, count]) => ({ sport, count }));

                    res.json({
                              createdEvents: createdCount,
                              joinedEvents: joinedCount,
                              topSports: sportsList,
                    });
          } catch (error) {
                    res.status(400).json({ error: error.message });
          }
};

exports.deleteUserAccount = async (req, res) => {
          const uid = req.user.uid;
          try {
                    await userService.deleteUserAccount(uid);
                    res.json({ success: true });
          } catch (error) {
                    res.status(400).json({ error: error.message });
          }
};

exports.updateUserProfile = async (req, res) => {
          const uid = req.user.uid;
          const { fullName, preferredSport, level } = req.body;
          try {
                    await userService.updateUserProfile(uid, { fullName, preferredSport, level });
                    res.json({ success: true });
          } catch (error) {
                    res.status(400).json({ error: error.message });
          }
}; 