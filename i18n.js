/* English <-> Arabic switch.
   English text lives in index.html; the Arabic text is in the AR table below.
   To change an Arabic sentence, edit it here. */
(function () {
  var AR = {
    'title': 'حفل زفاف محسن وسمر',
    'env.hint': 'المس للفتح',
    'env.aria': 'المس لفتح الدعوة',
    'replay': 'إعادة',
    'music.aria': 'الموسيقى',
    'hero.samar': 'سمر',
    'hero.muhsen': 'محسن',
    'hero.eyebrow': 'يوم الزفاف',
    'intro.bism': 'بِسْمِ خَالِقِ الْحُبِّ',
    'intro.lead': '، نَبْدَأُ أَجْمَلَ حِكَايَاتِ الْعُمْرِ، وَنَعْقِدُ بِالْمَوَدَّةِ مِيثَاقَ أَجْمَلِ الْأَقْدَارِ.',
    'intro.honor': 'يَتَشَرَّفُ',
    'intro.f1': 'آل صالح',
    'intro.and': 'و',
    'intro.f2': 'آل المصري',
    'intro.p2': 'بدعوتكم لحضور حفل زفاف نجليهما',
    'intro.n1': 'مُحْسِن',
    'intro.n2': 'سَمَر',
    'intro.p3': 'ومشاركتنا فرحةَ العمر، حيث تتلاقى الأقدار، وتُكلَّل الحكاية بالوصال، وتبدأ رحلةٌ جديدة عنوانها الحبّ، وأساسها المودّة والرحمة.',
    'scroll': 'مرّر للأسفل',
    'cd.eyebrow': 'يبدأ الاحتفال بعد',
    'cd.title': 'العدّ التنازلي',
    'cd.days': 'أيام', 'cd.hours': 'ساعات', 'cd.minutes': 'دقائق', 'cd.seconds': 'ثوانٍ',
    'sch.eyebrow': 'رافقونا خلال أمسيتنا',
    'sch.title': 'برنامج الحفل',
    't.730': '7:30 م', 't.815': '8:15 م', 't.830': '8:30 م', 't.900': '9:00 م', 't.1000': '10:00 م', 't.1100': '11:00 م',
    'ev.entrance': 'دخول العرسان',
    'ev.dance': 'الرقصة الأولى',
    'ev.party': 'رقص',
    'ev.photo': 'تصوير',
    'mate.bride': 'رفيقات العروس',
    'mate.groom': 'رفقاء العريس',
    'ev.guest': 'وصول الضيوف', 'ev.arrival': 'والاستقبال',
    'ev.entrance1': 'الدخول الكبير', 'ev.entrance2': 'للعروسين',
    'ev.dance1': 'الرقصة الأولى', 'ev.dance2': 'للعروسين',
    'ev.dinner': 'العشاء',
    'ev.party1': 'الرقص', 'ev.party2': 'والاحتفال',
    'ev.photo1': 'التصوير', 'ev.photo2': 'والتهاني',
    'loc.eyebrow': 'الموقع',
    'loc.title': 'مكان الحفل',
    'loc.name': 'منتجع وسبا تاج إكزوتيكا، النخلة',
    'loc.addr': 'نخلة جميرا – الهلال الشرقي<br>نخلة جميرا، دبي',
    'dress.eyebrow': 'قواعد اللباس',
    'dress.text': 'يُرجى ارتداء أحد هذه الألوان',
    'col.turq': 'فيروزي',
    'col.burg': 'برغندي',
    'col.pink': 'وردي فاتح',
    'col.yellow': 'أصفر فاتح',
    'col.black': 'أسود',
    'col.navy': 'كحلي',
    'rsvp.eyebrow': 'لنستعدّ معًا لاحتفال مليء بالفرح',
    'rsvp.title': 'يرجى تأكيد الحضور',
    'rsvp.text': 'نرجو تأكيد حضوركم لتساعدونا في جعل الأمسية لا تُنسى.',
    'rsvp.open': 'اضغط للفتح',
    'closing.title': 'ولأنّ للفرح وجوهًا تُكمِلُ بهجتَه، يسعدنا أن تكونوا جزءًا من أجمل أيامنا',
    'closing.n1': 'مُحْسِن',
    'closing.n2': 'سَمَر',
    'dlg.close': 'إغلاق',
    'dlg.name': 'الاسم',
    'dlg.attend': 'هل ستحضرون؟',
    'dlg.accept': 'أقبل بكل سرور',
    'dlg.decline': 'أعتذر مع الأسف',
    'dlg.guests': 'عدد الضيوف الحاضرين',
    'dlg.song': 'أغنية تجعلك ترقص',
    'dlg.children': 'جنّة الأطفال منازلهم',
    'dlg.submit': 'إرسال'
  };

  var root = document.documentElement;
  var btn = document.getElementById('langToggle');
  var texts = [].slice.call(document.querySelectorAll('[data-i18n]'));
  var arias = [].slice.call(document.querySelectorAll('[data-i18n-aria]'));
  var enTitle = document.title;
  texts.forEach(function (e) { e._en = e.innerHTML; });
  arias.forEach(function (e) { e._en = e.getAttribute('aria-label'); });

  function apply(lang) {
    var ar = lang === 'ar';
    root.lang = ar ? 'ar' : 'en';
    root.dir = ar ? 'rtl' : 'ltr';
    texts.forEach(function (e) {
      var k = e.getAttribute('data-i18n');
      e.innerHTML = ar && AR[k] != null ? AR[k] : e._en;
    });
    arias.forEach(function (e) {
      var k = e.getAttribute('data-i18n-aria');
      e.setAttribute('aria-label', ar && AR[k] != null ? AR[k] : e._en);
    });
    document.title = ar ? AR.title : enTitle;
    if (btn) {
      var lb = document.getElementById('langLabel');
      if (lb) lb.textContent = ar ? 'AR' : 'EN';
      btn.setAttribute('aria-label', ar ? 'Switch to English' : 'التبديل إلى العربية');
    }
  }

  var saved = null;
  try { saved = localStorage.getItem('lang'); } catch (e) {}
  if (!saved) saved = /^ar/i.test(navigator.language || '') ? 'ar' : 'en';
  apply(saved);

  /* keep the reader at the same place when the language (and so the page height) changes */
  function anchorPoint() {
    var blocks = [].slice.call(document.querySelectorAll('#site > *'));
    for (var i = 0; i < blocks.length; i++) {
      var r = blocks[i].getBoundingClientRect();
      if (r.height > 0 && r.bottom > 1) {
        return { el: blocks[i], frac: Math.max(0, -r.top) / r.height, off: r.top > 0 ? r.top : 0 };
      }
    }
    return null;
  }
  function restoreAnchor(a) {
    if (!a) return;
    var r = a.el.getBoundingClientRect();
    var target = window.pageYOffset + r.top + a.frac * r.height - a.off;
    window.scrollTo({ top: target, left: 0, behavior: 'instant' });
  }

  if (btn) btn.addEventListener('click', function () {
    var next = root.lang === 'ar' ? 'en' : 'ar';
    var a = anchorPoint();
    apply(next);
    restoreAnchor(a);
    /* fonts / images can change heights a moment later */
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { restoreAnchor(a); });
    setTimeout(function () { restoreAnchor(a); }, 350);
    try { localStorage.setItem('lang', next); } catch (e) {}
  });

  /* RSVP: declining = 0 guests; accepting = at least 1 */
  var form = document.getElementById('rsvpForm');
  if (form) {
    var picks = [].slice.call(form.querySelectorAll('input[name="guests"]'));
    var sync = function () {
      var att = form.querySelector('input[name="attendance"]:checked');
      var declines = att && att.value === 'declines';
      /* declining: the guest count is locked on a faded "1"; accepting: all numbers are available again */
      picks.forEach(function (p) { p.disabled = !!declines; });
      if (declines) picks[0].checked = true;
    };
    [].slice.call(form.querySelectorAll('input[name="attendance"]')).forEach(function (r) {
      r.addEventListener('change', sync);
    });
  }
})();

