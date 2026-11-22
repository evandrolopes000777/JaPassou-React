import { useState } from 'react'

function Home() {
  const [presenca, setPresenca] = useState('vou-hoje')

  return (
    <main className="pagina-home">
      <img src="/assets/icon/SVGs/logo-fundo-amarelo.svg" alt="Já Passou?" className="logo" />
      <h1 className="oi_aluno">Oi, aluno!</h1>
      <h2>IFBA - Campus Irecê</h2>

      <div className="card">
        <div className="card-header">
          <p className="status">Em circulação</p>
          <h2 className="rota-nome">Rota Centro</h2>
        </div>
        <div className="estimativa-container">
          <div className="coluna-info"><p className="label-pequena">ESTIMATIVA</p><h1 className="valor-tempo">10 MIN</h1></div>
          <div className="coluna-info"><p className="label-pequena">ATÉ</p><p className="valor-destino">Ponto Ayrton Senna</p></div>
        </div>
        <div className="seletor-presenca-custom">
          <input type="radio" name="presenca" id="vou-hoje" checked={presenca === 'vou-hoje'} onChange={() => setPresenca('vou-hoje')} />
          <label className="opcao-btn" htmlFor="vou-hoje">Vou Hoje</label>
          <input type="radio" name="presenca" id="nao-vou" checked={presenca === 'nao-vou'} onChange={() => setPresenca('nao-vou')} />
          <label className="opcao-btn" htmlFor="nao-vou">Não Vou</label>
        </div>
        <p className="texto-aviso">Você pode mudar até a saída do ônibus (12:10).</p>
        <div className="rodape">
          <a className="botao ver-no-mapa" href="#/acompanhamento?rota=centro">Ver No Mapa</a>
          <button className="botao alterar" type="button" onClick={() => window.alert(`Presença selecionada: ${presenca === 'vou-hoje' ? 'Vou Hoje' : 'Não Vou'}`)}>Alterar Só Hoje</button>
        </div>
      </div>

      <section className="card2" aria-labelledby="mural-titulo">
        <div className="linha-titulo-card2"><h1 className="titulo-card2" id="mural-titulo">Mural de Avisos</h1><p className="ver-todos coisas-comuns"><u>Ver Todos</u></p></div>
        <h2 className="importante coisas-comuns">IMPORTANTE</h2>
        <div className="linha-titulo-card2"><p className="destaque coisas-comuns">Rota Centro muda na sexta *</p><p className="secundario coisas-comuns">Obras na Av. Principal</p></div>
        <hr className="linha" />
        <h2 className="segurança coisas-comuns">SEGURANÇA</h2>
        <div className="linha-titulo-card2"><p className="destaque coisas-comuns">Uso Obrigatório de cinto durante todo o trajeto.</p></div>
        <hr className="linha" />
        <h2 className="comunicação coisas-comuns">COMUNICAÇÃO</h2>
        <div className="linha-titulo-card2"><p className="destaque coisas-comuns">Nova Funcionalidade *</p><p className="secundario coisas-comuns">confirme “Vou hoje” pelo app</p></div>
      </section>
    </main>
  )
}

export default Home
