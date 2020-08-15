
export default class Office {
    constructor(country, city, address, email, phoneNumber) {
        this.country = country;
        this.city = city;
        this.address = address;
        this.email = email;
        this.phoneNumber = phoneNumber;
    }

    toHtmlElement() {
        let office = document.createElement('div');
        office.className = 'office';

        office.innerHTML = `
            <p class="office__address">${this.country}, ${this.city},<br>${this.address}</p>
            <hr class="office__line">
        
            <div class="office__contacts">
                <p class="office__contact">${this.email}</p>
                <p class="office__contact">${this.phoneNumber}</p>
            </div>
        `;
        
        return office;
    }
}