/* RSVP -> WhatsApp: opens a chat with the answers already written; the guest just presses send */
(function () {
  var NUMBER = '971569058848';
  var form = document.getElementById('rsvpForm');
  var dlg = document.getElementById('rsvpDialog');
  if (!form) return;
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var ar = document.documentElement.lang === 'ar';
    var name = form.querySelector('input[aria-label][required]').value.trim();
    var att = form.querySelector('input[name="attendance"]:checked');
    var guests = form.querySelector('input[name="guests"]:checked');
    var song = form.querySelector('input[data-i18n-aria="dlg.song"]').value.trim();
    var yes = att && att.value === 'accepts';
    var lines = ar ? [
      'تأكيد حضور حفل زفاف محسن وسمر',
      'الاسم: ' + name,
      'الحضور: ' + (yes ? 'أقبل بكل سرور' : 'أعتذر مع الأسف'),
      'عدد الضيوف: ' + (yes ? (guests ? guests.value : 1) : 0)
    ] : [
      'RSVP - Muhsen & Samar wedding',
      'Name: ' + name,
      'Attendance: ' + (yes ? 'Accepts with pleasure' : 'Declines with regret'),
      'Guests: ' + (yes ? (guests ? guests.value : 1) : 0)
    ];
    if (song) lines.push((ar ? 'أغنية للرقص: ' : 'Song: ') + song);
    var url = 'https://wa.me/' + NUMBER + '?text=' + encodeURIComponent(lines.join('\n'));
    if (dlg && dlg.open) dlg.close();
    var w = window.open(url, '_blank');
    if (!w) window.location.href = url;
  });
  if (dlg) dlg.addEventListener('click', function (e) { if (e.target === dlg) dlg.close(); });
})();

/* lock the page scroll while the RSVP window is open (for browsers without :has) */
(function () {
  var d = document.getElementById('rsvpDialog');
  if (!d) return;
  function lock() { document.documentElement.style.overflow = d.open ? 'hidden' : ''; }
  new MutationObserver(lock).observe(d, { attributes: true, attributeFilter: ['open'] });
  d.addEventListener('close', lock);
})();
