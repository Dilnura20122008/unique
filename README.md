# Unique Service — Premium Avto Xizmat (Next.js)

To'liq ishlaydigan avtomobil detayling xizmati saytini o'z ichiga oladi: bosh sahifa (UZ/RU tillar), xizmatlar, galereya, online yozilish formasi, kontaktlar va **admin panel**.

Полностью рабочий сайт автодетейлинг сервиса: главная страница (UZ/RU языки), услуги, галерея, форма онлайн-записи, контакты и **админ-панель**.

---

## 1. O'rnatish / Установка

```bash
npm install
```

## 2. Sozlash / Настройка (ixtiyoriy / необязательно)

`.env.example` faylini `.env.local` nomiga ko'chiring va admin login/parolni o'zgartiring:

Скопируйте `.env.example` в `.env.local` и измените логин/пароль администратора:

```bash
cp .env.example .env.local
```

```
ADMIN_USERNAME=admin
ADMIN_PASSWORD=unique2026
JWT_SECRET=har-qanday-uzun-tasodifiy-matn
```

Agar `.env.local` yaratilmasa, standart login/parol ishlatiladi: **admin / unique2026**

Если `.env.local` не создан, используются логин/пароль по умолчанию: **admin / unique2026**

## 3. Ishga tushirish (development) / Запуск для разработки

```bash
npm run dev
```

Sayt: http://localhost:3000
Admin panel: http://localhost:3000/admin

## 4. Production uchun / Для продакшена

```bash
npm run build
npm run start
```

---

## Tuzilma / Структура

- `app/page.js` — bosh sahifa (barcha bo'limlar shu yerda yig'iladi)
- `components/` — Header, Hero, Gallery, Services, Contact, Footer va h.k.
- `components/admin/` — admin panel bo'limlari (Xizmatlar, Galereya, Buyurtmalar, Sozlamalar)
- `app/api/` — services, gallery, contact, bookings, auth uchun API endpointlar
- `data/*.json` — barcha ma'lumotlar shu yerda saqlanadi (fayl-baza). Admin paneldagi har qanday o'zgarish shu fayllarga yoziladi.
- `lib/translations.js` — UZ/RU tarjimalar lug'ati

## Admin panel imkoniyatlari / Возможности админ-панели

- **Xizmatlar / Услуги** — xizmat qo'shish, tahrirlash, o'chirish (nom, tavsif UZ/RU, ikonka, rasm)
- **Galereya / Галерея** — rasm qo'shish/o'chirish, kategoriya bo'yicha (salon, yuvish, polirovka, tonirovka, boshqa)
- **Buyurtmalar / Заявки** — saytdan kelgan "Online yozilish" arizalarini ko'rish, holatini belgilash (yangi / bog'lanildi / bajarildi), o'chirish
- **Sozlamalar / Настройки** — telefon raqamlari, telegram, instagram, manzil, xarita koordinatalari va statistika (10+ yil, 6000+ mijoz va h.k.)

## Muhim eslatma / Важное примечание

Bu loyihada ma'lumotlar oddiy JSON fayllarda saqlanadi (`data/` papkasi). Bu local yoki oddiy VPS/server muhitida (`npm run start`) mukammal ishlaydi. Agar sayt Vercel kabi "serverless" platformaga joylansa, fayl yozish doimiy saqlanmasligi mumkin — bunday holatda ma'lumotlar bazasiga (masalan, Postgres, Supabase) o'tish tavsiya etiladi.

Данные в этом проекте хранятся в обычных JSON-файлах (папка `data/`). Это отлично работает локально или на обычном сервере/VPS (`npm run start`). При деплое на serverless-платформы (например, Vercel) запись в файлы может не сохраняться постоянно — в этом случае рекомендуется перейти на настоящую базу данных (Postgres, Supabase и т.д.).
