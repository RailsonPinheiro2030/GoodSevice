const express = require('express');
const router = express.Router();
const serviceModel = require('../models/Service');


/**
 * @swagger
 * /api/:
 *   get:
 *     tags: [Teste]
 *     summary: Verifica se a API está online
 *     responses:
 *       200:
 *         description: API está online
 */
router.get('/', (req, res) => {
    res.send('Api online');
});







/**
 * @swagger
 * /api/services:
 *   get:
 *     tags: [Serviços]
 *     summary: Retorna todos os serviços disponíveis
 *     responses:
 *       200:
 *         description: Lista de todos os serviços
 *         content:
 *           application/json:
 *             example:
 *               services: [
 *                 {
 *                   id: "",
 *                   name: "",
 *                   description: "",
 *                   duration: "",
 *                   price: "",
 *                   professional: "",
 *                   availability: [
 *                     ""
 *                   ]
 *                 },
 *                 // ... outros serviços
 *               ]
 */


router.get('/services', async (req, res) => {
  const allData = await serviceModel.getAllData();
  res.json(allData);
});


/**
 * @swagger
 * /api/service/detail:
 *   get:
 *     summary: Detalhes do serviço
 *     tags: [Serviços]
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           description: ID do serviço a ser detalhado
 *     responses:
 *       200:
 *         description: Resultado da pesquisa
 *         content:
 *           application/json:
 *             example:
 *               {
 *                 id: "",
 *                 name: "",
 *                 description: "",
 *                 duration: "",
 *                 price: "",
 *                 professional: "",
 *                 availability: [
 *                   ""
 *                 ]
 *               }
 *       404:
 *         description: Serviço não encontrado
 */
router.get('/service/detail', async (req, res) => {
    const {id} = req.query;
    let reponse = await serviceModel.getServiceSpecificId(id)
    res.json(reponse)
});


/**
 * @swagger
 * /api/service/availability:
 *   get:
 *     tags: [Serviços]
 *     summary: Obter disponibilidade dos serviços
 *     parameters:
 *       - name: name
 *         in: query
 *         description: Nome do serviço
 *         required: false
 *         schema:
 *           type: string
 *       - name: professional
 *         in: query
 *         description: Nome do profissional
 *         required: false
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Array de disponibilidade dos serviços
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   professional:
 *                     type: string
 *                     description: Nome do profissional
 *                   available_slots:
 *                     type: array
 *                     description: Array de horários disponíveis
 *                     items:
 *                       type: string
 *                     example: ["Segunda 9h-11h", "Terça 14h-16h"]
 */

router.get('/service/availability', async (req, res) => {
  let response = null
  const {name, professional} = req.query;
  if(name){
    response = await serviceModel.getAvailabilityService(name)
  }else if(professional){
    response = await serviceModel.getAvailabilityService(professional)
  }else{
    response = await serviceModel.getAvailabilityService(null)
  }
  res.json(response)
})


module.exports = router;

