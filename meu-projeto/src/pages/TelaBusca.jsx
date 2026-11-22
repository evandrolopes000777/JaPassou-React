import { useMemo, useState } from 'react'

const ROTAS = [
  { id: 'centro', nome: 'Rota Centro', status: 'circulacao', instituicao: 'ifba-irece', detalhe: 'Praça → Campus · saiu 12:10', detalheFavorita: 'Ponto padrão: Ayrton Senna' },
  { id: 'bairro-sul', nome: 'Rota Bairro Sul', status: 'atrasado', instituicao: 'ifba-irece', detalhe: 'Partida prevista 12:10', detalheFavorita: 'Partida prevista 12:10' },
  { id: 'norte', nome: 'Rota Norte', status: 'parado', instituicao: 'ifba-irece', detalhe: 'Partida prevista 17:30', detalheFavorita: 'Partida prevista 17:30' },
]
const STATUS = {
  circulacao: ['Em Circulação', 'chip--circulacao'],
  atrasado: ['Atrasado', 'chip--atrasado'],
  parado: ['Ainda não saiu', 'chip--parado'],
}
const FAVORITOS_KEY = 'japassou:rotas-favoritas'

function loadFavorites() {
  try {
    const saved = JSON.parse(localStorage.getItem(FAVORITOS_KEY))
    return Array.isArray(saved) ? saved : ['centro', 'norte']
  } catch {
    return ['centro', 'norte']
  }
}

function normalize(text) {
  return text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
}

function StatusChip({ status }) {
  const [label, className] = STATUS[status] || STATUS.parado
  return <span className={`chip ${className}`}>{label}</span>
}

function TelaBusca() {
  const [tab, setTab] = useState('buscar')
  const [search, setSearch] = useState('')
  const [favorites, setFavorites] = useState(loadFavorites)

  function toggleFavorite(id) {
    setFavorites((current) => {
      const next = current.includes(id) ? current.filter((item) => item !== id) : [...current, id]
      try { localStorage.setItem(FAVORITOS_KEY, JSON.stringify(next)) } catch { /* armazenamento opcional */ }
      return next
    })
  }

  const filteredRoutes = useMemo(() => ROTAS.filter((route) => normalize(`${route.nome} ${route.detalhe}`).includes(normalize(search.trim()))), [search])
  const favoriteRoutes = ROTAS.filter((route) => favorites.includes(route.id))

  return (
    <main className="conteudo"><div className="pagina">
      <header className="topo">
        <button className="btn-voltar" type="button" onClick={() => { window.location.hash = '#/home' }} aria-label="Voltar para início">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
        </button>
        <h1 className="titulo-pagina">Rotas</h1>
      </header>
      <div className="controles">
        <div className="abas" role="tablist" aria-label="Seção de rotas">
          <button className="aba" role="tab" aria-selected={tab === 'buscar'} type="button" onClick={() => setTab('buscar')}>Buscar</button>
          <button className="aba" role="tab" aria-selected={tab === 'favoritas'} type="button" onClick={() => setTab('favoritas')}>Favoritas ({favorites.length})</button>
        </div>
        {tab === 'buscar' && <div className="filtros">
          <div className="campo"><label htmlFor="filtro-instituicao">Instituição de ensino</label><select id="filtro-instituicao" defaultValue="ifba-irece"><option value="ifba-irece">IFBA - CAMPUS IRECÊ</option></select></div>
          <div className="campo"><label htmlFor="filtro-busca">Pesquisar Rota</label><input type="search" id="filtro-busca" placeholder="Nome da rota ou bairro" autoComplete="off" value={search} onChange={(event) => setSearch(event.target.value)} /></div>
        </div>}
      </div>

      {tab === 'buscar' ? <section role="tabpanel" aria-label="Resultados da busca"><ul className="lista">
        {filteredRoutes.length ? filteredRoutes.map((route) => {
          const favorite = favorites.includes(route.id)
          return <li className="card" key={route.id}>
            <div className="card__info"><StatusChip status={route.status} /><h2 className="card__nome">{route.nome}</h2><p className="card__detalhe">{route.detalhe}</p></div>
            <div className="card__acoes">
              <button className="btn-icone btn-favorito" type="button" aria-pressed={favorite} aria-label={`${favorite ? 'Remover dos' : 'Adicionar aos'} favoritos: ${route.nome}`} onClick={() => toggleFavorite(route.id)}><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 3h12a1 1 0 0 1 1 1v17l-7-4-7 4V4a1 1 0 0 1 1-1z" /></svg></button>
              <a className="btn-icone" href={`#/acompanhamento?rota=${encodeURIComponent(route.id)}`} aria-label={`Ver detalhes: ${route.nome}`}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true"><path d="M9 5l7 7-7 7" /></svg></a>
            </div>
          </li>
        }) : <li className="vazio">Nenhuma rota encontrada.</li>}
      </ul></section> : <section role="tabpanel" aria-label="Rotas favoritas"><ul className="lista">
        {favoriteRoutes.length ? favoriteRoutes.map((route) => <li className="card card--favorita" key={route.id}>
          <div className="card__info"><StatusChip status={route.status} /><h2 className="card__nome">{route.nome}</h2><p className="card__detalhe">{route.detalheFavorita}</p></div>
          <div className="botoes"><a className="btn btn--primario" href={`#/acompanhamento?rota=${encodeURIComponent(route.id)}`}>Ver ao vivo</a><button className="btn btn--contorno" type="button" onClick={() => toggleFavorite(route.id)}>Remover</button></div>
        </li>) : <li className="vazio">Você ainda não tem rotas favoritas.</li>}
      </ul></section>}
    </div></main>
  )
}

export default TelaBusca
