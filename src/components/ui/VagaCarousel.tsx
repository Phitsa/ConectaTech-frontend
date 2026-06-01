import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ChevronLeft, ChevronRight, MapPin } from 'lucide-react'
import type { Vaga } from '../../services/vagas'

function usePerView() {
  const [perView, setPerView] = useState(1)

  useEffect(() => {
    const calcular = () => {
      const largura = window.innerWidth
      setPerView(largura >= 1024 ? 3 : largura >= 640 ? 2 : 1)
    }
    calcular()
    window.addEventListener('resize', calcular)
    return () => window.removeEventListener('resize', calcular)
  }, [])

  return perView
}

type VagaCarouselProps = {
  vagas: Vaga[]
}

export function VagaCarousel({ vagas }: VagaCarouselProps) {
  const perView = usePerView()
  const [index, setIndex] = useState(0)
  const [pausado, setPausado] = useState(false)

  const maxIndex = Math.max(0, vagas.length - perView)
  const indexAtual = Math.min(index, maxIndex)
  const temControles = vagas.length > perView

  useEffect(() => {
    if (pausado || !temControles) return
    const intervalo = setInterval(() => {
      setIndex((atual) => (atual >= maxIndex ? 0 : atual + 1))
    }, 3500)
    return () => clearInterval(intervalo)
  }, [pausado, temControles, maxIndex])

  if (vagas.length === 0) return null

  const avancar = () => setIndex((atual) => (atual >= maxIndex ? 0 : atual + 1))
  const voltar = () => setIndex((atual) => (atual <= 0 ? maxIndex : atual - 1))

  return (
    <div
      className="relative"
      onMouseEnter={() => setPausado(true)}
      onMouseLeave={() => setPausado(false)}
    >
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${indexAtual * (100 / perView)}%)` }}
        >
          {vagas.map((vaga) => (
            <div
              key={vaga.id}
              className="shrink-0 px-2.5 pb-2"
              style={{ flexBasis: `${100 / perView}%` }}
            >
              <article className="group flex h-full flex-col rounded-2xl border border-unp-blue/10 bg-white p-6 shadow-soft transition duration-300 ease-out hover:-translate-y-1.5 hover:border-unp-blue/30 hover:shadow-lg">
                {vaga.fonte && (
                  <span className="inline-flex w-fit rounded-full bg-unp-blue/10 px-3 py-1 font-body text-xs font-semibold uppercase tracking-wide text-unp-blue transition group-hover:bg-unp-blue group-hover:text-white">
                    {vaga.fonte}
                  </span>
                )}
                <h4 className="mt-3 font-heading text-xl font-bold text-unp-blue">{vaga.titulo}</h4>
                <p className="mt-1 font-body text-slate-700">{vaga.empresa}</p>
                {vaga.descricao && (
                  <p className="mt-3 line-clamp-3 font-body text-sm text-slate-600">{vaga.descricao}</p>
                )}
                {vaga.localizacao && (
                  <div className="mt-4 flex items-center gap-1.5 font-body text-sm text-slate-600">
                    <MapPin size={15} className="text-unp-orange" />
                    {vaga.localizacao}
                  </div>
                )}
                <Link
                  to={`/vagas/${vaga.id}`}
                  className="mt-6 inline-flex items-center justify-center gap-2 rounded-xl bg-unp-blue px-4 py-2.5 font-body font-semibold text-white transition hover:bg-unp-blueDark"
                >
                  Candidatar-se
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </Link>
              </article>
            </div>
          ))}
        </div>
      </div>

      {temControles && (
        <>
          <button
            type="button"
            onClick={voltar}
            aria-label="Vaga anterior"
            className="absolute -left-3 top-1/2 hidden -translate-y-1/2 rounded-full border border-unp-blue/15 bg-white p-2.5 text-unp-blue shadow-soft transition hover:scale-110 hover:bg-unp-blue hover:text-white md:block"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            type="button"
            onClick={avancar}
            aria-label="Proxima vaga"
            className="absolute -right-3 top-1/2 hidden -translate-y-1/2 rounded-full border border-unp-blue/15 bg-white p-2.5 text-unp-blue shadow-soft transition hover:scale-110 hover:bg-unp-blue hover:text-white md:block"
          >
            <ChevronRight size={20} />
          </button>

          <div className="mt-6 flex justify-center gap-2">
            {Array.from({ length: maxIndex + 1 }, (_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Ir para o grupo ${i + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === indexAtual ? 'w-7 bg-unp-orange' : 'w-2 bg-unp-blue/25 hover:bg-unp-blue/50'
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
