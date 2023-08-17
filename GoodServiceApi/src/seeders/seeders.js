const fs = require('fs');
const path = require('path');
const sequelize = require('../db/database');
const Service = require('../models/Service');
const ScheduledService = require('../models/Scheduled');

const dataFilePath = path.join(__dirname, '../data/services.json');

const loadData = () => {
  try {
    const data = fs.readFileSync(dataFilePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
};

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const data = loadData();
    if (!data) {
      console.error('Error loading data.');
      return;
    }

    await sequelize.sync({ force: false });

    for (const service of data.services) {
      await Service.create(service);
    }

    for (const scheduledService of data.scheduled) {
      await ScheduledService.create(scheduledService);
    }

    console.log('Semeação dos dados completa.');
  },

  down: async (queryInterface, Sequelize) => {
    // Use a função queryInterface.bulkDelete() aqui para remover os dados inseridos pelo método up
  }
};
