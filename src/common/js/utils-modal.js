import UtilsForm from './utlis-form.js';

class UtilsModal {
    constructor(parentElement) {
        this.parentElement = parentElement;
        this.rootElement = null;

        this.elements = {};

        this.utilsForm = null;
    }

    init() {
        this.initElements();
    }

    initElements() {
        this.rootElement = this.parentElement;

        this.elements = {
            rootElement: this.rootElement,
            wrapperForm: this.rootElement.querySelector('form'),
            wrapperTicket: this.rootElement.querySelector('.wrapper-ticket'),
            inputName: this.rootElement.querySelector('input[name="input-name"]'),
            inputLastame: this.rootElement.querySelector('input[name="input-lastname"]'),
            inputEmail: this.rootElement.querySelector('input[name="input-email"]'),
            wrapperCheckbox: this.rootElement.querySelector('.wrapper-checkbox'),
            inputCheckbox: this.rootElement.querySelector('input[name="checkbox-all"]'),
            ticketsIDInner: this.rootElement.querySelector('.tikcets-id-inner'),
            buttonSubmit: this.rootElement.querySelector('button'),
            clouseElement: this.rootElement.querySelector('.modal-close'),
        };

        this.utilsForm = new UtilsForm(this.elements.rootElement);
        this.utilsForm.init();

        this.elements.rootElement.classList.toggle('hidden', true);
        this.elements.wrapperCheckbox.classList.toggle('hidden', true);
    }

    initInputs() {
        const inputsList = this.rootElement.querySelectorAll('input');

        inputsList.forEach(element => {
            element.value = '';
            element.checked = false;
        });

        this.elements.wrapperTicket.classList.toggle('hidden', true);
        this.elements.wrapperForm.classList.toggle('hidden', false);
    }

    openModal() {
        this.initInputs();
        document.querySelector('main').style.filter = 'blur(5px)';
        document.querySelector('header').style.filter = 'blur(5px)';

        return new Promise((resolve, reject) => {
            this.elements.rootElement.classList.toggle('hidden', false);

            this.elements.buttonSubmit.addEventListener('click', (event) => {
                event.preventDefault();

                const emptyInput = this.utilsForm.getEmptyInput();
                if (emptyInput) {
                    emptyInput.forEach(element => {
                        this.utilsForm.setAsErrorField(element);
                    });
                } else {
                    const data = {
                        'prenotationName': this.elements.inputName.value,
                        'prenotationLastname': this.elements.inputLastame.value,
                        'prenotationEmail': this.elements.inputEmail.value,
                    };

                    resolve(data);
                }
            });

            this.elements.clouseElement.addEventListener('click', (event) => {
                event.preventDefault();

                reject('Its reject');
                this.clouseModal();
            });
        });
    }

    clouseModal() {
        this.elements.rootElement.classList.toggle('hidden', true);
        document.querySelector('main').style.filter = '';
        document.querySelector('header').style.filter = '';
    }

    showTicketsId(prenotationId) {
        this.elements.wrapperTicket.classList.toggle('hidden', false);
        this.elements.wrapperForm.classList.toggle('hidden', true);

        this.elements.ticketsIDInner.innerHTML = prenotationId;
    }
}

export default UtilsModal;