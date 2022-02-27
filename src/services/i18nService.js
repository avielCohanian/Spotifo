'use strict';

//  Words
let gTrans = {
  home: {
    en: 'Home',
    es: 'Casa',
    he: 'מסך הבית',
  },
  search: {
    en: 'Search',
    es: 'Búsqueda',
    he: 'חיפוש',
  },
  'your-library': {
    en: 'Your library',
    es: 'tu biblioteca',
    he: 'הספרייה שלכם',
  },
  'create-a-playlist': {
    en: 'Create playlist',
    es: 'Crear lista reproducción',
    he: 'יצירת פלייליסט',
  },
  'date-added': {
    en: 'Date added',
    es: 'Fecha Agregada',
    he: 'תאריך הוספה',
  },
  'see-all': {
    en: 'See all',
    es: 'Todas las opciones',
    he: 'כל האופציות',
  },
  album: {
    en: 'Album',
    es: 'álbum',
    he: 'אלבום',
  },
  title: {
    en: 'Title',
    es: 'título',
    he: 'כותרת',
  },
  Easy: {
    en: 'Easy',
    es: 'Fácil',
    he: 'זורם',
  },
  Israeli: {
    en: 'Israeli',
    es: 'israelí',
    he: 'יִשׂרְאֵלִי',
  },
  Pop: {
    en: 'Pop',
    es: 'Música pop',
    he: 'פּוֹפּ',
  },
  Rock: {
    en: 'Rock',
    es: 'Rock',
    he: 'רוק',
  },
  Electronic: {
    en: 'Electronic',
    es: 'Electrónica',
    he: 'אֶלֶקטרוֹנִי',
  },
  'Hip Hop': {
    en: 'Hip Hop',
    es: 'Hip hop',
    he: 'היפ הופ',
  },
  'liked-songs': {
    en: 'Liked Songs',
    es: 'Me gustaron las canciones',
    he: 'שירים שאהבת',
  },
  login: {
    en: 'Login',
    es: 'Acceso',
    he: 'התחברות',
  },
  'sign-up': {
    en: 'Register',
    es: 'inscribirse',
    he: 'הירשם',
  },
};

// The initial language
let gCurrLang = 'en';

// Change the text
export const setLang = (lang) => {
  gCurrLang = lang;
  _bodyClass(lang);
  _doTrans();
};

// Bringing a translation
function getTransText(el) {
  let elTrans = el.dataset.trans;
  return getTrans(elTrans);
}
function getTrans(transKey) {
  let keyTrans = gTrans[transKey];
  if (!keyTrans) return 'UNKNOWN';
  let txt = keyTrans[gCurrLang];
  if (!txt) txt = keyTrans.en;
  return txt;
}

const _bodyClass = (lang) => {
  let elBody = document.querySelector('body');
  if (lang === 'he') {
    elBody.classList.add('rtl');
  } else {
    elBody.classList.remove('rtl');
  }
};

const _doTrans = () => {
  let els = document.querySelectorAll('[data-trans]');
  els.forEach((el) => {
    if (el.nodeName === 'INPUT') {
      el.placeholder = getTransText(el);
    } else {
      el.innerText = getTransText(el);
    }
  });
};

function formatNumOlder(num) {
  return num.toLocaleString('es');
}

function formatNum(num) {
  return new Intl.NumberFormat(gCurrLang).format(num);
}

function formatCurrency(num) {
  return new Intl.NumberFormat('he-IL', { style: 'currency', currency: 'ILS' }).format(num);
}

function formatDate(time) {
  let options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  };

  return new Intl.DateTimeFormat(gCurrLang, options).format(time);
}
