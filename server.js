const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = 4000;

// MongoDB bağlantısı
mongoose.connect('mongodb://localhost:27017/doctorDB', {
    // useNewUrlParser: true, // Kaldırıldı
    // useUnifiedTopology: true // Kaldırıldı
}).then(() => console.log('MongoDB bağlantısı başarılı!'))
.catch(err => console.error('MongoDB bağlantı hatası:', err));

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public')); // Statik dosyalar için

// Veritabanı şeması
const messageSchema = new mongoose.Schema({
    name: String,
    tc: String,
    phone: String,
    message: String
});

const Message = mongoose.model('Message', messageSchema);

// Mesaj gönderim endpoint'i
app.post('/send-message', (req, res) => {
    const { name, tc, phone, message } = req.body;

    const newMessage = new Message({
        name: name,
        tc: tc,
        phone: phone,
        message: message
    });

    newMessage.save()
    .then(() => {
        console.log(`Mesaj kaydedildi: ${name}, TC: ${tc}, Telefon: ${phone}, Mesaj: ${message}`);
        res.send('Mesaj alındı!');
    })
    .catch(err => {
        console.error('Mesaj kaydedilemedi:', err);
        res.status(500).send('Mesaj kaydedilemedi.');
    });
});

// Sunucu başlatma
app.listen(PORT, () => {
    console.log(`Sunucu ${PORT} portunda çalışıyor.`);
});
// Sayfa kaydırma işlevi
