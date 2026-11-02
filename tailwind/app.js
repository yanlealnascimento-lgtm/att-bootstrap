async function carregarComponentes() {
  const slots = document.querySelectorAll('[data-slot]');
  for (const slot of slots) {
    try {
      const resposta = await fetch(slot.dataset.slot + '.html');
      if (!resposta.ok) throw new Error('componente indisponível');
      slot.innerHTML = await resposta.text();
    } catch (erro) {
      slot.remove();
    }
  }
}

carregarComponentes().then(() => {
  if (window.initTailwindUI) window.initTailwindUI();
});
