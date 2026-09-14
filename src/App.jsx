import { useEffect, useState } from 'react'
import { HashRouter, Routes, Route, NavLink, useNavigate } from 'react-router-dom'

const WORDS = [
  { en: 'Hello', uz: 'Salom', tr: '/heˈloʊ/' },
  { en: 'Thanks', uz: 'Rahmat', tr: '/θæŋks/' },
  { en: 'Please', uz: 'Iltimos', tr: '/pliːz/' },
  { en: 'Friend', uz: 'Do\'st', tr: '/frend/' },
  { en: 'Family', uz: 'Oila', tr: '/ˈfæməli/' },
  { en: 'Mother', uz: 'Ona', tr: '/ˈmʌðər/' },
  { en: 'Father', uz: 'Ota', tr: '/ˈfɑːðər/' },
  { en: 'Home', uz: 'Uy', tr: '/hoʊm/' },
  { en: 'School', uz: 'Maktab', tr: '/skuːl/' },
  { en: 'Book', uz: 'Kitob', tr: '/bʊk/' },
  { en: 'Food', uz: 'Ovqat', tr: '/fuːd/' },
  { en: 'Water', uz: 'Suv', tr: '/ˈwɔːtər/' },
  { en: 'Car', uz: 'Mashina', tr: '/kɑːr/' },
  { en: 'Work', uz: 'Ish', tr: '/wɜːrk/' },
  { en: 'Money', uz: 'Pul', tr: '/ˈmʌni/' },
  { en: 'Time', uz: 'Vaqt', tr: '/taɪm/' },
  { en: 'Day', uz: 'Kun', tr: '/deɪ/' },
  { en: 'Night', uz: 'Tun', tr: '/naɪt/' },
  { en: 'Morning', uz: 'Ertalab', tr: '/ˈmɔːrnɪŋ/' },
  { en: 'Sun', uz: 'Quyosh', tr: '/sʌn/' },
  { en: 'Moon', uz: 'Oy', tr: '/muːn/' },
  { en: 'Tree', uz: 'Daraxt', tr: '/triː/' },
  { en: 'Flower', uz: 'Gul', tr: '/ˈflaʊər/' },
  { en: 'Dog', uz: 'It', tr: '/dɔːɡ/' },
  { en: 'Cat', uz: 'Mushuk', tr: '/kæt/' },
  { en: 'Bird', uz: 'Qush', tr: '/bɜːrd/' },
  { en: 'Happy', uz: 'Baxtli', tr: '/ˈhæpi/' },
  { en: 'Sad', uz: 'G\'amgin', tr: '/sæd/' },
  { en: 'Beautiful', uz: 'Go\'zal', tr: '/ˈbjuːtɪfl/' },
  { en: 'Easy', uz: 'Oson', tr: '/ˈiːzi/' },
  { en: 'Strong', uz: 'Kuchli', tr: '/strɔːŋ/' },
  { en: 'Fast', uz: 'Tez', tr: '/fæst/' },
  { en: 'Watch', uz: 'Tomosha qilmoq', tr: '/wɑːtʃ/' },
  { en: 'Listen', uz: 'Tinglamoq', tr: '/ˈlɪsən/' },
  { en: 'Read', uz: 'O\'qimoq', tr: '/riːd/' },
  { en: 'Write', uz: 'Yozmoq', tr: '/raɪt/' },
  { en: 'Speak', uz: 'Gapirmoq', tr: '/spiːk/' },
  { en: 'Learn', uz: 'O\'rganmoq', tr: '/lɜːrn/' },
  { en: 'Play', uz: 'O\'ynamoq', tr: '/pleɪ/' },
  { en: 'Study', uz: 'O\'qish/talim', tr: '/ˈstʌdi/' },
  { en: 'Travel', uz: 'Sayohat qilmoq', tr: '/ˈtrævl/' },
  { en: 'Visit', uz: 'Tashrif buyurmoq', tr: '/ˈvɪzɪt/' },
  { en: 'Cook', uz: 'Ovqat pishirmoq', tr: '/kʊk/' },
  { en: 'Buy', uz: 'Sotib olmoq', tr: '/baɪ/' },
  { en: 'Open', uz: 'Ochmoq', tr: '/ˈoʊpən/' },
  { en: 'Close', uz: 'Yopmoq', tr: '/kloʊz/' },
  { en: 'City', uz: 'Shahar', tr: '/ˈsɪti/' },
  { en: 'Country', uz: 'Mamlakat', tr: '/ˈkʌntri/' },
  { en: 'Weather', uz: 'Ob-havo', tr: '/ˈweðər/' },
  { en: 'Important', uz: 'Muhim', tr: '/ɪmˈpɔːrtnt/' },
  { en: 'Interesting', uz: 'Qiziqarli', tr: '/ˈɪntrəstɪŋ/' },
  { en: 'Delicious', uz: 'Mazali', tr: '/dɪˈlɪʃəs/' },
  { en: 'Wait', uz: 'Kutmoq', tr: '/weɪt/' },
  { en: 'Remember', uz: 'Eslab qolmoq', tr: '/rɪˈmembər/' },
  { en: 'Love', uz: 'Sevmoq', tr: '/lʌv/' },
  { en: 'Story', uz: 'Hikoya', tr: '/ˈstɔːri/' },
  { en: 'Music', uz: 'Musiqa', tr: '/ˈmjuːzɪk/' },
  { en: 'Health', uz: 'Salomatlik', tr: '/helθ/' },
  { en: 'Friend', uz: 'O\'rtoq', tr: '/frend/' },
]

