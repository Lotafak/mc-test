'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Participants', [{
      chipId: 1,
      startNumber: 1,
      firstName: 'Patryk',
      lastName: 'Kudła'
    }, {
      chipId: 2,
      startNumber: 2,
      firstName: 'Ewa',
      lastName: 'Nadobna'
    }, {
      chipId: 3,
      startNumber: 3,
      firstName: 'Oladen',
      lastName: 'Binsama'
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Participants', null, {});
  }
};
