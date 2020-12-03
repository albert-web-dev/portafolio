const db = firebase.firestore();

const opciones_color = {
    amarillo: '#fec110',
    celeste: '#53bced',
    verde: '#02bb73',
    magenta: '#f048b6',
    normal: '#cccccc'
}
var count = 0;

//menu de hamburguesa
const navSlide = () =>{
    const burger = document.querySelector('.menu__burger');
    const nav = document.querySelector('.menu__contenedor');
    const navLinks = document.querySelectorAll('.menu__link');

    //toggle nav
    burger.addEventListener('click', ()=>{
        nav.classList.toggle('nav-active');

        //animacion de los enlaces
        navLinks.forEach((link, index) =>{
            if(link.style.animation){
                link.style.animation = '';
            }else{
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.4}s`;
            }
        });

        //animacion del menu hamburguesa
        burger.classList.toggle('toggle');
    });
}

//transicion translate
function Transicion(engrane, colores){
    if(count == 0){
        engrane.style.transform = 'translateX(-12vw)'; 
        engrane.style.transition = '.7s';
        
        colores.style.transform = 'translateX(-13vw)';
        colores.style.transition = '.7s';
        
        count = 1;
    }else{
        engrane.style.transform = 'translateX(0vw)'; 
        engrane.style.transition = '.7s';

        colores.style.transform = 'translateX(0vw)';
        colores.style.transition = '.7s';
        
        count = 0;
    }
}

//seleccion de enlaces del menu
function LimpiarLinks(links){
    
    //limpiar clases extra
    for(let j = 0; j < links; j++){
        links[j].classList.remove('yelowColor');
        links[j].classList.remove('celesteColor');
        links[j].classList.remove('verdeColor');
        links[j].classList.remove('magentaColor');
    }
}


//load page
window.addEventListener('load', ()=>{
    
    navSlide();
    //movimiento del menu
    window.addEventListener('scroll', ()=>{
        let menu = document.querySelector('.menu');
        menu.classList.toggle('menu__movimiento', window.scrollY > 0);
    });


    //movimiento del engrane 
    let engrane_icono = document.querySelector('.engrane__icono');
    var engrane = document.querySelector('.engrane');
    var colores = document.querySelector('.colores');
    
    engrane_icono.addEventListener('click', function(){
        Transicion(engrane, colores);
    });


    //animacion del portafolio
    let proyectos_informacion = document.querySelectorAll('.portafolio__imgContainer');
    proyectos_informacion.forEach((proyecto) => {
        proyecto.addEventListener('mouseover', (e)=>{
            e.preventDefault();
            proyecto.style.opacity = .90;
        });
        proyecto.addEventListener('mouseout', (e)=>{
            e.preventDefault();
            proyecto.style.opacity = 0.0
        })
    });
    
    //enviar formulario
    let form = document.querySelector('.contacto__form')
    form.addEventListener('submit', async (e) =>{
        e.preventDefault();
        const nombre = form['name']
        const email = form['email']
        const mensaje = form['mensaje']

        if(nombre.value !== '' || email.value !== '' || mensaje.value !== ''){
            await db.collection('persona').doc().set({
                nombre: nombre.value,
                email: email.value,
                mensaje: mensaje.value
            })
            Swal.fire({
                icon: 'success',
                title: 'success!!!',
                text: 'Formulario enviado, te responderé a la brevedad posible.'
              })
        }else{
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Para enviar, es necesario llenar todos los campos del formulario.'
              })
        }
        
        form.reset();
    })


    //cambio de colores
    let amarillo = document.querySelector('.colores__amarillo');
    let celeste = document.querySelector('.colores__celeste');
    let verde = document.querySelector('.colores__verde');
    let magenta = document.querySelector('.colores__magenta');

    //clases que cambiarán de color
    let menu__logo = document.querySelector('.menu__logo');
    let enlaces = document.querySelectorAll('.menu__link');
    let input = document.querySelector('.enviar__enviar');
    let footer = document.querySelector('.footer');
    
    //eventos para cambiar colores

    //amarillo
    amarillo.addEventListener('click', function(){
        menu__logo.style.color = opciones_color.amarillo;
        input.style.background = opciones_color.amarillo;
        footer.style.borderTop = '1px solid #fec110'

        proyectos_informacion.forEach((proyecto) =>{
            proyecto.style.background = opciones_color.amarillo;
        });
        
        //asignar nueva clase a etiqueta a
        LimpiarLinks(enlaces);
        for(let i = 0; i < enlaces.length; i++){
            enlaces[i].className = 'yellowColor';
        }

    });

    //celeste
    celeste.addEventListener('click', function(){
        menu__logo.style.color = opciones_color.celeste;
        input.style.background = opciones_color.celeste;
        footer.style.border.top = '1px solid #53bced'

        proyectos_informacion.forEach((proyecto) =>{
            proyecto.style.background =  opciones_color.celeste;
        });

        //asignar nueva clase a etiqueta a
        LimpiarLinks(enlaces);
        for(let i = 0; i < enlaces.length; i++){
            enlaces[i].className = 'celesteColor';
        }
    });

    //verde
    verde.addEventListener('click', function(){
        menu__logo.style.color = opciones_color.verde;
        input.style.background = opciones_color.verde;

        proyectos_informacion.forEach((proyecto) =>{
            proyecto.style.background = opciones_color.verde;
        });
        
        //asignar nueva clase a etiqueta a
        LimpiarLinks(enlaces);
        for(let i = 0; i < enlaces.length; i++){
            enlaces[i].className = 'verdeColor';
        }
    });

    //magenta
    magenta.addEventListener('click', function(){
        menu__logo.style.color = opciones_color.magenta;
        input.style.background = opciones_color.magenta;

        proyectos_informacion.forEach((proyecto) =>{
            proyecto.style.background = opciones_color.magenta;
        });
        
        //asignar nueva clase a etiqueta a
        LimpiarLinks(enlaces);
        for(let i = 0; i < enlaces.length; i++){
            enlaces[i].className = 'magentaColor';
        }
    });
});//end load