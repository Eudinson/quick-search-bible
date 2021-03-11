
const header = document.querySelector('.header');
const container = document.querySelector('.container');
const bibleVersion = '?translation=web';
const bookSelector = document.querySelectorAll('.bookSelector');

// Mobile view btn

const search = document.querySelector('.search-btn');

const hideSearch = () => {
    header.classList.toggle('hideHeader');
}

search.addEventListener('click', hideSearch);


const data = {
    url: 'https://bible-api.com',
    books: 'books.json',
}

const { url, books, verse } = data;


// Dropdown ComboBox
const elements = () => {

    let dropDownContainer = document.createElement('div');
    dropDownContainer.classList.add('drop-down-container');

    let bibleBooks = document.createElement('select');

    // Remove items
    const removeComboItems = () => {
        bibleBooks.innerText = null;
    }


    // Get old books
    const getOldBooks = () => {
        removeComboItems();
        const getBooks = async () => {

            const res = await fetch(books);
            const getData = await res.json();

            for (let i = 0; i < getData.oldTestament.length; i++) {
                bibleBooks.add(new Option([getData.oldTestament[i]]));
            }
        }

        getBooks();

    }

    // ComboBox default Value
    getOldBooks();

    // Get new books
    const getNewBooks = () => {
        removeComboItems();
        const getBooks = async () => {

            const res = await fetch(books);
            const getData = await res.json();

            for (let i = 0; i < getData.newTestament.length; i++) {
                bibleBooks.add(new Option([getData.newTestament[i]]));
            }
        }

        getBooks();

    }

    // For radio button selector
    for (let i = 0; i < bookSelector.length; i++) {
        bookSelector[i].addEventListener('change', () => {
            bookSelector.forEach(radio => {
                if (radio.checked) {
                    if (radio.value === "old") {
                        getOldBooks();
                    } else if (radio.value === "new") {
                        getNewBooks();
                    }
                }
            });
        });
    }

    dropDownContainer.appendChild(bibleBooks);
    header.appendChild(dropDownContainer);
    bibleBooks.setAttribute('id', 'cboBox');

    const chapter = document.createElement('input');
    chapter.setAttribute('type', 'text');
    chapter.setAttribute('id', 'chapter');
    chapter.placeholder = "Single chapter only"
    chapter.maxLength = 6;
    dropDownContainer.appendChild(chapter);

    const verse = document.createElement('input');
    verse.setAttribute('type', 'text');
    verse.setAttribute('id', 'verse');
    verse.placeholder = "Verse or verses (e.g. 1-2)"
    verse.maxLength = 6;
    dropDownContainer.appendChild(verse);

    const btn = document.createElement('button');
    btn.classList.add('btn-search');
    btn.innerText = "Search";
    dropDownContainer.appendChild(btn);

    const chapterValue = chapter;
    const verseValue = verse;

    // Chapter input number validation
    let numbersOnly = (keys) => {
        if (keys.keyCode < 48 || keys.keyCode > 57) {
            chapterValue.readOnly = true;
        } else {
            chapterValue.readOnly = false;
        }
    }

    chapterValue.addEventListener('keypress', numbersOnly);

    const passageTitle = document.createElement('p');
    container.appendChild(passageTitle);
    passageTitle.classList.add('passageTitle');
    passageTitle.style.display = "none";


    const passage = document.createElement('p');
    container.appendChild(passage);
    passage.classList.add('passage');

    btn.addEventListener('click', () => {
        
        header.classList.toggle('hideHeader');

        let result;

        const isNull = (strValue) => {
            if (strValue === "") {
                return true;
            }
            return false;
        }

        if (isNull(verseValue.value)) {
            result = `${chapterValue.value}`;
        } else {
            result = `${chapterValue.value}:${verseValue.value}`
        }

        // Show data
        const getData = async function fetchComments() {
            const response = await fetch(`${url}/${bibleBooks.value}${result}${bibleVersion}`);
            const datas = await response.json();

            if (isNull(chapterValue.value)) {
                passageTitle.style.display = "none";
                passage.innerText = "Please enter the chapter...";
            } else {
                passageTitle.style.display = "block";
                passageTitle.innerText = datas.reference;
                passage.innerText = datas.text;
            }

            chapterValue.value = "";
            verseValue.value = "";
        }

        getData();

    });

    // footer
    const footer = document.createElement('footer');
    footer.classList.add('footer');

    const developer = document.createElement('h6');
    const devlink = document.createElement('a');
    devlink.innerText = "Developer: Eudin Uy"
    devlink.setAttribute('href','https://github.com/Eudinson')
    devlink.setAttribute('target','_blank')
    developer.appendChild(devlink);

    const aboutWeb = document.createElement('h6');
    const aLink = document.createElement('a');
    aLink.innerText = "About World English Bible"
    aLink.setAttribute('href','https://en.wikipedia.org/wiki/World_English_Bible');
    aLink.setAttribute('target', '_blank');
    aboutWeb.appendChild(aLink);

    footer.appendChild(developer);
    footer.appendChild(aboutWeb);
    header.appendChild(footer);

}

elements();




