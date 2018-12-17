const participantsController = require('../controllers').participants;
const timeEntriesController = require('../controllers').timeEntries;
const { check } = require('express-validator/check');

module.exports = (app) => {
    app.get('/', (req, res) => res.send('Hello'));

    app.get('/participants', participantsController.list);
    app.get('/time-entries', timeEntriesController.list);

    app.post(
        '/time-entries',
        [
            check('chipId').isInt(),
            check('location').isInt({ min: 1, max: 2 }),
        ],
        timeEntriesController.create,
    );
}
