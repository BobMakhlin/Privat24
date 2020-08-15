import { proxyUrl, atmsUrl } from './helpers/urls.js'
import { tilesApiKey } from './helpers/keys.js';
import loadJson from './helpers/loadingHelper.js';

const cityInput = document.querySelector('#city');
const addressInput = document.querySelector('#address');
const confirmButton = document.querySelector('#confirm-options-button');
const optionsError = document.querySelector('.options-block__error');

const myMap = L.map('mapid');
const mapLayer = L.layerGroup().addTo(myMap);
initMap();


confirmButton.addEventListener('click', async () => {
    try {
        mapLayer.clearLayers();
        optionsError.classList.remove('error_active');

        let atms = await getAtmsOf(cityInput.value, addressInput.value);

        for (let atm of atms) {
            showMarker(atm.longitude, atm.latitude, atm.fullAddressRu);
        }

        let centerX = _.meanBy(atms, atm => +atm.longitude);
        let centerY = _.meanBy(atms, atm => +atm.latitude);
        myMap.setView([centerX, centerY], 10.5);
    }
    catch (err) {
        optionsError.innerText = `We can't find ATMs by this address`;
        optionsError.classList.add('error_active');
    }
});


function initMap() {
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: tilesApiKey
    }).addTo(myMap);
}
async function getAtmsOf(city, address = '') {
    let url = `${proxyUrl}${atmsUrl}&city=${city}&address=${address}`;
    let atmsData = await loadJson(url);
    return atmsData.devices;
}

function showMarker(x, y, popupContent = null) {
    let marker = L.marker([x, y]).addTo(mapLayer);

    if (popupContent) marker.bindPopup(popupContent);

    return marker;
}
