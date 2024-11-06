import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, provideHttpClient } from '@angular/common/http';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { ProdutoService } from './produto.service';
import { Produto } from './produto';

@Component({
  selector: 'app-lista',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule, MatFormFieldModule, MatIconModule, MatInputModule, MatCheckboxModule,
  ],
  templateUrl: './lista.component.html',
  styleUrl: './lista.component.css'
})
export class ListaComponent implements OnInit {
  produtos: Produto[] = [];
  idProximoProduto: number = 0;
  nomeNovoProduto: string = '';

  constructor(public produtoService: ProdutoService) {}

  ngOnInit(): void {
    this.loadProdutos();
  }

  loadProdutos(): void {
    this.produtoService.getProdutos().subscribe((produtos) => {
      this.produtos = produtos;
      
      const ids = produtos.map(p => p.id);
      const idProximoProduto = (ids.length > 0 ? Math.max(...ids) : 0) + 1;
      this.idProximoProduto = idProximoProduto;
    });
  }

  addProduto(): void {
    if (this.nomeNovoProduto.trim() === '') return;

    const novoProduto: Produto = {
      id: this.idProximoProduto,
      nome: this.nomeNovoProduto,
      comprado: false
    };

    this.produtoService.addProduto(novoProduto).subscribe(() => {
      this.loadProdutos();
      this.nomeNovoProduto = '';
    });
  }

  alternarComprado(produto: Produto): void {
    produto.comprado = !produto.comprado;
    this.produtoService.updateProduto(produto.id, produto)
      .subscribe(() => this.loadProdutos());
  }

  editar(produto: Produto): void {
    this.nomeNovoProduto = produto.nome;
    this.produtoService.deleteProduto(produto.id)
      .subscribe(() => this.loadProdutos());
  }

  deletar(produto: Produto): void {
    this.produtoService.deleteProduto(produto.id)
      .subscribe(() => this.loadProdutos());
  }
}