interface ComingSoonNoticeProps {
  message?: string
}

export default function ComingSoonNotice({
  message = "Ce contenu sera disponible dès la sortie du jeu. Nous préparerons ce guide dans les premières heures de lancement.",
}: ComingSoonNoticeProps) {
  return (
    <div
      className="rounded-2xl p-6 mb-8 flex gap-5 items-start"
      style={{ background: 'var(--bg-card)', border: '1px solid rgba(240,192,64,0.25)' }}
    >
      <div
        className="flex-shrink-0 rounded-xl flex items-center justify-center"
        style={{ width: 44, height: 44, background: 'rgba(240,192,64,0.1)' }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--accent-gold)' }}>
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      </div>
      <div>
        <p className="font-black text-white mb-1.5" style={{ fontFamily: 'var(--font-barlow)', fontSize: '1.05rem' }}>
          Disponible dès la sortie
        </p>
        <p className="text-sm leading-relaxed" style={{ color: 'var(--text-warm)' }}>
          {message}
        </p>
        <p className="text-xs mt-2.5 font-semibold" style={{ color: 'var(--accent-gold)' }}>
          Sortie prévue : 19 novembre 2026 · PS5 &amp; Xbox Series X|S
        </p>
      </div>
    </div>
  )
}
