export default class Contato{
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
        const nameInput = el.querySelector('input[name="name"]');
        const emailInput = el.querySelector('input[name="email"]');
        const telInput = el.querySelector('input[name="tel"]');

        let error = false;

        if(!nameInput.value){
            error=true;
            const div = this.createText(`O campo 'Nome' é obrigatório!`);
            const dad = this.form.querySelector('.name');
            if(!dad.querySelector('.form-text')){
                dad.insertBefore(div, nameInput.nextSibling);

            }

        }else{
            const dad = this.form.querySelector('.name');
            if(dad.querySelector('.form-text')){
                dad.querySelector('.form-text').remove();  
            }
        }

        if(!(emailInput.value) && !(telInput.value)){
            error=true;
            const div = this.createText('Pelo menos um dos campos deve ser preenchido: Email ou Contato');
            const dad = this.form.querySelector('.email');
            if(!dad.querySelector('.form-text')){
                
                dad.insertBefore(div,emailInput.nextSibling);
            };
            

        }else{
            const dad = this.form.querySelector('.email');
            if(dad.querySelector('.form-text')){
                
                dad.querySelector('.form-text').remove();
            }
        }

        if(!error) el.submit();

    }
    createText(text){
        const div = document.createElement('div');
        const textNode = document.createTextNode(text);
        div.appendChild(textNode);
        div.classList.add('form-text');
        div.classList.add('alert');
        div.classList.add('alert-danger');
        return div;
    }
}