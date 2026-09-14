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

function say(text, lang) {
  if (!text || !('speechSynthesis' in window)) return
  window.speechSynthesis.cancel()
  const u = new SpeechSynthesisUtterance(text)
  u.lang = lang
  u.rate = 0.95
  window.speechSynthesis.speak(u)
}

async function googleTranslate(text, from, to) {
  const url =
    'https://translate.googleapis.com/translate_a/single?client=gtx&dt=t' +
    `&sl=${from}&tl=${to}&q=${encodeURIComponent(text)}`
  const res = await fetch(url)
  if (!res.ok) throw new Error('Google tarjima xatosi')
  const data = await res.json()
  const out = data[0].map((seg) => seg[0]).join('')
  return out || text
}

async function myMemoryTranslate(text, from, to) {
  const sl = from === 'auto' ? 'en' : from
  const url =
    `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}` +
    `&langpair=${sl}|${to}`
  const res = await fetch(url)
  const data = await res.json()
  if (data.responseStatus !== 200) throw new Error(data.responseDetails || 'MyMemory xatosi')
  return data.responseData.translatedText || text
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
          <NavLink to="/tarjimon">Tarjimon</NavLink>
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
        <div className="feature-card" onClick={() => navigate('/tarjimon')} style={{ cursor: 'pointer' }}>
          <div className="feature-icon">🌐</div>
          <h3>Tarjimon</h3>
          <p>Ingliz-ozbek, o'zbek-ingliz matnni onlayn tarjima qiling.</p>
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

const QUIZ_MODES = [
  { id: 'mix', label: 'Aralash', icon: '🎲', desc: 'Barcha turdagi savollar' },
  { id: 'en2uz', label: 'Tarjima', icon: '🌐', desc: 'Inglizcha → o\'zbekcha' },
  { id: 'uz2en', label: 'Topish', icon: '🔍', desc: 'O\'zbekcha → inglizcha' },
  { id: 'listen', label: 'Eshitish', icon: '🎧', desc: 'Audio asosida topish' },
]
const QUIZ_SIZES = [5, 10, 15, 20]
const QUIZ_TIME = 20

function beep(ok) {
  const AC = window.AudioContext || window.webkitAudioContext
  if (!AC) return
  const ctx = new AC()
  const tone = (freq, delay, dur, type = 'sine', vol = 0.12) => {
    const o = ctx.createOscillator()
    const g = ctx.createGain()
    o.type = type
    o.frequency.value = freq
    o.connect(g)
    g.connect(ctx.destination)
    const t = ctx.currentTime + delay
    g.gain.setValueAtTime(vol, t)
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur)
    o.start(t)
    o.stop(t + dur)
  }
  if (ok) {
    tone(523.25, 0, 0.15)
    tone(659.25, 0.12, 0.15)
    tone(783.99, 0.24, 0.25)
  } else {
    tone(196, 0, 0.28, 'sawtooth', 0.1)
  }
}

function buildQuestions(pool, size, mode) {
  const qs = []
  const used = new Set()
  while (qs.length < size && used.size < pool.length) {
    const w = pool[Math.floor(Math.random() * pool.length)]
    if (used.has(w.en)) continue
    used.add(w.en)
    const m = mode === 'mix'
      ? (qs.length % 3 === 0 ? 'listen' : qs.length % 2 === 0 ? 'uz2en' : 'en2uz')
      : mode
    const dist = shuffle(pool.filter((x) => x.en !== w.en)).slice(0, 3)
    let prompt, options, correctText
    if (m === 'listen') {
      prompt = 'audio'
      options = shuffle([w.en, ...dist.map((d) => d.en)])
      correctText = w.en
    } else if (m === 'uz2en') {
      prompt = w.uz
      options = shuffle([w.en, ...dist.map((d) => d.en)])
      correctText = w.en
    } else {
      prompt = w.en
      options = shuffle([w.uz, ...dist.map((d) => d.uz)])
      correctText = w.uz
    }
    qs.push({ word: w, mode: m, prompt, options, correctText })
  }
  return qs
}

