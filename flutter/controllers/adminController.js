const adminService = require('../services/adminService');

exports.getPendingEvents = async (req, res) => {
          try {
                    const events = await adminService.getPendingEvents();
                    res.json(events);
          } catch (error) {
                    res.status(400).json({ error: error.message });
          }
};

exports.updateEventStatus = async (req, res) => {
          const eventId = req.params.id;
          const { status } = req.body;
          try {
                    await adminService.updateEventStatus(eventId, status);
                    res.json({ success: true });
          } catch (error) {
                    res.status(400).json({ error: error.message });
          }
}; 