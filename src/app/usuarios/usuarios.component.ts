import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FirebaseService } from '../firebase.service';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css'
})
export class UsuariosComponent  {
  data?: any[];

  // constructor(private firebase: FirebaseService) { }

  // ngOnInit(): void {
  //     this.firebase.getData().subscribe(users => {
  //       this.data = users;
  //     });
  // }

}
