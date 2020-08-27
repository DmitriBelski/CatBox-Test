const getTemplate = (opt) => {
  const portion = numeral_format(opt.volume_numeral)
  const mouse = numeral_format(opt.gift_numeral)

  const items = opt.items
      .map(item => {
        const int = item.data.gift
        let gift = mouse(int) + opt.gift
        if (int !== 1) {gift = int + ' ' + gift}

        let cls
        if (item.active) {
          cls = item.selected ? 'selected' : ''
        } else {
          cls = 'disabled'
        }

        return `
          <div class="card ${cls}" data-target="${item.id}">
            <div class="back" data-id="${item.id}">
              <div class="front">
                <div class="info">
                  <span data-type="unless">${opt.slogan}</span>
                  <h1>${opt.brendname}</h1>
                  <h3>${item.data.flavor}</h3>
                  <p><strong>${item.data.volume} </strong>${portion(item.data.volume)}<br/>${gift}<br/>${item.data.happy || ''}</p>
                </div>
                <div class="circle">
                  <h1>${item.data.weight[0]}</h1>
                  <p>${item.data.weight[1]}</p>
                </div>
              </div>
            </div>
            <div class="under_text" data-type="under">
              <p>${opt.appeal[0]}<a data-id="${item.id}">${opt.appeal[1]}</a><i>.</i></p>
            </div>
          </div>
        `
      })
      .join('')

  return items
}

export class Card {
  constructor(selector, options) {
    this.$el = document.querySelector(selector)
    this.options = options
    this.$target = []
    this.$unless = []
    this.$under = []
    this.#render()
    this.#setup()
  }

  #render() {
    this.$el.classList.add('products')
    this.$el.innerHTML = getTemplate(this.options)
    this.options.items.forEach((item, i) => {
      this.$target.push(this.$el.querySelector(`[data-target="${item.id}"]`))
      this.$unless.push(this.$target[i].querySelector(`[data-type="unless"]`))
      this.$under.push(this.$target[i].querySelector(`[data-type="under"]`))
      if (this.isSelected(i+1)) {
        this.$under[i].innerHTML = `<p>${this.options.items[i].data.description}</p>`
      }
      if (this.isDisabled(i+1)) {
        this.$under[i].innerHTML = `<p>${this.options.sorry[0]}${this.options.items[i].data.flavor}${this.options.sorry[1]}</p>`
      }
    })
  }

  #setup() {
    this.clickHandler = this.clickHandler.bind(this)
    this.mouseoverHandler = this.mouseoverHandler.bind(this)
    this.mouseoutHandler = this.mouseoutHandler.bind(this)
    this.$el.addEventListener('click', this.clickHandler)
    this.$el.addEventListener('mouseover', this.mouseoverHandler)
    this.$el.addEventListener('mouseout', this.mouseoutHandler)
  }

  isSelected(id) {
    return this.$target[id-1].classList.contains('selected')
  }

  isDisabled(id) {
    return this.$target[id-1].classList.contains('disabled')
  }

  clickHandler(event) {
    const {id } = event.target.dataset
    if (this.isSelected(id)) {
      this.$target[id-1].classList.remove('selected')
      this.$under[id-1].innerHTML = `<p>${this.options.appeal[0]}<a data-id="${id}" data-type="appeal">${this.options.appeal[1]}</a><i>.</i></p>`
      this.$unless[id-1].innerHTML = `<span data-type="unless">${this.options.slogan}</span>`
    } else {
      this.$target[id-1].classList.remove('hover')
      this.$target[id-1].classList.add('selected')
      this.$under[id-1].innerHTML = `<p>${this.options.items[id].data.description}</p>`
    }
  }

  mouseoverHandler(event) {
    const {id } = event.target.dataset
    this.$target[id-1].classList.add('hover')
    if (this.isSelected(id)) {
      this.$unless[id-1].innerHTML = `<span data-type="unless">${this.options.unless}</span>`
    }
  }

  mouseoutHandler(event) {
    const {id } = event.target.dataset
    this.$target[id-1].classList.remove('hover')
    if (this.isSelected(id)) {
      this.$unless[id-1].innerHTML = `<span data-type="unless">${this.options.slogan}</span>`
    }
  }

  destroy() {
    this.$el.removeEventListener('click', this.clickHandler)
    this.$el.removeEventListener('mouseover', this.mouseoverHandler)
    this.$el.removeEventListener('mouseout', this.mouseoutHandler)
    this.$el.innerHTML = ''
  }
}

function numeral_format(arr) {
  return function(int) {
    const one = int % 10
    const ten = (int % 100 - one) / 10
    if (one === 1 && ten !== 1)  {
      return arr[0]
    } else if (one > 1 && one < 5 && ten !== 1) {
      return arr[1]
    } else {
      return arr[2]
    }
  }
}
