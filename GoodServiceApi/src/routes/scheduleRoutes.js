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
  
    if (response) {
      res.status(201).json(response);
    } else {
      res.status(404).json({ error: 'Serviço não encontrado' });
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
 *               success: false
 *               message: 'No data found for the provided service_id'
 */
                      

router.get('/filter', async (req, res) =>{
  const{service_id} = req.query 

  const filterData = await ScheduledService.getFilterScheduleId(service_id);

  if (filterData) {
    return res.status(200).json(filterData);
    
  }else{
    return res.status(404).json({
      success: false,
      message: 'No data found for the provided service_id'
    });
  }
  
})
  
  
  
module.exports = router;