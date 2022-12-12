import UtilsFetch from '../../common/js/utils-fetch.js';
import UtilsModal from '../../common/js/utils-modal.js';
import ConcertComponent from './concert-component.js';

const wrapperConcerts = document.querySelector('section.concerts');
const wrapperModal = document.querySelector('.modal-form-prenotation');

const concertList = [];

const modalPrenotation = new UtilsModal(wrapperModal);
modalPrenotation.init();

UtilsFetch.postData('./php/concert-get-data-script.php', {})
    .then(response => {
        if (response.status === 201) {
            const data = JSON.parse(response.data);

            data.forEach(concertSetting => {
                const concertComponent = new ConcertComponent(wrapperConcerts, modalPrenotation, concertSetting);
                concertComponent.init();

                concertList.push(concertComponent)
            });
        } else {
            // todo
        }
    });