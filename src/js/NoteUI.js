// Описывает все функции управления интерфейсом

// Основные элементы
const note_sections = document.getElementById('Notes'); // Секция заметок

const note_title_input = document.getElementById('NoteTitle'); // Ввод заголовка заметки
const note_text_input = document.getElementById('NoteText'); // Ввод текста заметок

function return_notes(){
    return JSON.parse(localStorage.getItem('notes'));
}
// Инициализация и создание новых заметок на основе существующих из localStorage
function update_notes_list(){
    const localnotes = return_notes();
    for(let note_index in localnotes){
        let note = localnotes[note_index];
        add_note(note);
    }
}

// Добавление новой заметки в интерфейс
// По данному шаблону вёрстки:
/* ===============
<section class="Note" id="(note_id)">
    <note-title>Новая заметка</note-title><note-manage><i class="bi bi-trash3 text-danger" id="DeleteNote"></i></note-manage>
    <note-date>05.05.2024 20:49</note-date><note-desc>Всем Привет!</note-desc>
</section>
================== */
function add_note(note){
    if(note === undefined){return};

    let note_section = document.createElement('section');
    note_section.classList.add('Note');
    note_section.id = note['id'];

    let note_manage = document.createElement('note-manage')
    // Удаление заметки
    note_manage.innerHTML = '<i class="bi bi-trash3 text-danger" id="DeleteNote" onclick="rm_note(this);"></i></section>';

    let note_title = document.createElement('note-title');
    note_title.innerText = note['title'];

    let note_text = document.createElement('note-desc');
    note_text.innerText = note['text'].substring(0, 30);

    let note_date = document.createElement('note-date');
    note_date.innerText = note['date'];

    note_section.appendChild(note_title);
    note_section.appendChild(note_manage);
    note_section.appendChild(note_date);
    note_section.appendChild(note_text);

    note_sections.insertBefore(note_section, note_sections.firstChild);
}

// Обновление заметки в списке заметок
function update_note_in_list(note_id){
    // Получаем ту заметку, которую мы сейчас отредактировали
    const note = document.getElementById(note_id);
    // Удаляем ему, потому что если она где-то внизу списка, нужно показать что мы только что её изменили
    // и она стала актуальной (недавно изменённой)
    note_sections.removeChild(note);


    // Добавляем её заново, но теперь в начало списка (перед этим получаем её данные)
    const note_data = return_notes()[note_id];
    add_note(note_data);

    // Окошко заметки обновлено и даже не надо было заново вставлять какие-то элементы
}

// Обновление поля ввода текста и заголовка заметки
function update_textarea(note_id){
    // Получаем содержимое заметки по note_id
    const notes = return_notes();
    if((notes[note_id] || null) == null){
        console.error("index error");
        return;
    }
    // Применяем это всё к ui
    note_title_input.value = notes[note_id]['title'];
    note_text_input.value = notes[note_id]['text'];
}

// функция удаления заметки из списка заметки (визуально)
function remove_note(note_id){
    const note = document.getElementById(note_id);
    note_sections.removeChild(note);
}