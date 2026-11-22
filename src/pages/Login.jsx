import { navigate } from '../router.js'

function Login() {
  function handleSubmit(event) {
    event.preventDefault()
    navigate('/home')
  }

  return (
    <main className="login-pagina d-flex align-items-center justify-content-center min-vh-100">
      <section className="login-painel w-100 d-flex flex-column justify-content-center">
        <header className="text-center">
          <h1 className="login-logo m-0" id="login-titulo">
            <span className="login-logo__ja">Já</span><span className="login-logo__nome">Passou?</span>
          </h1>
        </header>
        <form className="login-form" onSubmit={handleSubmit} aria-labelledby="login-titulo">
          <div className="mb-3">
            <label htmlFor="email" className="form-label login-label">E-mail</label>
            <input type="email" className="form-control login-campo" id="email" name="email" placeholder="seu@email.com" autoComplete="email" required />
          </div>
          <div className="mb-3">
            <label htmlFor="senha" className="form-label login-label">Senha</label>
            <input type="password" className="form-control login-campo" id="senha" name="senha" placeholder="********" autoComplete="current-password" required />
          </div>
          <p className="login-esqueci text-center"><a href="#/login" className="login-link">Esqueci Minha Senha</a></p>
          <div className="d-grid gap-3">
            <button type="submit" className="btn login-botao login-botao--principal">Entrar</button>
            <a href="#/cadastro" className="btn login-botao login-botao--secundario">Criar Conta</a>
          </div>
        </form>
      </section>
    </main>
  )
}

export default Login
