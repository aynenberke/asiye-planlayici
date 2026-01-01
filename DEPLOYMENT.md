# 🚀 Deployment Rehberi - Asiye'nin Planı

## Vercel'e Deploy Etme (Önerilen - En Kolay)

### Adım 1: GitHub'a Yükle
1. GitHub'da yeni bir repository oluştur
2. Terminal'de şu komutları çalıştır:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/KULLANICI_ADIN/repo-adı.git
git push -u origin main
```

### Adım 2: Vercel'e Bağla
1. [vercel.com](https://vercel.com) adresine git
2. "Sign Up" ile GitHub hesabınla giriş yap
3. "Add New Project" butonuna tıkla
4. GitHub repository'ni seç
5. Ayarlar:
   - **Framework Preset**: Next.js
   - **Root Directory**: `./` (boş bırak)
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next` (otomatik algılanır)
6. "Deploy" butonuna tıkla

### Adım 3: Custom Domain (Opsiyonel)
- Vercel otomatik olarak bir URL verir (örn: `asiye-planlayici.vercel.app`)
- İstersen Settings > Domains'den özel domain ekleyebilirsin

---

## Netlify'a Deploy Etme (Alternatif)

### Adım 1: Netlify CLI ile
```bash
# Netlify CLI yükle
npm install -g netlify-cli

# Build oluştur
npm run build

# Netlify'a deploy et
netlify deploy --prod
```

### Adım 2: Netlify Dashboard ile
1. [netlify.com](https://netlify.com) adresine git
2. GitHub hesabınla giriş yap
3. "Add new site" > "Import an existing project"
4. GitHub repository'ni seç
5. Build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `.next`
6. "Deploy site" butonuna tıkla

---

## 📱 iPhone'da "Ana Ekrana Ekle" İşlemi

### Adım 1: Uygulamayı Safari'de Aç
1. iPhone'un Safari uygulamasını aç
2. Deploy ettiğin URL'yi yaz (örn: `https://asiye-planlayici.vercel.app`)

### Adım 2: Ana Ekrana Ekle
1. Alttaki **Paylaş** ikonuna bas (Kare içinde yukarı ok)
2. Aşağı kaydır
3. **"Ana Ekrana Ekle"** (Add to Home Screen) seçeneğini bul ve tıkla
4. İsim olarak **"Asiye'nin Planı"** yaz (otomatik doldurulmuş olabilir)
5. **"Ekle"** butonuna tıkla

### Adım 3: Sonuç
- Uygulama ana ekranda bir ikon olarak görünecek
- Tıklayınca Safari adres çubuğu **olmayacak**
- Tam ekran, native app gibi çalışacak
- Pembe status bar ile güzel görünecek

---

## ✅ Kontrol Listesi

Deploy'dan sonra kontrol et:
- [ ] Uygulama açılıyor mu?
- [ ] PWA manifest çalışıyor mu? (Developer Tools > Application > Manifest)
- [ ] İkonlar görünüyor mu? (192x192 ve 512x512 PNG dosyaları gerekli)
- [ ] Theme color doğru mu? (Toz pembe: #ec4899)
- [ ] "Ana Ekrana Ekle" çalışıyor mu? (iOS Safari'de)

---

## 🎨 İkon Dosyaları

Eğer ikonlar yoksa, `/public/` klasörüne ekle:
- `icon-192.png` (192x192 piksel)
- `icon-512.png` (512x512 piksel)

Basit bir pembe ikon bile yeterli. Online icon generator kullanabilirsin:
- [PWA Asset Generator](https://github.com/elegantapp/pwa-asset-generator)
- [Favicon Generator](https://realfavicongenerator.net/)

---

## 🔧 Sorun Giderme

**Sorun**: "Ana Ekrana Ekle" görünmüyor
- **Çözüm**: HTTPS kullanıldığından emin ol (Vercel/Netlify otomatik sağlar)

**Sorun**: Uygulama açılmıyor
- **Çözüm**: Console'da hata var mı kontrol et, `npm run build` lokal'de çalışıyor mu?

**Sorun**: İkonlar görünmüyor
- **Çözüm**: `manifest.json`'daki icon path'lerini kontrol et, dosyalar `/public/` klasöründe olmalı

---

## 📞 Destek

Deploy sırasında sorun yaşarsan:
1. Vercel/Netlify logs'larını kontrol et
2. Browser console'da hata var mı bak
3. Local build'i test et: `npm run build && npm start`

