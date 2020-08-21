const mercadopago = require('mercadopago');

mercadopago.configure({
    access_token: 'APP_USR-6317427424180639-042414-47e969706991d3a442922b0702a0da44-469485398',
    integrator_id: 'dev_24c65fb163bf11ea96500242ac130004',
});

const baseUrl = 'https://pablohazan-mp-ecommerce-nodejs.herokuapp.com/';

const parseImage = (url) => baseUrl + url;

const createItem = (title, unit_price, quantity, picture_url) => ({
    id: '1234',
    title,
    unit_price,
    quantity,
    category_id: 'phones',
    description: 'Dispositivo móvile de Tienda e-commerce',
    picture_url
})

const external_reference = 'phazan.fiuba@gmail.com';
const payer = {
    name: 'Lalo',
    surname: 'Landa',
    email: 'test_user_63274575@testuser.com',
    phone: {
        area_code: '11',
        number: 22223333,
    },
    address: {
        zip_code: '1111',
        street_name: 'False',
        street_number: 123
    },
    identification: {
        type: "",
        number: "471923173"
    },
};

const auto_return = 'approved';
const notification_url = `${baseUrl}notification`;
const back_urls = {
    success: `${baseUrl}success`,
    pending: `${baseUrl}pending`,
    failure: `${baseUrl}failure`,
};

const payment_methods = {
    installments: 6,
    default_installments: 1,
    excluded_payment_methods: [{ id: 'amex' }],
    excluded_payment_types: [{ id: 'atm' }],
};


const createPreference = (title, price, unit, img) => ({
    items: [createItem(title, parseFloat(price), parseInt(unit), parseImage(img))],
    external_reference,
    payer,
    back_urls,
    payment_methods,
    notification_url,
    auto_return
})

const getInitPoint = async ({ title, price, unit, img }) => {
    const preference = createPreference(title, price, unit, img);
    try {
        const response = await mercadopago.preferences.create(preference)
        console.log("preferenceId", response.body.id)
        return response.body.init_point
    } catch (error) {
        console.log(error);
        throw errror
    }
}

module.exports = {
    getInitPoint
}
