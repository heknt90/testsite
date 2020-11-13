const mySkills = [
    {
        name: 'Кроссбраузерная и адаптивная верстка',
        value: 80
    },
    {
        name: 'JavaScript + ES6',
        value: 70
    },
    // {
    //     name: 'Vue + Vuex',
    //     value: 60
    // },
    {
        name: 'Angular',
        value: 25
    },
    {
        name: 'Node JS + Express',
        value: 30
    },
    {
        name: 'Python + Django',
        value: 90
    }
]


const table = document.querySelector('#my-skills')
if (table) {
    table.classList.add('progress-bar--complete')
    const skillsNode = table.querySelector('tbody')
    table.replaceChild(makeProgressSkills(mySkills), skillsNode)
}


function makeProgressSkills(skills = []) {
    const node = document.createElement('tbody')
    skills.forEach((skill) => {
        node.append(createSkillItem(skill))
    })
    return node
}

function createSkillItem ({name, value}) {

    const templateSkill = `
                    <td class="progress-bar__title d-block">${name}</td>
                    <td class="progress-bar__wrapper d-block">
                        <div class="progress-bar__strip" style="width: ${value}%;"></div>
                        <span class="bubble">${value}%</span>
                    </td>
                          `
    let tr = document.createElement('tr')
    tr.className = 'progress-bar'

    tr.innerHTML = templateSkill
    return tr
}



// Hamburger

class Menu {

    refs = {}

    constructor(elem) {
        this.refs.root = elem
        this.refs.menuTop = elem.querySelector('.menu__element_top')
        this.refs.menuMiddle = elem.querySelector('.menu__element_middle')
        this.refs.menuBottom = elem.querySelector('.menu__element_bottom')

        this.refs.root.addEventListener('click', (event) => {
            this.toggleMenu()
            event.preventDefault()
        })
    }

    toggleMenu() {
        this.refs.menuTop.classList.toggle('menu-top-click')
        this.refs.menuMiddle.classList.toggle('menu-middle-click')
        this.refs.menuBottom.classList.toggle('menu-bottom-click')

        document.querySelector('.main-navigation__list').classList.toggle('main-navigation__list_hidden')
    }
}

new Menu(document.querySelector('.menu'))


class Carousel {

    delay = 6000
    interval = null

    slidesRef = null
    indicatorsRef = null
    slides = []
    indicators = []
    active = 0

    constructor(rootRef) {
        this.initialize(rootRef)
    }   

    initialize(rootRef) {
        rootRef.querySelectorAll('.carousel__item').forEach(item => this.slides.push(item))
        this.slidesRef = rootRef.querySelector('.carousel__list')
        this.indicatorsRef = this.generateIndicators()
        this.slidesRef.after(this.indicatorsRef)

        this.play()
    }

    changeSlide(number) {
        const lastActive = this.getActive()
        this.active = this.matchNext(number) 
        this.changeIndicatorActive(lastActive)
        this.changeSlideView()
    }

    changeSlideView() {
        this.slidesRef.style.left = '-' + this.getActive() * 100 + '%'
    }

    getActive() {
        return this.active
    }

    changeIndicatorActive(lastActive) {
        this.indicators[lastActive].classList.remove('carousel__indicator_active');
        this.indicators[this.getActive()].classList.add('carousel__indicator_active')
    }

    matchNext(value) {
        return value % this.slides.length 
    }

    nextSlide() {
        this.changeSlide(this.matchNext(this.getActive() + 1))
    }

    generateIndicators() {
        const wrap = document.createElement('ol')
        wrap.className="carousel__indicators list"
        this.slides.forEach((item, index) => {
            const indicator = document.createElement('li')

            if (index === 0) {
                indicator.className="carousel__indicator carousel__indicator_active"
            } else {
                indicator.className = "carousel__indicator"
            }
            indicator.addEventListener('click', () => {
                this.changeSlide(index)
                this.pause()
            })
            this.indicators[index] = indicator
            wrap.append(indicator)
        })
        return wrap
    }

    play() {
        this.interval = setInterval(() => {
            this.nextSlide()
        }, this.delay)
    }

    pause() {
        clearInterval(this.interval)
        this.interval = null
    }
}

const slider = new Carousel(document.querySelector('.carousel__wrapper'))
