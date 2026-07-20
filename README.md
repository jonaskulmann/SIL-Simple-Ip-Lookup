<div align="center">

# SIL — Simple IP Lookup

**Consulte localização, provedor e dados de rede de qualquer endereço IP em tempo real.**

![Status](https://img.shields.io/badge/status-ativo-528DD9?style=flat-square)
![React](https://img.shields.io/badge/React-18.2-149ECA?style=flat-square&logo=react&logoColor=white)
![License](https://img.shields.io/badge/license-MIT-6b7d8f?style=flat-square)

</div>

---

## ✨ Sobre o projeto

O **SIL** é uma aplicação web minimalista que permite consultar informações detalhadas sobre qualquer endereço IP: país, região, cidade, provedor (ISP), organização, ASN, coordenadas e fuso horário — tudo em uma interface limpa, com estética de terminal.

A aplicação também conta com uma seção de contato integrada, que envia mensagens diretamente por e-mail usando **EmailJS**, sem necessidade de backend.

## 🚀 Funcionalidades

- 🔍 **Consulta de IP** — busca instantânea de dados de geolocalização e rede
- ⚡ **Feedback em tempo real** — estados de carregamento, erro e sucesso bem definidos
- 🧭 **Navegação inteligente** — destaca a seção visível na tela (via `IntersectionObserver`)
- ✉️ **Formulário de contato** — envio de mensagens com validação de campos e e-mail
- 🎨 **Interface estilo terminal de linux** — visual escuro, tipografia monoespaçada e microanimações

## 🛠️ Tecnologias utilizadas

| Tecnologia | Uso |
|---|---|
| [React 18](https://react.dev/) | Biblioteca de interface (via CDN, sem build) |
| [Babel Standalone](https://babeljs.io/) | Transpilação JSX no navegador |
| [EmailJS](https://www.emailjs.com/) | Envio de e-mails do formulário de contato |
| [ipwho.is](https://ipwho.is) | API pública de geolocalização de IP |
| CSS puro | Estilização, com fontes **Space Grotesk** e **JetBrains Mono** |

## 📁 Estrutura do projeto

```
.
├── index.html      # Ponto de entrada da aplicação
├── app.jsx         # Componente principal em React
├── style.css       # Estilos da interface
└── README.md
```

## ▶️ Como executar localmente

Como o projeto usa React via CDN e Babel Standalone, não é necessário nenhum processo de build.

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/SIL.git
cd SIL

# Sirva os arquivos com qualquer servidor estático, por exemplo:
npx serve .
# ou
python3 -m http.server
```

Depois, acesse `http://localhost:PORTA` no navegador.

## ⚙️ Configuração do formulário de contato

O envio de mensagens usa o [EmailJS](https://www.emailjs.com/). Antes de usar, configure suas próprias credenciais no início do `app.jsx`:

```js
const EMAILJS_SERVICE_ID = 'sua_service_id';
const EMAILJS_TEMPLATE_ID = 'sua_template_id';
const EMAILJS_PUBLIC_KEY = 'sua_public_key';
```

Você pode obter essas informações criando uma conta gratuita em [emailjs.com](https://www.emailjs.com/).

## 📌 Roadmap

- [ ] Adicionar suporte a IPv6
- [ ] Histórico de consultas recentes
- [ ] Tema claro/escuro alternável
- [ ] Adicionar Bundler

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para abrir uma *issue* ou enviar um *pull request*.

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas alterações (`git commit -m 'Adiciona nova feature'`)
4. Envie para o repositório remoto (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

---

<div align="center">
<sub>Feito por Jonas Kulmann</sub>
</div>
