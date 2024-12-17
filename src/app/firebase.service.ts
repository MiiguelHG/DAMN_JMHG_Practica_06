import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Database,ref, get, child } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private backendUrl = 'http://localhost:3000/send-notifications';

  constructor(private db: Database, private http: HttpClient) { }

  // Obtener datos de la base de datos
  async getData() {
    const dbRef = ref(this.db);
    const snapshot = await get(child(dbRef, 'usuarios'));
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      console.log('No data available');
      return null;
    }
  }

  // Enviar nptificaciones al listado de tokens
  async sendNotifications(tokens: string[], title: string, body: string) {
    const message = { tokens, title, body };
    return this.http.post(this.backendUrl, message).toPromise();
  }
}
