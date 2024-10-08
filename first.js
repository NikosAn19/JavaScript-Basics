const button = document.getElementById('koumpi');
const heading = document.getElementById('titlos');
let i = 0
button.addEventListener('click', function(){
  heading.textContent = i
  i = i  +15
}
)
