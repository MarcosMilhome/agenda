const Contato = require('../models/contatoModel');

exports.index = (req,res) =>{
    return res.render('contato',{
        contato: {},
    });

}

exports.cadastro = async (req, res) =>{
    try{
        const contato = new Contato(req.body);
        await contato.register();
        if(contato.errors.length > 0){
            req.flash('errors', contato.errors);
            req.session.save(function(){
                return res.redirect('index');
            });
            return;
        }
        
        req.flash('success', 'Contato cadastrado com sucesso!');
        req.session.save( function(){
            return res.redirect(`./index/${contato.contato._id}`);
        });


    } catch (e){
        console.log(e);
        return res.render('404');
    }

}

exports.editIndex = async (req,res) =>{

    if(!req.params.id) return res.render('404');
    const contact = new Contato();
    const contato = await contact.findContato(req.params.id);
    if(!contato) return res.render('404');

    res.render('contato.ejs', { contato });
}

exports.edit = async (req,res) =>{

    try{
        const contato = new Contato(req.body);

        await contato.edit(req.body.id);

        if(contato.errors.length > 0){
            req.flash('errors', contato.errors);
            req.session.save(function(){
                return res.redirect(`/contato/index/${req.body.id}`);
            });
            return;
        }
        
        req.flash('success', 'Contato editado com sucesso!');
        req.session.save( function(){
            return res.redirect(`/contato/index/${req.body.id}`);
        });

    }catch (e){
        console.log(e);
        res.render('404');
    }
    
}

exports.delete = async (req,res) =>{
    if(!req.params.id) return res.render('404');
    try{
        const contact = new Contato();
        await contact.delete(req.params.id);
    
        req.flash('success', 'Contato deletado com sucesso!');
            req.session.save( function(){
                return res.redirect(`/`);
        });
    }catch (e){
        console.log(e);
        res.render('404');
    }
}