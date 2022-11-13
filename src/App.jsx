import './App.css'

import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import MiApi from './components/MiApi.jsx'

function App() {
  const titulo = "Consumo de Apis con React"


  return (
    <main className="App">
      <Header titulo={titulo}></Header>
      <div>
        <MiApi></MiApi>
      </div>

      <Footer></Footer>
    </main>
  )
}

export default App
