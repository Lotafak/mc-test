const TimeEntry = require('../db/models').TimeEntry;
const Participant = require('../db/models').Participant
const { validationResult } = require('express-validator/check');
const io = require('../io').io();

module.exports = {
    async create(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status('422').json({ errors: errors.array() });
        }

        const { body: { chipId, location, timestamp } } = req;

        // check if participant with chipId exists
        const participants = await Participant
            .findAll({
                where: {
                    chipId
                },
                raw: true,
            });
        if (!participants.length) {
            return res
                .status('422')
                .json({ errors: [{ msg: 'Participant with given chipId does not exist' }] });
        }

        // check if time entry for location already exists
        const entry = await TimeEntry
            .findAll({
                where: {
                    chipId,
                    location
                },
            });
        if (entry.length) {
            return res
                .status('409')
                .json({ errors: [{ msg: 'Time entry with given location already exists' }] })
        }

        try {
            const timeEntry = await TimeEntry.create({
                chipId,
                location,
                createdAt: timestamp,
                updatedAt: timestamp,
            })

            io.emit('new entry', {
                ...participants[0],
                ...timeEntry.dataValues
            });
            return res.status(201).send(timeEntry);
        } catch (err) {
            return res.status(400).send({ errors: [{ msg: err.message }] });
        }
    },

    list(req, res) {
        return TimeEntry
            .findAll({
                include: [{ model: Participant }],
                order: [['createdAt', 'DESC']]
            })
            .then(timeEntries => res.send(timeEntries))
            .catch(err => res.status(400).send({ errors: [{ msg: err.message }] }));
    }
}
