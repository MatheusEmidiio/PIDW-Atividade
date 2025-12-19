import "./Beneficiarios.css";

function Beneficiarios() {
  const handleSubmit = (event) => {
    event.preventDefault();
    event.target.classList.add("was-validated");
  };

  return (
    <div className="prototype-screen active">
      <div className="screen-frame">
        <div className="screen-header">
          <h3>Cadastro de Beneficiários</h3>
        </div>

        <div className="screen-content">
          <form className="needs-validation" noValidate onSubmit={handleSubmit}>
            <h5 style={{ marginBottom: 20, color: "#1e3c72" }}>
              Dados Pessoais
            </h5>

            <div className="form-row">
              <div className="form-group">
                <label>Nome Completo:</label>
                <input type="text" required className="form-control" />
                <div className="invalid-feedback">
                  Por favor, informe o nome completo.
                </div>
              </div>

              <div className="form-group">
                <label>CPF:</label>
                <input type="text" required className="form-control" />
                <div className="invalid-feedback">Informe um CPF válido.</div>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>RG:</label>
                <input type="text" required className="form-control" />
                <div className="invalid-feedback">Informe um RG válido.</div>
              </div>

              <div className="form-group">
                <label>Data de Nascimento:</label>
                <input type="date" required className="form-control" />
              </div>
            </div>

            <h5 style={{ margin: "30px 0 20px", color: "#1e3c72" }}>
              Contato
            </h5>

            <div className="form-row">
              <div className="form-group">
                <label>Telefone:</label>
                <input type="tel" required className="form-control" />
              </div>

              <div className="form-group">
                <label>Email:</label>
                <input type="email" required className="form-control" />
              </div>
            </div>

            <h5 style={{ margin: "30px 0 20px", color: "#1e3c72" }}>
              Endereço
            </h5>

            <div className="form-row">
              <div className="form-group">
                <label>Endereço Completo:</label>
                <input type="text" required className="form-control" />
              </div>

              <div className="form-group">
                <label>Bairro:</label>
                <input type="text" required className="form-control" />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Cidade:</label>
                <input type="text" required className="form-control" />
              </div>

              <div className="form-group">
                <label>CEP:</label>
                <input type="text" required className="form-control" />
              </div>
            </div>

            <h5 style={{ margin: "30px 0 20px", color: "#1e3c72" }}>
              Contato de Emergência
            </h5>

            <div className="form-row">
              <div className="form-group">
                <label>Nome:</label>
                <input type="text" required className="form-control" />
              </div>

              <div className="form-group">
                <label>Telefone:</label>
                <input type="tel" required className="form-control" />
              </div>
            </div>

            <div className="form-group">
              <label>Necessidade Específica:</label>
              <textarea required className="form-control" rows="3"></textarea>
            </div>

            <div className="form-actions">
              <button type="button" className="btn-secondary">
                Cancelar
              </button>
              <button type="submit" className="btn-primary">
                Salvar Beneficiário
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Beneficiarios;
