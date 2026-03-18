import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Package, 
  ShoppingCart, 
  BookOpen, 
  Home as HomeIcon,
  Plus,
  Search,
  Trash2,
  ChevronRight,
  Droplets,
  TrendingUp,
  Clock
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from './lib/utils';
import { Cliente, Produto, Venda } from './types';

// --- Components ---

const SidebarItem = ({ icon: Icon, label, active, onClick }: any) => (
  <button
    onClick={onClick}
    className={cn(
      "flex items-center gap-3 w-full px-4 py-3 rounded-xl transition-all duration-200",
      active 
        ? "bg-blue-600 text-white shadow-lg shadow-blue-200" 
        : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"
    )}
  >
    <Icon size={20} />
    <span className="font-medium">{label}</span>
  </button>
);

const Card = ({ children, className }: any) => (
  <div className={cn("glass-card p-6", className)}>
    {children}
  </div>
);

// --- Views ---

const Dashboard = ({ clientes, produtos, vendas }: { clientes: Cliente[], produtos: Produto[], vendas: Venda[] }) => {
  const totalVendas = vendas.reduce((acc, v) => acc + v.total, 0);
  const totalFiado = vendas.filter(v => v.tipo === 'fiado').reduce((acc, v) => acc + v.total, 0);
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-blue-600 text-white border-none">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-blue-100 text-sm font-medium">Vendas Totais</p>
              <h3 className="text-3xl font-bold mt-1">R$ {totalVendas.toFixed(2)}</h3>
            </div>
            <div className="bg-white/20 p-2 rounded-lg">
              <TrendingUp size={24} />
            </div>
          </div>
        </Card>
        
        <Card className="bg-amber-500 text-white border-none">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-amber-100 text-sm font-medium">Total em Fiado</p>
              <h3 className="text-3xl font-bold mt-1">R$ {totalFiado.toFixed(2)}</h3>
            </div>
            <div className="bg-white/20 p-2 rounded-lg">
              <BookOpen size={24} />
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex justify-between items-start">
            <div>
              <p className="text-slate-500 text-sm font-medium">Clientes Ativos</p>
              <h3 className="text-3xl font-bold mt-1 text-slate-900">{clientes.length}</h3>
            </div>
            <div className="bg-blue-50 p-2 rounded-lg text-blue-600">
              <Users size={24} />
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
            <Clock size={20} className="text-blue-600" />
            Vendas Recentes
          </h4>
          <div className="space-y-4">
            {vendas.slice(-5).reverse().map((venda) => (
              <div key={venda.id} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
                <div>
                  <p className="font-semibold text-slate-900">{venda.clienteNome}</p>
                  <p className="text-xs text-slate-500">{new Date(venda.data).toLocaleDateString()}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-slate-900">R$ {venda.total.toFixed(2)}</p>
                  <span className={cn(
                    "text-[10px] uppercase font-bold px-2 py-0.5 rounded-full",
                    venda.tipo === 'fiado' ? "bg-amber-100 text-amber-700" : "bg-emerald-100 text-emerald-700"
                  )}>
                    {venda.tipo}
                  </span>
                </div>
              </div>
            ))}
            {vendas.length === 0 && (
              <p className="text-center text-slate-400 py-8 italic">Nenhuma venda registrada ainda.</p>
            )}
          </div>
        </Card>

        <Card>
          <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
            <Package size={20} className="text-blue-600" />
            Produtos em Destaque
          </h4>
          <div className="space-y-4">
            {produtos.map((prod) => (
              <div key={prod.id} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600">
                    <Droplets size={20} />
                  </div>
                  <p className="font-semibold text-slate-900">{prod.nome}</p>
                </div>
                <p className="font-bold text-blue-600">R$ {prod.preco.toFixed(2)}</p>
              </div>
            ))}
            {produtos.length === 0 && (
              <p className="text-center text-slate-400 py-8 italic">Nenhum produto cadastrado.</p>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

const ClientesView = ({ clientes, onAdd }: { clientes: Cliente[], onAdd: (c: Omit<Cliente, 'id' | 'createdAt'>) => void }) => {
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [endereco, setEndereco] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nome) return;
    onAdd({ nome, telefone, endereco });
    setNome('');
    setTelefone('');
    setEndereco('');
  };

  return (
    <div className="space-y-6">
      <Card>
        <h3 className="text-xl font-bold mb-4">Novo Cliente</h3>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input 
            className="input-field" 
            placeholder="Nome Completo" 
            value={nome}
            onChangeText={(e: any) => setNome(e.target.value)}
            onChange={(e) => setNome(e.target.value)}
          />
          <input 
            className="input-field" 
            placeholder="Telefone" 
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
          />
          <input 
            className="input-field" 
            placeholder="Endereço" 
            value={endereco}
            onChange={(e) => setEndereco(e.target.value)}
          />
          <button type="submit" className="btn-primary md:col-span-3 flex items-center justify-center gap-2">
            <Plus size={20} /> Cadastrar Cliente
          </button>
        </form>
      </Card>

      <Card>
        <h3 className="text-xl font-bold mb-4">Lista de Clientes</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-100 text-slate-400 text-sm">
                <th className="pb-3 font-medium">Nome</th>
                <th className="pb-3 font-medium">Telefone</th>
                <th className="pb-3 font-medium">Endereço</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {clientes.map(c => (
                <tr key={c.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-4 font-medium text-slate-900">{c.nome}</td>
                  <td className="py-4 text-slate-600">{c.telefone || '---'}</td>
                  <td className="py-4 text-slate-600">{c.endereco || '---'}</td>
                </tr>
              ))}
              {clientes.length === 0 && (
                <tr>
                  <td colSpan={3} className="py-8 text-center text-slate-400 italic">Nenhum cliente cadastrado.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

const ProdutosView = ({ produtos, onAdd }: { produtos: Produto[], onAdd: (p: Omit<Produto, 'id' | 'createdAt'>) => void }) => {
  const [nome, setNome] = useState('');
  const [preco, setPreco] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nome || !preco) return;
    onAdd({ nome, preco: parseFloat(preco) });
    setNome('');
    setPreco('');
  };

  return (
    <div className="space-y-6">
      <Card>
        <h3 className="text-xl font-bold mb-4">Novo Produto</h3>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input 
            className="input-field" 
            placeholder="Nome do Produto (ex: Galão 20L)" 
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
          <input 
            className="input-field" 
            placeholder="Preço (R$)" 
            type="number"
            step="0.01"
            value={preco}
            onChange={(e) => setPreco(e.target.value)}
          />
          <button type="submit" className="btn-primary md:col-span-2 flex items-center justify-center gap-2">
            <Plus size={20} /> Adicionar Produto
          </button>
        </form>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {produtos.map(p => (
          <Card key={p.id} className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
              <Droplets size={32} />
            </div>
            <h4 className="font-bold text-slate-900">{p.nome}</h4>
            <p className="text-blue-600 font-bold text-xl mt-1">R$ {p.preco.toFixed(2)}</p>
          </Card>
        ))}
      </div>
    </div>
  );
};

const VendasView = ({ clientes, produtos, onAdd }: { clientes: Cliente[], produtos: Produto[], onAdd: (v: Omit<Venda, 'id' | 'data'>) => void }) => {
  const [clienteId, setClienteId] = useState('');
  const [tipo, setTipo] = useState<'dinheiro' | 'fiado'>('dinheiro');
  const [itens, setItens] = useState<{produtoId: string, quantidade: number}[]>([]);

  const handleAddItem = (prodId: string) => {
    const existing = itens.find(i => i.produtoId === prodId);
    if (existing) {
      setItens(itens.map(i => i.produtoId === prodId ? { ...i, quantidade: i.quantidade + 1 } : i));
    } else {
      setItens([...itens, { produtoId: prodId, quantidade: 1 }]);
    }
  };

  const handleRemoveItem = (prodId: string) => {
    setItens(itens.filter(i => i.produtoId !== prodId));
  };

  const calculateTotal = () => {
    return itens.reduce((acc, item) => {
      const prod = produtos.find(p => p.id === item.produtoId);
      return acc + (prod?.preco || 0) * item.quantidade;
    }, 0);
  };

  const handleSubmit = () => {
    if (!clienteId || itens.length === 0) return;
    
    const cliente = clientes.find(c => c.id === clienteId);
    const vendaItens = itens.map(item => {
      const prod = produtos.find(p => p.id === item.produtoId)!;
      return {
        produtoId: item.produtoId,
        nome: prod.nome,
        quantidade: item.quantidade,
        precoUnitario: prod.preco
      };
    });

    onAdd({
      clienteId,
      clienteNome: cliente?.nome || 'Desconhecido',
      total: calculateTotal(),
      tipo,
      itens: vendaItens
    });

    setClienteId('');
    setItens([]);
    setTipo('dinheiro');
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <Card>
          <h3 className="text-xl font-bold mb-4">Selecionar Produtos</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {produtos.map(p => (
              <button
                key={p.id}
                onClick={() => handleAddItem(p.id)}
                className="flex items-center justify-between p-4 rounded-xl border border-slate-200 hover:border-blue-500 hover:bg-blue-50 transition-all group"
              >
                <div className="text-left">
                  <p className="font-bold text-slate-900">{p.nome}</p>
                  <p className="text-blue-600 text-sm">R$ {p.preco.toFixed(2)}</p>
                </div>
                <div className="bg-slate-100 group-hover:bg-blue-600 group-hover:text-white p-2 rounded-lg transition-colors">
                  <Plus size={18} />
                </div>
              </button>
            ))}
          </div>
        </Card>

        <Card>
          <h3 className="text-xl font-bold mb-4">Itens da Venda</h3>
          <div className="space-y-3">
            {itens.map(item => {
              const prod = produtos.find(p => p.id === item.produtoId);
              return (
                <div key={item.produtoId} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-white flex items-center justify-center font-bold text-blue-600 border border-slate-200">
                      {item.quantidade}x
                    </div>
                    <p className="font-medium">{prod?.nome}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <p className="font-bold">R$ {((prod?.preco || 0) * item.quantidade).toFixed(2)}</p>
                    <button onClick={() => handleRemoveItem(item.produtoId)} className="text-red-500 hover:bg-red-50 p-2 rounded-lg">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              );
            })}
            {itens.length === 0 && (
              <p className="text-center text-slate-400 py-8 italic">Selecione produtos acima para começar.</p>
            )}
          </div>
        </Card>
      </div>

      <div className="space-y-6">
        <Card className="sticky top-6">
          <h3 className="text-xl font-bold mb-6 text-center">Resumo da Venda</h3>
          
          <div className="space-y-4">
            <div>
              <label className="text-xs font-bold text-slate-400 uppercase mb-1 block">Cliente</label>
              <select 
                className="input-field"
                value={clienteId}
                onChange={(e) => setClienteId(e.target.value)}
              >
                <option value="">Selecione um cliente</option>
                {clientes.map(c => (
                  <option key={c.id} value={c.id}>{c.nome}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-400 uppercase mb-1 block">Forma de Pagamento</label>
              <div className="grid grid-cols-2 gap-2">
                <button 
                  onClick={() => setTipo('dinheiro')}
                  className={cn(
                    "py-2 rounded-xl border font-medium transition-all",
                    tipo === 'dinheiro' ? "bg-blue-600 border-blue-600 text-white" : "border-slate-200 text-slate-500 hover:bg-slate-50"
                  )}
                >
                  Dinheiro
                </button>
                <button 
                  onClick={() => setTipo('fiado')}
                  className={cn(
                    "py-2 rounded-xl border font-medium transition-all",
                    tipo === 'fiado' ? "bg-amber-500 border-amber-500 text-white" : "border-slate-200 text-slate-500 hover:bg-slate-50"
                  )}
                >
                  Fiado
                </button>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-100">
              <div className="flex justify-between items-end mb-6">
                <p className="text-slate-500 font-medium">Total a Pagar</p>
                <p className="text-3xl font-bold text-slate-900">R$ {calculateTotal().toFixed(2)}</p>
              </div>
              
              <button 
                onClick={handleSubmit}
                disabled={!clienteId || itens.length === 0}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-2xl shadow-lg shadow-blue-200 transition-all active:scale-95 disabled:opacity-50 disabled:shadow-none"
              >
                Finalizar Venda
              </button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

const FiadosView = ({ vendas }: { vendas: Venda[] }) => {
  const fiados = vendas.filter(v => v.tipo === 'fiado');
  
  return (
    <div className="space-y-6">
      <Card>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold">Controle de Fiados</h3>
          <div className="bg-amber-100 text-amber-700 px-4 py-1 rounded-full font-bold text-sm">
            Total: R$ {fiados.reduce((acc, v) => acc + v.total, 0).toFixed(2)}
          </div>
        </div>

        <div className="space-y-4">
          {fiados.map(v => (
            <div key={v.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center font-bold">
                  {v.clienteNome.charAt(0)}
                </div>
                <div>
                  <p className="font-bold text-slate-900">{v.clienteNome}</p>
                  <p className="text-xs text-slate-500">{new Date(v.data).toLocaleDateString()} às {new Date(v.data).toLocaleTimeString()}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xl font-bold text-slate-900">R$ {v.total.toFixed(2)}</p>
                <button className="text-blue-600 text-xs font-bold hover:underline">Marcar como Pago</button>
              </div>
            </div>
          ))}
          {fiados.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-slate-100 text-slate-300 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen size={32} />
              </div>
              <p className="text-slate-400 italic">Nenhum fiado pendente. Tudo em dia!</p>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [vendas, setVendas] = useState<Venda[]>([]);
  const [toast, setToast] = useState<{ message: string, type: 'success' | 'error' } | null>(null);

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  // Load initial data from localStorage
  useEffect(() => {
    const savedClientes = localStorage.getItem('agua_clientes');
    const savedProdutos = localStorage.getItem('agua_produtos');
    const savedVendas = localStorage.getItem('agua_vendas');

    if (savedClientes) setClientes(JSON.parse(savedClientes));
    if (savedProdutos) setProdutos(JSON.parse(savedProdutos));
    if (savedVendas) setVendas(JSON.parse(savedVendas));
  }, []);

  // Save data to localStorage
  useEffect(() => {
    localStorage.setItem('agua_clientes', JSON.stringify(clientes));
    localStorage.setItem('agua_produtos', JSON.stringify(produtos));
    localStorage.setItem('agua_vendas', JSON.stringify(vendas));
  }, [clientes, produtos, vendas]);

  const addCliente = (c: Omit<Cliente, 'id' | 'createdAt'>) => {
    const newCliente: Cliente = {
      ...c,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: Date.now()
    };
    setClientes([...clientes, newCliente]);
    showToast('Cliente cadastrado com sucesso!');
  };

  const addProduto = (p: Omit<Produto, 'id' | 'createdAt'>) => {
    const newProduto: Produto = {
      ...p,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: Date.now()
    };
    setProdutos([...produtos, newProduto]);
    showToast('Produto adicionado ao catálogo!');
  };

  const addVenda = (v: Omit<Venda, 'id' | 'data'>) => {
    const newVenda: Venda = {
      ...v,
      id: Math.random().toString(36).substr(2, 9),
      data: Date.now()
    };
    setVendas([...vendas, newVenda]);
    showToast('Venda realizada com sucesso!');
    setActiveTab('home');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'home': return <Dashboard clientes={clientes} produtos={produtos} vendas={vendas} />;
      case 'clientes': return <ClientesView clientes={clientes} onAdd={addCliente} />;
      case 'produtos': return <ProdutosView produtos={produtos} onAdd={addProduto} />;
      case 'vendas': return <VendasView clientes={clientes} produtos={produtos} onAdd={addVenda} />;
      case 'fiados': return <FiadosView vendas={vendas} />;
      default: return <Dashboard clientes={clientes} produtos={produtos} vendas={vendas} />;
    }
  };

  const getTitle = () => {
    switch (activeTab) {
      case 'home': return 'Painel de Controle';
      case 'clientes': return 'Gestão de Clientes';
      case 'produtos': return 'Catálogo de Produtos';
      case 'vendas': return 'Nova Venda';
      case 'fiados': return 'Controle de Fiados';
      default: return 'Distribuidora de Água';
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-white border-r border-slate-200 p-6 flex flex-col gap-8">
        <div className="flex items-center gap-3 px-2">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-200">
            <Droplets size={24} />
          </div>
          <h1 className="font-bold text-xl tracking-tight">Água Pro</h1>
        </div>

        <nav className="flex flex-col gap-2 flex-1">
          <SidebarItem icon={HomeIcon} label="Início" active={activeTab === 'home'} onClick={() => setActiveTab('home')} />
          <SidebarItem icon={Users} label="Clientes" active={activeTab === 'clientes'} onClick={() => setActiveTab('clientes')} />
          <SidebarItem icon={Package} label="Produtos" active={activeTab === 'produtos'} onClick={() => setActiveTab('produtos')} />
          <SidebarItem icon={ShoppingCart} label="Vendas" active={activeTab === 'vendas'} onClick={() => setActiveTab('vendas')} />
          <SidebarItem icon={BookOpen} label="Fiados" active={activeTab === 'fiados'} onClick={() => setActiveTab('fiados')} />
        </nav>

        <div className="mt-auto pt-6 border-t border-slate-100">
          <div className="flex items-center gap-3 px-2">
            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
              <Users size={16} />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900">Admin</p>
              <p className="text-[10px] text-slate-400">Distribuidora Central</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto bg-slate-50/50">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight">{getTitle()}</h2>
            <p className="text-slate-500 mt-1">Gerencie sua operação de forma simples e eficiente.</p>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                placeholder="Pesquisar..." 
                className="bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 w-full md:w-64"
              />
            </div>
          </div>
        </header>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>

        {/* Toast Notification */}
        <AnimatePresence>
          {toast && (
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className={cn(
                "fixed bottom-8 right-8 px-6 py-3 rounded-2xl shadow-2xl font-bold flex items-center gap-3 z-50",
                toast.type === 'success' ? "bg-emerald-600 text-white" : "bg-red-600 text-white"
              )}
            >
              <div className="bg-white/20 p-1 rounded-full">
                <Plus size={16} className={toast.type === 'success' ? "rotate-0" : "rotate-45"} />
              </div>
              {toast.message}
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