const LETTERS = ['A', 'B', 'C', 'D']

function Quiz() {
  const [phase, setPhase] = useState('start')
  const [settings, setSettings] = useState({ dif: 'all', size: 10, mode: 'mix' })
  const [questions, setQuestions] = useState([])
  const [idx, setIdx] = useState(0)
  const [score, setScore] = useState(0)
  const [streak, setStreak] = useState(0)
  const [maxStreak, setMaxStreak] = useState(0)
  const [result, setResult] = useState(null)
  const [picked, setPicked] = useState(null)
  const [left, setLeft] = useState(QUIZ_TIME)
  const [elapsed, setElapsed] = useState(0)
  const [mistakes, setMistakes] = useState([])
  const [prevBest, setPrevBest] = useState(() => Number(localStorage.getItem('es_best') || 0))
  const [best, setBest] = useState(() => Number(localStorage.getItem('es_best') || 0))
  const [bestStreak, setBestStreak] = useState(() => Number(localStorage.getItem('es_streak') || 0))

  const pool = settings.dif === 'all' ? WORDS : WORDS.filter((w) => w.dif === settings.dif)

  const start = () => {
    const qs = buildQuestions(pool, settings.size, settings.mode)
    setQuestions(qs)
    setIdx(0)
    setScore(0)
    setStreak(0)
    setMaxStreak(0)
    setResult(null)
    setElapsed(0)
    setMistakes([])
    setPrevBest(best)
    setPhase('play')
  }

  const finish = () => {
    const finalBest = Math.max(best, score)
    const finalStreak = Math.max(bestStreak, maxStreak)
    localStorage.setItem('es_best', String(finalBest))
    localStorage.setItem('es_streak', String(finalStreak))
    setBest(finalBest)
    setBestStreak(finalStreak)
    setPhase('end')
  }

  useEffect(() => {
    if (phase !== 'play') return
    setLeft(QUIZ_TIME)
    const q = questions[idx]
    if (!q) return
    let t
    if (q.mode === 'listen') {
      t = setTimeout(() => speak(q.word.en), 500)
    }
    return () => {
      if (t) clearTimeout(t)
      if ('speechSynthesis' in window) window.speechSynthesis.cancel()
    }
  }, [phase, idx])

  useEffect(() => {
    if (phase !== 'play' || result) return
    const iv = setInterval(() => {
      setLeft((l) => (l > 1 ? l - 1 : 0))
    }, 1000)
    return () => clearInterval(iv)
  }, [phase, idx, result])

  useEffect(() => {
    if (phase !== 'play' || result || left > 0) return
    setResult('timeout')
    setStreak(0)
    setMistakes((m) => [...m, questions[idx].word])
    beep(false)
  }, [left, phase, result])

  useEffect(() => {
    if (phase !== 'play') return
    const iv = setInterval(() => setElapsed((e) => e + 1), 1000)
    return () => clearInterval(iv)
  }, [phase])

  if (phase === 'start') {
    return (
      <section className="page">
        <div className="page-head">
          <h2>🎯 Mashq sozlamalari</h2>
          <p>Qiyinlik, savollar soni va turini tanlang</p>
        </div>
        <div className="quiz-settings">
          <div className="setting-group">
            <span className="setting-label">Qiyinlik darajasi</span>
            <div className="chips">
              {[
                { id: 'all', label: 'Barchasi' },
                { id: 'easy', label: 'Oson' },
                { id: 'medium', label: 'O\'rta' },
                { id: 'hard', label: 'Qiyin' },
              ].map((d) => (
                <button
                  key={d.id}
                  className={`chip ${settings.dif === d.id ? 'active' : ''}`}
                  onClick={() => setSettings((s) => ({ ...s, dif: d.id }))}
                >
                  {d.label}
                </button>
              ))}
            </div>
          </div>
          <div className="setting-group">
            <span className="setting-label">Savollar soni</span>
            <div className="chips">
              {QUIZ_SIZES.map((n) => (
                <button
                  key={n}
                  className={`chip ${settings.size === n ? 'active' : ''}`}
                  onClick={() => setSettings((s) => ({ ...s, size: n }))}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>
          <div className="setting-group">
            <span className="setting-label">Savol turi</span>
            <div className="mode-grid">
              {QUIZ_MODES.map((m) => (
                <button
                  key={m.id}
                  className={`mode-card ${settings.mode === m.id ? 'active' : ''}`}
                  onClick={() => setSettings((s) => ({ ...s, mode: m.id }))}
                >
                  <span className="mode-icon">{m.icon}</span>
                  <span className="mode-label">{m.label}</span>
                  <span className="mode-desc">{m.desc}</span>
                </button>
              ))}
            </div>
          </div>
          <button className="btn btn-primary btn-start" onClick={start}>
            Boshlash 🚀
          </button>
          <p className="chip-note">So'zlar bazasi: {WORDS.length} ta · Tanlangan: {pool.length} ta</p>
        </div>
      </section>
    )
  }

  const q = phase === 'play' ? questions[idx] : questions[Math.min(idx, questions.length - 1)]

  const answer = (opt) => {
    if (result || !q) return
    setPicked(opt)
    const ok = opt === q.correctText
    setResult(ok ? 'correct' : 'wrong')
    if (ok) {
      const s = score + 1
      setScore(s)
      const st = streak + 1
      setStreak(st)
      setMaxStreak((p) => Math.max(p, st))
      if (s > best) setBest(s)
      if (st > bestStreak) setBestStreak(st)
      beep(true)
    } else {
      setStreak(0)
      setMistakes((m) => [...m, q.word])
      beep(false)
    }
  }

  const next = () => {
    if (idx + 1 >= questions.length) {
      finish()
    } else {
      setIdx(idx + 1)
      setResult(null)
      setPicked(null)
    }
  }

  if (phase === 'play') {
    const progress = (idx / questions.length) * 100
    return (
      <section className="page">
        <div className="quiz-top">
          <div className="hud">
            <span className="hud-chip">🔢 {idx + 1}/{questions.length}</span>
            <span className="hud-chip">⭐ {score}</span>
            <span className="hud-chip streak">🔥 {streak}</span>
            <span className={`hud-chip timer ${left <= 5 ? 'danger' : ''}`}>⏱ {left}s</span>
          </div>
          <div className="progress">
            <div className="progress-fill" style={{ width: `${progress}%` }}></div>
          </div>
        </div>

        <div className="quiz-box">
          <div className="quiz-question">
            {q.mode === 'listen' ? (
              <>
                <button className="speak-btn big" title="Yana eshitish" onClick={() => speak(q.word.en)}>🔊</button>
                <span className="listen-hint">Eshiting va to'g'ri so'zni tanlang</span>
              </>
            ) : (
              <>
                <span className="q-prompt">{q.prompt}</span>
                {q.mode === 'en2uz' && (
                  <button className="speak-btn big" title="Talaffuzni eshitish" onClick={() => speak(q.word.en)}>🔊</button>
                )}
              </>
            )}
          </div>
          <p className="quiz-hint">
            {q.mode === 'uz2en' ? 'Inglizcha so\'zini tanlang:' : q.mode === 'listen' ? 'Eshitgan so\'zingizni tanlang:' : 'To\'g\'ri tarjimasini tanlang:'}
          </p>
          <div className={`quiz-options ${result ? 'reveal' : ''}`}>
            {q.options.map((o, i) => {
              const isCorrect = o === q.correctText
              const isPicked = o === picked
              const cls = ['option']
              if (result) {
                if (isCorrect) cls.push('correct')
                else if (result === 'wrong' && isPicked) cls.push('wrong')
              }
              return (
                <button
                  key={o}
                  className={cls.join(' ')}
                  disabled={!!result}
                  onClick={() => answer(o)}
                >
                  <span className="opt-letter">{LETTERS[i]}</span>
                  <span className="opt-text">{o}</span>
                </button>
              )
            })}
          </div>
          {result && (
            <div className={`quiz-feedback ${result === 'correct' ? 'good' : 'bad'}`}>
              <span>
                {result === 'correct'
                  ? 'To\'g\'ri! 🎉 +1'
                  : result === 'timeout'
                    ? `Vaqt tugadi ⏰ To'g'ri javob: ${q.correctText}`
                    : `Noto'g'ri. To'g'ri javob: ${q.correctText}`}
              </span>
              <button className="btn btn-primary small" onClick={next}>
                {idx + 1 >= questions.length ? 'Natijani ko\'rish 📊' : 'Keyingisi →'}
              </button>
            </div>
          )}
        </div>
      </section>
    )
  }

  const accuracy = questions.length ? Math.round((score / questions.length) * 100) : 0
  const mins = Math.floor(elapsed / 60)
  const secs = elapsed % 60
  const timeStr = `${mins}:${String(secs).padStart(2, '0')}`
  const rating = accuracy >= 80 ? '🏆' : accuracy >= 50 ? '👍' : '💪'
  const isRecord = score > 0 && Math.max(best, score) > prevBest

  return (
    <section className="page">
      <div className="quiz-results">
        <div className="result-icon">{rating}</div>
        <h2>
          {accuracy >= 80 ? 'Ajoyib! A\'lo natija' : accuracy >= 50 ? 'Yaxshi natija!' : 'Mashq qilishda davom eting'}
        </h2>
        {isRecord && <div className="record-badge">🏆 Yangi rekord!</div>}
        <div className="stat-row">
          <div className="stat">
            <div className="stat-num">{score}/{questions.length}</div>
            <div className="stat-label">To'g'ri</div>
          </div>
          <div className="stat">
            <div className="stat-num">{accuracy}%</div>
            <div className="stat-label">Aniqlik</div>
          </div>
          <div className="stat">
            <div className="stat-num">🔥{maxStreak}</div>
            <div className="stat-label">Seriya</div>
          </div>
          <div className="stat">
            <div className="stat-num">{timeStr}</div>
            <div className="stat-label">Vaqt</div>
          </div>
        </div>
        <p className="result-best">
          Eng yaxshi natija: {Math.max(best, score)} · Eng uzun seriya: {Math.max(bestStreak, maxStreak)}
        </p>
        {mistakes.length > 0 && (
          <div className="mistakes">
            <h3>Xatolar ({mistakes.length})</h3>
            <ul>
              {mistakes.map((w) => (
                <li key={w.en + idx}>
                  <span className="mis-word" onClick={() => speak(w.en)}>{w.en} 🔊</span>
                  <span className="mis-uz">— {w.uz}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
        <div className="hero-actions">
          <button className="btn btn-ghost" onClick={() => setPhase('start')}>⚙️ Sozlamalar</button>
          <button className="btn btn-primary" onClick={start}>Yana mashq qilish</button>
        </div>
      </div>
    </section>
  )
}

function Tarjimon() {
  const [from, setFrom] = useState('auto')
  const [to, setTo] = useState('uz')
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [retryTick, setRetryTick] = useState(0)

  useEffect(() => {
    const text = input.trim()
    if (!text || (from !== 'auto' && from === to)) {
      setOutput('')
      setLoading(false)
      setError(null)
      return
    }
    setError(null)
    let cancelled = false
    const timer = setTimeout(async () => {
      setLoading(true)
      try {
        let result
        try {
          result = await googleTranslate(text, from, to)
        } catch {
          if (!cancelled) {
            result = await myMemoryTranslate(text, from, to)
          } else {
            return
          }
        }
        if (!cancelled) setOutput(result)
      } catch {
        if (!cancelled) {
          setOutput('')
          setError('Tarjima amalga oshmadi. Internet aloqani tekshirib, qayta urinib ko\u2019ring.')
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }, 600)
    return () => {
      cancelled = true
      clearTimeout(timer)
    }
  }, [input, from, to, retryTick])

  const sameLang = from !== 'auto' && from === to

  function swap() {
    const newFrom = to
    const newTo = from === 'auto' ? 'en' : from
    setFrom(newFrom)
    setTo(newTo)
    setInput(output)
    setOutput('')
    setError(null)
  }

  function clearAll() {
    setInput('')
    setOutput('')
    setError(null)
  }

  async function copy(text) {
    if (!text) return
    try {
      await navigator.clipboard.writeText(text)
    } catch {
      const ta = document.createElement('textarea')
      ta.value = text
      document.body.appendChild(ta)
      ta.select()
      document.execCommand('copy')
      ta.remove()
    }
  }

  const LANG_SRC = [
    { v: 'auto', label: 'Avtomatik aniqlash' },
    { v: 'en', label: 'Inglizcha' },
    { v: 'uz', label: 'O\u2019zbekcha' },
  ]
  const LANG_DST = [
    { v: 'uz', label: 'O\u2019zbekcha' },
    { v: 'en', label: 'Inglizcha' },
  ]

  return (
    <section className="page">
      <div className="page-head">
        <h2>🌐 Tarjimon</h2>
        <p>Matn kiriting — Inglizcha ↔ O\u2019zbekcha onlayn tarjima.</p>
      </div>

      <div className="trans-card">
        <div className="trans-controls">
          <div className="trans-select-wrap">
            <span className="trans-select-label">Manba til</span>
            <select value={from} onChange={(e) => setFrom(e.target.value)}>
              {LANG_SRC.map((l) => (
                <option key={l.v} value={l.v}>{l.label}</option>
              ))}
            </select>
          </div>
          <button className="swap-btn" title="Tillar o\u2019rnini almashtirish" onClick={swap}>⇄</button>
          <div className="trans-select-wrap">
            <span className="trans-select-label">Tarjima tili</span>
            <select value={to} onChange={(e) => setTo(e.target.value)}>
              {LANG_DST.map((l) => (
                <option key={l.v} value={l.v}>{l.label}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="trans-panes">
          <div className="trans-pane">
            <textarea
              className="trans-input"
              value={input}
              onChange={(e) => setInput(e.target.value.slice(0, 5000))}
              placeholder="Tarjima qilish uchun matn kiriting..."
              rows={7}
            />
            <div className="pane-bar">
              <span className="pane-chars">{input.length}/5000</span>
              <div className="pane-actions">
                <button className="icon-btn" title="O\u2019qish" onClick={() => say(input, from === 'uz' ? 'uz-UZ' : 'en-US')}>🔊</button>
                <button className="icon-btn" title="Nusxalash" onClick={() => copy(input)}>📋</button>
                <button className="icon-btn" title="Tozalash" onClick={clearAll}>🗑️</button>
              </div>
            </div>
          </div>

          <div className="trans-pane trans-pane-out">
            {sameLang ? (
              <div className="trans-hint">⚠️ Manba va tarjima tili bir xil. Boshqa tilni tanlang.</div>
            ) : loading && !output ? (
              <div className="trans-loading"><span className="spinner" /> Tarjima qilinmoqda...</div>
            ) : (
              <div className="trans-output">{output || (input ? '' : 'Tarjima shu yerda ko\u2019rinadi')}</div>
            )}
            {output && (
              <div className="pane-bar">
                <div className="pane-actions">
                  <button className="icon-btn" title="O\u2019qish" onClick={() => say(output, to === 'uz' ? 'uz-UZ' : 'en-US')}>🔊</button>
                  <button className="icon-btn" title="Nusxalash" onClick={() => copy(output)}>📋</button>
                </div>
              </div>
            )}
          </div>
        </div>

        {error && (
          <div className="trans-error">
            <span>⚠️ {error}</span>
            <button className="btn btn-ghost" onClick={() => setRetryTick((t) => t + 1)}>Qayta urinish</button>
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
            <Route path="/tarjimon" element={<Tarjimon />} />
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