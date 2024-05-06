// Здесь описаны основные принципы работы сохранения заметок, их прочтение и вывод как массив данных
// Стандартно в localStorge будет хранится именнованый объект Notes, который хранит массив заметок (template_note)

let localnotes = {}; // Локальное хранение заметок Object

// Если запись хранилища Notes нету, то записываем новое
if (localStorage.getItem('notes') === null){
    console.log("localStorage['notes'] empty, create new");

    localStorage.setItem('notes', JSON.stringify(localnotes)); // note = type of Array
}else{
    console.log("localStorage load");

    localnotes = JSON.parse(localStorage.getItem('notes'));

    console.log(localnotes);
}

function delete_storage(){
    delete localStorage.notes;
    return true;
}

// Стандартный шаблон объекта заметки
const template_note = {
    title: "Новая заметка", // Название заметки
    text: '', // Текст заметки
    date: undefined, // Дата изменяется при создании нового экземпляра 
    id: '' // Айди заметки чтобы можно было достать её текст и редактировать
};7

// Создание новой заметки (системно, т.е так она создаться в localStorge один раз и дальше будет просто модифицировался)
// После создания возвращаем его для использования в UI
function create_note(title='Новая заметка', text='Напиши свои идеи...'){
    let new_note = {};
    new_note = Object.assign(new_note, template_note);

    // Записываем значения новой заметки
    new_note['title'] = title;
    new_note['text'] = text;
    new_note['date'] = humanize_date();

    const note_id = 'note-'+Date.now();
    new_note['id'] = note_id

    // Записываем в массив
    if (localStorage.getItem('notes') != null){
        localnotes[note_id] = new_note;
        save_global();
    }

    return new_note;
}

// Удаление заметки (системно, а больше и никак), возвращает true если удалось удалить или false если нет
function delete_note(index){
    if((localnotes[index] || null) == null){
        console.error("index error");
        return false;
    }

    delete localnotes[index];

    save_global();

    return true;
}

// Модификация заметки (путём получения индекса и изменения в нём элементов), возвращает true если изменилось или false если нет
// Параметры необязательны, и если какой-то из них пустой, то он не будет перезаписан
function modify_note(index, title='', text=''){
    if((localnotes[index] || null) == null){
        console.error("index error");
        return false;
    }

    if(title != ''){
        localnotes[index]['title'] = title;
    }
    if(text != ''){
        localnotes[index]['text'] = text;
    }

    // Меняем дату т.к. заметка модифицирована 
    localnotes[index]['date'] = humanize_date();

    save_global();

    return true;
}

// Сохранение в ГЛОБАЛЬНОЕ хранилище относительно localStorage и localnotes
// Добавить всякие проверки и улучшить код щас уже сонный
function save_global(){
    localStorage.notes = JSON.stringify(localnotes);
}

// Нормальные даты для нормальных людей
function humanize_date(){
    let new_date = new Date();
    return new_date.getDay()+'.'+new_date.getMonth()+'.'+new_date.getFullYear()+' '+new_date.getHours()+':'+new_date.getMinutes();
}