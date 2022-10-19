import IMask from 'imask';
import "./css/index.css"

const ccBgColor1 = document.querySelector('.cc-bg svg > g g:nth-child(1) path');
const ccBgColor2 = document.querySelector('.cc-bg svg > g g:nth-child(2) path');
const ccLogo = document.querySelector('.cc-logo span:nth-child(2) img');

function setCardType(type) {
    const colors = {
        visa: ['#2D57F2', '#436D99'],
        mastercard: ['#C69347', '#DF6F29'],
        elo: ['#009CD5', '#F2C108'],
        default: ['black', 'gray'],
    }

    ccBgColor1.setAttribute('fill', colors[type][0])
    ccBgColor2.setAttribute('fill', colors[type][1])
    ccLogo.setAttribute('src', `cc-${type}.svg`)
}

setCardType('mastercard')

globalThis.setCardType = setCardType;

// Card Number
const cardNumberInput = document.querySelector('#card-number');
const cardNumberPattern = {
    mask: [
        {
            cardType: 'visa',
            mask: '0000 0000 0000 0000',
            regex: /^4\d{0,15}/
        },
        {
            cardType: 'mastercard',
            mask: '0000 0000 0000 0000',
            regex: /(^5[1-5]\d{0,2}|^22[2-9]\d|^2[3-7]\d{0,2})\d{0,12}/
        },
        {
            cardType: 'default',
            mask: '0000 0000 0000 0000',
        },
    ],
    dispatch: function (appended, dynamicMasked) {
        const number = (dynamicMasked.value + appended).replace(/\D/g,'');
        const foundMask = dynamicMasked.compiledMasks.find((item) => {
            return number.match(item.regex)
        })

        console.log(foundMask)
        return foundMask
    }
}

const cardNumberMasked = IMask(cardNumberInput, cardNumberPattern);

// Holder Name
const holderNameInput = document.querySelector('#card-number');
const holderNamePattern = {
    mask: '0000{ }0000{ }0000{ }0000'
  };

const holderNameMasked = IMask(holderNameInput, holderNamePattern);

// Security Code - CVC
const cvcInput = document.querySelector('#security-code');
const cvcPattern = {
    mask: '0000'
  };

const cvcMasked = IMask(cvcInput, cvcPattern);

// Expiration Date
const expirationDate = document.querySelector('#expiration-date')
const expirationDatePattern = {
    mask: 'MM{/}YY',
    blocks: {
        MM: {
                mask: IMask.MaskedRange,
                from: 1,
                to: 12
            },
        YY: {
                mask: IMask.MaskedRange,
                from: String(new Date().getFullYear()).slice(2),
                to: String(new Date().getFullYear() + 10).slice(2),
            },
    }
}
const expirationDateMasked = IMask(expirationDate, expirationDatePattern)
