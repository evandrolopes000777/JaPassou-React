const ROTAS = {
  centro: {
    nome: 'Rota Centro',
    motorista: 'Carlos',
    onibus: 'N° 02',
    saida: '12:10',
    atualizadoHa: '10s',
    tempoAteSeuPonto: '10 min',
    paradas: [
      { nome: 'Garagem', tipo: 'garagem', percorrida: true },
      { nome: 'Ônibus 02 agora', tipo: 'onibus', percorrida: true },
      { nome: 'Praça Ayrton Senna', tipo: 'seu-ponto' },
      { nome: 'Subway' },
      { nome: 'Rodoviária' },
      { nome: 'Pastel do Bob' },
      { nome: 'Jardim Leonor Martins Miranda' },
      { nome: 'IFBA - Campus Irecê', tipo: 'destino' },
    ],
  },
  'bairro-sul': {
    nome: 'Rota Bairro Sul',
    motorista: 'Marcos',
    onibus: 'N° 05',
    saida: '12:10',
    atualizadoHa: '—',
    tempoAteSeuPonto: '—',
    paradas: [
      { nome: 'Garagem', tipo: 'garagem', percorrida: true },
      { nome: 'Ônibus 05 agora', tipo: 'onibus' },
      { nome: 'Bairro Sul' },
      { nome: 'IFBA - Campus Irecê', tipo: 'destino' },
    ],
  },
  norte: {
    nome: 'Rota Norte',
    motorista: 'Ricardo',
    onibus: 'N° 07',
    saida: '17:30',
    atualizadoHa: '—',
    tempoAteSeuPonto: '—',
    paradas: [
      { nome: 'Garagem', tipo: 'garagem' },
      { nome: 'Bairro Norte' },
      { nome: 'IFBA - Campus Irecê', tipo: 'destino' },
    ],
  },
}

function TelaAcompanhamento({ route }) {
  const params = new URLSearchParams(route.split('?')[1] || '')
  const selected = ROTAS[params.get('rota')]

  if (!selected) {
    return (
      <main className="conteudo">
        <div className="pagina">
          <header className="topo">
            <a className="btn-voltar" href="#/rotas" aria-label="Voltar para rotas">
              ←
            </a>
            <h1 className="titulo-pagina">Rota não encontrada</h1>
          </header>
        </div>
      </main>
    )
  }

  return (
    <main className="conteudo">
      <div className="pagina">
        <header className="topo">
          <a className="btn-voltar" href="#/rotas" aria-label="Voltar para rotas">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </a>
          <h1 className="titulo-pagina">{selected.nome}</h1>
        </header>

        <div className="acompanhamento">
          <div className="mapa" role="img" aria-label="Mapa com a posição do ônibus">
            <div className="mapa__aviso">Mapa em tempo real em breve</div>
          </div>

          <div className="acompanhamento__lateral">
            <section className="painel" aria-label="Dados do ônibus">
              <dl className="dados">
                <div>
                  <dt>Motorista</dt>
                  <dd>{selected.motorista}</dd>
                </div>
                <div>
                  <dt>Ônibus</dt>
                  <dd>{selected.onibus}</dd>
                </div>
                <div>
                  <dt>Saída</dt>
                  <dd>{selected.saida}</dd>
                </div>
              </dl>
            </section>

            <section className="painel" aria-labelledby="titulo-itinerario">
              <h2 className="itinerario__titulo" id="titulo-itinerario">
                Itinerário e posição do ônibus
              </h2>
              <div className="itinerario">
                <div className="resumo">
                  <p>saiu {selected.saida}</p>
                  <p>há {selected.atualizadoHa}</p>
                  <p>seu ponto • {selected.tempoAteSeuPonto}</p>
                </div>
                <ol className="paradas">
                  {selected.paradas.map((stop, index) => (
                    <li
                      className={`parada${stop.tipo ? ` parada--${stop.tipo}` : ''}${stop.percorrida ? ' parada--percorrida' : ''}`}
                      key={`${stop.nome}-${index}`}
                    >
                      <span>{stop.nome}</span>
                      <span className="parada__ponto" aria-hidden="true" />
                    </li>
                  ))}
                </ol>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  )
}

export default TelaAcompanhamento
