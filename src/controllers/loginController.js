const User = require('../models/LoginModel');

exports.index = (req, res) =>{
    if(req.session.user) return res.redirect('/');
    return res.render('login');
}

exports.register = async (req, res) =>{
    try{
        const user = new User(req.body);
        await user.register();
        if(user.errors.length > 0){
            req.flash('errors', user.errors);
            req.session.save(function(){
                return res.redirect('index');
            });
            return;
        }
        
        req.flash('success', 'Seu usuário foi criado com sucesso');
        req.session.save( function(){
            return res.redirect('index');
        });


    } catch (e){
        console.log(e);
        return res.render('404');
    }
}

exports.login = async (req, res) =>{
    try{
        const user = new User(req.body);
        await user.login();
        if(user.errors.length > 0){
            req.flash('errors', user.errors);
            req.session.save(function(){
                return res.redirect('index');
            });
            return;
        }
        
        req.flash('success', 'Você entrou no sistema');
        req.session.user = user.user;
        req.session.save( function(){
            return res.redirect('/');
        });


    } catch (e){
        console.log(e);
        return res.render('404');
    }
}

exports.logout = function(req,res){
    req.session.destroy();
    res.redirect('/login/index');
}