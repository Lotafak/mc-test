const Participant = require('../db/models').Participant;

module.exports = {
    list(req, res) {
        try {
            return Participant.all()
                .then(participants => res.send(participants))
                .catch(err => res.status(400).send({ errors: [{ msg: err.message }] }));
        } catch (err) {
            console.log(err);
            return res.status(500).send({ errors: [{ msg: 'Unexpected error' }] });
        }
    }
}
