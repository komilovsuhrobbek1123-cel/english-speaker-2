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
  { en: 'Brother', uz: 'Aka / uka', tr: '/ˈbrʌðər/', dif: 'easy' },
  { en: 'Sister', uz: 'Opa / singil', tr: '/ˈsɪstər/', dif: 'easy' },
  { en: 'Son', uz: 'O\'g\'il', tr: '/sʌn/', dif: 'easy' },
  { en: 'Daughter', uz: 'Qiz farzand', tr: '/ˈdɔːtər/', dif: 'medium' },
  { en: 'Grandmother', uz: 'Buvi', tr: '/ˈɡrænmʌðər/', dif: 'medium' },
  { en: 'Grandfather', uz: 'Bobo', tr: '/ˈɡrænfɑːðər/', dif: 'medium' },
  { en: 'Uncle', uz: 'Amaki / tog\'a', tr: '/ˈʌŋkl/', dif: 'easy' },
  { en: 'Aunt', uz: 'Amma / xola', tr: '/ænt/', dif: 'easy' },
  { en: 'Cousin', uz: 'Amakivachcha', tr: '/ˈkʌzn/', dif: 'medium' },
  { en: 'Husband', uz: 'Er', tr: '/ˈhʌzbənd/', dif: 'medium' },
  { en: 'Wife', uz: 'Xotin', tr: '/waɪf/', dif: 'medium' },
  { en: 'Boy', uz: 'Bola', tr: '/bɔɪ/', dif: 'easy' },
  { en: 'Girl', uz: 'Qiz', tr: '/ɡɜːrl/', dif: 'easy' },
  { en: 'Baby', uz: 'Chaqaloq', tr: '/ˈbeɪbi/', dif: 'easy' },
  { en: 'Child', uz: 'Bola', tr: '/tʃaɪld/', dif: 'easy' },
  { en: 'Children', uz: 'Bolalar', tr: '/ˈtʃɪldrən/', dif: 'medium' },
  { en: 'People', uz: 'Odamlar', tr: '/ˈpiːpl/', dif: 'easy' },
  { en: 'Man', uz: 'Erkak', tr: '/mæn/', dif: 'easy' },
  { en: 'Woman', uz: 'Ayol', tr: '/ˈwʊmən/', dif: 'easy' },
  { en: 'Hair', uz: 'Soch', tr: '/her/', dif: 'easy' },
  { en: 'Face', uz: 'Yuz', tr: '/feɪs/', dif: 'easy' },
  { en: 'Skin', uz: 'Teri', tr: '/skɪn/', dif: 'medium' },
  { en: 'Shoulder', uz: 'Yelka', tr: '/ˈʃoʊldər/', dif: 'hard' },
  { en: 'Arm', uz: 'Qo\'l', tr: '/ɑːrm/', dif: 'easy' },
  { en: 'Leg', uz: 'Oyoq', tr: '/leɡ/', dif: 'easy' },
  { en: 'Knee', uz: 'Tizza', tr: '/niː/', dif: 'medium' },
  { en: 'Finger', uz: 'Barmoq', tr: '/ˈfɪŋɡər/', dif: 'medium' },
  { en: 'Teeth', uz: 'Tishlar', tr: '/tiːθ/', dif: 'medium' },
  { en: 'Neck', uz: 'Bo\'yin', tr: '/nek/', dif: 'medium' },
  { en: 'Back', uz: 'Bel', tr: '/bæk/', dif: 'easy' },
  { en: 'Stomach', uz: 'Oshqozon', tr: '/ˈstʌmək/', dif: 'medium' },
  { en: 'Bread', uz: 'Non', tr: '/bred/', dif: 'easy' },
  { en: 'Milk', uz: 'Sut', tr: '/mɪlk/', dif: 'easy' },
  { en: 'Tea', uz: 'Choy', tr: '/tiː/', dif: 'easy' },
  { en: 'Coffee', uz: 'Qahva', tr: '/ˈkɔːfi/', dif: 'easy' },
  { en: 'Juice', uz: 'Sharbat', tr: '/dʒuːs/', dif: 'easy' },
  { en: 'Meat', uz: 'Go\'sht', tr: '/miːt/', dif: 'easy' },
  { en: 'Rice', uz: 'Guruch', tr: '/raɪs/', dif: 'easy' },
  { en: 'Egg', uz: 'Tuxum', tr: '/eɡ/', dif: 'easy' },
  { en: 'Cheese', uz: 'Pishloq', tr: '/tʃiːz/', dif: 'medium' },
  { en: 'Butter', uz: 'Yog\'', tr: '/ˈbʌtər/', dif: 'medium' },
  { en: 'Apple', uz: 'Olma', tr: '/ˈæpl/', dif: 'easy' },
  { en: 'Banana', uz: 'Banan', tr: '/bəˈnænə/', dif: 'easy' },
  { en: 'Orange', uz: 'Apelsin', tr: '/ˈɔːrɪndʒ/', dif: 'easy' },
  { en: 'Lemon', uz: 'Limon', tr: '/ˈlemən/', dif: 'easy' },
  { en: 'Grape', uz: 'Uzum', tr: '/ɡreɪp/', dif: 'medium' },
  { en: 'Melon', uz: 'Qovun', tr: '/ˈmelən/', dif: 'medium' },
  { en: 'Carrot', uz: 'Sabzi', tr: '/ˈkærət/', dif: 'medium' },
  { en: 'Potato', uz: 'Kartoshka', tr: '/pəˈteɪtoʊ/', dif: 'medium' },
  { en: 'Onion', uz: 'Piyoz', tr: '/ˈʌnjən/', dif: 'medium' },
  { en: 'Tomato', uz: 'Pomidor', tr: '/təˈmeɪtoʊ/', dif: 'medium' },
  { en: 'Cucumber', uz: 'Bodring', tr: '/ˈkjuːkʌmbər/', dif: 'hard' },
  { en: 'Salt', uz: 'Tuz', tr: '/sɔːlt/', dif: 'easy' },
  { en: 'Sugar', uz: 'Shakar', tr: '/ˈʃʊɡər/', dif: 'easy' },
  { en: 'Honey', uz: 'Asal', tr: '/ˈhʌni/', dif: 'medium' },
  { en: 'Cake', uz: 'Tort', tr: '/keɪk/', dif: 'easy' },
  { en: 'Soup', uz: 'Sho\'rva', tr: '/suːp/', dif: 'easy' },
  { en: 'Breakfast', uz: 'Nonushta', tr: '/ˈbrekfəst/', dif: 'medium' },
  { en: 'Lunch', uz: 'Tushlik', tr: '/lʌntʃ/', dif: 'medium' },
  { en: 'Dinner', uz: 'Kechki ovqat', tr: '/ˈdɪnər/', dif: 'medium' },
  { en: 'Fruit', uz: 'Meva', tr: '/fruːt/', dif: 'easy' },
  { en: 'Vegetable', uz: 'Sabzavot', tr: '/ˈvedʒtəbl/', dif: 'medium' },
  { en: 'Rabbit', uz: 'Quyon', tr: '/ˈræbɪt/', dif: 'easy' },
  { en: 'Wolf', uz: 'Bo\'ri', tr: '/wʊlf/', dif: 'medium' },
  { en: 'Fox', uz: 'Tulki', tr: '/fɑːks/', dif: 'medium' },
  { en: 'Deer', uz: 'Kiyik', tr: '/dɪr/', dif: 'hard' },
  { en: 'Mouse', uz: 'Sichqon', tr: '/maʊs/', dif: 'medium' },
  { en: 'Duck', uz: 'O\'rdak', tr: '/dʌk/', dif: 'medium' },
  { en: 'Eagle', uz: 'Burgut', tr: '/ˈiːɡl/', dif: 'medium' },
  { en: 'Snake', uz: 'Ilon', tr: '/sneɪk/', dif: 'medium' },
  { en: 'Frog', uz: 'Qurbaqa', tr: '/frɔːɡ/', dif: 'medium' },
  { en: 'Turtle', uz: 'Toshbaqa', tr: '/ˈtɜːrtl/', dif: 'medium' },
  { en: 'Monkey', uz: 'Maymun', tr: '/ˈmʌŋki/', dif: 'medium' },
  { en: 'Tiger', uz: 'Yo\'lbars', tr: '/ˈtaɪɡər/', dif: 'medium' },
  { en: 'Giraffe', uz: 'Jirafa', tr: '/dʒəˈræf/', dif: 'hard' },
  { en: 'Zebra', uz: 'Zebra', tr: '/ˈziːbrə/', dif: 'medium' },
  { en: 'Camel', uz: 'Tuya', tr: '/ˈkæml/', dif: 'medium' },
  { en: 'Goat', uz: 'Echki', tr: '/ɡoʊt/', dif: 'medium' },
  { en: 'Donkey', uz: 'Eshak', tr: '/ˈdɑːŋki/', dif: 'medium' },
  { en: 'Pig', uz: 'Cho\'chqa', tr: '/pɪɡ/', dif: 'medium' },
  { en: 'Butterfly', uz: 'Kapalak', tr: '/ˈbʌtərflaɪ/', dif: 'hard' },
  { en: 'Bee', uz: 'Asalari', tr: '/biː/', dif: 'medium' },
  { en: 'Ant', uz: 'Chumoli', tr: '/ænt/', dif: 'medium' },
  { en: 'Spider', uz: 'O\'rgimchak', tr: '/ˈspaɪdər/', dif: 'medium' },
  { en: 'Penguin', uz: 'Pingvin', tr: '/ˈpeŋɡwɪn/', dif: 'medium' },
  { en: 'Kitchen', uz: 'Oshxona', tr: '/ˈkɪtʃɪn/', dif: 'easy' },
  { en: 'Bathroom', uz: 'Hammom', tr: '/ˈbæθruːm/', dif: 'medium' },
  { en: 'Garden', uz: 'Bog\'', tr: '/ˈɡɑːrdn/', dif: 'easy' },
  { en: 'Yard', uz: 'Hovli', tr: '/jɑːrd/', dif: 'medium' },
  { en: 'Roof', uz: 'Tom', tr: '/ruːf/', dif: 'medium' },
  { en: 'Wall', uz: 'Devor', tr: '/wɔːl/', dif: 'medium' },
  { en: 'Floor', uz: 'Pol', tr: '/flɔːr/', dif: 'medium' },
  { en: 'Ceiling', uz: 'Shift', tr: '/ˈsiːlɪŋ/', dif: 'hard' },
  { en: 'Stair', uz: 'Zina', tr: '/ster/', dif: 'medium' },
  { en: 'Fence', uz: 'Panjara', tr: '/fens/', dif: 'medium' },
  { en: 'Balcony', uz: 'Balkon', tr: '/ˈbælkəni/', dif: 'hard' },
  { en: 'Garage', uz: 'Garaj', tr: '/ɡəˈrɑːʒ/', dif: 'hard' },
  { en: 'Sofa', uz: 'Divan', tr: '/ˈsoʊfə/', dif: 'easy' },
  { en: 'Mirror', uz: 'Oyna', tr: '/ˈmɪrər/', dif: 'easy' },
  { en: 'Lamp', uz: 'Chiroq', tr: '/læmp/', dif: 'easy' },
  { en: 'Clock', uz: 'Soat', tr: '/klɑːk/', dif: 'easy' },
  { en: 'Box', uz: 'Quti', tr: '/bɑːks/', dif: 'easy' },
  { en: 'Bag', uz: 'Sumka', tr: '/bæɡ/', dif: 'easy' },
  { en: 'Cup', uz: 'Piyola', tr: '/kʌp/', dif: 'easy' },
  { en: 'Glass', uz: 'Stakan', tr: '/ɡlæs/', dif: 'easy' },
  { en: 'Plate', uz: 'Tarelka', tr: '/pleɪt/', dif: 'easy' },
  { en: 'Spoon', uz: 'Qoshiq', tr: '/spuːn/', dif: 'easy' },
  { en: 'Fork', uz: 'Vilka', tr: '/fɔːrk/', dif: 'medium' },
  { en: 'Knife', uz: 'Pichoq', tr: '/naɪf/', dif: 'easy' },
  { en: 'Bottle', uz: 'Shisha', tr: '/ˈbɑːtl/', dif: 'medium' },
  { en: 'Towel', uz: 'Sochiq', tr: '/ˈtaʊəl/', dif: 'medium' },
  { en: 'Soap', uz: 'Sovun', tr: '/soʊp/', dif: 'medium' },
  { en: 'Bus', uz: 'Avtobus', tr: '/bʌs/', dif: 'easy' },
  { en: 'Train', uz: 'Poyezd', tr: '/treɪn/', dif: 'easy' },
  { en: 'Bicycle', uz: 'Velosiped', tr: '/ˈbaɪsɪkl/', dif: 'medium' },
  { en: 'Motorcycle', uz: 'Mototsikl', tr: '/ˈmoʊtərsaɪkl/', dif: 'medium' },
  { en: 'Airplane', uz: 'Samolyot', tr: '/ˈerpleɪn/', dif: 'hard' },
  { en: 'Boat', uz: 'Qayiq', tr: '/boʊt/', dif: 'medium' },
  { en: 'Ship', uz: 'Kema', tr: '/ʃɪp/', dif: 'medium' },
  { en: 'Truck', uz: 'Yuk mashinasi', tr: '/trʌk/', dif: 'medium' },
  { en: 'Taxi', uz: 'Taksi', tr: '/ˈtæksi/', dif: 'easy' },
  { en: 'Road', uz: 'Yo\'l', tr: '/roʊd/', dif: 'easy' },
  { en: 'Street', uz: 'Ko\'cha', tr: '/striːt/', dif: 'easy' },
  { en: 'Bridge', uz: 'Ko\'prik', tr: '/brɪdʒ/', dif: 'medium' },
  { en: 'Ticket', uz: 'Chipta', tr: '/ˈtɪkɪt/', dif: 'medium' },
  { en: 'Station', uz: 'Vokzal', tr: '/ˈsteɪʃn/', dif: 'medium' },
  { en: 'Shirt', uz: 'Ko\'ylak', tr: '/ʃɜːrt/', dif: 'easy' },
  { en: 'Dress', uz: 'Ko\'ylak (ayollik)', tr: '/dres/', dif: 'medium' },
  { en: 'Skirt', uz: 'Yubka', tr: '/skɜːrt/', dif: 'medium' },
  { en: 'Trousers', uz: 'Shim', tr: '/ˈtraʊzərz/', dif: 'medium' },
  { en: 'Jeans', uz: 'Jim', tr: '/dʒiːnz/', dif: 'easy' },
  { en: 'Jacket', uz: 'Kurtka', tr: '/ˈdʒækɪt/', dif: 'medium' },
  { en: 'Coat', uz: 'Palto', tr: '/koʊt/', dif: 'medium' },
  { en: 'Sweater', uz: 'Sviter', tr: '/ˈswetər/', dif: 'medium' },
  { en: 'Hat', uz: 'Shlyapa', tr: '/hæt/', dif: 'easy' },
  { en: 'Cap', uz: 'Kepka', tr: '/kæp/', dif: 'easy' },
  { en: 'Shoes', uz: 'Poyabzal', tr: '/ʃuːz/', dif: 'easy' },
  { en: 'Socks', uz: 'Paypoq', tr: '/sɑːks/', dif: 'easy' },
  { en: 'Boots', uz: 'Etik', tr: '/buːts/', dif: 'medium' },
  { en: 'Gloves', uz: 'Qo\'lqop', tr: '/ɡlʌvz/', dif: 'medium' },
  { en: 'Scarf', uz: 'Sharf', tr: '/skɑːrf/', dif: 'medium' },
  { en: 'Belt', uz: 'Kamar', tr: '/belt/', dif: 'medium' },
  { en: 'Ring', uz: 'Uzuk', tr: '/rɪŋ/', dif: 'medium' },
  { en: 'Necklace', uz: 'Marjon', tr: '/ˈnekləs/', dif: 'hard' },
  { en: 'Pocket', uz: 'Cho\'ntak', tr: '/ˈpɑːkɪt/', dif: 'medium' },
  { en: 'Uniform', uz: 'Forma', tr: '/ˈjuːnɪfɔːrm/', dif: 'hard' },
  { en: 'Lesson', uz: 'Dars', tr: '/ˈlesn/', dif: 'easy' },
  { en: 'Class', uz: 'Sinf', tr: '/klæs/', dif: 'easy' },
  { en: 'Homework', uz: 'Uy vazifasi', tr: '/ˈhoʊmwɜːrk/', dif: 'medium' },
  { en: 'Exam', uz: 'Imtihon', tr: '/ɪɡˈzæm/', dif: 'medium' },
  { en: 'Question', uz: 'Savol', tr: '/ˈkwestʃən/', dif: 'easy' },
  { en: 'Answer', uz: 'Javob', tr: '/ˈænsər/', dif: 'easy' },
  { en: 'Example', uz: 'Misol', tr: '/ɪɡˈzæmpl/', dif: 'medium' },
  { en: 'Page', uz: 'Sahifa', tr: '/peɪdʒ/', dif: 'easy' },
  { en: 'Pen', uz: 'Qalam', tr: '/pen/', dif: 'easy' },
  { en: 'Pencil', uz: 'Qalam (qoralam)', tr: '/ˈpensl/', dif: 'medium' },
  { en: 'Subject', uz: 'Fan', tr: '/ˈsʌbdʒɪkt/', dif: 'medium' },
  { en: 'Language', uz: 'Til', tr: '/ˈlæŋɡwɪdʒ/', dif: 'medium' },
  { en: 'Grammar', uz: 'Grammatika', tr: '/ˈɡræmər/', dif: 'hard' },
  { en: 'Vocabulary', uz: 'So\'z boyligi', tr: '/vəˈkæbjəleri/', dif: 'hard' },
  { en: 'University', uz: 'Universitet', tr: '/ˌjuːnɪˈvɜːrsəti/', dif: 'medium' },
  { en: 'Library', uz: 'Kutubxona', tr: '/ˈlaɪbreri/', dif: 'medium' },
  { en: 'Nurse', uz: 'Hamshira', tr: '/nɜːrs/', dif: 'easy' },
  { en: 'Farmer', uz: 'Fermer', tr: '/ˈfɑːrmər/', dif: 'medium' },
  { en: 'Engineer', uz: 'Muhandis', tr: '/ˌendʒɪˈnɪr/', dif: 'medium' },
  { en: 'Lawyer', uz: 'Advokat', tr: '/ˈlɔːjər/', dif: 'medium' },
  { en: 'Police', uz: 'Politsiya', tr: '/pəˈliːs/', dif: 'medium' },
  { en: 'Fireman', uz: 'O\'t o\'chiruvchi', tr: '/ˈfaɪərmən/', dif: 'hard' },
  { en: 'Actor', uz: 'Aktyor', tr: '/ˈæktər/', dif: 'medium' },
  { en: 'Singer', uz: 'Qo\'shiqchi', tr: '/ˈsɪŋər/', dif: 'medium' },
  { en: 'Artist', uz: 'Rassom', tr: '/ˈɑːrtɪst/', dif: 'medium' },
  { en: 'Writer', uz: 'Yozuvchi', tr: '/ˈraɪtər/', dif: 'medium' },
  { en: 'Scientist', uz: 'Olim', tr: '/ˈsaɪəntɪst/', dif: 'medium' },
  { en: 'Chef', uz: 'Oshpaz', tr: '/ʃef/', dif: 'medium' },
  { en: 'Pilot', uz: 'Uchuvchi', tr: '/ˈpaɪlət/', dif: 'hard' },
  { en: 'Soldier', uz: 'Askar', tr: '/ˈsoʊldʒər/', dif: 'medium' },
  { en: 'Manager', uz: 'Menejer', tr: '/ˈmænɪdʒər/', dif: 'medium' },
  { en: 'Waiter', uz: 'Ofitsiant', tr: '/ˈweɪtər/', dif: 'medium' },
  { en: 'Secretary', uz: 'Kotiba', tr: '/ˈsekrəteri/', dif: 'hard' },
  { en: 'Tall', uz: 'Baland', tr: '/tɔːl/', dif: 'easy' },
  { en: 'Thin', uz: 'Ozg\'in', tr: '/θɪn/', dif: 'medium' },
  { en: 'Fat', uz: 'Semiz', tr: '/fæt/', dif: 'easy' },
  { en: 'Rich', uz: 'Boy', tr: '/rɪtʃ/', dif: 'medium' },
  { en: 'Poor', uz: 'Kambag\'al', tr: '/pʊr/', dif: 'medium' },
  { en: 'Clever', uz: 'Aqlli', tr: '/ˈklevər/', dif: 'medium' },
  { en: 'Kind', uz: 'Mehribon', tr: '/kaɪnd/', dif: 'medium' },
  { en: 'Brave', uz: 'Jasur', tr: '/breɪv/', dif: 'medium' },
  { en: 'Dangerous', uz: 'Xavfli', tr: '/ˈdeɪndʒərəs/', dif: 'hard' },
  { en: 'Dirty', uz: 'Iflos', tr: '/ˈdɜːrti/', dif: 'medium' },
  { en: 'Dark', uz: 'Qorong\'i', tr: '/dɑːrk/', dif: 'easy' },
  { en: 'Loud', uz: 'Baland ovozli', tr: '/laʊd/', dif: 'medium' },
  { en: 'Quiet', uz: 'Tinch', tr: '/ˈkwaɪət/', dif: 'medium' },
  { en: 'Empty', uz: 'Bo\'sh', tr: '/ˈempti/', dif: 'medium' },
  { en: 'Full', uz: 'To\'la', tr: '/fʊl/', dif: 'easy' },
  { en: 'Cheap', uz: 'Arzon', tr: '/tʃiːp/', dif: 'medium' },
  { en: 'Expensive', uz: 'Qimmat', tr: '/ɪkˈspensɪv/', dif: 'hard' },
  { en: 'Busy', uz: 'Band', tr: '/ˈbɪzi/', dif: 'medium' },
  { en: 'Different', uz: 'Har xil', tr: '/ˈdɪfrənt/', dif: 'medium' },
  { en: 'Same', uz: 'Bir xil', tr: '/seɪm/', dif: 'easy' },
  { en: 'Early', uz: 'Erta', tr: '/ˈɜːrli/', dif: 'easy' },
  { en: 'Late', uz: 'Kech', tr: '/leɪt/', dif: 'easy' },
  { en: 'Wrong', uz: 'Noto\'g\'ri', tr: '/rɔːŋ/', dif: 'medium' },
  { en: 'Right', uz: 'To\'g\'ri', tr: '/raɪt/', dif: 'easy' },
  { en: 'True', uz: 'Haqiqiy', tr: '/truː/', dif: 'easy' },
  { en: 'Simple', uz: 'Oddiy', tr: '/ˈsɪmpl/', dif: 'medium' },
  { en: 'Difficult', uz: 'Qiyin', tr: '/ˈdɪfɪkəlt/', dif: 'medium' },
  { en: 'Excellent', uz: 'A\'lo', tr: '/ˈeksələnt/', dif: 'hard' },
  { en: 'Wonderful', uz: 'Ajoyib', tr: '/ˈwʌndərfl/', dif: 'hard' },
  { en: 'Terrible', uz: 'Dahshatli', tr: '/ˈterəbl/', dif: 'medium' },
  { en: 'Strange', uz: 'G\'alati', tr: '/streɪndʒ/', dif: 'medium' },
  { en: 'Famous', uz: 'Mashhur', tr: '/ˈfeɪməs/', dif: 'medium' },
  { en: 'Popular', uz: 'Ommabop', tr: '/ˈpɑːpjələr/', dif: 'medium' },
  { en: 'Special', uz: 'Maxsus', tr: '/ˈspeʃl/', dif: 'medium' },
  { en: 'Necessary', uz: 'Zarur', tr: '/ˈnesəseri/', dif: 'hard' },
  { en: 'Favorite', uz: 'Sevimli', tr: '/ˈfeɪvərɪt/', dif: 'medium' },
  { en: 'Modern', uz: 'Zamonaviy', tr: '/ˈmɑːdərn/', dif: 'medium' },
  { en: 'Ancient', uz: 'Qadimiy', tr: '/ˈeɪnʃənt/', dif: 'hard' },
  { en: 'Do', uz: 'Qilmoq', tr: '/duː/', dif: 'easy' },
  { en: 'Make', uz: 'Yaratmoq', tr: '/meɪk/', dif: 'easy' },
  { en: 'Live', uz: 'Yashamoq', tr: '/lɪv/', dif: 'easy' },
  { en: 'Start', uz: 'Boshlamoq', tr: '/stɑːrt/', dif: 'medium' },
  { en: 'Finish', uz: 'Tugatmoq', tr: '/ˈfɪnɪʃ/', dif: 'medium' },
  { en: 'Stop', uz: 'To\'xtamoq', tr: '/stɑːp/', dif: 'easy' },
  { en: 'Move', uz: 'Harakatlanmoq', tr: '/muːv/', dif: 'medium' },
  { en: 'Turn', uz: 'Burilmoq', tr: '/tɜːrn/', dif: 'medium' },
  { en: 'Push', uz: 'Itarmoq', tr: '/pʊʃ/', dif: 'medium' },
  { en: 'Pull', uz: 'Tortmoq', tr: '/pʊl/', dif: 'medium' },
  { en: 'Throw', uz: 'Otmoq', tr: '/θroʊ/', dif: 'medium' },
  { en: 'Catch', uz: 'Ushlamoq', tr: '/kætʃ/', dif: 'medium' },
  { en: 'Jump', uz: 'Sakramoq', tr: '/dʒʌmp/', dif: 'easy' },
  { en: 'Kick', uz: 'Tepmoq', tr: '/kɪk/', dif: 'medium' },
  { en: 'Break', uz: 'Sindirmoq', tr: '/breɪk/', dif: 'medium' },
  { en: 'Fix', uz: 'Tuzatmoq', tr: '/fɪks/', dif: 'medium' },
  { en: 'Change', uz: 'O\'zgartirmoq', tr: '/tʃeɪndʒ/', dif: 'medium' },
  { en: 'Choose', uz: 'Tanlamoq', tr: '/tʃuːz/', dif: 'medium' },
  { en: 'Decide', uz: 'Qaror qilmoq', tr: '/dɪˈsaɪd/', dif: 'medium' },
  { en: 'Believe', uz: 'Ishonmoq', tr: '/bɪˈliːv/', dif: 'hard' },
  { en: 'Feel', uz: 'His qilmoq', tr: '/fiːl/', dif: 'medium' },
  { en: 'Touch', uz: 'Tegmoq', tr: '/tʌtʃ/', dif: 'medium' },
  { en: 'Taste', uz: 'Tatib ko\'rmoq', tr: '/teɪst/', dif: 'medium' },
  { en: 'Hear', uz: 'Eshitmoq', tr: '/hɪr/', dif: 'easy' },
  { en: 'Look', uz: 'Qaramoq', tr: '/lʊk/', dif: 'easy' },
  { en: 'Show', uz: 'Ko\'rsatmoq', tr: '/ʃoʊ/', dif: 'easy' },
  { en: 'Tell', uz: 'Aytmoq', tr: '/tel/', dif: 'easy' },
  { en: 'Explain', uz: 'Tushuntirmoq', tr: '/ɪkˈspleɪn/', dif: 'hard' },
  { en: 'Continue', uz: 'Davom etmoq', tr: '/kənˈtɪnjuː/', dif: 'hard' },
  { en: 'Try', uz: 'Urinmoq', tr: '/traɪ/', dif: 'easy' },
  { en: 'Hope', uz: 'Umid qilmoq', tr: '/hoʊp/', dif: 'medium' },
  { en: 'Wish', uz: 'Tilamoq', tr: '/wɪʃ/', dif: 'medium' },
  { en: 'Understand', uz: 'Tushunmoq', tr: '/ˌʌndərˈstænd/', dif: 'easy' },
  { en: 'Follow', uz: 'Ergashmoq', tr: '/ˈfɑːloʊ/', dif: 'medium' },
  { en: 'Copy', uz: 'Nusxalamoq', tr: '/ˈkɑːpi/', dif: 'medium' },
  { en: 'Enjoy', uz: 'Rohatlanmoq', tr: '/ɪnˈdʒɔɪ/', dif: 'medium' },
  { en: 'Hate', uz: 'Yomon ko\'rmoq', tr: '/heɪt/', dif: 'medium' },
  { en: 'Prefer', uz: 'Afzal ko\'rmoq', tr: '/prɪˈfɜːr/', dif: 'hard' },
  { en: 'Pay', uz: 'To\'lamoq', tr: '/peɪ/', dif: 'easy' },
  { en: 'Sell', uz: 'Sotmoq', tr: '/sel/', dif: 'easy' },
  { en: 'Spend', uz: 'Sarflamoq', tr: '/spend/', dif: 'medium' },
  { en: 'Save', uz: 'Tejamoq', tr: '/seɪv/', dif: 'medium' },
  { en: 'Return', uz: 'Qaytmoq', tr: '/rɪˈtɜːrn/', dif: 'medium' },
  { en: 'Happen', uz: 'Bo\'lmoq', tr: '/ˈhæpən/', dif: 'medium' },
  { en: 'Describe', uz: 'Tasvirlamoq', tr: '/dɪˈskraɪb/', dif: 'hard' },
  { en: 'Suggest', uz: 'Taklif qilmoq', tr: '/səˈdʒest/', dif: 'hard' },
  { en: 'Accept', uz: 'Qabul qilmoq', tr: '/əkˈsept/', dif: 'hard' },
  { en: 'Refuse', uz: 'Rad etmoq', tr: '/rɪˈfjuːz/', dif: 'hard' },
  { en: 'Agree', uz: 'Rozi bo\'lmoq', tr: '/əˈɡriː/', dif: 'hard' },
  { en: 'Promise', uz: 'Va\'da bermoq', tr: '/ˈprɑːmɪs/', dif: 'hard' },
  { en: 'Apologize', uz: 'Uzr so\'ramoq', tr: '/əˈpɑːlədʒaɪz/', dif: 'hard' },
  { en: 'Invite', uz: 'Taklif qilmoq', tr: '/ɪnˈvaɪt/', dif: 'hard' },
  { en: 'Celebrate', uz: 'Nishonlamoq', tr: '/ˈselɪbreɪt/', dif: 'hard' },
  { en: 'Cry', uz: 'Yig\'lamoq', tr: '/kraɪ/', dif: 'medium' },
  { en: 'Relax', uz: 'Dam olmoq', tr: '/rɪˈlæks/', dif: 'medium' },
  { en: 'Rest', uz: 'Dam olmoq', tr: '/rest/', dif: 'easy' },
  { en: 'Repeat', uz: 'Takrorlamoq', tr: '/rɪˈpiːt/', dif: 'hard' },
  { en: 'Practice', uz: 'Mashq qilmoq', tr: '/ˈpræktɪs/', dif: 'hard' },
  { en: 'Improve', uz: 'Yaxshilamoq', tr: '/ɪmˈpruːv/', dif: 'hard' },
  { en: 'Own', uz: 'Egalik qilmoq', tr: '/oʊn/', dif: 'hard' },
  { en: 'Rain', uz: 'Yomg\'ir', tr: '/reɪn/', dif: 'easy' },
  { en: 'Snow', uz: 'Qor', tr: '/snoʊ/', dif: 'easy' },
  { en: 'Wind', uz: 'Shamol', tr: '/wɪnd/', dif: 'easy' },
  { en: 'Cloud', uz: 'Bulut', tr: '/klaʊd/', dif: 'medium' },
  { en: 'Sky', uz: 'Osmon', tr: '/skaɪ/', dif: 'easy' },
  { en: 'Star', uz: 'Yulduz', tr: '/stɑːr/', dif: 'easy' },
  { en: 'Earth', uz: 'Yer', tr: '/ɜːrθ/', dif: 'easy' },
  { en: 'Fire', uz: 'Olov', tr: '/ˈfaɪər/', dif: 'easy' },
  { en: 'Ice', uz: 'Muz', tr: '/aɪs/', dif: 'easy' },
  { en: 'Sea', uz: 'Dengiz', tr: '/siː/', dif: 'easy' },
  { en: 'Lake', uz: 'Ko\'l', tr: '/leɪk/', dif: 'medium' },
  { en: 'Island', uz: 'Orol', tr: '/ˈaɪlənd/', dif: 'medium' },
  { en: 'Forest', uz: 'O\'rmon', tr: '/ˈfɔːrɪst/', dif: 'medium' },
  { en: 'Desert', uz: 'Cho\'l', tr: '/ˈdezərt/', dif: 'medium' },
  { en: 'Field', uz: 'Dala', tr: '/fiːld/', dif: 'medium' },
  { en: 'Hill', uz: 'Tepalik', tr: '/hɪl/', dif: 'medium' },
  { en: 'Valley', uz: 'Vodiy', tr: '/ˈvæli/', dif: 'hard' },
  { en: 'Cave', uz: 'G\'or', tr: '/keɪv/', dif: 'medium' },
  { en: 'Stone', uz: 'Tosh', tr: '/stoʊn/', dif: 'medium' },
  { en: 'Sand', uz: 'Qum', tr: '/sænd/', dif: 'medium' },
  { en: 'Ground', uz: 'Tuproq', tr: '/ɡraʊnd/', dif: 'medium' },
  { en: 'Air', uz: 'Havo', tr: '/er/', dif: 'easy' },
  { en: 'Space', uz: 'Kosmos', tr: '/speɪs/', dif: 'medium' },
  { en: 'Week', uz: 'Hafta', tr: '/wiːk/', dif: 'easy' },
  { en: 'Month', uz: 'Oy', tr: '/mʌnθ/', dif: 'easy' },
  { en: 'Year', uz: 'Yil', tr: '/jɪr/', dif: 'easy' },
  { en: 'Hour', uz: 'Soat', tr: '/ˈaʊər/', dif: 'easy' },
  { en: 'Minute', uz: 'Daqiqa', tr: '/ˈmɪnɪt/', dif: 'medium' },
  { en: 'Second', uz: 'Sekund', tr: '/ˈsekənd/', dif: 'easy' },
  { en: 'Today', uz: 'Bugun', tr: '/təˈdeɪ/', dif: 'easy' },
  { en: 'Tomorrow', uz: 'Ertaga', tr: '/təˈmɔːroʊ/', dif: 'easy' },
  { en: 'Yesterday', uz: 'Kecha', tr: '/ˈjestərdeɪ/', dif: 'medium' },
  { en: 'Weekend', uz: 'Dam olish kuni', tr: '/ˈwiːkend/', dif: 'medium' },
  { en: 'Holiday', uz: 'Bayram', tr: '/ˈhɑːlədeɪ/', dif: 'medium' },
  { en: 'Season', uz: 'Fasl', tr: '/ˈsiːzn/', dif: 'medium' },
  { en: 'Spring', uz: 'Bahor', tr: '/sprɪŋ/', dif: 'medium' },
  { en: 'Summer', uz: 'Yoz', tr: '/ˈsʌmər/', dif: 'easy' },
  { en: 'Autumn', uz: 'Kuz', tr: '/ˈɔːtəm/', dif: 'medium' },
  { en: 'Winter', uz: 'Qish', tr: '/ˈwɪntər/', dif: 'easy' },
  { en: 'Monday', uz: 'Dushanba', tr: '/ˈmʌndeɪ/', dif: 'medium' },
  { en: 'Tuesday', uz: 'Seshanba', tr: '/ˈtuːzdeɪ/', dif: 'medium' },
  { en: 'Wednesday', uz: 'Chorshanba', tr: '/ˈwenzdeɪ/', dif: 'hard' },
  { en: 'Thursday', uz: 'Payshanba', tr: '/ˈθɜːrzdeɪ/', dif: 'hard' },
  { en: 'Friday', uz: 'Juma', tr: '/ˈfraɪdeɪ/', dif: 'easy' },
  { en: 'Saturday', uz: 'Shanba', tr: '/ˈsætərdeɪ/', dif: 'medium' },
  { en: 'Sunday', uz: 'Yakshanba', tr: '/ˈsʌndeɪ/', dif: 'easy' },
  { en: 'Six', uz: 'Olti', tr: '/sɪks/', dif: 'easy' },
  { en: 'Seven', uz: 'Yetti', tr: '/ˈsevn/', dif: 'easy' },
  { en: 'Eight', uz: 'Sakkiz', tr: '/eɪt/', dif: 'easy' },
  { en: 'Nine', uz: 'To\'qqiz', tr: '/naɪn/', dif: 'easy' },
  { en: 'Zero', uz: 'Nol', tr: '/ˈzɪroʊ/', dif: 'easy' },
  { en: 'Hundred', uz: 'Yuz', tr: '/ˈhʌndrəd/', dif: 'medium' },
  { en: 'Thousand', uz: 'Ming', tr: '/ˈθaʊznd/', dif: 'medium' },
  { en: 'Million', uz: 'Million', tr: '/ˈmɪljən/', dif: 'medium' },
  { en: 'Pink', uz: 'Pushti', tr: '/pɪŋk/', dif: 'easy' },
  { en: 'Purple', uz: 'Binafsha', tr: '/ˈpɜːrpl/', dif: 'medium' },
  { en: 'Brown', uz: 'Jigarrang', tr: '/braʊn/', dif: 'medium' },
  { en: 'Gray', uz: 'Kulrang', tr: '/ɡreɪ/', dif: 'medium' },
  { en: 'Idea', uz: 'G\'oya', tr: '/aɪˈdiːə/', dif: 'medium' },
  { en: 'Problem', uz: 'Muammo', tr: '/ˈprɑːbləm/', dif: 'easy' },
  { en: 'Reason', uz: 'Sabab', tr: '/ˈriːzn/', dif: 'medium' },
  { en: 'Result', uz: 'Natija', tr: '/rɪˈzʌlt/', dif: 'medium' },
  { en: 'End', uz: 'Tugash', tr: '/end/', dif: 'easy' },
  { en: 'Beginning', uz: 'Boshlanish', tr: '/bɪˈɡɪnɪŋ/', dif: 'hard' },
  { en: 'Middle', uz: 'O\'rta', tr: '/ˈmɪdl/', dif: 'medium' },
  { en: 'Part', uz: 'Qism', tr: '/pɑːrt/', dif: 'easy' },
  { en: 'Group', uz: 'Guruh', tr: '/ɡruːp/', dif: 'medium' },
  { en: 'Team', uz: 'Jamoa', tr: '/tiːm/', dif: 'medium' },
  { en: 'Game', uz: 'O\'yin', tr: '/ɡeɪm/', dif: 'easy' },
  { en: 'Sport', uz: 'Sport', tr: '/spɔːrt/', dif: 'easy' },
  { en: 'Ball', uz: 'To\'p', tr: '/bɔːl/', dif: 'easy' },
  { en: 'Toy', uz: 'O\'yinchoq', tr: '/tɔɪ/', dif: 'easy' },
  { en: 'Gift', uz: 'Sovg\'a', tr: '/ɡɪft/', dif: 'easy' },
  { en: 'Picture', uz: 'Rasm', tr: '/ˈpɪktʃər/', dif: 'easy' },
  { en: 'Photo', uz: 'Surat', tr: '/ˈfoʊtoʊ/', dif: 'easy' },
  { en: 'Newspaper', uz: 'Gazeta', tr: '/ˈnuːzpeɪpər/', dif: 'medium' },
  { en: 'Magazine', uz: 'Jurnal', tr: '/ˈmæɡəziːn/', dif: 'hard' },
  { en: 'Map', uz: 'Xarita', tr: '/mæp/', dif: 'medium' },
  { en: 'Wallet', uz: 'Hamyon', tr: '/ˈwɑːlɪt/', dif: 'medium' },
  { en: 'Dream', uz: 'Tush', tr: '/driːm/', dif: 'medium' },
  { en: 'Neighbor', uz: 'Qo\'shni', tr: '/ˈneɪbər/', dif: 'medium' },
  { en: 'Guest', uz: 'Mehmon', tr: '/ɡest/', dif: 'medium' },
  { en: 'Colleague', uz: 'Hamkasb', tr: '/ˈkɑːliːɡ/', dif: 'hard' },
  { en: 'Boss', uz: 'Rahbar', tr: '/bɔːs/', dif: 'medium' },
  { en: 'Customer', uz: 'Mijoz', tr: '/ˈkʌstəmər/', dif: 'hard' },
  { en: 'Price', uz: 'Narx', tr: '/praɪs/', dif: 'medium' },
  { en: 'Address', uz: 'Manzil', tr: '/əˈdres/', dif: 'medium' },
  { en: 'Number', uz: 'Raqam', tr: '/ˈnʌmbər/', dif: 'easy' },
  { en: 'Name', uz: 'Ism', tr: '/neɪm/', dif: 'easy' },
  { en: 'Age', uz: 'Yosh', tr: '/eɪdʒ/', dif: 'medium' },
  { en: 'World', uz: 'Dunyo', tr: '/wɜːrld/', dif: 'easy' },
  { en: 'Peace', uz: 'Tinchlik', tr: '/piːs/', dif: 'medium' },
  { en: 'War', uz: 'Urush', tr: '/wɔːr/', dif: 'medium' },
  { en: 'Freedom', uz: 'Erkinlik', tr: '/ˈfriːdəm/', dif: 'hard' },
  { en: 'Mind', uz: 'Aql', tr: '/maɪnd/', dif: 'medium' },
  { en: 'Brain', uz: 'Miya', tr: '/breɪn/', dif: 'medium' },
  { en: 'Blood', uz: 'Qon', tr: '/blʌd/', dif: 'medium' },
  { en: 'Bone', uz: 'Suyak', tr: '/boʊn/', dif: 'medium' },
  { en: 'Fever', uz: 'Isitma', tr: '/ˈfiːvər/', dif: 'medium' },
  { en: 'Medicine', uz: 'Dori', tr: '/ˈmedɪsn/', dif: 'medium' },
  { en: 'Hospital', uz: 'Kasalxona', tr: '/ˈhɑːspɪtl/', dif: 'medium' },
  { en: 'Pain', uz: 'Og\'riq', tr: '/peɪn/', dif: 'medium' },
  { en: 'Future', uz: 'Kelajak', tr: '/ˈfjuːtʃər/', dif: 'medium' },
  { en: 'Past', uz: 'O\'tmish', tr: '/pæst/', dif: 'medium' },
  { en: 'Memory', uz: 'Xotira', tr: '/ˈmeməri/', dif: 'medium' },
  { en: 'Culture', uz: 'Madaniyat', tr: '/ˈkʌltʃər/', dif: 'medium' },
  { en: 'History', uz: 'Tarix', tr: '/ˈhɪstri/', dif: 'medium' },
  { en: 'News', uz: 'Yangiliklar', tr: '/nuːz/', dif: 'medium' },
  { en: 'Film', uz: 'Kino', tr: '/fɪlm/', dif: 'medium' },
  { en: 'Song', uz: 'Qo\'shiq', tr: '/sɔːŋ/', dif: 'easy' },
  { en: 'Painting', uz: 'Rasm (surat)', tr: '/ˈpeɪntɪŋ/', dif: 'hard' },
  { en: 'Tool', uz: 'Asbob', tr: '/tuːl/', dif: 'medium' },
  { en: 'Machine', uz: 'Mashina (mexanizm)', tr: '/məˈʃiːn/', dif: 'medium' },
  { en: 'Engine', uz: 'Dvigatel', tr: '/ˈendʒɪn/', dif: 'hard' },
  { en: 'Light', uz: 'Yorug\'lik', tr: '/laɪt/', dif: 'easy' },
  { en: 'Shadow', uz: 'Soya', tr: '/ˈʃædoʊ/', dif: 'medium' },
  { en: 'Color', uz: 'Rang', tr: '/ˈkʌlər/', dif: 'easy' },
  { en: 'Share', uz: 'Ulashmoq', tr: '/ʃer/', dif: 'medium' },
  { en: 'Danger', uz: 'Xavf', tr: '/ˈdeɪndʒər/', dif: 'medium' },
  { en: 'Wheel', uz: 'G\'ildirak', tr: '/wiːl/', dif: 'medium' },
  { en: 'Smoke', uz: 'Tutun', tr: '/smoʊk/', dif: 'medium' },
  { en: 'Voice', uz: 'Ovoz', tr: '/vɔɪs/', dif: 'easy' },
  { en: 'Sound', uz: 'Tovush', tr: '/saʊnd/', dif: 'medium' },
  { en: 'Silence', uz: 'Jimjitlik', tr: '/ˈsaɪləns/', dif: 'hard' },
  { en: 'Knowledge', uz: 'Bilim', tr: '/ˈnɑːlɪdʒ/', dif: 'hard' },
  { en: 'Experience', uz: 'Tajriba', tr: '/ɪkˈspɪriəns/', dif: 'hard' },
  { en: 'Success', uz: 'Muvaffaqiyat', tr: '/səkˈses/', dif: 'hard' },
  { en: 'Failure', uz: 'Muvaffaqiyatsizlik', tr: '/ˈfeɪljər/', dif: 'hard' },
  { en: 'Chance', uz: 'Imkoniyat', tr: '/tʃæns/', dif: 'medium' },
  { en: 'Truth', uz: 'Haqiqat', tr: '/truːθ/', dif: 'hard' },
  { en: 'Power', uz: 'Kuch', tr: '/ˈpaʊər/', dif: 'medium' },
  { en: 'Energy', uz: 'Energiya', tr: '/ˈenərdʒi/', dif: 'medium' },
  { en: 'Secret', uz: 'Sir', tr: '/ˈsiːkrət/', dif: 'medium' },
  { en: 'Journey', uz: 'Sayohat', tr: '/ˈdʒɜːrni/', dif: 'hard' },
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
          <span className="card-uz">{word.uz}</span>
          <div className="card-actions">
            <button
              className="speak-btn"
              title="Talaffuzni eshitish"
              onClick={(e) => { e.stopPropagation(); speak(word.en) }}
            >
              🔊
            </button>
            <span className="card-hint">⤵ tarjimasi</span>
          </div>
        </div>
        <div className="card-face card-back">
          <span className="card-en">{word.en}</span>
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
  const [view, setView] = useState('card')
  const [query, setQuery] = useState('')
  const DIFF = { Oson: 'easy', 'O\'rta': 'medium', Qiyin: 'hard' }
  const DIFF_LABEL = { easy: 'Oson', medium: 'O\'rta', hard: 'Qiyin' }
  const list = (cat === 'Barchasi' ? WORDS : WORDS.filter((w) => w.dif === DIFF[cat]))
    .filter((w) => {
      const q = query.trim().toLowerCase()
      if (!q) return true
      return w.en.toLowerCase().includes(q) || w.uz.toLowerCase().includes(q)
    })

  return (
    <section className="page">
      <div className="page-head">
        <h2>So'zlar</h2>
        <p>Tarjimasi bilan ko'ring, 🔊 tugmasi bilan talaffuzini eshiting.</p>
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
      <div className="words-toolbar">
        <div className="view-toggle">
          <button className={`chip ${view === 'card' ? 'active' : ''}`} onClick={() => setView('card')}>🃏 Kartochkalar</button>
          <button className={`chip ${view === 'list' ? 'active' : ''}`} onClick={() => setView('list')}>📋 Ro'yxat</button>
        </div>
        <input
          className="words-search"
          type="search"
          placeholder="Qidirish: inglizcha yoki o'zbekcha..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {view === 'card' ? (
        <div className="cards-grid">
          {list.map((w) => (
            <Flashcard key={w.en + w.uz} word={w} />
          ))}
        </div>
      ) : (
        <div className="words-table-wrap">
          <table className="words-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Inglizcha</th>
                <th>Talaffuz</th>
                <th>O'zbekcha</th>
                <th>Daraja</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {list.map((w, i) => (
                <tr key={w.en + w.uz}>
                  <td>{i + 1}</td>
                  <td className="wt-en">{w.en}</td>
                  <td className="wt-tr">{w.tr}</td>
                  <td className="wt-uz">{w.uz}</td>
                  <td><span className={`badge badge-${w.dif}`}>{DIFF_LABEL[w.dif]}</span></td>
                  <td>
                    <button className="icon-btn" title="Talaffuzni eshitish" onClick={() => speak(w.en)}>🔊</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {list.length === 0 && <p className="words-empty">Hech narsa topilmadi 🤷</p>}
        </div>
      )}
      <p className="hero-count">Ko'rsatilmoqda: {list.length} ta so'z</p>
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