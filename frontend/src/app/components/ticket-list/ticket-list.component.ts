import { Component, OnInit } from '@angular/core';
import { Ticket } from '../../models/ticket.model';
import { TicketService } from '../../services/ticket.service';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
})
export class TicketListComponent implements OnInit {
  tickets: Ticket[] = [];
  cargando = true;
  error = '';
  filtroEstado = '';

  constructor(private ticketService: TicketService) {}

  ngOnInit(): void {
    this.cargarTickets();
  }

  cargarTickets(): void {
    this.cargando = true;
    this.ticketService.listar().subscribe({
      next: (data) => {
        this.tickets = data;
        this.cargando = false;
      },
      error: (err) => {
        this.error = 'No se pudo conectar con la API. Verifica que el backend esté activo.';
        this.cargando = false;
        console.error(err);
      },
    });
  }

  get ticketsFiltrados(): Ticket[] {
    if (!this.filtroEstado) return this.tickets;
    return this.tickets.filter((t) => t.estado === this.filtroEstado);
  }

  cambiarEstado(ticket: Ticket, nuevoEstado: Ticket['estado']): void {
    if (!ticket._id) return;
    this.ticketService.actualizar(ticket._id, { estado: nuevoEstado }).subscribe({
      next: (actualizado) => {
        ticket.estado = actualizado.estado;
      },
      error: (err) => console.error(err),
    });
  }

  eliminar(ticket: Ticket): void {
    if (!ticket._id) return;
    if (!confirm(`¿Eliminar el ticket "${ticket.titulo}"?`)) return;

    this.ticketService.eliminar(ticket._id).subscribe({
      next: () => {
        this.tickets = this.tickets.filter((t) => t._id !== ticket._id);
      },
      error: (err) => console.error(err),
    });
  }

  claseBadge(estado: string): string {
    return estado.replace(' ', '-');
  }
}
