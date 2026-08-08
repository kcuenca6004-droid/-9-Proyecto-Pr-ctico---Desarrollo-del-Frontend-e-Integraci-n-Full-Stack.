const express = require('express');
const router = express.Router();
const Ticket = require('../models/Ticket');

// GET /api/tickets  -> listar todos (con filtros opcionales ?estado=&categoria=)
router.get('/', async (req, res) => {
  try {
    const filtro = {};
    if (req.query.estado) filtro.estado = req.query.estado;
    if (req.query.categoria) filtro.categoria = req.query.categoria;

    const tickets = await Ticket.find(filtro).sort({ createdAt: -1 });
    res.json(tickets);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener los tickets', error: error.message });
  }
});

// GET /api/tickets/resumen -> conteo por estado, para el Dashboard
router.get('/resumen', async (req, res) => {
  try {
    const resumen = await Ticket.aggregate([
      { $group: { _id: '$estado', total: { $sum: 1 } } },
    ]);
    const total = await Ticket.countDocuments();
    res.json({ total, porEstado: resumen });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al generar el resumen', error: error.message });
  }
});

// GET /api/tickets/:id -> obtener un ticket puntual
router.get('/:id', async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) return res.status(404).json({ mensaje: 'Ticket no encontrado' });
    res.json(ticket);
  } catch (error) {
    res.status(400).json({ mensaje: 'ID inválido', error: error.message });
  }
});

// POST /api/tickets -> crear un nuevo ticket
router.post('/', async (req, res) => {
  try {
    const nuevoTicket = new Ticket(req.body);
    const ticketGuardado = await nuevoTicket.save();
    res.status(201).json(ticketGuardado);
  } catch (error) {
    res.status(400).json({ mensaje: 'Error al crear el ticket', error: error.message });
  }
});

// PUT /api/tickets/:id -> actualizar un ticket existente
router.put('/:id', async (req, res) => {
  try {
    const ticketActualizado = await Ticket.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!ticketActualizado) return res.status(404).json({ mensaje: 'Ticket no encontrado' });
    res.json(ticketActualizado);
  } catch (error) {
    res.status(400).json({ mensaje: 'Error al actualizar el ticket', error: error.message });
  }
});

// DELETE /api/tickets/:id -> eliminar un ticket
router.delete('/:id', async (req, res) => {
  try {
    const ticketEliminado = await Ticket.findByIdAndDelete(req.params.id);
    if (!ticketEliminado) return res.status(404).json({ mensaje: 'Ticket no encontrado' });
    res.json({ mensaje: 'Ticket eliminado correctamente' });
  } catch (error) {
    res.status(400).json({ mensaje: 'Error al eliminar el ticket', error: error.message });
  }
});

module.exports = router;
