export interface Cliente {
  id: string;
  nome: string;
  telefone: string;
  endereco: string;
  createdAt: number;
}

export interface Produto {
  id: string;
  nome: string;
  preco: number;
  createdAt: number;
}

export interface Venda {
  id: string;
  clienteId: string;
  clienteNome: string;
  total: number;
  tipo: 'dinheiro' | 'fiado';
  data: number;
  itens: {
    produtoId: string;
    nome: string;
    quantidade: number;
    precoUnitario: number;
  }[];
}