const CATEGORIES = ['Barchasi', 'Oson', 'O\'rta', 'Qiyin']

function speak(word) {
  if (!('speechSynthesis' in window)) return
  window.speechSynthesis.cancel()
  const u = new SpeechSynthesisUtterance(word)
  u.lang = 'en-US'
  u.rate = 0.9
  window.speechSynthesis.speak(u)
}

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function Header() {
  return (
    <header className="header">
      <nav className="nav">
        <NavLink to="/" className="brand">
          <span className="brand-icon">🗣️</span>
          <span>English Speaker</span>
        </NavLink>
        <div className="nav-links">
          <NavLink to="/" end>Bosh sahifa</NavLink>
          <NavLink to="/sozlar">So'zlar</NavLink>
          <NavLink to="/mashq">Mashq</NavLink>
        </div>
      </nav>
    </header>
  )
}

function Home() {
  const navigate = useNavigate()
  return (
    <section className="hero">
      <div className="hero-badge">🇬🇧 Ingliz tilini o'rganing</div>
      <h1 className="hero-title">
        Ingliz tilida <span>gapirishni</span> mashq qiling
      </h1>
      <p className="hero-sub">
        So'zlar, talaffuz va interaktiv mashqlar — hammasi bir joyda.
      </p>
      <div className="hero-actions">
        <button className="btn btn-primary" onClick={() => navigate('/sozlar')}>
          So'zlarni o'rganish →
        </button>
        <button className="btn btn-ghost" onClick={() => navigate('/mashq')}>
          Mashq qilish
        </button>
      </div>
      <div className="features">
        <div className="feature-card">
          <div className="feature-icon">🃏</div>
          <h3>So'z kartochkalari</h3>
          <p>Bosib aylantiring, tarjimani ko'ring va oson yodlang.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">🔊</div>
          <h3>To'g'ri talaffuz</h3>
          <p>Har so'zni ovoz bilan tinglang, to'g'ri ayting.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">🎯</div>
          <h3>Interaktiv mashq</h3>
          <p>Test yeching, ball to'plang va natijani ko'ring.</p>
        </div>
      </div>
      <p className="hero-count">{WORDS.length} ta mashhur inglizcha so'z kiritilgan</p>
    </section>
  )
}

function Flashcard({ word, onFlip }) {
  const [flipped, setFlipped] = useState(false)
  return (
    <div className={`card ${flipped ? 'flipped' : ''}`} onClick={(e) => {
      if (e.target.closest('.speak-btn')) return
      setFlipped((f) => !f)
    }}>
      <div className="card-inner">
        <div className="card-face card-front">
          <span className="card-en">{word.en}</span>
          <span className="card-tr">{word.tr}</span>
          <button
            className="speak-btn"
            title="Talaffuzni eshitish"
            onClick={(e) => { e.stopPropagation(); speak(word.en) }}
          >
            🔊
          </button>
        </div>
        <div className="card-face card-back">
          <span className="card-uz">{word.uz}</span>
          <button
            className="speak-btn"
            title="Talaffuzni eshitish"
            onClick={(e) => { e.stopPropagation(); speak(word.en) }}
          >
            🔊
          </button>
        </div>
      </div>
    </div>
  )
}

