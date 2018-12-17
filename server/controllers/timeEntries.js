const TimeEntry = require('../db/models').TimeEntry;
const Participant = require('../db/models').Participant
const { validationResult } = require('express-validator/check');
const io = require('../io').io();

module.exports = {
    async create(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status('422').json({ errors: errors.array() });
            }

            const { body: { chipId, location, timestamp } } = req;

            // check if participant with chipId exists
            const [participant] = await Participant
                .findAll({
                    where: {
                        chipId
                    },
                    raw: true,
                });
            if (!participant) {
                return res
                    .status('422')
                    .json({ errors: [{ msg: 'Participant with given chipId does not exist' }] });
            }

            const entries = await TimeEntry
                .findAll({
                    where: {
                        chipId
                    },
                    raw: true,
                });

            if (entries.length) {
                // Check for location duplication
                const entryLocation = entries.find(el => el.location === location);
                if (entryLocation) {
                    return res
                        .status('409')
                        .json({ errors: [{ msg: 'Time entry with given location already exists' }] })
                }
            } else if (!entries.length && location === '2') {
                return res
                    .status('422')
                    .json({
                        errors: [
                            { msg: 'First participants time entry cannot be from the location \'2\'' }
                        ]
                    });
            }

            const { dataValues } = await TimeEntry.create({
                chipId,
                location,
                createdAt: timestamp,
                updatedAt: timestamp,
            })

            // Emit new time entry for all listeners
            io.emit('new entry', {
                Participant: participant,
                ...dataValues
            });
            return res.status(201).send(dataValues);
        } catch (err) {
            console.log(err);
            return res.status(500).send({ errors: [{ msg: 'Unexpected error' }] });
        }
    },

    list(req, res) {
        try {
            return TimeEntry
                .findAll({
                    include: [{ model: Participant }],
                    order: [['createdAt', 'DESC']]
                })
                .then(timeEntries => res.send(timeEntries))
                .catch(err => res.status(400).send({ errors: [{ msg: err.message }] }));
        } catch (err) {
            console.log(err);
            return res.status(500).send({ errors: [{ msg: 'Unexpected error' }] });
        }
    }
}
