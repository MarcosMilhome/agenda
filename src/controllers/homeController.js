const Contato = require('../models/contatoModel');

exports.index = async (req, res) => {  
    const contato = new Contato();
    const contatos = await contato.listContat(req.session.user.email);

    res.render('index', { contatos });
    return;
}

