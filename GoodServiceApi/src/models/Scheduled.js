const { DataTypes } = require('sequelize');
const sequelize = require('../db/database');
const Service = require('./Service');
const moment = require('moment');

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




const checkSchedule = async (service_id, date, time) =>{
  const dayOfWeek = moment(date, "DD/MM/YYYY").format('dddd');

  const scheduledService = await Service.findOne({
    where: {
      id: service_id
    },
    attributes: ['availability']
  });


  const availability = scheduledService ? scheduledService.availability : null;
  if(availability){
    let resultAvaliability = availability[0]?.includes(dayOfWeek)
    if(!resultAvaliability){
      return false;
    }
    return true;
  }
  
}


ScheduledService.createSchedule = async (service_id, date, time) => {
  
  
  const serviceExists = await Service.findByPk(service_id);
  if (!serviceExists) {
    return { success: false, message: 'Service ID not found.' };
  }
  

  const existingSchedules = await ScheduledService.findAll({
    where: {
      service_id: service_id,
      date: date
    }
  });

  if (existingSchedules.length > 0){
    return { success: false, message: 'There is already an appointment for this service on the specified date' };
  }


  let check = await checkSchedule(service_id, date, time)
  if(!check){
    return { success: false, message: 'Date or time not available in the schedule.' };
  }

  

  const newScheduledService = await ScheduledService.create({service_id: service_id,date: date,time: time,status: 'Agendado'});

  return {success: true, message: 'service scheduled successfully', data: newScheduledService};
};




ScheduledService.deleteSchedule = async (id, date) =>{


  const existingSchedules = await ScheduledService.findAll({
    where: {
      id: id,
      date: date
    }
  });

  if (existingSchedules.length === 0) {
    return { success: false, message: 'No appointment found for the specified service ID and date.' };
  }

  await ScheduledService.destroy({
    where: {
      id: id,
      date: date
    }
  });

  return { success: true, message: 'Appointment deleted successfully.' };

}




ScheduledService.getFilterScheduleId = async (service_id) => {
  let data = await ScheduledService.getAllSchedule()
  const response = data?.filter(schedule=> schedule.service_id === service_id)
  if (response && response.length > 0){
    return {success: true, data: response};
  }else{
    return {success: false, message: 'service not found'};
  }
  
}




module.exports = ScheduledService;
