function App() {
    function makeRequest(){
        alert('Testando função');
    }
  return (
    <div>
      <h1>SPS - Simple Port Scanner</h1>
      <p>Digite um endereço de ip e selecione as portas para scannear</p>
      <button onClick={makeRequest}>Scannear Portas</button>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);