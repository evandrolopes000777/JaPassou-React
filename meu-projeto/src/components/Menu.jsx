const links = [
  { path: '/home', label: 'Início', icon: <><path d="M3 11l9-8 9 8v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1V11z" /></> },
  { path: '/rotas', label: 'Rotas', icon: <><rect x="3" y="4" width="18" height="13" rx="2" /><path d="M3 11h18M7 17v3M17 17v3" /><circle cx="7.5" cy="14" r=".6" /><circle cx="16.5" cy="14" r=".6" /></> },
  { path: null, label: 'Notificações', icon: <><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9M10.3 21a1.9 1.9 0 0 0 3.4 0" /></> },
  { path: null, label: 'Minha rotina', icon: <><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></> },
  { path: null, label: 'Meu perfil', icon: <><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></> },
]

function Menu({ active }) {
  return (
    <>
      <aside className="menu-lateral">
        <div className="menu-lateral__logo"><span>Já</span>Passou?</div>
        <nav aria-label="Menu principal">
          <a href="#/home" aria-current={active === '/home' ? 'page' : undefined}>Início</a>
          <a href="#" aria-disabled="true" onClick={(event) => event.preventDefault()}>Minha Rotina</a>
          <a href="#/rotas" aria-current={active === '/rotas' || active === '/acompanhamento' ? 'page' : undefined}>Rotas</a>
          <a href="#" aria-disabled="true" onClick={(event) => event.preventDefault()}>Notificações</a>
          <a href="#" aria-disabled="true" onClick={(event) => event.preventDefault()}>Meu Perfil</a>
        </nav>
        <a className="sair" href="#/login">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M4 3h9v4h-2V5H6v14h5v-2h2v4H4V3zm12 5 4 4-4 4v-3H9v-2h7V8z" /></svg>
          Sair
        </a>
      </aside>
      <nav className="menu-inferior" aria-label="Menu principal">
        {links.map(({ path, label, icon }) => (
          <a key={label} href={path ? `#${path}` : '#'} onClick={path ? undefined : (event) => event.preventDefault()} aria-disabled={path ? undefined : 'true'} aria-label={label} aria-current={
            (label === 'Início' && active === '/home') ||
              (label === 'Rotas' && (active === '/rotas' || active === '/acompanhamento'))
              ? 'page'
              : undefined
          }>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{icon}</svg>
          </a>
        ))}
      </nav>
    </>
  )
}

export default Menu