function Words() {
  const [cat, setCat] = useState('Barchasi')
  const list = cat === 'Barchasi'
    ? WORDS
    : WORDS.filter((w) => (cat === 'Oson' ? ['Hello','Thanks','Please','Home','Book','Food','Water','Day','Night','Sun','Dog','Cat','Easy','Fast','Play','Open','Close','Wait'].includes(w.en)
      : cat === 'Qiyin' ? ['Beautiful','Important','Interesting','Delicious','Remember','Health','Study','Travel'].includes(w.en)
      : !['Hello','Thanks','Please','Home','Book','Food','Water','Day','Night','Sun','Dog','Cat','Easy','Fast','Play','Open','Close','Wait','Beautiful','Important','Interesting','Delicious','Remember','Health','Study','Travel'].includes(w.en)))

  return (
    <section className="page">
      <div className="page-head">
        <h2>So'z kartochkalari</h2>
        <p>Kartochkani bosib tarjimasini ko'ring, 🔊 tugmasi bilan talaffuzini eshiting.</p>
      </div>
      <div className="tabs">
        {CATEGORIES.map((c) => (
          <button
            key={c}
            className={`tab ${cat === c ? 'active' : ''}`}
            onClick={() => setCat(c)}
          >
            {c}
          </button>
        ))}
      </div>
      <div className="cards-grid">
        {list.map((w) => (
          <Flashcard key={w.en + w.uz} word={w} />
        ))}
      </div>
    </section>
  )
}

const QUIZ_SIZE = 10

function Quiz() {
  const [questions, setQuestions] = useState([])
  const [idx, setIdx] = useState(0)
  const [score, setScore] = useState(0)
  const [done, setDone] = useState(false)
  const [selected, setSelected] = useState(null)
  const [best, setBest] = useState(() => Number(localStorage.getItem('es_best') || 0))

  const start = () => {
    const qs = shuffle(WORDS)
      .slice(0, QUIZ_SIZE)
      .map((w) => {
        const options = shuffle([w, ...shuffle(WORDS).filter((x) => x.uz !== w.uz).slice(0, 3)])
        return { word: w, options: shuffle(options) }
      })
    setQuestions(qs)
    setIdx(0)
    setScore(0)
    setDone(false)
    setSelected(null)
  }

  useEffect(() => {
    start()
  }, [])

  const answer = (opt) => {
    if (selected) return
    setSelected(opt)
    if (opt === questions[idx].word) {
      const s = score + 1
      setScore(s)
      if (s > best) {
        setBest(s)
        localStorage.setItem('es_best', String(s))
      }
    }
  }

  const next = () => {
    if (idx + 1 >= questions.length) {
      setDone(true)
    } else {
      setIdx(idx + 1)
      setSelected(null)
    }
  }

  const restart = () => {
    start()
    const b = localStorage.getItem('es_best')
    if (b) setBest(Number(b))
  }

  if (done) {
    return (
      <section className="page">
        <div className="quiz-results">
          <div className="result-icon">🏆</div>
          <h2>Mashq tugadi!</h2>
          <p className="result-score">
            Natijangiz: <strong>{score} / {questions.length}</strong>
          </p>
          <p className="result-best">
            {score >= best && score > 0 ? 'Yangi rekord! 🎉 ' : ''}Umumiy eng yaxshi natija: {best}
          </p>
          <div className="hero-actions">
            <button className="btn btn-primary" onClick={restart}>Yana mashq qilish</button>
          </div>
        </div>
      </section>
    )
  }

  if (questions.length === 0) return null

  const q = questions[idx]

  return (
    <section className="page">
      <div className="page-head">
        <h2>Mashq</h2>
        <p className="quiz-progress">
          {idx + 1} / {questions.length} &nbsp;•&nbsp; Ball: {score}
        </p>
      </div>
      <div className="quiz-box">
        <div className="quiz-question">
          <button className="speak-btn big" title="Eshitish" onClick={() => speak(q.word.en)}>🔊</button>
          <span>{q.word.en}</span>
        </div>
        <p className="quiz-hint">To'g'ri tarjimasini tanlang:</p>
        <div className="quiz-options">
          {q.options.map((o) => {
            const isCorrect = o === q.word
            const isSelected = selected === o
            let cls = 'option'
            if (selected) {
              cls += isCorrect ? ' correct' : isSelected ? ' wrong' : ''
            }
            return (
              <button
                key={o.uz}
                className={cls}
                disabled={!!selected}
                onClick={() => answer(o)}
              >
                {o.uz}
              </button>
            )
          })}
        </div>
        {selected && (
          <div className={`quiz-feedback ${selected === q.word ? 'good' : 'bad'}`}>
            {selected === q.word
              ? 'To\'g\'ri! 🎉'
              : `Noto'g'ri. To'g'ri javob: ${q.word.uz}`}
            <button className="btn btn-primary small" onClick={next}>
              {idx + 1 >= questions.length ? 'Natijani ko\'rish' : 'Keyingisi →'}
            </button>
          </div>
        )}
      </div>
    </section>
  )
}

function App() {
  return (
    <HashRouter>
      <div className="app">
        <Header />
        <main className="main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sozlar" element={<Words />} />
            <Route path="/mashq" element={<Quiz />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </main>
        <footer className="footer">
          <p>English Speaker © 2026 — Ingliz tilida gapirishni mashq qiling 🇬🇧</p>
        </footer>
      </div>
    </HashRouter>
  )
}

export default App