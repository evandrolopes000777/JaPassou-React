import { navigate } from '../router.js'

function Cadastro() {
  function handleSubmit(event) {
    event.preventDefault()
    navigate('/login')
  }

  return (
    <main className="cadastro-pagina d-flex align-items-center justify-content-center min-vh-100">
      <section className="cadastro-painel w-100">
        <header>
          <a href="#/login" className="cadastro-voltar" aria-label="Voltar para o login">
            <img src="/assets/icon/SVGs/voltar.svg" alt="" width="24" height="24" />
          </a>
          <h1 className="cadastro-titulo" id="cadastro-titulo">Criar Conta</h1>
        </header>
        <form className="cadastro-form" onSubmit={handleSubmit} aria-labelledby="cadastro-titulo">
          <div className="mb-3"><label htmlFor="nome" className="form-label cadastro-label">Nome Completo</label><input type="text" className="form-control cadastro-campo" id="nome" name="nome" autoComplete="name" required /></div>
          <div className="mb-3"><label htmlFor="nascimento" className="form-label cadastro-label">Data de Nascimento</label><input type="date" className="form-control cadastro-campo cadastro-campo--data" id="nascimento" name="nascimento" autoComplete="bday" required /></div>
          <div className="mb-3"><label htmlFor="email-cadastro" className="form-label cadastro-label">E-Mail</label><input type="email" className="form-control cadastro-campo" id="email-cadastro" name="email" autoComplete="email" required /></div>
          <div className="mb-3"><label htmlFor="senha-cadastro" className="form-label cadastro-label">Senha</label><input type="password" className="form-control cadastro-campo" id="senha-cadastro" name="senha" autoComplete="new-password" required /></div>
          <div className="mb-3"><label htmlFor="confirmar-senha" className="form-label cadastro-label">Confirme sua senha</label><input type="password" className="form-control cadastro-campo" id="confirmar-senha" name="confirmar-senha" autoComplete="new-password" required /></div>
          <div className="mb-4"><label htmlFor="instituicao" className="form-label cadastro-label">Instituição de ensino</label><select className="form-select cadastro-campo cadastro-campo--select" id="instituicao" name="instituicao" required><option value="ifba-irece">IFBA - CAMPUS IRECÊ</option></select></div>
          <div className="cadastro-termos d-flex align-items-start gap-3 mb-4">
            <input type="checkbox" className="form-check-input cadastro-checkbox flex-shrink-0 m-0" id="termos" name="termos" required />
            <label htmlFor="termos" className="form-check-label cadastro-termos__texto">Li e aceito os Termos de uso e a Política de privacidade, inclusive o uso dos meus dados de localização e de comparecimento.</label>
          </div>
          <div className="d-grid"><button type="submit" className="btn cadastro-botao">Criar Conta</button></div>
        </form>
        <footer className="cadastro-rodape text-center"><p className="m-0">Já tenho conta <span aria-hidden="true">*</span> <a href="#/login" className="cadastro-link">Entrar</a></p></footer>
      </section>
    </main>
  )
}

export default Cadastro
