import { useEffect, useState } from 'react'
import Login from './pages/Login.jsx'
import Cadastro from './pages/Cadastro.jsx'
import Home from './pages/Home.jsx'
import TelaBusca from './pages/TelaBusca.jsx'
import TelaAcompanhamento from './pages/TelaAcompanhamento.jsx'
import Menu from './components/Menu.jsx'
import { getCurrentRoute } from './router.js'

function App() {
  const [route, setRoute] = useState(getCurrentRoute)
  const [styledPath, setStyledPath] = useState(null)

  useEffect(() => {
    const updateRoute = () => setRoute(getCurrentRoute())
    window.addEventListener('hashchange', updateRoute)
    return () => window.removeEventListener('hashchange', updateRoute)
  }, [])

  const path = route.split('?')[0]
  const isInternal = ['/home', '/rotas', '/acompanhamento'].includes(path)
  const pageStyles = {
    '/login': ['bootstrap', 'login.css'],
    '/cadastro': ['bootstrap', 'cadastro.css'],
    '/home': ['bootstrap', 'global.css', 'home.css'],
    '/rotas': ['global.css', 'layout-app.css', 'tela-busca.css'],
    '/acompanhamento': ['global.css', 'layout-app.css', 'tela-acompanhamento.css'],
  }

  useEffect(() => {
    let active = true
    document.body.classList.toggle('com-menu', isInternal)
    const pageCss = pageStyles[path] || pageStyles['/login']
    const cssFiles = [
      ...(pageCss.includes('bootstrap') ? ['bootstrap'] : []),
      'base.css',
      'componentes.css',
      ...pageCss.filter((file) => file !== 'bootstrap'),
    ]
    const links = cssFiles.map((file) => {
      const link = document.createElement('link')
      link.rel = 'stylesheet'
      link.href = file === 'bootstrap'
        ? 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css'
        : `/assets/css/${file}`
      link.dataset.appStylesheet = 'true'
      return link
    })

    Promise.all(links.map((link) => new Promise((resolve) => {
      link.onload = resolve
      link.onerror = resolve
      document.head.appendChild(link)
    }))).then(() => {
      if (active) setStyledPath(path)
    })

    return () => {
      active = false
      links.forEach((link) => link.remove())
      document.body.classList.remove('com-menu')
    }
  }, [path, isInternal])

  useEffect(() => {
    const titles = {
      '/login': 'Entrar | JáPassou?',
      '/cadastro': 'Criar Conta | JáPassou?',
      '/home': 'Início | JáPassou?',
      '/rotas': 'Rotas | JáPassou?',
      '/acompanhamento': 'Acompanhamento | JáPassou?',
    }
    document.title = titles[path] || 'JáPassou?'
    window.scrollTo(0, 0)
  }, [path])

  let page
  if (path === '/cadastro') page = <Cadastro />
  else if (path === '/home') page = <Home />
  else if (path === '/rotas') page = <TelaBusca />
  else if (path === '/acompanhamento') page = <TelaAcompanhamento route={route} />
  else page = <Login />

  return (
    <div className={isInternal ? 'app com-menu' : 'app'}>
      {styledPath === path ? <>
        {isInternal && <Menu active={path} />}
        {page}
      </> : <div className="tela-carregando" style={{ minHeight: '100vh', backgroundColor: path === '/login' ? '#2077da' : '#f4e7ae' }} aria-busy="true" aria-label="Carregando tela" />}
    </div>
  )
}

export default App
