/**
 * Jakarta One Running Series — event waiver (EN + ID).
 * Source: 2026 Running Event Waiver One Running series.docx
 * Signature fields omitted; consent is collected via the Register popup checkbox.
 */

export interface WaiverSection {
  heading?: string;
  paragraphs: string[];
}

export const REGISTRATION_WAIVER_EN: WaiverSection = {
  heading: 'WAIVER AGREEMENT',
  paragraphs: [
    'PLEASE READ CAREFULLY BEFORE SIGNING. THIS WAIVER AGREEMENT WILL AFFECT YOUR LEGAL RIGHTS AND WILL LIMIT OR ELIMINATE YOUR ABILITY TO BRING A FUTURE LAWSUIT. THIS WAIVER AGREEMENT HAS BEEN REVIEWED BY LEGAL.',
    'I know that running is a potentially hazardous activity. I should not enter and run unless I am medically able and properly trained. I agree to abide by any decision of a race official relative to my ability to safely complete the run.',
    'I hereby certify that I am in good health and I have trained to run the distance of the race, which I am entering. I assume all risks associated with running in this event including, but not limited to: falls, contact with other participants, the effects of weather, including high heat and/or humidity, traffic and the conditions of the road, all such risks being known and appreciated by me. Having read this waiver and knowing these facts and in consideration of your accepting my entry into this running race, I, for myself and anyone entitled to act on my behalf, waive and release running organisation, race management, event management, event organizer, its officers, club, sponsors, vendors, directors, agents, volunteers and employees, all states, cities, countries or other governmental bodies or locations in which events or segments of events are held, all sponsors, their representatives and successors, assigns, sponsors and representatives of and from any and all claims, actions, causes of action, demands, rights, damages, costs, loss of service, expenses and compensation whatsoever which may arise or in the future accrue on account of or in any way growing out of any and all known and unknown, seen and unforeseen, bodily and personal injuries/illnesses, property loss or damage, or the consequences which result from or in any way relate to my participation in the Race, including but not limited to any claims related to course design or condition, weather, the acts of spectators or other participants, or that are based on the ordinary negligence on the part of the Event promotor, its agents, volunteers, directors, officers, employees or other parties named above.',
    'I grant permission to all of the foregoing to use any photographs, motion pictures, recordings, or any other record of this event for any legitimate purpose. I understand that bicycles, skateboards, roller skates or inline skates are not allowed in the event and I will abide by this guideline.',
    'I authorize any healthcare provider to release any and all information pertaining to my healthcare, medical condition and medical treatment as a result of my participation in this event, to all committee Jakarta One Running Series event and its staff. I declare that any of the submitted data is correct and I am aware that any participant in this event can only join with a registration under his/her real identity.',
  ],
};

export const REGISTRATION_WAIVER_ID: WaiverSection = {
  heading: 'PERJANJIAN PEMBEBASAN',
  paragraphs: [
    'BACALAH DENGAN CERMAT SEBELUM MENANDATANGANI. PERJANJIAN PEMBEBASAN AKAN MEMPENGARUHI HAK HUKUM ANDA DAN AKAN MEMBATASI ATAU MENGHILANGKAN KEMAMPUAN ANDA UNTUK MEMBAWA GUGATAN MASA DEPAN. PERJANJIAN PEMBEBASAN INI TELAH DI-REVIEW OLEH TIM HUKUM.',
    'Saya mengetahui dan memahami, bahwa berlari adalah kegiatan berpotensi cedera. Saya tidak harus mengikuti perlombaan lari, kecuali saya cukup sehat dan terlatih. Saya setuju untuk mematuhi setiap keputusan resmi panitia perlombaan.',
    'Saya menyatakan bahwa saya berada dalam kondisi kesehatan yang baik dan saya telah berlatih untuk mengikuti perlombaan lari dengan kategori jarak yang saya pilih. Saya siap menanggung semua risiko yang terjadi pada diri saya di acara ini, termasuk, tetapi tidak terbatas pada: jatuh, kontak dengan peserta lain, pengaruh cuaca seperti hujan, panas tinggi dan / atau kelembaban, lalu lintas dan kondisi jalan, semua risiko dimengerti dan dimaklumi oleh saya. Setelah membaca perjanjian pembebasan ini dan mengetahui fakta dan pertimbangan panitia menerima saya mengikuti perlombaan lari ini, saya, untuk diri sendiri dan siapa pun berhak untuk bertindak atas nama saya, mengesampingkan dan melepaskan panitia lomba lari Jakarta One Running Series race management, event management, event organizer, klub, sponsor, vendor, pejabat, direktur, agen, relawan dan karyawan, semua negara, kota, atau badan pemerintah lain atau lokasi di mana peristiwa atau segmen acara yang diadakan, semua sponsor, perwakilan mereka dan penerusnya, dari semua klaim atau kewajiban apapun dari keikutsertaan saya dalam acara ini meskipun kewajiban yang mungkin ditimbulkan dari kelalaian atau kecerobohan, kecelakaan dan penyakit pada bagian dari orang yang disebutkan dalam surat pernyataan ini. Saya memberikan izin kepada organisasi, media dan sponsor untuk menggunakan foto-foto, film, rekaman, atau catatan lain dari acara ini untuk tujuan yang sah.',
    'Saya mengerti dan memahami bahwa sepeda, skateboard, sepatu roda atau inline skate, tidak diperbolehkan dalam acara tersebut dan saya akan mematuhi pedoman ini.',
    'Saya memberikan otorisasi kepada penyedia layanan kesehatan untuk memberikan setiap dan semua informasi berkaitan dengan kesehatan saya, kondisi medis dan perawatan medis sebagai akibat dari keikutsertaan saya dalam acara ini, untuk panitia Jakarta One Running Series running event dan para stafnya. Saya menyatakan bahwa semua data saya yang saya isikan adalah benar adanya dan berdasarkan kartu identitas saya yang valid.',
  ],
};

export const REGISTRATION_WAIVER_VERSION = '2026-jktone-v1';

const REGISTRATION_HOST_HINTS = [
  'bigtix',
  'ticket',
  'tiket',
  'eventbrite',
  'loket',
  'gotix',
];

/**
 * True when the URL is (or looks like) a registration / ticket checkout destination.
 * Used as a safety net so any accidental open(bigtix…) still shows the waiver.
 */
export function isRegistrationUrl(url: string | null | undefined): boolean {
  if (!url) return false;
  const raw = url.trim();
  if (!raw || raw.startsWith('/')) return false;
  try {
    const parsed = new URL(raw, 'https://jakartaonerunningseries.com');
    const host = parsed.hostname.toLowerCase();
    const path = parsed.pathname.toLowerCase();
    if (REGISTRATION_HOST_HINTS.some((h) => host.includes(h))) return true;
    if (path.includes('register') || path.includes('daftar') || path.includes('checkout')) {
      return true;
    }
    return false;
  } catch {
    return /bigtix|register|daftar/i.test(raw);
  }
}
