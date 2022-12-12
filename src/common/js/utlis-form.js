const inputOptions = {
    borderSize: '2px',
    borderStyle: 'solid',
    borderColorStd: '#F8F8F8',
    borderColorFocus: '#F8F8F8',
    borderColorError: '#FF0000',
};

class UtilsForm {
    constructor(parentElement) {
        this.rootElement = parentElement;
        this.elements = {};
    }

    init() {
        this.initElement();
        this.initEventListener();
    }

    initElement() {
        this.elements = {
            input: this.rootElement.querySelectorAll('input'),
            textarea: this.rootElement.querySelectorAll('textarea'),
            inputOnlyText: this.rootElement.querySelectorAll('.input-text-only'),
            inputOnlyNumber: this.rootElement.querySelectorAll('.input-num-only'),
            inputPhoneNumber: this.rootElement.querySelectorAll('[name="input-phone"]'),
        };
    }

    initEventListener() {
        // Remove form alert after refresh 
        if (window.history.replaceState) {
            window.history.replaceState(null, null, window.location.href);
        }

        // Base XSS protection
        this.elements.input.forEach(element => {
            element.addEventListener('input', (event) => {
                const lt = /</g, gt = />/g, ap = /'/g, ic = /"/g;
                event.target.value = event.target.value.toString().replace(lt, "&lt;").replace(gt, "&gt;").replace(ap, "&#39;").replace(ic, "&#34;");
                event.target.style.border = `${inputOptions.borderSize} ${inputOptions.borderStyle} ${inputOptions.borderColorFocus}`;
            });
            element.addEventListener('change', (event) => {
                event.target.style.border = `${inputOptions.borderSize} ${inputOptions.borderStyle} ${inputOptions.borderColorStd}`;
            });
        });
        this.elements.textarea.forEach(element => {
            element.addEventListener('input', (event) => {
                const lt = /</g, gt = />/g, ap = /'/g, ic = /"/g;
                event.target.value = event.target.value.toString().replace(lt, "&lt;").replace(gt, "&gt;").replace(ap, "&#39;").replace(ic, "&#34;");
                event.target.style.border = `${inputOptions.borderSize} ${inputOptions.borderStyle} ${inputOptions.borderColorFocus}`;
            });
            element.addEventListener('change', (event) => {
                event.target.style.border = `${inputOptions.borderSize} ${inputOptions.borderStyle} ${inputOptions.borderColorStd}`;
            });
        });

        // Delete all special symbols and numeric
        this.elements.inputOnlyText.forEach(element => {
            element.addEventListener('input', (event) => {
                event.target.value = event.target.value.toString().replace(/[^a-zA-Z ]/g, "");
            });
        });

        // Delete all no numeric
        this.elements.inputOnlyNumber.forEach(element => {
            element.addEventListener('input', (event) => {
                event.target.value = event.target.value.toString().replace(/\D/g, '');
            });
        });
    }

    // To check if where are some empty elements
    getEmptyInput() {
        let listEmptyInputs = Array();

        this.elements.input.forEach(element => {
            if (element.getAttribute('type') != 'hidden' && element.value.toString().replace(/\s/g, '') == '' && element.getAttribute('type') != 'checkbox') {
                listEmptyInputs.push(element);
            }
        });

        this.elements.textarea.forEach(element => {
            if (element.getAttribute('type') != 'hidden' && element.value.toString().replace(/\s/g, '') == '' && element.getAttribute('type') != 'checkbox') {
                listEmptyInputs.push(element);
            }
        });

        if (listEmptyInputs.length > 0) {
            return listEmptyInputs;
        }
        return null;
    }

    validatePhoneNumber(element) {
        const regexp = new RegExp(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im);
        const isValid = regexp.test(element.value.toString());

        if (isValid) return true;
        return false;
    }

    setAsErrorField(element) {
        element.style.border = `${inputOptions.borderSize} ${inputOptions.borderStyle} ${inputOptions.borderColorError}`;
    }
}

export default UtilsForm;
