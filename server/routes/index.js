const participantsController = require('../controllers').participants;
const timeEntryController = require('../controllers').timeEntry;
const { check } = require('express-validator/check');

module.exports = (app) => {
    app.get('/', (req, res) => res.send('Hello'));

    app.get('/participants', participantsController.list);
    app.get('/time-entries', timeEntryController.list);

    app.post(
        '/time-entries',
        [
            check('chipId').isInt(),
            check('location').isInt({ min: 1, max: 2 }),
        ],
        timeEntryController.create,
    );
}
