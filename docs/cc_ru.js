(function () {
  var titleMap = {
    '/cc_v1_ru.html': 'CubCar — автомобили, фургоны и квадроциклы',
    '/cc_v2_ru.html': 'CubCar — автомобили, фургоны и квадроциклы',
    '/cc_v3_ru.html': 'CubCar — автомобили, фургоны и квадроциклы',
    '/cc_v4_ru.html': 'CubCar — автомобили, фургоны и квадроциклы в Таллинне'
  };

  var replacements = [
    ['Plats Tallinnas, avatud E–L', 'Площадка в Таллинне, открыты Пн–Сб'],
    ['Plats Tallinnas, avatud kuus päeva nädalas', 'Площадка в Таллинне, открыты шесть дней в неделю'],
    ['Kogu ladu ühel lehel', 'Весь склад на одной странице'],
    ['Ei mingit ilustatud vitriini. Siin on kõik sõiduautod, kaubikud ja ATV-d, mis meil täna platsil seisavad, koos hindade ja põhiandmetega.', 'Без витринной красоты. Здесь собраны все легковые авто, фургоны и ATV, которые сегодня стоят на площадке, с ценами и основными данными.'],
    ['Ei mingit ilustatud vitriini. Siin on kõik sõiduautod, kaubikud ja ATV-d, mis meil täna platsil seisavad — koos hindade, läbisõidu ja teadaolevate vigadega.', 'Без витринной красоты. Здесь собраны все легковые авто, фургоны и ATV, которые сегодня стоят на площадке, вместе с ценами, пробегом и известными недостатками.'],
    ['Sinu auto võib olla osa järgmisest.', 'Позаботимся о вашем старом авто'],
    ['Sõidukid, mis on täna platsil', 'Ваше новое авто уже сегодня'],
    ['Praegu platsil', 'Сейчас на площадке'],
    ['Praegu müügil', 'Сейчас в продаже'],
    ['Uuendatud täna', 'Обновлено сегодня'],
    ['Nädala valik', 'Выбор недели'],
    ['Tegutseme Tallinnas alates 2015. aastast', 'Работаем в Таллинне с 2015 года'],
    ['Vahetus', 'Обменять'],
    ['Komisjonimüük', 'Продать нам'],
    ['Saada paar pilti ja läbisõit. Vastame tavaliselt sama päeva jooksul ning ütleme kohe, kas võtame vahetusse või paneme komisjonimüüki.', 'dddd'],
    ['Toome su vana auto uue vastu', 'Зачтём ваш старый автомобиль в счёт нового'],
    ['Müü oma auto meie platsil', 'Продадим ваш автомобиль на нашей площадке'],
    ['Sinu auto seisab meie platsil, meie teeme pildid ja kuulutused ning suhtleme ostjatega.', 'Ваш автомобиль стоит у нас, мы делаем фото, размещаем объявления и общаемся с покупателями.'],
    ['Sinu auto seisab meie platsil. Meie teeme pildid, kuulutused ja suhtleme ostjatega. Tasu alles pärast müüki.', 'Ваш автомобиль стоит у нас. Мы делаем фото, размещаем объявления и общаемся с покупателями. Оплата только после продажи.'],
    ['Arvestame su auto uue hinna sisse. Raha liigub ühe tehinguga.', 'Засчитываем ваш автомобиль в цену нового. Всё решается одной сделкой.'],
    ['Auto seisab meie platsil, müügiga tegeleme meie. Sina saad turuhinna.', 'Автомобиль стоит у нас, продажей занимаемся мы. Вы получаете рыночную цену.'],
    ['Paku oma autot', 'Предложите свой автомобиль'],
    ['Paku oma sõidukit', 'Предложите свой автомобиль'],
    ['Hinda mu autot', 'Оценить мой автомобиль'],
    ['Saada oma auto andmed', 'Отправить данные автомобиля'],
    ['Vaata laoseisu', 'Смотреть наличие'],
    ['Vaata sõidukeid', 'Смотреть автомобили'],
    ['Vaata lähemalt', 'Подробнее'],
    ['Broneeri proovisõit', 'Записаться на тест-драйв'],
    ['Kõik 52 sõidukit', 'Все 52 авто'],
    ['Kõik 38 sõidukit', 'Все 38 авто'],
    ['Näita kõiki 38 sõidukit', 'Показать все 38 авто'],
    ['Näita ülejäänud 32 sõidukit', 'Показать оставшиеся 32 авто'],
    ['Kõik sõidukid on ka Auto24-s, samade hindadega.', 'Все авто также есть на Auto24, по тем же ценам.'],
    ['Uued autod platsil, tehingud, ja natuke nalja vahele.', 'Новые машины на площадке, сделки и немного шуток между делом.'],
    ['ATV-d mudas ja lühikesed testisõidud.', 'ATV в грязи и короткие тест-драйвы.'],
    ['Kuulutused Auto24-s, sisu Instagramis ja TikTokis. Kolm kohta, üks plats.', 'Объявления на Auto24, контент в Instagram и TikTok. Три канала, одна площадка.'],
    ['Kust meid leiab', 'Где нас найти'],
    ['Millal Eestis rehvid vahetada ja mis juhtub, kui hiljaks jääd', 'Когда в Эстонии менять шины и что будет, если опоздать'],
    ['Kasutatud diisel 200 000 km peal: mida enne ostu vaadata', 'Подержанный дизель с пробегом 200 000 км: что проверить перед покупкой'],
    ['Kaubik ettevõttele: liising, käibemaks ja tegelik kulu', 'Фургон для бизнеса: лизинг, НДС и реальная стоимость'],
    ['Autotoomine Saksamaalt: mis maksab tegelikult peale hinnasildi', 'Пригнать авто из Германии: что реально стоит за ценником'],
    ['ATV hooldus enne hooaega: viis asja, mida ise ära teha', 'Обслуживание ATV перед сезоном: пять вещей, которые можно сделать самому'],
    ['Tule vaatama', 'Приезжайте посмотреть'],
    ['Tule vaatama või kirjuta', 'Приезжайте посмотреть или напишите нам'],
    ['Kirjuta', 'Напишите'],
    ['Kirjuta meile', 'Напишите нам'],
    ['Helista', 'Позвонить'],
    ['Ei leidnud õiget?', 'Не нашли подходящий вариант?'],
    ['Kirjuta, mida otsid — vastame tavaliselt paari tunni jooksul.', 'Напишите, что ищете — обычно отвечаем в течение пары часов.'],
    ['Kirjuta, mida otsid. Meil käib nädalas läbi kümneid autosid, mis platsile ei jõuagi — kui midagi sobivat tuleb, anname teada.', 'Напишите, что ищете. У нас каждую неделю проходит множество машин, которые даже не попадают на площадку — если появится подходящий вариант, сообщим.'],
    ['Vastame tavaliselt paari tunni jooksul, tööpäeviti alati sama päeva jooksul.', 'Обычно отвечаем в течение пары часов, в рабочие дни — в тот же день.'],
    ['Nimi', 'Имя'],
    ['Telefon', 'Телефон'],
    ['E-post', 'Эл. почта'],
    ['Mida otsid?', 'Что ищете?'],
    ['Näiteks: pereauto kuni 15 000 €, automaat, diisel.', 'Например: семейный автомобиль до 15 000 €, автомат, дизель.'],
    ['Näiteks: pereauto kuni 15 000 €, automaat, diisel, alla 150 000 km.', 'Например: семейный автомобиль до 15 000 €, автомат, дизель, до 150 000 км.'],
    ['Olen nõus, et CubCar võtab minuga ühendust. Andmeid ei jagata kolmandate osapooltega.', 'Я согласен, что CubCar свяжется со мной. Данные не передаются третьим лицам.'],
    ['Saada soov', 'Отправить запрос'],
    ['Sõidukid', 'Автомобили'],
    ['Sõiduautod', 'Легковые авто'],
    ['Kaubikud', 'Фургоны'],
    ['ATV-d', 'ATV'],
    ['Kõik sõidukid', 'Все авто'],
    ['Müügil', 'Купить'],
    ['Blogi', 'Блог'],
    ['Kontakt', 'Контакты'],
    ['Küpsised', 'Файлы cookie'],
    ['Privaatsuspoliitika', 'Политика конфиденциальности'],
    ['Ainult vajalikud', 'Только необходимые'],
    ['Nõustun', 'Принять'],
    ['Skeem', 'Схема'],
    ['Vaata 38 sõidukit', 'Смотреть 38 авто'],
    ['Hinda minu autot', 'Оценить мой автомобиль'],
    ['Broneeritud', 'Забронировано'],
    ['Uus platsil', 'Новое на площадке'],
    ['sõiduautot', 'легковых авто'],
    ['kaubikut', 'фургонов'],
    ['lisandus sel nädalal', 'добавилось на этой неделе'],
    ['Külastajad tulevad — Auto24-st, Instagramist või TikTokist. Statistikaküpsised on valikulised.', 'К нам приходят из Auto24, Instagram и TikTok. Статистические cookies необязательны.'],
    ['Kasutame küpsiseid, et näha, kust külastajad tulevad — Auto24-st, Instagramist või TikTokist. Statistikaküpsised on valikulised.', 'Мы используем cookies, чтобы понимать, как лучше помочь нашим клиентам. Статистические cookies необязательны.'],
    ['Tegutseme Tallinnas alates 2015. aastast. Kogenud meeskond, läbipaistev pakkumine ja plats, kus kõik autod on päriselt olemas.', 'Работаем в Таллинне с 2015 года. Опытная команда, понятные условия и площадка, где все автомобили действительно есть в наличии.'],
    ['Sõiduautod, kaubikud ja ATV-d. Iga masin käib enne platsile jõudmist meie mehaaniku käest läbi ja teadaolevad vead on kuulutuses kirjas.', 'Легковые авто, фургоны и ATV. Каждая машина проходит проверку у нашего механика до выхода на площадку, а известные недостатки указаны в объявлении.'],
    ['Sõiduautod, kaubikud ja ATV-d. Ostame, müüme ja võtame komisjoni.', 'Легковые авто, фургоны и ATV. Покупаем, продаём и принимаем на комиссию.'],
    ['Mark', 'Марка'],
    ['Kütus', 'Топливо'],
    ['Käigukast', 'КПП'],
    ['Vedav sild', 'Привод'],
    ['Kõik margid', 'Все марки'],
    ['Kõik kütused', 'Все виды топлива'],
    ['Kõik käigukastid', 'Все КПП'],
    ['Kõik veoskeemid', 'Все типы привода'],
    ['Tüüp', 'Тип'],
    ['Liising ja garantii', 'Лизинг и гарантия'],
    ['Loe tingimusi', 'Читать условия'],
    ['Küsi tingimusi', 'Уточнить условия'],
    ['Vaata kõiki 38 sõidukit', 'Посмотреть все 38 авто'],
    ['Näita ülejäänud 32 sõidukit', 'Показать оставшиеся 32 авто'],
    ['Kõik lood', 'Все материалы'],
    ['Rahulik ja mõistlik', 'Спокойно и по делу']
  ];

  var attrNames = ['placeholder', 'aria-label', 'title', 'alt'];

  function replaceAll(text) {
    var out = text;
    for (var i = 0; i < replacements.length; i++) {
      out = out.split(replacements[i][0]).join(replacements[i][1]);
    }
    out = out.replace(/Ei mingit ilustatud vitriini\.\s*Siin on kõik sõiduautod, kaubikud ja ATV(?:-d)?,\s*mis meil täna platsil seisavad, koos hindade ja põhiandmetega\./g, 'Никакой витринной показухи. Здесь собраны все легковые авто, фургоны и ATV, которые сегодня стоят на площадке, с ценами и основными данными.');
    out = out.replace(/2019,\s*148 200 km,\s*automaat\.\s*Üks selge näide sellest, mis meil praegu platsil on\./g, '2019, 148 200 км, автомат. На нашей площадке вы сможете найти еще больше отличных вариантов.');
    out = out.replace(/Saada paar pilti ja läbisõit\.\s*Vastame tavaliselt sama päeva jooksul\s*ning ütleme kohe, kas võtame vahetusse või paneme komisjonimüüki\./g, 'Пришлите пару фото и пробег. Обычно отвечаем в тот же день и сразу скажем, забираем в трейд-ин или ставим на комиссию.');
    out = out.replace(/E–R/g, 'Пн–Пт');
    out = out.replace(/E–L/g, 'Пн–Сб');
    out = out.replace(/P suletud/g, 'Вс закрыто');
    out = out.replace(/september/g, 'сентября');
    out = out.replace(/oktoober/g, 'октября');
    out = out.replace(/november/g, 'ноября');
    out = out.replace(/detsember/g, 'декабря');
    out = out.replace(/jaanuar/g, 'января');
    out = out.replace(/veebruar/g, 'февраля');
    out = out.replace(/märts/g, 'марта');
    out = out.replace(/aprill/g, 'апреля');
    out = out.replace(/mai/g, 'мая');
    out = out.replace(/juuni/g, 'июня');
    out = out.replace(/juuli/g, 'июля');
    out = out.replace(/august/g, 'августа');
    out = out.replace(/täna/g, 'сегодня');
    out = out.replace(/sel nädalal/g, 'на этой неделе');
    return out;
  }

  function walk(node) {
    if (!node) return;
    if (node.nodeType === Node.TEXT_NODE) {
      var value = node.nodeValue;
      if (value && value.trim()) {
        node.nodeValue = replaceAll(value);
      }
      return;
    }
    if (node.nodeType !== Node.ELEMENT_NODE) return;
    var tag = node.tagName;
    if (tag === 'SCRIPT' || tag === 'STYLE' || tag === 'NOSCRIPT') return;
    for (var a = 0; a < attrNames.length; a++) {
      var attr = attrNames[a];
      if (node.hasAttribute && node.hasAttribute(attr)) {
        node.setAttribute(attr, replaceAll(node.getAttribute(attr)));
      }
    }
    for (var child = node.firstChild; child; child = child.nextSibling) {
      walk(child);
    }
  }

  function run() {
    var title = titleMap[location.pathname];
    if (title) document.title = title;
    document.documentElement.lang = 'ru';
    walk(document.body);
  }

  if (document.body) {
    run();
  } else {
    document.addEventListener('DOMContentLoaded', run, { once: true });
  }
})();
