import {Card} from './Card/card'
import './Card/styles.scss'
import './scss/index.scss'

const card = new Card('#cards', {
  slogan: 'Сказочное заморское яство',
  brendname: 'Нямушка',
  appeal: ['Чего сидишь? Порадуй котэ, ', 'купи'],
  unless: 'Котэ не одобряет?',
  sorry: ['Печалька, ', ' закончился.'],
  volume_numeral: ['порция', 'порции', 'порций'],
  gift_numeral: ['мышь', 'мыши', 'мышей'],
  gift: ' в подарок',
  items: [
    {
      id: 1, 
      active: true, 
      selected: false,
      data: {
        flavor: 'с фуа-гра',
        description: 'Печень утки разварная с артишоками.',
        volume: 10,
        gift: 1,
        weight: ['0,5', 'кг']
      }
    },
    {
      id: 2, 
      active: true, 
      selected: true,
      data: {
        flavor: 'с рыбой',
        description: 'Головы щучьи с чесноком да свежайшая сёмгушка.',
        volume: 40,
        gift: 2,
        weight: ['2', 'кг']
      }
    },
    {
      id: 3, 
      active: false, 
      selected: false,
      data: {
        flavor: 'с курой',
        description: 'Филе из цыплят с трюфелями в бульоне.',
        volume: 100,
        gift: 5,
        happy: 'заказчик доволен',
        weight: ['5', 'кг']
      }
    }
  ]
})
