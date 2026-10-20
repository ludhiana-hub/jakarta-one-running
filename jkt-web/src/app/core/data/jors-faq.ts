import { FaqItem } from '../models/blocks/faq-accordion.block';

const REGISTRATION_URL = 'https://id.bookmyshow.com/en/collections/onerunningseries';

/** Home page FAQ, sourced from the organiser's "FAQ_BAHASA_JORS" document. */
export const JORS_FAQ: readonly FaqItem[] = [
  {
    id: 'faq_about',
    group: { id: 'ABOUT THE RUN' },
    question: { id: 'Apa itu Jakarta One Running Series (JORS)?' },
    answer: {
      id: 'Jakarta One Running Series (JORS) adalah acara lomba lari yang dilaksanakan secara berkelanjutan, diawali pada 1 November 2026 dan diakhiri pada Juni 2027.',
    },
  },
  {
    id: 'faq_one_ticket',
    group: { id: 'ABOUT THE RUN' },
    question: { id: 'Apakah pendaftaran ini berlaku untuk kelima lomba?' },
    answer: {
      id: `Pendaftaran berlaku untuk satu race, dan tersedia juga pilihan bundling untuk 5 race sekaligus. Informasi selengkapnya dapat dilihat di ${REGISTRATION_URL}.`,
    },
  },
  {
    id: 'faq_how_to_register',
    group: { id: 'REGISTRATION' },
    question: { id: 'Bagaimana cara mendaftar JORS dan berapa biayanya?' },
    answer: {
      id: `Kunjungi ${REGISTRATION_URL}. Biaya pendaftaran Rp 195.000 per peserta untuk 1 (satu) race.`,
    },
  },
  {
    id: 'faq_what_you_get',
    group: { id: 'REGISTRATION' },
    question: { id: 'Apa yang saya terima sebagai peserta terdaftar?' },
    answer: { id: 'Anda akan menerima kaos lomba JORS eksklusif dan medali finisher.' },
  },
  {
    id: 'faq_cancel_refund',
    group: { id: 'REGISTRATION' },
    question: { id: 'Dapatkah saya membatalkan pendaftaran dan mendapatkan pengembalian dana?' },
    answer: {
      id: 'Tidak, pengembalian dana tidak dapat diberikan jika Anda membatalkan pendaftaran.',
    },
  },
  {
    id: 'faq_organizer_cancel',
    group: { id: 'REGISTRATION' },
    question: {
      id: 'Apakah saya mendapat pengembalian dana jika penyelenggara membatalkan atau menunda acara?',
    },
    answer: { id: 'Jika acara lari ini dibatalkan atau ditunda, kami akan menghubungi Anda.' },
  },
  {
    id: 'faq_eligibility',
    group: { id: 'REGISTRATION' },
    question: { id: 'Siapa yang berhak mengikuti lari ini?' },
    answer: {
      id: 'Siapa pun yang tinggal di Indonesia memenuhi syarat untuk ikut serta dalam acara lari ini.',
    },
  },
  {
    id: 'faq_outside_jakarta',
    group: { id: 'REGISTRATION' },
    question: { id: 'Saya tinggal di luar Jakarta, apakah saya memenuhi syarat untuk mendaftar?' },
    answer: { id: 'Ya, JORS terbuka untuk semua orang yang tinggal di Indonesia.' },
  },
  {
    id: 'faq_foreigners',
    group: { id: 'REGISTRATION' },
    question: {
      id: 'Saya ekspatriat/Warga Negara Asing (WNA) yang tinggal di Indonesia (misalnya Bali), dapatkah saya ikut serta?',
    },
    answer: {
      id: 'Ya, selama Anda tinggal di Indonesia, Anda dapat menjadi peserta. Namun WNA tidak dapat menjadi pemenang, karena gelar pemenang hanya diberikan kepada Warga Negara Indonesia (WNI).',
    },
  },
  {
    id: 'faq_deadline',
    group: { id: 'REGISTRATION' },
    question: { id: 'Kapan pendaftaran ditutup?' },
    answer: { id: 'Pendaftaran ditutup pada 26 Oktober 2026 pukul 23.59 WIB.' },
  },
  {
    id: 'faq_rpc_date',
    group: { id: 'RACE PACK' },
    question: { id: 'Kapan dan di mana pengambilan paket lomba (Race Pack Collection / RPC)?' },
    answer: {
      id: 'RPC diadakan di Backyard Hotel Borobudur pada 30 dan 31 Oktober 2026.',
    },
  },
  {
    id: 'faq_shirt_size',
    group: { id: 'RACE PACK' },
    question: { id: 'Dapatkah saya mengubah ukuran kaos setelah memilihnya?' },
    answer: { id: 'Tidak.' },
  },
  {
    id: 'faq_rpc_proxy',
    group: { id: 'RACE PACK' },
    question: { id: 'Apakah paket lomba bisa diwakilkan?' },
    answer: {
      id: 'Bisa. Unduh surat kuasa dan waiver di website kami (dengan catatan Anda mengetahui dan menyetujui isi waiver tersebut), lalu sertakan fotokopi KTP Anda kepada penerima kuasa.',
    },
  },
  {
    id: 'faq_rpc_courier',
    group: { id: 'RACE PACK' },
    question: {
      id: 'Apakah boleh memakai pihak ketiga (GoSend, GrabSend, dan aplikasi online lainnya) untuk mengambil paket lomba?',
    },
    answer: { id: 'Tidak.' },
  },
  {
    id: 'faq_missed_race_medals',
    group: { id: 'RACE PACK' },
    question: { id: 'Apakah saya tetap menerima 5 medali jika salah satu race tidak bisa saya ikuti?' },
    answer: {
      id: 'Tidak, karena ini adalah lomba dedikasi untuk mengikuti perjalanan menuju 500 tahun Kota Jakarta.',
    },
  },
  {
    id: 'faq_bib_transfer',
    group: { id: 'GENERAL QUESTIONS' },
    question: { id: 'Bolehkah nomor BIB saya dilarikan oleh orang lain?' },
    answer: { id: 'Tidak, karena nomor Anda akan tercatat hingga akhir 5 series.' },
  },
  {
    id: 'faq_prize',
    group: { id: 'GENERAL QUESTIONS' },
    question: { id: 'Apakah hadiah pemenang diberikan dalam bentuk tunai?' },
    answer: { id: 'Ya, hadiah diberikan dalam bentuk tunai dan akan dikenakan pajak.' },
  },
  {
    id: 'faq_insurance',
    group: { id: 'GENERAL QUESTIONS' },
    question: { id: 'Apakah semua pelari mendapatkan asuransi?' },
    answer: {
      id: 'Tidak. Kami hanya membantu pertolongan pertama dan transportasi ke rumah sakit.',
    },
  },
  {
    id: 'faq_photographer',
    group: { id: 'GENERAL QUESTIONS' },
    question: { id: 'Apakah ada fotografer di rute?' },
    answer: { id: 'Ya, ada, dan foto dapat diunduh di website kami.' },
  },
];
