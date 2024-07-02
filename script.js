document.addEventListener('DOMContentLoaded', function () {
    const btnTirarFoto = document.getElementById('btnTirarFoto');
    const modalCamera = document.getElementById('modalCamera');
    const videoElement = document.getElementById('videoElement');
    const btnCapturar = document.getElementById('btnCapturar');
    const diagnosisResult = document.getElementById('diagnosis-result');
    const btnFinalizar = document.getElementById('btnFinalizar');
    const carousels = document.querySelectorAll('.carousel');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const pageNumber = document.getElementById('page-number');

    let currentPage = 1;

    // Mostra o modal da câmera ao clicar em "Identificar Animal"
    btnTirarFoto.addEventListener('click', () => {
        modalCamera.style.display = 'block';

        // Acessa a câmera do dispositivo
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(function (stream) {
                videoElement.srcObject = stream;
                videoElement.play();
            })
            .catch(function (err) {
                console.error('Erro ao acessar a câmera: ', err);
            });
    });

    // Captura a foto ao clicar em "Capturar"
    btnCapturar.addEventListener('click', () => {
        const canvas = document.createElement('canvas');
        canvas.width = videoElement.videoWidth;
        canvas.height = videoElement.videoHeight;

        const ctx = canvas.getContext('2d');
        ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);

        // Salva a imagem com o nome "Identificar Animal"
        const dataUrl = canvas.toDataURL('image/png');
        saveAs(dataUrl, 'Identificar_Animal.png');

        // Fecha o modal da câmera
        modalCamera.style.display = 'none';
    });

    // Função para salvar a imagem
    function saveAs(uri, filename) {
        const link = document.createElement('a');
        if (typeof link.download === 'string') {
            link.href = uri;
            link.download = filename;

            // Simula o clique no link para baixar o arquivo
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } else {
            window.open(uri);
        }
    }

    // Restante do seu código para gerenciar os carrosséis e diagnósticos...
});

// Seleciona os elementos do DOM
 // Função para redirecionar ao clicar no botão "Realizar Teste"
 function redirectToIndex() {
    window.location.href = "./indicador.html"; 
}

// Event listener para o botão
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('btnRealizarTeste').addEventListener('click', redirectToIndex);
});

const diagnosisResult = document.getElementById('diagnosis-result');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const pageNumber = document.getElementById('page-number');
const btnFinalizar = document.getElementById('btnFinalizar');
const carousels = document.querySelectorAll('.carousel');

let currentPage = 1;

// Array de doenças com sintomas
const diseases = [
    { 
        id: 1, 
        name: 'Leptospirose', 
        symptoms: ['febre alta', 'dor de cabeça', 'sangramentos', 'dor muscular', 'calafrios', 'olhos vermelhos', 'vômitos'], 
        link: 'doencas/leptospirose.html' 
    },
    { 
        id: 2, 
        name: 'Tétano', 
        symptoms: ['contrações musculares dolorosas', 'dificuldades para respirar', 'febre', 'pressão alta', 'sudorese'], 
        link: 'doencas/tetano.html' 
    },
    { 
        id: 3, 
        name: 'Diarréia Aguda', 
        symptoms: ['sangramento nas fezes', 'sangramentos', 'calafrios', 'olhos vermelhos'], 
        link: 'doencas/diarreiaAguda.html' 
    },
    { 
        id: 4, 
        name: 'Hepatite A', 
        symptoms: ['fadiga', 'urina escura', 'fezes claras', 'icterícia', 'perda de apetite'], 
        link: 'doencas/hepatiteA.html' 
    },
    { 
        id: 5, 
        name: 'Dengue', 
        symptoms: ['febre alta', 'dor muscular', 'erupções cutâneas', 'dores nas articulações', 'hemorragia intensa', 'dificuldades para respirar', 'rubor', 'dor de cabeça', 'vômitos', 'diarreia'], 
        link: 'doencas/dengue.html' 
    },
    { 
        id: 6, 
        name: 'Animais Peçonhentos', 
        symptoms: ['dor imediata', 'infecção necrose picada', 'diminuição dos batimentos cardíacos', 'queda de pressão arterial', 'formigamento suor local', 'bolhas', 'eritema', 'hematomas'], 
        link: 'doencas/animais.html' 
    }
];

// Função para buscar doenças com base nos sintomas
function searchDiseases(symptoms) {
    const matchingDiseases = diseases.filter(disease => {
      return symptoms.some(symptom => disease.symptoms.includes(symptom.trim().toLowerCase()));
    });
    return matchingDiseases;
}

// Função para exibir o diagnóstico
function showDiagnosis(diseases) {
    if (diseases.length === 0) {
      diagnosisResult.textContent = 'Não foram encontradas doenças correspondentes aos sintomas fornecidos.';
    } else {
      const diagnosisText = `Você pode ter ${diseases.map(disease => disease.name).join(', ')}.`;
      diagnosisResult.innerHTML = diagnosisText + `<br> Para mais informações, acesse: ${diseases.map(disease => `<a href="${disease.link}">${disease.name}</a>`).join(', ')}.`;
    }
}

// Função para atualizar o carrossel com base na página atual
function updateCarousel() {
    carousels.forEach((carousel, index) => {
        if (index === currentPage - 1) {
            carousel.classList.add('active');
        } else {
            carousel.classList.remove('active');
        }
    });
    pageNumber.textContent = currentPage;
}

// Evento para o botão "Próximo"
nextBtn.addEventListener('click', () => {
    if (currentPage < carousels.length) {
        currentPage++;
        updateCarousel();
    }
});

// Evento para o botão "Anterior"
prevBtn.addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        updateCarousel();
    }
});

// Evento para o botão "Finalizar"
btnFinalizar.addEventListener('click', () => {
    let selectedSymptoms = [];
    carousels.forEach((carousel) => {
        const checkboxes = carousel.querySelectorAll('input[type="checkbox"]:checked');
        checkboxes.forEach((checkbox) => {
            selectedSymptoms.push(checkbox.value);
        });
    });

    let potentialDiseases = searchDiseases(selectedSymptoms);
    showDiagnosis(potentialDiseases);
});

// Atualiza o carrossel na inicialização
updateCarousel();
