const mongoose = require('mongoose');
const validator =  require('validator');


const contatoSchema = new mongoose.Schema({
    name: {type: String, required: true},
    surname: {type: String, required: false, default: ''},
    tel: {type: String, required: false, default: ''},
    email: {type: String, required: false, default: ''},
    criadoEm: {type: Date, default: Date.now},
    idUser: {type: String, required: true},

});

const contatoModel = mongoose.model('contato', contatoSchema);

class Contato {
    constructor(body){
        this.body = body;
        this.errors = [];
        this.contato = null;
    }
    

    async register(){
        this.valida();
        if(this.errors.length > 0 ) return;

        this.contato = await contatoModel.create(this.body);

    }
    async findContato(id){
        if(typeof id !== 'string') return;
        return await contatoModel.findById(id);
    }
    async edit(id){

        if(typeof id !== 'string') return;

        this.valida();
        if(this.errors.length > 0) return;
        

        this.contato = await contatoModel.findByIdAndUpdate(id, this.body, {new: true});
    }

    async listContat(user){
        const contatos = await contatoModel.find({idUser: user})
        .sort({criadoEm: -1});
        return contatos;
    }

    async delete(id){
        if(typeof id !=='string') return;
        await contatoModel.findByIdAndDelete(id);
    }

    valida(){
        this.cleanUp();

        if(!this.body.name) this.errors.push('Nome é um campo obrigatorio!')
        
        if(this.body.email && !validator.isEmail(this.body.email)) this.errors.push('Email inválido');
        if(!this.body.email && !this.body.tel){
            this.errors.push('Você deve enviar pelo menos um contato: telefone ou email!')
        }
    }
    cleanUp(){
        for(const key in this.body){
            if(typeof this.body[key] !== 'string') {
                this.body[key]='';
            }
        }

        this.body = {
            name: this.body.name,
            surname: this.body.surname,
            tel: this.body.tel,
            email: this.body.email,
            idUser: this.body.idUser

        }
    }

}

module.exports = Contato;

