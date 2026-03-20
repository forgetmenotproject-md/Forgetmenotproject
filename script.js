// Navigation toggle for mobile
(function(){
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.getElementById('primary-navigation');
  if(toggle && nav) {
    toggle.addEventListener('click', ()=>{
      const open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
    });
  }

  // Memory Board functionality
  const form = document.getElementById('memory-form');
  const display = document.getElementById('memories-display');
  if(form && display) {
    const memories = JSON.parse(localStorage.getItem('memories')) || [];

    function displayMemories() {
      display.innerHTML = '<h2>Shared Memories</h2>';
      memories.forEach((memory, index) => {
        const div = document.createElement('div');
        div.className = 'memory-item';
        div.textContent = memory;
        display.appendChild(div);
      });
    }

    displayMemories();

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = document.getElementById('memory-input');
      const memory = input.value.trim();
      if(memory) {
        memories.push(memory);
        if(memories.length > 10) {
          memories.shift(); // Remove oldest to keep only 10 most recent
        }
        localStorage.setItem('memories', JSON.stringify(memories));
        input.value = '';
        displayMemories();
      }
    });
  }
})();
