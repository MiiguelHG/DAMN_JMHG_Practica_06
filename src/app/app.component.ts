import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FirebaseService } from './firebase.service';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  data: any[] = [];
  tokens: string[] = [];

  titulo: string = '';
  mensaje: string = '';

  constructor(private firebase: FirebaseService) {}
  
  // Obtener datos de la base de datos
  async ngOnInit() {
    try {
      this.data = await this.firebase.getData();
      console.log(this.data);
    } catch (error) {
      console.error(error);
    }
  }

  // Obtener los tokens de los dispositivos para enviar notificaciones
  // obtenerTokens() {
  //   for (const key in this.data) {
  //     if (Object.prototype.hasOwnProperty.call(this.data, key)) {
  //       const element = this.data[key];
  //       this.tokens.push(element.token);
  //     }
  //   }
  //   console.log(this.tokens);
  // }

  // Alternar tokens al marcar/desmarcar checkbox
  toggleToken(token: string, isChecked: boolean) {
    if (isChecked) {
      this.tokens.push(token);
    } else {
      this.tokens = this.tokens.filter(t => t !== token);
    }
    console.log(this.tokens);
  }

  // Enviar notificaciones a los dispositivos
  async enviarNotificaciones() {
    try {
      if (this.tokens.length > 0) {
        await this.firebase.sendNotifications(this.tokens, this.titulo, this.mensaje);
        console.log('Notificaciones enviadas');
      } else {
        console.log('No hay tokens disponibles');
      }
    } catch (error) {
      console.error('Error al enviar notificaciones:', error);
    }
    this.titulo = '';
    this.mensaje = '';
  }
}
