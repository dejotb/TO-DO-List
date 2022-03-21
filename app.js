


class Note {
    date = new Date();

    id = `${new Date().getTime()}`.slice(-10);

    constructor(title, text) {
        this.title = title  // input title
        this.text = text // input text
    }


}





// APPLICATION ARCHITECTURE
const container = document.querySelector('.container');
const formTitle = document.querySelector('.form__title');
const formText = document.querySelector('.form__text');
const listItems = document.querySelector('.list__items');
const buttonCreateNewNote = document.querySelector('.button--cta');


class App {
    #notes = [];

    constructor() {
        buttonCreateNewNote.addEventListener('click', this._newNote.bind(this));
        listItems.addEventListener('click', this._handleNote.bind(this));

        // Get data from local storage
        this._getLocalStorage();
    }

    _newNote() {
        // create new note
        const note = new Note();

        // add new note to notes
        this.#notes.push(note);

        // Animate button
        this._animateButton()
        // add data to local storage
        // this._setLocalStorage()

        this._renderListItem(note)
    }

    _renderListItem(note) {
        const html = `<li class="list__item" data-id="${note.id}">
        <form class="form" name="notes__form">
            <button class='button form__button--escape'>X</button>
            <input name="searchTxt" type="text" class="form__title" placeholder="Title..." value="${!note.title ? '' : note.title}">
            <textarea
            name=""
            class="form__text"
            required=""
            cols="15"
            rows="2"
             placeholder="Text..."
            >${!note.text ? '' : note.text}</textarea>
            <button class="button form__button" type="submit">save
            </button>
        </form>
        </li>`;

        listItems.insertAdjacentHTML('afterbegin', html);
    }



    _clearInput() {
        formTitle = '';
    }

    _handleNote(e) {
        e.preventDefault();
        if (e.target.classList.contains('form__button')) {
            this._saveSelectedNote(e)
        }
        if (e.target.classList.contains('form__button--escape')) {
            this._deleteSelectedNote(e)
        }
    }

    _saveSelectedNote(e) {
            const el = e.target.closest('.list__item');
            const note = this.#notes.find(listEl => listEl.id === el.dataset.id);
            note.title = el.querySelector('.form__title').value
            note.text = el.querySelector('.form__text').value

            if(note.title || note.text) {
                this._setLocalStorage()
            }

    }

    _deleteSelectedNote(e) {
            const el = e.target.closest('.list__item');
            // console.log(el);
            this.#notes.pop(listEl => listEl.id === el.dataset.id);
            // console.log(this.#notes);
            el.remove();
            this._setLocalStorage()
    }

    _setLocalStorage() {
        localStorage.setItem('notes', JSON.stringify(this.#notes));
      }

      _getLocalStorage() {
        const data = JSON.parse(localStorage.getItem('notes'));

        if (!data) return;

        this.#notes = data;

        this.#notes.forEach(note => {
          this._renderListItem(note);
        });
      }

      reset() {
        localStorage.removeItem('workouts');
        location.reload();
      }

      _animateButton() {
        const iconPlus = buttonCreateNewNote.querySelector("#icon__plus");
        iconPlus.classList.add('fade-out-in');
        buttonCreateNewNote.classList.add('hover');
        setTimeout(() => {
        iconPlus.classList.remove('fade-out-in');
        buttonCreateNewNote.classList.remove('hover');
        }, 500);
      }




}

const app = new App()

