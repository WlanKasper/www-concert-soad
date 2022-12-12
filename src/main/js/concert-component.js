import UtilsFetch from '../../common/js/utils-fetch.js';

class ConcertComponent {
    constructor(parentElement, modalComponent, setting) {
        this.parentElement = parentElement;
        this.setting = setting;
        this.modalComponent = modalComponent;

        this.rootElement = null;
        this.template = null;
        this.elements = {};

        this.isSoldOut = false;
    }

    init() {
        this.initSetting();
        this.initElements();
        this.initEventListeners();
    }

    initElements() {
        this.rootElement = this.parentElement;

        this.elements = {
            rootElement: this.template.querySelector('.wrapper-concerts'),
            ticketsNumber: this.template.querySelector('.concert-tickets-num'),
            buttonElement: this.template.querySelector('button'),
            buttonText: this.template.querySelector('.button-buy'),
        };

        if (this.isSoldOut) {
            this.elements.buttonElement.disabled = true;
        }

        this.rootElement.appendChild(this.template);
    }

    initEventListeners() {
        this.elements.buttonElement.addEventListener('click', (event) => {
            event.preventDefault();

            this.modalComponent.openModal()
                .then(resolve => {
                    const data = {
                        'concertId': this.setting.concerto_id,
                        'prenotationName': resolve.prenotationName,
                        'prenotationLastname': resolve.prenotationLastname,
                        'prenotationEmail': resolve.prenotationEmail,
                    };

                    UtilsFetch.postData('./php/prenotation-ticket-script.php', data)
                        .then(response => {
                            if (response.status === 201) {
                                const responseConcert = JSON.parse(response.responseConcert);
                                const responsePrenotation = JSON.parse(response.responsePrenotation);

                                this.modalComponent.showTicketsId(responsePrenotation);

                                responseConcert.forEach(element => {
                                    this.updateCurrentTickets(element.concerto_ticket_num_current);
                                });
                            }
                        });
                })
                .catch(reject => {
                    console.log(reject);
                })
        });
    }

    initSetting() {
        const parser = new DOMParser();
        this.isSoldOut = (this.setting.concerto_ticket_num_max <= this.setting.concerto_ticket_num_current) ? true : false;
        const templateString = `<div class="wrapper-concerts">
            <div class="block-concert">
                <div class="concert-img">
                    <img src="../common/img/${this.setting.concerto_img_path}" alt="" srcset="">
                </div>
                <div class="wrapper-concert-info">
                    <div class="wrapper-concert-heading">
                        <div class="wrapper-date">
                            <h3 class="concert-city">
                                ${this.setting.concerto_name}
                            </h3>
                            <h5 class="concert-date">
                                ${this.setting.concerto_date}
                            </h5>
                        </div>
                        <div class="wrapper-counter">
                            <h5 class="concert-tickets-text">
                                Tickets available
                            </h5>
                            <h3 class="concert-tickets-num red-color">
                                ${!this.isSoldOut ? (this.setting.concerto_ticket_num_max - this.setting.concerto_ticket_num_current) : 'Sold out'}
                            </h3>
                        </div>
                    </div>
                    <h6 class="concert-info">
                        ${this.setting.concerto_desc}
                    </h6>
                    <div class="wrapper-concert-bott">
                        <h4 class="concert-time red-color">
                            ${this.setting.concerto_time_start.slice(0, -3)} - ${this.setting.concerto_time_end.slice(0, -3)}
                        </h4>
                        <h5 class="concert-address">
                            ${this.setting.concerto_address}
                        </h5>
                    </div>
                    <div class="wrapper-button">
                        <button>
                            <h4 class="button-buy black-color">
                                ${!this.isSoldOut ? 'Buy Ticket' : 'Sold out'}
                            </h4>
                        </button>
                        <h1 class="concert-price">
                            $${this.setting.concerto_ticket_price}
                        </h1>
                    </div>
                </div>
            </div>
        </div>`;
        const templateElement = parser.parseFromString(templateString, 'text/html');

        this.template = templateElement.documentElement.querySelector("body > div");
    }

    updateCurrentTickets(currentTicketsNum) {
        if (this.setting.concerto_ticket_num_max > currentTicketsNum) {
            this.elements.ticketsNumber.innerHTML = (this.setting.concerto_ticket_num_max - currentTicketsNum);
        } else {
            this.elements.ticketsNumber.innerHTML = 'Sold out';
            this.elements.buttonElement.disabled = true;
            this.elements.buttonText.innerHTML = 'Sold out';

            this.modalComponent.hideCheckbox();
        }

    }
}

export default ConcertComponent;