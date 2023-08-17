const { DataTypes } = require('sequelize');
const sequelize = require('../db/database');
const Service = require('./Service');

const ScheduledService = sequelize.define('ScheduledService', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  service_id: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  date: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  time: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});



ScheduledService.belongsTo(Service, { foreignKey: 'service_id' });


ScheduledService.getAllSchedule = async () => {
  return await ScheduledService.findAll();
};



ScheduledService.createSchedule = async (service_id, date, time) => {
  let data = {
    service_id: service_id,
    date: date,
    time: time,
    status: 'Agendado'
  };


  const newScheduledService = await ScheduledService.create(data);
  return newScheduledService;
};




ScheduledService.getFilterScheduleId = async (service_id) => {
  let data = await ScheduledService.getAllSchedule()
  const response = data?.filter(schedule=> schedule.service_id === service_id)
  if (response){
    return response
  }else{
    return null
  }
  
}




module.exports = ScheduledService;
