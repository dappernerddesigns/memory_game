const section = document.querySelector('section')
let playerLivesCount = document.querySelector('span')
console.dir(playerLivesCount)
let playerLives = 6

playerLivesCount.textContent = playerLives

const getData = () => [
  { imgSrc: './img/simon-lee-5703jY29vZo-unsplash.jpg', name: 'The Wave' },
  {
    imgSrc: './img/simon-lee-bz6KiPlWt0M-unsplash.jpg',
    name: 'Birth of Venus',
  },
  { imgSrc: './img/simon-lee-c17yhU11jyE-unsplash.jpg', name: 'Mondrian' },
  { imgSrc: './img/simon-lee-EXgCBYk4wCc-unsplash.jpg', name: 'David' },
  { imgSrc: './img/simon-lee-xRVnUhe0fss-unsplash.jpg', name: 'Starry Night' },
  { imgSrc: './img/simon-lee-Jlqm6p_nntk-unsplash.jpg', name: 'Mona Lisa' },
  {
    imgSrc: './img/simon-lee-Irx24QuskMg-unsplash.jpg',
    name: 'American Gothic',
  },
  { imgSrc: './img/simon-lee-IhbQOvsbgMk-unsplash.jpg', name: 'Mount Fuji' },
  { imgSrc: './img/simon-lee-5703jY29vZo-unsplash.jpg', name: 'The Wave' },
  {
    imgSrc: './img/simon-lee-bz6KiPlWt0M-unsplash.jpg',
    name: 'Birth of Venus',
  },
  { imgSrc: './img/simon-lee-c17yhU11jyE-unsplash.jpg', name: 'Mondrian' },
  { imgSrc: './img/simon-lee-EXgCBYk4wCc-unsplash.jpg', name: 'David' },
  { imgSrc: './img/simon-lee-xRVnUhe0fss-unsplash.jpg', name: 'Starry Night' },
  { imgSrc: './img/simon-lee-Jlqm6p_nntk-unsplash.jpg', name: 'Mona Lisa' },
  {
    imgSrc: './img/simon-lee-Irx24QuskMg-unsplash.jpg',
    name: 'American Gothic',
  },
  { imgSrc: './img/simon-lee-IhbQOvsbgMk-unsplash.jpg', name: 'Mount Fuji' },
]

//Randomiser function
const randomise = () => {
  const cardsData = getData()
  cardsData.sort(() => Math.random() - 0.5)
  return cardsData
}

//Card generator

const cardGenerator = () => {
  const randomCardData = randomise()

  //HTML
  randomCardData.forEach((item) => {
    const card = document.createElement('div')
    const face = document.createElement('img')
    const back = document.createElement('div')
    card.classList = 'card'
    face.classList = 'face'
    //img info for face of card
    face.src = item.imgSrc
    card.setAttribute('name', item.name)
    back.classList = 'back'

    section.appendChild(card)
    card.appendChild(face)
    card.appendChild(back)

    card.addEventListener('click', (event) => {
      card.classList.toggle('toggleCard')
      checkCards(event)
    })
  })
}

//card matcher
const checkCards = (event) => {
  const clickedCard = event.target
  clickedCard.classList.add('flipped')
  const flippedCards = document.querySelectorAll('.flipped')
  const toggleCard = document.querySelectorAll('.toggleCard')
  if (flippedCards.length === 2) {
    if (
      flippedCards[0].getAttribute('name') ===
      flippedCards[1].getAttribute('name')
    ) {
      console.log('match')
      flippedCards.forEach((card) => {
        card.classList.remove('flipped')
        card.style.pointerEvents = 'none'
      })
    } else {
      console.log('no match')
      flippedCards.forEach((card) => {
        card.classList.remove('flipped')
        setTimeout(() => card.classList.remove('toggleCard'), 1000)
      })
      playerLives--
      playerLivesCount.textContent = playerLives
      if (playerLives === 0) {
        setTimeout(() => {
          restart()
        }, 1500)
      }
    }
  }
  if (toggleCard.length === 16) {
    setTimeout(() => {
      restart()
    }, 1500)
  }
}

//restart
const restart = () => {
  let cardData = randomise()
  let faces = document.querySelectorAll('.face')
  let cards = document.querySelectorAll('.card')
  section.style.pointerEvents = 'none'
  cardData.forEach((item, index) => {
    cards[index].classList.remove('toggleCard')
    setTimeout(() => {
      cards[index].style.pointerEvents = 'all'
      faces[index].src = item.imgSrc
      cards[index].setAttribute('name', item.name)
      section.style.pointerEvents = 'all'
    }, 1000)
  })

  playerLives = 6
  playerLivesCount.textContent = playerLives
}
cardGenerator()
