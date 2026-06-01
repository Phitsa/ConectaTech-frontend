import { useNavigate } from 'react-router-dom'
import { LogOut } from 'lucide-react'
import { useAuth } from '../context/useAuth'

function BotaoLogout() {
  const navigate = useNavigate()
  const { logout } = useAuth()

  function handleLogout() {
    logout()
    navigate('/')
  }

  return (
    <button
      onClick={handleLogout}
      className="flex items-center gap-2 rounded-full bg-unp-orange px-5 py-2 font-body text-sm font-semibold text-slate-900 transition hover:brightness-95"
    >
      <LogOut size={16} />
      <span className="hidden sm:inline">Sair</span>
    </button>
  )
}

export default BotaoLogout
