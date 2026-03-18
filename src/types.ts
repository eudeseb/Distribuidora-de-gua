export interface Cliente {
  id: string;
  nome: string;
  telefone: string;
  endereco: string;
  tipoPreferido?: 'dinheiro' | 'fiado' | 'pix' | 'cartao_credito';
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
  tipo: 'dinheiro' | 'fiado' | 'pix' | 'cartao_credito';
  valorRecebido?: number;
  troco?: number;
  data: number;
  itens: {
    produtoId: string;
    nome: string;
    quantidade: number;
    precoUnitario: number;
  }[];
}
