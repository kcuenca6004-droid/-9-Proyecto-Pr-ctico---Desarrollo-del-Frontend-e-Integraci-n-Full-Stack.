import { Component, OnInit } from '@angular/core';
import { Resumen } from '../../models/ticket.model';
import { TicketService } from '../../services/ticket.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  resumen: Resumen | null = null;
  cargando = true;
  error = '';

  constructor(private ticketService: TicketService) {}

  ngOnInit(): void {
    this.cargarResumen();
  }

  cargarResumen(): void {
    this.cargando = true;
    this.ticketService.obtenerResumen().subscribe({
      next: (data) => {
        this.resumen = data;
        this.cargando = false;
      },
      error: (err) => {
        this.error = 'No se pudo cargar el resumen desde la API.';
        this.cargando = false;
        console.error(err);
      },
    });
  }

  totalPorEstado(estado: string): number {
    if (!this.resumen) return 0;
    const item = this.resumen.porEstado.find((e) => e._id === estado);
    return item ? item.total : 0;
  }
}
