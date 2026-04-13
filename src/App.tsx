import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/aluno/auth/Login'
import RecuperarSenha from './pages/aluno/auth/RecuperarSenha'
import Registro from './pages/aluno/auth/Registro'
import MeuPerfil from './pages/aluno/MeuPerfil'
import MinhasCandidaturas from './pages/aluno/MinhasCandidaturas'
import Empresa from './pages/empresa/Empresa'
import DashboardEmpresa from './pages/empresa/DashboardEmpresa'
import LoginEmpresa from './pages/empresa/auth/LoginEmpresa'
import NovaVagaEmpresa from './pages/empresa/NovaVagaEmpresa'
import VagasEmpresa from './pages/empresa/VagasEmpresa'
import RegistroEmpresa from './pages/empresa/auth/RegistroEmpresa'
import LoginRedator from './pages/redator/auth/Login'
import RedatorHome from './pages/redator/RedatorHome'
import RedatorVagas from './pages/redator/vagas/Vagas'
import NovaVagaRedator from './pages/redator/vagas/NovaVaga'
import RedatorEmpresas from './pages/redator/empresas/Empresas'
import NovaEmpresaRedator from './pages/redator/empresas/NovaEmpresa'
import Home from './pages/public/Home'
import VagaDetalhe from './pages/aluno/vagas/VagaDetalhe'
import Vagas from './pages/aluno/vagas/Vagas'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/clientes" element={<Empresa />} />
        <Route path="/login" element={<Login />} />
        <Route path="/recuperar-senha" element={<RecuperarSenha />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/vagas" element={<Vagas />} />
        <Route path="/vagas/:id" element={<VagaDetalhe />} />
        <Route path="/meu-perfil" element={<MeuPerfil />} />
        <Route path="/minhas-candidaturas" element={<MinhasCandidaturas />} />

        <Route path="/empresa" element={<Empresa />} />
        <Route path="/empresa/dashboard" element={<DashboardEmpresa />} />
        <Route path="/empresa/vagas" element={<VagasEmpresa />} />
        <Route path="/empresa/vagas/nova" element={<NovaVagaEmpresa />} />
        <Route path="/empresa/login" element={<LoginEmpresa />} />
        <Route path="/empresa/registro" element={<RegistroEmpresa />} />

        <Route path="/redator" element={<RedatorHome />} />
        <Route path="/redator/vagas" element={<RedatorVagas />} />
        <Route path="/redator/vagas/nova" element={<NovaVagaRedator />} />
        <Route path="/redator/empresas" element={<RedatorEmpresas />} />
        <Route path="/redator/empresas/nova" element={<NovaEmpresaRedator />} />
        <Route path="/redator/login" element={<LoginRedator />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
