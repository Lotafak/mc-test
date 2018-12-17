const Participant = require('../db/models').Participant;

module.exports = {
    list(req, res) {
        return Participant.all()
            .then(participants => res.send(participants))
            .catch(err => res.status(400).send({ errors: [{ msg: err.message }] }));
    }
}
