const EMAILJS_SERVICE_ID = 'coloque a id so servico';
const EMAILJS_TEMPLATE_ID = 'coloque a id do template';
const EMAILJS_PUBLIC_KEY = 'coloque a sua keu publica';

function App() {
  const [ip, setIp] = React.useState("");
  const [dados, setDados] = React.useState(null);
  const [carregando, setCarregando] = React.useState(false);
  const [erro, setErro] = React.useState("");

  const [form, setForm] = React.useState({ nome: "", email: "", mensagem: "" });
  const [formEnviado, setFormEnviado] = React.useState(false);
  const [formErro, setFormErro] = React.useState("");
  const [enviando, setEnviando] = React.useState(false);

  window.emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });

  const [secaoAtiva, setSecaoAtiva] = React.useState("topo");

  React.useEffect(() => {
    const secoes = ["topo", "sobre"].map((id) => document.getElementById(id)).filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setSecaoAtiva(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -50% 0px" }
    );
    secoes.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  function irPara(id) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }

  async function makeRequest() {
    if (!ip.trim()) return;
    setCarregando(true);
    setErro("");
    setDados(null);
    try {
      const resposta = await fetch(`http://ip-api.com/json/${ip}`);
      const json = await resposta.json();
      if (json.status === "fail") {
        setErro(json.message === "invalid query" ? "Endereço de IP inválido." : "Não foi possível localizar esse IP.");
      } else {
        setDados(json);
      }
    } catch (e) {
      setErro("Falha na consulta. Verifique sua conexão e tente novamente.");
    } finally {
      setCarregando(false);
    }
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") makeRequest();
  }

  function handleFormChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleFormSubmit(e) {
    e.preventDefault();
    setFormErro("");

    if (!form.nome.trim() || !form.email.trim() || !form.mensagem.trim()) {
      setFormErro("Preencha todos os campos antes de enviar.");
      return;
    }
    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email);
    if (!emailValido) {
      setFormErro("Digite um e-mail válido.");
      return;
    }

    setEnviando(true);
    try {
      await window.emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
        from_name: form.nome,
        from_email: form.email,
        reply_to: form.email,
        message: form.mensagem,
      });
      setFormEnviado(true);
      setForm({ nome: "", email: "", mensagem: "" });
    } catch (err) {
      setFormErro("Falha ao enviar a mensagem. Tente novamente em instantes.");
    } finally {
      setEnviando(false);
    }
  }

  const campos = dados && [
    { k: "IP", v: dados.query, accent: true },
    { k: "País", v: dados.country },
    { k: "Região", v: dados.regionName },
    { k: "Cidade", v: dados.city },
    { k: "CEP", v: dados.zip || "—" },
    { k: "Lat / Lon", v: `${dados.lat}, ${dados.lon}` },
    { k: "Timezone", v: dados.timezone },
    { k: "ISP", v: dados.isp },
    { k: "Organização", v: dados.org || "—" },
    { k: "ASN", v: dados.as || "—" },
  ];

  return (
    <div className="layout">
      <nav className="sidenav">
        <span className="sidenav-title">nav.sh</span>
        <button
          className={`sidenav-item ${secaoAtiva === "topo" ? "ativo" : ""}`}
          onClick={() => irPara("topo")}
        >
          <span className="sidenav-dot"></span>
          Início
        </button>
        <button
          className={`sidenav-item ${secaoAtiva === "sobre" ? "ativo" : ""}`}
          onClick={() => irPara("sobre")}
        >
          <span className="sidenav-dot"></span>
          Sobre &amp; contato
        </button>
      </nav>

    <div className="page">
      <div id="topo" className="eyebrow">Sistema Online</div>
      <h1>SIL <span>/</span> Simple IP Lookup</h1>
      <p className="subtitle">
        Digite um endereço de IP para consultar localização, provedor e dados de rede em tempo real.
      </p>

      <div className="panel">
        <div className="panel-bar">
          <span className="dot"></span>
          <span className="dot"></span>
          <span className="dot"></span>
          <span className="label">consulta.sh</span>
        </div>

        <div className="query-row">
          <span className="prompt">$</span>
          <input
            value={ip}
            onChange={(e) => setIp(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="ex: 8.8.8.8"
            spellCheck="false"
            autoComplete="off"
          />
          <button onClick={makeRequest} disabled={carregando}>
            {carregando && <span className="spinner"></span>}
            {carregando ? "Buscando" : "Pesquisar"}
          </button>
        </div>

        {erro && <div className="erro">{erro}</div>}

        {carregando && (
          <div className="status-line">
            <span className="ping"></span>
            Resolvendo Endereço…
          </div>
        )}

        {dados && (
          <div className="resultado">
            {campos.map((c, i) => (
              <div className="field" key={c.k} style={{ animationDelay: `${i * 35}ms` }}>
                <span className="k">{c.k}</span>
                <span className={`v ${c.accent ? "mono-accent" : ""}`}>{c.v}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <section id="sobre" className="sobre">
        <div className="eyebrow">sobre o projeto</div>
        <h2>Sobre &amp; contato</h2>
        <p className="subtitle">
          O SIL é uma ferramenta simples de consulta de IP: localização, provedor e dados de rede em segundos.
          Tem dúvidas, sugestões ou quer colaborar? Mande uma mensagem.
        </p>

        <div className="panel">
          <div className="panel-bar">
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="label">contato.sh</span>
          </div>

          {formEnviado ? (
            <p className="cta-thanks form-thanks">
              Mensagem enviada! Obrigado pelo contato — responderemos em breve.
            </p>
          ) : (
            <form className="contato-form" onSubmit={handleFormSubmit}>
              <label className="campo">
                <span className="k">Nome</span>
                <input
                  type="text"
                  name="nome"
                  value={form.nome}
                  onChange={handleFormChange}
                  placeholder="Seu nome"
                  autoComplete="name"
                />
              </label>

              <label className="campo">
                <span className="k">E-mail</span>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleFormChange}
                  placeholder="voce@exemplo.com"
                  autoComplete="email"
                />
              </label>

              <label className="campo">
                <span className="k">Mensagem</span>
                <textarea
                  name="mensagem"
                  value={form.mensagem}
                  onChange={handleFormChange}
                  placeholder="Escreva sua mensagem…"
                  rows="4"
                ></textarea>
              </label>

              {formErro && <div className="erro">{formErro}</div>}

              <button type="submit" className="submit-button" disabled={enviando}>
                {enviando && <span className="spinner"></span>}
                {enviando ? "Enviando" : "Enviar mensagem"}
              </button>
            </form>
          )}
        </div>
      </section>

      <footer></footer>
    </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);