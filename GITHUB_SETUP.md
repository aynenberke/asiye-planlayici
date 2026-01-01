# 🚀 GitHub'a Yükleme Rehberi

## Adım 1: GitHub Repository Oluştur

1. [github.com/new](https://github.com/new) adresine git
2. Repository adı: `asiye-planlayici` (veya istediğin bir isim)
3. **Public** veya **Private** seç (istediğin gibi)
4. **Initialize this repository with:** Hiçbirini işaretleme (README, .gitignore, license)
5. **Create repository** butonuna tıkla

## Adım 2: Terminal'de Git Komutları

Proje klasöründe (Desktop/Asiye Çalışma) şu komutları çalıştır:

```bash
# Git repository başlat (eğer yoksa)
git init

# Tüm dosyaları ekle
git add .

# İlk commit yap
git commit -m "Initial commit - Asiye'nin Planı"

# Main branch'e geç
git branch -M main

# GitHub repository'ni ekle (KULLANICI_ADIN yerine aynenberke yazacaksın)
git remote add origin https://github.com/aynenberke/asiye-planlayici.git

# GitHub'a yükle
git push -u origin main
```

**Not:** Eğer daha önce git init yaptıysan, sadece şu komutları çalıştır:
```bash
git add .
git commit -m "Initial commit - Asiye'nin Planı"
git branch -M main
git remote add origin https://github.com/aynenberke/asiye-planlayici.git
git push -u origin main
```

## Adım 3: Vercel'e Deploy

1. [vercel.com](https://vercel.com) adresine git
2. **Sign Up** ile GitHub hesabınla giriş yap
3. **Add New Project** butonuna tıkla
4. GitHub'dan `asiye-planlayici` repository'sini seç
5. Ayarları olduğu gibi bırak (Next.js otomatik algılanır)
6. **Deploy** butonuna tıkla
7. 1-2 dakika bekle
8. URL'yi al (örn: `https://asiye-planlayici.vercel.app`)

## Adım 4: iPhone'da Ana Ekrana Ekle

1. iPhone Safari'de URL'yi aç
2. Alt kısımdaki **Paylaş** ikonuna bas (Kare + yukarı ok)
3. Aşağı kaydır, **"Ana Ekrana Ekle"** seçeneğini bul
4. İsim: **"Asiye'nin Planı"**
5. **Ekle** butonuna tıkla

## ⚠️ npm install Hatası İçin Çözüm

Eğer `npm install` hatası alıyorsan, şu çözümleri dene:

### Çözüm 1: npm cache temizle
```bash
npm cache clean --force
npm install
```

### Çözüm 2: node_modules sil ve yeniden yükle
```bash
rm -rf node_modules package-lock.json
npm install
```

### Çözüm 3: nvm kullan (Node Version Manager)
```bash
# nvm yükle (eğer yoksa)
# Sonra:
nvm install 18
nvm use 18
npm install
```

### Çözüm 4: Vercel otomatik yükler
Vercel deploy ederken otomatik olarak `npm install` çalıştırır, senin bilgisayarında çalışmasa bile Vercel'de çalışacak.

## ✅ Kontrol Listesi

- [ ] GitHub repository oluşturuldu
- [ ] Kodlar GitHub'a push edildi
- [ ] Vercel'de deploy edildi
- [ ] URL çalışıyor
- [ ] iPhone'da ana ekrana eklendi
- [ ] Uygulama tam ekran açılıyor

## 🆘 Sorun mu var?

Eğer bir sorun yaşarsan:
1. Terminal'deki hata mesajını kontrol et
2. GitHub'da repository'nin oluştuğundan emin ol
3. Vercel logs'larına bak (Vercel dashboard'da)
4. Browser console'da hata var mı kontrol et

