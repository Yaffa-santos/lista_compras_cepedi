import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { QueueAction } from 'rxjs/internal/scheduler/QueueAction';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-lista',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatIconModule, MatInputModule, MatCheckboxModule],
  templateUrl: './lista.component.html',
  styleUrl: './lista.component.css'
})
export class ListaComponent {
  produtos: Produto[] = [];

  idProximoProduto: number = 0;
  nomeNovoProduto: string = '';

  addProduto(): void {
    if (this.nomeNovoProduto == '')
      return;

    const p = {
      id: this.idProximoProduto,
      nome: this.nomeNovoProduto,
      comprado: false,
    };
    this.produtos.push(p);
    this.nomeNovoProduto = '';
    this.idProximoProduto++;
  }

  alternarComprado(p: Produto): void {
    const idx = this.produtos.indexOf(p);
    if (idx < 0)
      return;
    this.produtos[idx].comprado = !this.produtos[idx].comprado;
  }

  editar(p: Produto): void {
    const idx = this.produtos.indexOf(p);
    if (idx < 0)
      return;
    this.nomeNovoProduto = p.nome;
    this.produtos.splice(idx, 1);
  }

  deletar(p: Produto): void {
    const idx = this.produtos.indexOf(p);
    if (idx < 0)
      return;
    this.produtos.splice(idx, 1);
  }
}

export class Produto {
  id: number = 0;
  nome: string = '';
  comprado: boolean = false;
}