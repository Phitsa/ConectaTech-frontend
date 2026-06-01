import { useNavigate } from 'react-router-dom'
import { LogOut } from 'lucide-react'

function BotaoLogout() {
    const navigate = useNavigate()

    function handleLogout() {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
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