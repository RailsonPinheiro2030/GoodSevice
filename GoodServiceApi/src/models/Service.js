const { DataTypes } = require('sequelize');
const sequelize = require('../db/database');


const Services = sequelize.define('Services', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  duration: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  professional: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  availability: {
    type: DataTypes.JSON,
    allowNull: false,
  },
});


Services.getAllData = async () => {
  return await Services.findAll();
};


Services.getServiceSpecificId = async (id) => {
  
  return await Services.findByPk(id);
};



Services.getAvailabilityService = async (parameters) =>{
      try {
        const allServices = await Services.findAll();

        if (!parameters) {
            return allServices.map(service => ({
                professional: service.professional,
                available_slots: service.availability,
            }));
        }

        const filteredServices = allServices.filter(service =>
            service.name.toLowerCase().includes(parameters.toLowerCase()) ||
            service.professional.toLowerCase().includes(parameters.toLowerCase())
        );

        return filteredServices.map(service => ({
            professional: service.professional,
            available_slots: service.availability,
        }));
      }catch (error) {
        console.error(error);
        throw new Error('Error fetching availability data');
      }
  
}



Services.scheduleService = async (id, date, time) => {
  const service = await Services.findByPk(id);
  if (service) {
    const newScheduled = {
      id: uuidv4(),
      service_id: id,
      date: date,
      time: time,
      status: 'Agendado'
    };
    await service.createScheduledService(newScheduled);

    return newScheduled;
  }
  return null;
};



module.exports = Services;
