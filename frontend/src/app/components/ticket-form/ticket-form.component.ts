import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Ticket } from '../../models/ticket.model';
import { TicketService } from '../../services/ticket.service';

@Component({
  selector: 'app-ticket-form',
  templateUrl: './ticket-form.component.html',
})
export class TicketFormComponent {
  ticket: Ticket = {
    titulo: '',
    descripcion: '',
    solicitante: '',
    categoria: 'Otro',
    prioridad: 'Media',
    estado: 'Abierto',
    tecnicoAsignado: '',
  };

  enviando = false;
  mensaje = '';
  error = '';

  constructor(private ticketService: TicketService, private router: Router) {}

  onSubmit(): void {
    this.enviando = true;
    this.mensaje = '';
    this.error = '';

    this.ticketService.crear(this.ticket).subscribe({
      next: () => {
        this.enviando = false;
        this.mensaje = 'Ticket creado correctamente ✅';
        setTimeout(() => this.router.navigate(['/tickets']), 900);
      },
      error: (err) => {
        this.enviando = false;
        this.error = 'Ocurrió un error al crear el ticket. Revisa los campos.';
        console.error(err);
      },
    });
  }
}
