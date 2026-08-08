const mongoose = require('mongoose');

const TicketSchema = new mongoose.Schema(
  {
    titulo: {
      type: String,
      required: [true, 'El título es obligatorio'],
      trim: true,
      maxlength: 120,
    },
    descripcion: {
      type: String,
      required: [true, 'La descripción es obligatoria'],
      trim: true,
    },
    solicitante: {
      type: String,
      required: [true, 'El nombre del solicitante es obligatorio'],
      trim: true,
    },
    categoria: {
      type: String,
      enum: ['Hardware', 'Software', 'Red', 'Cuentas', 'Otro'],
      default: 'Otro',
    },
    prioridad: {
      type: String,
      enum: ['Baja', 'Media', 'Alta', 'Crítica'],
      default: 'Media',
    },
    estado: {
      type: String,
      enum: ['Abierto', 'En proceso', 'Resuelto', 'Cerrado'],
      default: 'Abierto',
    },
    tecnicoAsignado: {
      type: String,
      trim: true,
      default: '',
    },
  },
  {
    timestamps: true, // agrega createdAt y updatedAt automáticamente
  }
);

module.exports = mongoose.model('Ticket', TicketSchema);
