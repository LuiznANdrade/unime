import { config } from './config.js';

var logotype = document.getElementById('logotype');
var backgroundSenha = document.querySelector('.meio');
var titulo = document.querySelector('title');
var nameFacul = document.querySelector('.nameFacul');

if( config.unidade == "ANHANGUERA" ){
    logotype.src = "assets/images/logo-anhanguera.png"
    const favicon = document.createElement('link');
    favicon.rel = 'icon';
    favicon.href = 'assets/images/icone-anhanguera.png';
    backgroundSenha.style.backgroundColor = "#FF2800";
    document.head.appendChild(favicon);
    titulo.innerHTML = "Painel Web - Anhanguera";
    nameFacul.textContent = "Seja bem-vindo(a), a Faculdade Anhanguera de " + config.cidade;
    document.querySelectorAll('#vempor path').forEach(function(path) {
        path.setAttribute('stroke', '#FF2800');
    });

    document.querySelectorAll('#points path').forEach(function(path) {
        path.setAttribute('fill', '#FF2800');
    });
    document.querySelectorAll('#textura path').forEach(function(path) {
        path.setAttribute('stroke', '#FF2800');
    });
}else if( config.unidade == "UNOPAR" ){
    logotype.src = "assets/images/logo-unopar.png"
    const favicon = document.createElement('link');
    favicon.rel = 'icon';
    favicon.href = 'assets/images/icone-unopar.png';
    document.head.appendChild(favicon);
    backgroundSenha.style.backgroundColor = "#0a3c7d";
    titulo.innerHTML = "Painel Web - Unopar";
    nameFacul.textContent = "Seja bem-vindo(a), a Faculdade Unopar de "  + config.cidade;
    document.querySelectorAll('#vempor path').forEach(function(path) {
        path.setAttribute('stroke', '#0a3c7d');
    });

    document.querySelectorAll('#points path').forEach(function(path) {
        path.setAttribute('fill', '#0a3c7d');
    });
    document.querySelectorAll('#textura path').forEach(function(path) {
        path.setAttribute('stroke', '#0a3c7d');
    });
}else if( config.unidade == "UNIME" ){
    logotype.src = "assets/images/logo-unime.png"
    const favicon = document.createElement('link');
    favicon.rel = 'icon';
    favicon.href = 'assets/images/icone-unime.png';
    document.head.appendChild(favicon);
    backgroundSenha.style.backgroundColor = "#e31b22";
    titulo.innerHTML = "Painel Web - Unime";
    nameFacul.textContent = "Seja bem-vindo(a), a Faculdade Unime Anhanguera de "  + config.cidade;
    document.querySelectorAll('#vempor path').forEach(function(path) {
        path.setAttribute('stroke', '#e31b22');
    });

    document.querySelectorAll('#points path').forEach(function(path) {
        path.setAttribute('fill', '#e31b22');
    });
    document.querySelectorAll('#textura path').forEach(function(path) {
        path.setAttribute('stroke', '#e31b22');
    });
}

const url = config.urlApiGoogle;

async function fetchData() {
  try {
    const response = await fetch(url);
    const data = await response.json();

    const ultimaSenha = data.data[data.data.length - 1];
    document.getElementById('ultima-senha').textContent = formatData(ultimaSenha);

    const historicoSenhas = data.data.slice(-4, -1).reverse();
    const historicoHTML = historicoSenhas.map(senha => formatHistoricoData(senha)).join('');
    document.getElementById('historico-senhas').innerHTML = historicoHTML;

    const ultimaSenhaElement = document.getElementById('ultima-senha');
    const senhaAtualElements = document.querySelectorAll('.senha-atual');

    if (ultimaSenhaElement.textContent.trim() !== '' || senhaAtualElements.length > 0) {
      document.querySelector('.loading').style.display = 'none'; 
      document.querySelector('.container').style.display = 'flex';
    } else {
      document.querySelector('.loading').style.display = 'flex'; 
      document.querySelector('.container').style.display = 'none'; 
    }

  } catch (error) {
    console.error('Erro:', error);
  }
}

function formatData(data) {
  return Object.entries(data).map(([key, value]) => ` ${value}`).join(': Senha ');
}

function formatHistoricoData(data) {
  const coordenador = data.Coordenador || data.coordenador;
  if (!coordenador) {
    console.error('Coordenador não encontrado nos dados:', data);
    return '';
  }
  
  const imagePath = `assets/images/coordenadores/${coordenador.toLowerCase()}.png`;
    return `
    <div class="historico-item">
      <img src="${imagePath}" alt="${coordenador}" class="coordenador-foto"">
      <span class="historico-texto">${coordenador}: Senha ${data.Senha}</span>
    </div>
  `;
}

setInterval(fetchData, 1000);
fetchData();
