const express = require('express');
const router = express.Router();
const ScheduledService = require('../models/Scheduled');

/**
 * @swagger
 * /api/schedule/create:
 *   post:
 *     tags: [Agendamento]
 *     summary: Criar novo agendamento de serviço
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *               date:
 *                 type: string
 *               time:
 *                 type: string
 *             example:
 *               id: "id do serviço"
 *               date: "data"
 *               time: "horario"
 *     responses:
 *       201:
 *         description: Agendamento criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 service_id:
 *                   type: string
 *                 date:
 *                   type: string
 *                 time:
 *                   type: string
 *                 status:
 *                   type: string
 */
router.post('/create', async (req, res) => {
  const { id, date, time } = req.body;
  const response = await ScheduledService.createSchedule(id, date, time);
  
  if(response.success){
    res.status(201).json({message: response.message, data: response.data});
  }else{
    res.status(404).json({error: response.message});
  }

})



/**
 * @swagger
 * /api/schedule/delete:
 *   delete:
 *     tags: [Agendamento]
 *     summary: Deletar um agendamento de serviço
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         description: ID do agendamento para deletar
 *         schema:
 *           type: string
 *       - in: query
 *         name: date
 *         required: true
 *         description: Data do agendamento para deletar
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Agendamento deletado com sucesso
 *         content:
 *           application/json:
 *             example:
 *               message: 'Appointment deleted successfully'
 *       400:
 *         description: Erro ao deletar agendamento
 *         content:
 *           application/json:
 *             example:
 *               message: 'Error message'
 */

router.delete('/delete', async (req, res) => {
  const { id, date } = req.query;
  
  const response = await ScheduledService.deleteSchedule(id, date);
  
  if (response.success) {
    res.status(200).json({message: response?.message});
  } else {
    res.status(400).json({error: response?.message});
  }
});
  


/**
 * @swagger
 * /api/schedule/all:
 *   get:
 *     tags: [Agendamento]
 *     summary: Retorna todos os serviços agendados
 *     responses:
 *       200:
 *         description: Lista de todos os serviços agendados
 *         content:
 *           application/json:
 *             example:
 *               services: [
 *                 {
 *                   id: "",
                     service_id: "",
                     date: "",
                     time: "",
                     status: ""
 *                 },
 *                 // ... outros serviços
 *               ]
 */

router.get('/all', async (req, res) =>{
    const scheduledData =  await ScheduledService.getAllSchedule();
    res.json(scheduledData);
})




/**
 * @swagger
 * /api/schedule/filter:
 *   get:
 *     tags: [Agendamento]
 *     summary: Filtra os serviços agendados por ID de serviço
 *     parameters:
 *       - in: query
 *         name: service_id
 *         required: true
 *         description: ID do serviço para filtrar os serviços agendados por
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Dados filtrados com sucesso
 *         content:
 *           application/json:
 *             example:
 *               - id: ""
 *                 service_id: ""
 *                 date: ""
 *                 time: ""
 *                 status: ""
 *       404:
 *         description: Nenhum dado encontrado para o ID de serviço fornecido
 *         content:
 *           application/json:
 *             example:
 *               message: 'Service not found'
 */
                      

router.get('/filter', async (req, res) =>{
  const{service_id} = req.query 
  const filterData = await ScheduledService.getFilterScheduleId(service_id);

  if(filterData.success){
    res.status(200).json({data: filterData.data})
  }else{
    res.status(404).json({error: filterData.message})
  }

  
})
  
  
  
module.exports = router;