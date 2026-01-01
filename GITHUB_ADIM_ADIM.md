# 🚀 GitHub'a Yükleme - Adım Adım Rehber

## ⚠️ ÖNEMLİ: Terminal'de şu komutları sırayla çalıştır!

---

## ADIM 1: GitHub'da Repository Oluştur

1. **Web tarayıcıda şu adrese git:**
   ```
   https://github.com/new
   ```

2. **Repository ayarları:**
   - **Repository name:** `asiye-planlayici` (veya istediğin başka bir isim)
   - **Description:** (boş bırakabilirsin)
   - **Public** veya **Private** seç (istediğin gibi)
   - **⚠️ ÖNEMLİ:** "Add a README file" seçeneğini İŞARETLEME!
   - **⚠️ ÖNEMLİ:** "Add .gitignore" seçeneğini İŞARETLEME!
   - **⚠️ ÖNEMLİ:** "Choose a license" seçeneğini İŞARETLEME!
   - Hepsi boş olmalı!

3. **"Create repository" butonuna tıkla**

4. **Açılan sayfada hiçbir şey yapma, sadece URL'yi kopyala** (ileride lazım olacak)

---

## ADIM 2: Terminal'i Aç

**Mac'te Terminal'i aç:**
- `Command + Space` tuşlarına bas
- "Terminal" yaz ve Enter'a bas
- VEYA: Applications > Utilities > Terminal

---

## ADIM 3: Proje Klasörüne Git

**Terminal'de şu komutu yaz ve Enter'a bas:**

```bash
cd "/Users/aynenberke/Desktop/Asiye Çalışma"
```

**Not:** Eğer farklı bir klasördeyse, o klasörün tam yolunu yaz.

---

## ADIM 4: Git Remote URL'yi Düzelt

**Eski remote'u sil ve yeni ekle (şu 2 komutu sırayla çalıştır):**

```bash
git remote remove origin
```

```bash
git remote add origin https://github.com/aynenberke/asiye-planlayici.git
```

**⚠️ NOT:** Eğer repository adını farklı bir şey yaptıysan, `asiye-planlayici` kısmını değiştir!

**Kontrol et:**
```bash
git remote -v
```

**Şunu görmeli:**
```
origin  https://github.com/aynenberke/asiye-planlayici.git (fetch)
origin  https://github.com/aynenberke/asiye-planlayici.git (push)
```

---

## ADIM 5: Tüm Dosyaları Git'e Ekle

```bash
git add .
```

**Bu komut tüm dosyaları staging area'ya ekler.**

---

## ADIM 6: Commit Yap

```bash
git commit -m "Initial commit - Asiye'nin Planı"
```

**Bu komut değişiklikleri kaydeder.**

---

## ADIM 7: Branch'i Main Yap (Eğer değilse)

```bash
git branch -M main
```

---

## ADIM 8: GitHub'a Push Et

```bash
git push -u origin main
```

**⚠️ Bu komutta GitHub kullanıcı adı ve şifre isteyebilir:**

### GitHub Şifre Hatası Alırsan:

1. **GitHub'da Personal Access Token oluştur:**
   - https://github.com/settings/tokens adresine git
   - "Generate new token" > "Generate new token (classic)" tıkla
   - **Note:** `Vercel Deployment` yaz
   - **Expiration:** 90 days seç (veya istediğin süre)
   - **Scopes:** Sadece `repo` seçeneğini işaretle
   - "Generate token" tıkla
   - **⚠️ ÖNEMLİ:** Token'ı kopyala (bir daha göremeyeceksin!)

2. **Push yaparken şifre yerine token kullan:**
   ```bash
   git push -u origin main
   ```
   - **Username:** `aynenberke`
   - **Password:** (Şifre değil, az önce kopyaladığın token'ı yapıştır)

---

## ADIM 9: Kontrol Et

**GitHub'a git:**
```
https://github.com/aynenberke/asiye-planlayici
```

**Dosyaların görünmesi gerekir!**

---

## ✅ BAŞARILI!

Artık kodlar GitHub'da! Şimdi Vercel'e deploy edebilirsin.

---

## 🚀 Vercel'e Deploy

1. **https://vercel.com** adresine git
2. **"Sign Up"** ile GitHub hesabınla giriş yap
3. **"Add New Project"** butonuna tıkla
4. **`asiye-planlayici`** repository'sini seç
5. **Ayarları olduğu gibi bırak** (Next.js otomatik algılanır)
6. **"Deploy"** butonuna tıkla
7. **1-2 dakika bekle**
8. **URL'yi al** (örn: `https://asiye-planlayici.vercel.app`)

---

## 📱 iPhone'da Kullanım

1. **Safari'de Vercel URL'sini aç**
2. **Alt kısımdaki Paylaş ikonuna bas** (Kare + yukarı ok)
3. **Aşağı kaydır, "Ana Ekrana Ekle"** seçeneğini bul
4. **İsim:** `Asiye'nin Planı`
5. **"Ekle"** butonuna tıkla

---

## 🆘 Sorun mu var?

**Terminal'de hata alırsan, hata mesajını kopyalayıp gönder!**

**Yaygın hatalar:**

1. **"fatal: not a git repository"**
   - Çözüm: `git init` komutunu çalıştır

2. **"fatal: remote origin already exists"**
   - Çözüm: `git remote remove origin` sonra tekrar `git remote add origin ...`

3. **"Permission denied"**
   - Çözüm: Personal Access Token kullan (yukarıda anlatıldı)

4. **"Branch 'main' set up to track 'origin/main'"**
   - Bu hata değil, başarılı mesajı! Devam edebilirsin.

