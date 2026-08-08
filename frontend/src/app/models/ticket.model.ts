export interface Ticket {
  _id?: string;
  titulo: string;
  descripcion: string;
  solicitante: string;
  categoria: 'Hardware' | 'Software' | 'Red' | 'Cuentas' | 'Otro';
  prioridad: 'Baja' | 'Media' | 'Alta' | 'Crítica';
  estado: 'Abierto' | 'En proceso' | 'Resuelto' | 'Cerrado';
  tecnicoAsignado?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Resumen {
  total: number;
  porEstado: { _id: string; total: number }[];
}
