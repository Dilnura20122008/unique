// Telegram bot orqali admin panelga xabar yuborish uchun yordamchi funksiya.
// .env fayliga quyidagilarni qo'shing:
//   TELEGRAM_BOT_TOKEN=123456789:AAExampleBotTokenHere
//   TELEGRAM_CHAT_ID=123456789
//
// TELEGRAM_BOT_TOKEN ni olish: @BotFather ga /newbot yuboring.
// TELEGRAM_CHAT_ID ni olish: botga /start bosing, keyin shu manzilga kiring:
//   https://api.telegram.org/bot<TOKEN>/getUpdates
// va javobdagi "chat":{"id":...} qiymatini oling.
// Guruhga yubormoqchi bo'lsangiz, botni guruhga qo'shing va guruh chat_id sini
// (odatda manfiy son, masalan -1001234567890) shu yerga yozing.

export async function sendTelegramMessage(text) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    console.warn(
      "[telegram] TELEGRAM_BOT_TOKEN yoki TELEGRAM_CHAT_ID sozlanmagan, xabar yuborilmadi."
    );
    return { ok: false, error: "not_configured" };
  }

  try {
    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: "HTML",
        disable_web_page_preview: true,
      }),
    });
    const data = await res.json();
    if (!data.ok) {
      console.error("[telegram] Telegram API xatosi:", data.description);
    }
    return data;
  } catch (e) {
    // Xabar yuborilmasa ham asosiy funksionallik (login/booking) ishlashda davom etishi kerak,
    // shuning uchun xatoni faqat log qilamiz, throw qilmaymiz.
    console.error("[telegram] Xabar yuborishda xatolik:", e.message);
    return { ok: false, error: e.message };
  }
}

function getClientIp(req) {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  return req.headers.get("x-real-ip") || "noma'lum";
}

export function notifyLogin({ username, success, req }) {
  const ip = getClientIp(req);
  const time = new Date().toLocaleString("uz-UZ", { timeZone: "Asia/Tashkent" });
  const status = success ? "✅ Muvaffaqiyatli kirish" : "❌ Noto'g'ri urinish";
  const text =
    `${status}\n` +
    `👤 Foydalanuvchi: <b>${escapeHtml(username || "-")}</b>\n` +
    `🌐 IP: <code>${escapeHtml(ip)}</code>\n` +
    `🕒 Vaqt: ${time}`;
  return sendTelegramMessage(text);
}

export function notifyBooking(booking) {
  const text =
    `🆕 Yangi buyurtma (booking)!\n` +
    `👤 Ism: <b>${escapeHtml(booking.name)}</b>\n` +
    `📞 Telefon: <code>${escapeHtml(booking.phone)}</code>\n` +
    (booking.service ? `🛠 Xizmat: ${escapeHtml(booking.service)}\n` : "") +
    (booking.date ? `📅 Sana: ${escapeHtml(booking.date)}\n` : "") +
    (booking.comment ? `💬 Izoh: ${escapeHtml(booking.comment)}\n` : "");
  return sendTelegramMessage(text);
}

function escapeHtml(str) {
  return String(str).replace(/[&<>]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c]));
}
