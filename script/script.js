const buttonMen = document.querySelector('.header__button-gender-men');
const buttonWomen = document.querySelector('.header__button-gender-women');
const body = document.body;
const cardImage = document.querySelector(".card__image");
const cardText = document.querySelector(".card__text");
const buttonText = document.querySelector('.header__button-change-text');
const buttonImage = document.querySelector('.header__button-change-image');

const state = {
    gender: body.classList.contains('women') ? 'women' : 'men',
};

const getRandomForArr = (arr) => {
    const randomNumber = Math.floor(Math.random() * arr.length);
    return arr[randomNumber];
};

const getData = () => fetch('db.json').then(response => response.json());

const changeHtml = () => {
    if (state.photo.includes('black')) {
        cardText.style.color = 'white';
    } else {
        cardText.style.color = '';
    }

    cardImage.src = `img/fon/${state.photo}`;
    cardText.innerHTML = state.text.replaceAll('\n', '<br>');
}

const getDataToCard = () => {
    getData().then(data => {
        state.text = getRandomForArr(data.text[state.gender]);
        state.photo = getRandomForArr(data.photo[state.gender]);
        changeHtml();
    });
};


const changeToMen = () => {
    if (state.gender === 'women') {
        body.classList.add('men');
        body.classList.remove('women');
        state.gender = 'men'
        getDataToCard();
    }
};

const changeToWomen = () => {
    if (state.gender === 'men') {
        body.classList.add('women');
        body.classList.remove('men');
        state.gender = 'women'
        getDataToCard()
    }
};

const changeText = () => {
    getData().then(data => {
        state.text = getRandomForArr(data.text[state.gender]);
        changeHtml();
    })
};

const changeImage = () => {
    getData().then(data => {
        state.photo = getRandomForArr(data.photo[state.gender]);
        changeHtml();
    })
};

buttonMen.addEventListener('click', changeToMen);
buttonWomen.addEventListener('click', changeToWomen);
buttonText.addEventListener('click', changeText);
buttonImage.addEventListener('click', changeImage);
getDataToCard();

const cardWrapper = document.querySelector('.card__wrapper');
const cardButton = document.querySelector('.card__button');

cardButton.addEventListener('click', () => {
    html2canvas(cardWrapper).then(canvas => {

        const dataURL = canvas.toDataURL('image/png');

        const link = document.createElement('a');
        link.href = dataURL;
        link.download = 'cardWrapper.png';

        link.click();
    });
});

