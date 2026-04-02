import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/auth/Login'
import RecuperarSenha from './pages/auth/RecuperarSenha'
import Registro from './pages/auth/Registro'
import MeuPerfil from './pages/aluno/MeuPerfil'
import MinhasCandidaturas from './pages/aluno/MinhasCandidaturas'
import Empresa from './pages/empresa/Empresa'
import DashboardEmpresa from './pages/empresa/DashboardEmpresa'
import LoginEmpresa from './pages/empresa/LoginEmpresa'
import NovaVagaEmpresa from './pages/empresa/NovaVagaEmpresa'
import VagasEmpresa from './pages/empresa/VagasEmpresa'
import RegistroEmpresa from './pages/empresa/RegistroEmpresa'
import Home from './pages/public/Home'
import VagaDetalhe from './pages/vagas/VagaDetalhe'
import Vagas from './pages/vagas/Vagas'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/clientes" element={<Empresa />} />
        <Route path="/empresa" element={<Empresa />} />
        <Route path="/empresa/dashboard" element={<DashboardEmpresa />} />
        <Route path="/empresa/vagas" element={<VagasEmpresa />} />
        <Route path="/empresa/vagas/nova" element={<NovaVagaEmpresa />} />
        <Route path="/empresa/login" element={<LoginEmpresa />} />
        <Route path="/empresa/registro" element={<RegistroEmpresa />} />
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
