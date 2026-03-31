import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Clientes from './pages/Clientes'
import Home from './pages/Home'
import Login from './pages/Login'
import RecuperarSenha from './pages/RecuperarSenha'
import Registro from './pages/Registro'
import VagaDetalhe from './pages/VagaDetalhe'
import Vagas from './pages/Vagas'
import MeuPerfil from './pages/MeuPerfil'
import MinhasCandidaturas from './pages/MinhasCandidaturas'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/clientes" element={<Clientes />} />
        <Route path="/login" element={<Login />} />
        <Route path="/recuperar-senha" element={<RecuperarSenha />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/vagas" element={<Vagas />} />
        <Route path="/vagas/:id" element={<VagaDetalhe />} />
        <Route path="/meu-perfil" element={<MeuPerfil />} />
        <Route path="/minhas-candidaturas" element={<MinhasCandidaturas />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
