exports.middlewareGlobal = (req,res,next) =>{
    res.locals.errors = req.flash('errors');
    res.locals.success = req.flash('success');
    res.locals.user = req.session.user;
    next();
}
exports.isLogged = (req,res,next)=> {
    if(!req.session.user){
        res.locals.errors = req.flash('errors','Você deve estar logado para completar essa ação!');

        req.session.save(()=>res.redirect('/login/index'));
        return;
    } else {
        next();
    }
}
exports.checkCsrfError = (err, req, res, next) =>{
    if(err){
        return res.render('404.ejs');
    }
    next();
}

exports.csrfMiddleware = (req, res, next) =>{
    res.locals.csrfToken = req.csrfToken();
    next();
}