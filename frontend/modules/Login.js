import validator from "validator";

export default class Login{
    constructor(formClass){
        this.form = document.querySelector(formClass);
    }
    init(){
        this.events();
    }
    events(){
        if(!this.form) return;
        this.form.addEventListener('submit', e=>{
            e.preventDefault();
            this.validate(e);
        });
    }
    validate (e){
        const el = e.target;
        const emailInput = el.querySelector('input[name="email"]');
        const passwordInput = el.querySelector('input[name="password"]');
        let error = false;

        if(!validator.isEmail(emailInput.value)){
            error=true;
            const div = this.createText('Email Inválido!');
            const dad = this.form.querySelector('.email');
            if(!dad.querySelector('.form-text')){
                dad.insertBefore(div, emailInput.nextSibling);
            }

        }else{
            const dad = this.form.querySelector('.email');
            if(dad.querySelector('.form-text')){
                dad.querySelector('.form-text').remove();  
            }
        }

        if(passwordInput.value.length <3 || passwordInput.value.length>20){
            error=true;
            const div = this.createText('A senha deve conter entre 3 e 20 dígitos!');
            const dad = this.form.querySelector('.password');
            if(!dad.querySelector('.form-text')){
                dad.insertBefore(div, passwordInput.nextSibling);
            }

        }else{
            const dad = this.form.querySelector('.password');
            if(dad.querySelector('.form-text')){
                dad.querySelector('.form-text').remove();  
            }
        }

        if(!error) el.submit();

    }
    createText(text){
        const div = document.createElement(div);
        const textNode = document.createTextNode(text);
        div.appendChild(textNode);
        div.classList.add('form-text');
        div.classList.add('alert');
        div.classList.add('alert-danger');
        return div;
    }
}