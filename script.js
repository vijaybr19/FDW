let move_speed = 5 , gravity =0.5;
let bird = document.querySelector('.bird');
let img = document.getElementById('bird-1');
let sound_point= new Audio('sound effect/point.mp3');
let sound_die = new Audio('sound effect/die.mp3');
let bird_prop = bird.getBoundingClientRect();
let background = document.querySelector('.background').getBoundingClientRect();
let score_val = document.querySelector('.score_val');
let message = document.querySelector('.message');
let score_title = document.querySelector('.score_title');
let game_state = 'Start';
img.style.display = 'none';
message.classList.add('messageStyle');

document.addEventListener('keydown', (e) => {
    
    if(e.key == 'Enter' && game_state != 'Play'){
        document.querySelectorAll('.pipe_sprite').forEach((e) => {
            e.remove();
        });
        img.style.display = 'block';
        bird.style.top = '40vh';
        game_state = 'Play';
        message.innerHTML = '';
        score_title.innerHTML = 'Score : ';
        score_val.innerHTML = '0';
        message.classList.remove('messageStyle');
        play();
    }
})

function play(){
    function move(){
        if(game_state != 'play') return;

        let pipe_sprite = document.querySelectorAll('.pipe_sprite');
        pipe_sprite.forEach((Element) =>{
            let pipe_sprite_props = Element.getBoundingClientRect();
            bird_prop = bird.getBoundingClientRect();

            if(pipe_sprite.right <=0){
                Element.remove();
            }else{
                if(bird_prop.left < pipe_sprite_props.left + 
                 pipe_sprite_props.width && bird_prop.left + bird_prop.width>
                 pipe_sprite_props.left && bird_prop.top < pipe_sprite_props.top
                 + pipe_sprite_props.height && bird_prop.height > 
                 pipe_sprite_props.top ){
                    game_state ='End';
                    message.innerHTML = 'Game Over'.fontcolor('red') + '<br>Press Enter to Restart';
                    message.classList.add('messageStyle');
                    img.style.display = 'none';
                    sound_die.play();
                    return;
            }else{
                if(pipe_sprite_props.right < bird_prop.left && pipe_sprite_props.right + 
                    move_speed >=bird_prop.left && Element.increase_score == '1'){
                        score_val.innerHTML =+ score_val.innerHTML +1 ;
                        sound_point.play();
            }
            Element.style.left = pipe_sprite_props.left - move_speed + 'px';
        }
    }
        });
        requestAnimationFrame(move);
    }
    requestAnimationFrame(move);

    let bird_dy = 0;
    function apply_gravity(){
        if(game_state != 'play') return;
        bird_dy = bird_dy + gravity;
        document.addEventListener('keydown' , (e) =>{
            if(e.key == 'ArrowUp' || e.key == ''){
                Image.src = 'img/Bird-2.png';
                bird_dy = -7.6;
            }
        });

        document.addEventListener('keyup', (e) =>{
        if(e.key == 'ArrowUp' || e.key == ''){
            img.src='img/Bird.png';
        }
        });

        if(bird_prop .top <= 0 || bird_prop.bottom >= background.bottom){
            game_state = 'end';
            message.style.left = '28.vw';
            window.location.reload();
            message.classList.remove('messageStyle');
            return;
        }

    bird.style.top = bird_prop.top + bird_dy +'px';
    bird_prop = bird.getBoundingClientRect();
    requestAnimationFrame(apply_gravity);
    }
    requestAnimationFrame(apply_gravity);

    let pipe_seperation = 0 ; 
    let pipe_gap = 35;

    function create_pipe(){
        if(game_state != 'play') return;

        if(pipe_seperation >115){
                pipe_seperation = 0;

                let pipe_po = Math.floor(Math.random() * 43) + 8;
                let pipe_sprite_inv = document.createElement('div');
                pipe_sprite_inv.className = 'pipe_sprite';
                pipe_sprite_inv.style.top= pipe_po - 75 + 'vh';
            pipe_sprite_inv.style.left = '100vw';
        pipe_sprite.increase_score = '1';
    document.body.appendChild(pipe_sprite);
        }
        pipe_seperation ++ ;
    }requestAnimationFrame(create_pipe);

}
requestAnimationFrame(create_pipe);
