import { useEffect, useState } from 'react'
import { HashRouter, Routes, Route, NavLink, useNavigate } from 'react-router-dom'

const WORDS = [
  { en: 'Hello', uz: 'Salom', tr: '/heˈloʊ/', dif: 'easy' },
  { en: 'Thanks', uz: 'Rahmat', tr: '/θæŋks/', dif: 'easy' },
  { en: 'Please', uz: 'Iltimos', tr: '/pliːz/', dif: 'easy' },
  { en: 'Friend', uz: 'Do\'st', tr: '/frend/', dif: 'easy' },
  { en: 'Family', uz: 'Oila', tr: '/ˈfæməli/', dif: 'easy' },
  { en: 'Mother', uz: 'Ona', tr: '/ˈmʌðər/', dif: 'easy' },
  { en: 'Father', uz: 'Ota', tr: '/ˈfɑːðər/', dif: 'easy' },
  { en: 'Home', uz: 'Uy', tr: '/hoʊm/', dif: 'easy' },
  { en: 'School', uz: 'Maktab', tr: '/skuːl/', dif: 'easy' },
  { en: 'Book', uz: 'Kitob', tr: '/bʊk/', dif: 'easy' },
  { en: 'Food', uz: 'Ovqat', tr: '/fuːd/', dif: 'easy' },
  { en: 'Water', uz: 'Suv', tr: '/ˈwɔːtər/', dif: 'easy' },
  { en: 'Car', uz: 'Mashina', tr: '/kɑːr/', dif: 'easy' },
  { en: 'Work', uz: 'Ish', tr: '/wɜːrk/', dif: 'easy' },
  { en: 'Money', uz: 'Pul', tr: '/ˈmʌni/', dif: 'easy' },
  { en: 'Time', uz: 'Vaqt', tr: '/taɪm/', dif: 'easy' },
  { en: 'Day', uz: 'Kun', tr: '/deɪ/', dif: 'easy' },
  { en: 'Night', uz: 'Tun', tr: '/naɪt/', dif: 'easy' },
  { en: 'Morning', uz: 'Ertalab', tr: '/ˈmɔːrnɪŋ/', dif: 'easy' },
  { en: 'Sun', uz: 'Quyosh', tr: '/sʌn/', dif: 'easy' },
  { en: 'Moon', uz: 'Oy', tr: '/muːn/', dif: 'easy' },
  { en: 'Tree', uz: 'Daraxt', tr: '/triː/', dif: 'easy' },
  { en: 'Flower', uz: 'Gul', tr: '/ˈflaʊər/', dif: 'easy' },
  { en: 'Dog', uz: 'It', tr: '/dɔːɡ/', dif: 'easy' },
  { en: 'Cat', uz: 'Mushuk', tr: '/kæt/', dif: 'easy' },
  { en: 'Bird', uz: 'Qush', tr: '/bɜːrd/', dif: 'easy' },
  { en: 'Happy', uz: 'Baxtli', tr: '/ˈhæpi/', dif: 'easy' },
  { en: 'Sad', uz: 'G\'amgin', tr: '/sæd/', dif: 'easy' },
  { en: 'Easy', uz: 'Oson', tr: '/ˈiːzi/', dif: 'easy' },
  { en: 'Fast', uz: 'Tez', tr: '/fæst/', dif: 'easy' },
  { en: 'Play', uz: 'O\'ynamoq', tr: '/pleɪ/', dif: 'easy' },
  { en: 'Buy', uz: 'Sotib olmoq', tr: '/baɪ/', dif: 'easy' },
  { en: 'Open', uz: 'Ochmoq', tr: '/ˈoʊpən/', dif: 'easy' },
  { en: 'Close', uz: 'Yopmoq', tr: '/kloʊz/', dif: 'easy' },
  { en: 'Wait', uz: 'Kutmoq', tr: '/weɪt/', dif: 'easy' },
  { en: 'Love', uz: 'Sevmoq', tr: '/lʌv/', dif: 'easy' },
  { en: 'Music', uz: 'Musiqa', tr: '/ˈmjuːzɪk/', dif: 'easy' },
  { en: 'Strong', uz: 'Kuchli', tr: '/strɔːŋ/', dif: 'medium' },
  { en: 'Watch', uz: 'Tomosha qilmoq', tr: '/wɑːtʃ/', dif: 'medium' },
  { en: 'Listen', uz: 'Tinglamoq', tr: '/ˈlɪsən/', dif: 'medium' },
  { en: 'Read', uz: 'O\'qimoq', tr: '/riːd/', dif: 'medium' },
  { en: 'Write', uz: 'Yozmoq', tr: '/raɪt/', dif: 'medium' },
  { en: 'Speak', uz: 'Gapirmoq', tr: '/spiːk/', dif: 'medium' },
  { en: 'Learn', uz: 'O\'rganmoq', tr: '/lɜːrn/', dif: 'medium' },
  { en: 'Study', uz: 'O\'qish/talim', tr: '/ˈstʌdi/', dif: 'medium' },
  { en: 'Travel', uz: 'Sayohat qilmoq', tr: '/ˈtrævl/', dif: 'medium' },
  { en: 'Visit', uz: 'Tashrif buyurmoq', tr: '/ˈvɪzɪt/', dif: 'medium' },
  { en: 'Cook', uz: 'Ovqat pishirmoq', tr: '/kʊk/', dif: 'medium' },
  { en: 'City', uz: 'Shahar', tr: '/ˈsɪti/', dif: 'medium' },
  { en: 'Country', uz: 'Mamlakat', tr: '/ˈkʌntri/', dif: 'medium' },
  { en: 'Weather', uz: 'Ob-havo', tr: '/ˈweðər/', dif: 'medium' },
  { en: 'Story', uz: 'Hikoya', tr: '/ˈstɔːri/', dif: 'medium' },
  { en: 'Beautiful', uz: 'Go\'zal', tr: '/ˈbjuːtɪfl/', dif: 'hard' },
  { en: 'Important', uz: 'Muhim', tr: '/ɪmˈpɔːrtnt/', dif: 'hard' },
  { en: 'Interesting', uz: 'Qiziqarli', tr: '/ˈɪntrəstɪŋ/', dif: 'hard' },
  { en: 'Delicious', uz: 'Mazali', tr: '/dɪˈlɪʃəs/', dif: 'hard' },
  { en: 'Remember', uz: 'Eslab qolmoq', tr: '/rɪˈmembər/', dif: 'hard' },
  { en: 'Health', uz: 'Salomatlik', tr: '/helθ/', dif: 'hard' },
  { en: 'Head', uz: 'Bosh', tr: '/hed/', dif: 'easy' },
  { en: 'Hand', uz: 'Qo\'l', tr: '/hænd/', dif: 'easy' },
  { en: 'Foot', uz: 'Oyoq', tr: '/fʊt/', dif: 'easy' },
  { en: 'Eye', uz: 'Ko\'z', tr: '/aɪ/', dif: 'easy' },
  { en: 'Ear', uz: 'Quloq', tr: '/ɪr/', dif: 'easy' },
  { en: 'Nose', uz: 'Burun', tr: '/noʊz/', dif: 'easy' },
  { en: 'Mouth', uz: 'Og\'iz', tr: '/maʊθ/', dif: 'medium' },
  { en: 'Heart', uz: 'Yurak', tr: '/hɑːrt/', dif: 'medium' },
  { en: 'Red', uz: 'Qizil', tr: '/red/', dif: 'easy' },
  { en: 'Blue', uz: 'Ko\'k', tr: '/bluː/', dif: 'easy' },
  { en: 'Green', uz: 'Yashil', tr: '/ɡriːn/', dif: 'easy' },
  { en: 'Black', uz: 'Qora', tr: '/blæk/', dif: 'easy' },
  { en: 'White', uz: 'Oq', tr: '/waɪt/', dif: 'easy' },
  { en: 'Yellow', uz: 'Sariq', tr: '/ˈjeloʊ/', dif: 'medium' },
  { en: 'One', uz: 'Bir', tr: '/wʌn/', dif: 'easy' },
  { en: 'Two', uz: 'Ikki', tr: '/tuː/', dif: 'easy' },
  { en: 'Three', uz: 'Uch', tr: '/θriː/', dif: 'easy' },
  { en: 'Four', uz: 'To\'rt', tr: '/fɔːr/', dif: 'easy' },
  { en: 'Five', uz: 'Besh', tr: '/faɪv/', dif: 'easy' },
  { en: 'Ten', uz: 'O\'n', tr: '/ten/', dif: 'easy' },
  { en: 'Phone', uz: 'Telefon', tr: '/foʊn/', dif: 'easy' },
  { en: 'Computer', uz: 'Kompyuter', tr: '/kəmˈpjuːtər/', dif: 'medium' },
  { en: 'Window', uz: 'Deraza', tr: '/ˈwɪndoʊ/', dif: 'medium' },
  { en: 'Door', uz: 'Eshik', tr: '/dɔːr/', dif: 'easy' },
  { en: 'Room', uz: 'Xona', tr: '/ruːm/', dif: 'easy' },
  { en: 'Table', uz: 'Stol', tr: '/ˈteɪbl/', dif: 'easy' },
  { en: 'Chair', uz: 'Stul', tr: '/tʃer/', dif: 'easy' },
  { en: 'Bed', uz: 'Karavot', tr: '/bed/', dif: 'easy' },
  { en: 'Key', uz: 'Kalit', tr: '/kiː/', dif: 'easy' },
  { en: 'Horse', uz: 'Ot', tr: '/hɔːrs/', dif: 'easy' },
  { en: 'Cow', uz: 'Sigir', tr: '/kaʊ/', dif: 'easy' },
  { en: 'Sheep', uz: 'Qo\'y', tr: '/ʃiːp/', dif: 'medium' },
  { en: 'Chicken', uz: 'Tovuq', tr: '/ˈtʃɪkɪn/', dif: 'medium' },
  { en: 'Fish', uz: 'Baliq', tr: '/fɪʃ/', dif: 'easy' },
  { en: 'Lion', uz: 'Sher', tr: '/ˈlaɪən/', dif: 'medium' },
  { en: 'Bear', uz: 'Ayiq', tr: '/ber/', dif: 'medium' },
  { en: 'Elephant', uz: 'Fil', tr: '/ˈelɪfənt/', dif: 'hard' },
  { en: 'Teacher', uz: 'O\'qituvchi', tr: '/ˈtiːtʃər/', dif: 'medium' },
  { en: 'Doctor', uz: 'Shifokor', tr: '/ˈdɑːktər/', dif: 'medium' },
  { en: 'Student', uz: 'Talaba', tr: '/ˈstuːdnt/', dif: 'medium' },
  { en: 'Driver', uz: 'Haydovchi', tr: '/ˈdraɪvər/', dif: 'medium' },
  { en: 'Park', uz: 'Bog\'', tr: '/pɑːrk/', dif: 'easy' },
  { en: 'Beach', uz: 'Plyaj', tr: '/biːtʃ/', dif: 'medium' },
  { en: 'Mountain', uz: 'Tog\'', tr: '/ˈmaʊntn/', dif: 'hard' },
  { en: 'River', uz: 'Daryo', tr: '/ˈrɪvər/', dif: 'medium' },
  { en: 'Hotel', uz: 'Mehmonxona', tr: '/hoʊˈtel/', dif: 'medium' },
  { en: 'Village', uz: 'Qishloq', tr: '/ˈvɪlɪdʒ/', dif: 'medium' },
  { en: 'Market', uz: 'Bozor', tr: '/ˈmɑːrkɪt/', dif: 'medium' },
  { en: 'Airport', uz: 'Aeroport', tr: '/ˈerpɔːrt/', dif: 'hard' },
  { en: 'Run', uz: 'Yugurmoq', tr: '/rʌn/', dif: 'easy' },
  { en: 'Walk', uz: 'Yurmoq', tr: '/wɔːk/', dif: 'easy' },
  { en: 'Sit', uz: 'O\'tirmoq', tr: '/sɪt/', dif: 'easy' },
  { en: 'Stand', uz: 'Turmoq', tr: '/stænd/', dif: 'easy' },
  { en: 'Sleep', uz: 'Uxlash', tr: '/sliːp/', dif: 'easy' },
  { en: 'Eat', uz: 'Yemoq', tr: '/iːt/', dif: 'easy' },
  { en: 'Drink', uz: 'Ichmoq', tr: '/drɪŋk/', dif: 'easy' },
  { en: 'Help', uz: 'Yordam berish', tr: '/help/', dif: 'easy' },
  { en: 'Give', uz: 'Bermoq', tr: '/ɡɪv/', dif: 'easy' },
  { en: 'Take', uz: 'Olish', tr: '/teɪk/', dif: 'easy' },
  { en: 'Say', uz: 'Aytish', tr: '/seɪ/', dif: 'easy' },
  { en: 'See', uz: 'Ko\'rish', tr: '/siː/', dif: 'easy' },
  { en: 'Come', uz: 'Kelish', tr: '/kʌm/', dif: 'easy' },
  { en: 'Go', uz: 'Borish', tr: '/ɡoʊ/', dif: 'easy' },
  { en: 'Know', uz: 'Bilish', tr: '/noʊ/', dif: 'easy' },
  { en: 'Need', uz: 'Kerak bo\'lmoq', tr: '/niːd/', dif: 'easy' },
  { en: 'Want', uz: 'Xohlamoq', tr: '/wɑːnt/', dif: 'easy' },
  { en: 'Meet', uz: 'Uchrashmoq', tr: '/miːt/', dif: 'easy' },
  { en: 'Call', uz: 'Qo\'ng\'iroq qilish', tr: '/kɔːl/', dif: 'easy' },
  { en: 'Talk', uz: 'Suhbatlashish', tr: '/tɔːk/', dif: 'easy' },
  { en: 'Ask', uz: 'So\'rash', tr: '/æsk/', dif: 'easy' },
  { en: 'Fly', uz: 'Uchish', tr: '/flaɪ/', dif: 'easy' },
  { en: 'Laugh', uz: 'Kulish', tr: '/læf/', dif: 'easy' },
  { en: 'Clean', uz: 'Tozalash', tr: '/kliːn/', dif: 'easy' },
  { en: 'Smile', uz: 'Tabassum', tr: '/smaɪl/', dif: 'easy' },
  { en: 'Think', uz: 'O\'ylash', tr: '/θɪŋk/', dif: 'medium' },
  { en: 'Find', uz: 'Topmoq', tr: '/faɪnd/', dif: 'medium' },
  { en: 'Bring', uz: 'Olib kelmoq', tr: '/brɪŋ/', dif: 'medium' },
  { en: 'Send', uz: 'Yubormoq', tr: '/send/', dif: 'medium' },
  { en: 'Wear', uz: 'Kiyish', tr: '/wer/', dif: 'medium' },
  { en: 'Teach', uz: 'O\'rgatish', tr: '/tiːtʃ/', dif: 'medium' },
  { en: 'Build', uz: 'Qurish', tr: '/bɪld/', dif: 'medium' },
  { en: 'Swim', uz: 'Suzish', tr: '/swɪm/', dif: 'medium' },
  { en: 'Drive', uz: 'Haydash', tr: '/draɪv/', dif: 'medium' },
  { en: 'Dance', uz: 'Raqs tushish', tr: '/dæns/', dif: 'medium' },
  { en: 'Sing', uz: 'Qo\'shiq aytish', tr: '/sɪŋ/', dif: 'medium' },
  { en: 'Draw', uz: 'Chizish', tr: '/drɔː/', dif: 'medium' },
  { en: 'Wash', uz: 'Yuvish', tr: '/wɑːʃ/', dif: 'medium' },
  { en: 'Big', uz: 'Katta', tr: '/bɪɡ/', dif: 'easy' },
  { en: 'Small', uz: 'Kichik', tr: '/smɔːl/', dif: 'easy' },
  { en: 'Long', uz: 'Uzun', tr: '/lɔːŋ/', dif: 'easy' },
  { en: 'Short', uz: 'Qisqa', tr: '/ʃɔːrt/', dif: 'easy' },
  { en: 'New', uz: 'Yangi', tr: '/nuː/', dif: 'easy' },
  { en: 'Old', uz: 'Eski', tr: '/oʊld/', dif: 'easy' },
  { en: 'Good', uz: 'Yaxshi', tr: '/ɡʊd/', dif: 'easy' },
  { en: 'Bad', uz: 'Yomon', tr: '/bæd/', dif: 'easy' },
  { en: 'Hot', uz: 'Issiq', tr: '/hɑːt/', dif: 'easy' },
  { en: 'Cold', uz: 'Sovuq', tr: '/koʊld/', dif: 'easy' },
  { en: 'Young', uz: 'Yosh', tr: '/jʌŋ/', dif: 'easy' },
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
  const DIFF = { Oson: 'easy', 'O\'rta': 'medium', Qiyin: 'hard' }
  const list = cat === 'Barchasi'
    ? WORDS
    : WORDS.filter((w) => w.dif === DIFF[cat])

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