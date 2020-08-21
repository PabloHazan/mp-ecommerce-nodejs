const express = require('express');
const exphbs = require('express-handlebars');
const mp = require('./mp');

const app = express();

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/detail', async (req, res) => {
    try {
        const initPoint = await mp.getInitPoint(req.query);
        res.render('detail', { ...req.query, initPoint });
    } catch (error) {
        res.redirect('/')
    }
});

app.post('/notification', (req, res) => {
    console.log(req.body)
    res.status(200).send();
})

app.get('/success', (req, res) => {
    res.render('success', req.query)
});

app.get('/pending', (req, res) => {
    const message = 'Pago pendiente';
    res.render('notSuccess', { message });
});

app.get('/failure', (req, res) => {
    const message = 'No se pudo realizar el pago';
    res.render('notSuccess', { message })
});


app.use(express.static('assets'));

app.use('/assets', express.static(__dirname + '/assets'));

app.listen(process.env.PORT || 3000);