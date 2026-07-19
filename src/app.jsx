function App() {
    const [ip, setIp] = React.useState("");
    async function makeRequest(){
        const resposta = await fetch(`https://internetdb.shodan.io/${ip}`);
        alert(resposta.json());
    }
  return (
    <div>
      <h1>SIL - Simple IP Lookup</h1>
      <p>Digite um endereço de ip e clique em pesquisar</p>
      <input value={ip} onChange={(e) => setIp(e.target.value)} placeholder="Digite um IP" />
      <button onClick={makeRequest}>Pesquisar</button>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);