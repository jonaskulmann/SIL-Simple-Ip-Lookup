function App() {
    const [ip, setIp] = React.useState("");
    const [dados, setDados] = React.useState(null);
    async function makeRequest(){
        const resposta = await fetch(`http://ip-api.com/json/${ip}`);
        const json = await resposta.json();
        setDados(json);
    }
  return (
    <div>
      <h1>SIL - Simple IP Lookup</h1>
      <p>Digite um endereço de ip e clique em pesquisar</p>
      <input value={ip} onChange={(e) => setIp(e.target.value)} placeholder="Digite um IP" />
      <button onClick={makeRequest}>Pesquisar</button>
    {dados && (
        <div className="resultado">
          <p><strong>IP:</strong> {dados.query}</p>
          <p><strong>País:</strong> {dados.country}</p>
          <p><strong>Região:</strong> {dados.regionName}</p>
          <p><strong>Cidade:</strong> {dados.city}</p>
          <p><strong>CEP:</strong> {dados.zip}</p>
          <p><strong>Latitude/Longitude:</strong> {dados.lat}, {dados.lon}</p>
          <p><strong>Timezone:</strong> {dados.timezone}</p>
          <p><strong>ISP:</strong> {dados.isp}</p>
          <p><strong>Organização:</strong> {dados.org}</p>
          <p><strong>ASN:</strong> {dados.as}</p>
        </div>
      )}
      </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);