const cityInput = document.querySelector('#city');
const addressInput = document.querySelector('#address');
const confirmButton = document.querySelector('#confirm-options-button');
const optionsError = document.querySelector('.options-block__error');
const officesLine = document.querySelector('.offices-line');

let cachingGetOffices = cachingDecorator(getOffices, (...args) => args.join('_'));

confirmButton.addEventListener('click', async () => {
    let offices = await cachingGetOffices(cityInput.value, addressInput.value);
    showOffices(offices);
});


async function getOffices(city, address) {
    let url = `${proxyUrl}${officesUrl}&city=${city}&address=${address}`;
    return loadJson(url);
}
function showOffices(offices) {
    officesLine.innerHTML = '';

    if (offices.length == 0) {
        optionsError.innerText = `We can't find offices by this address`;
        optionsError.classList.add('error_active');
        return;
    }
    optionsError.classList.remove('error_active');

    
    for (let officeInfo of offices) {
        let office = new Office(
            officeInfo.country, 
            officeInfo.city, 
            officeInfo.address, 
            officeInfo.email, 
            officeInfo.phone
        );

        officesLine.append(office.toHtmlElement());
    }
}
