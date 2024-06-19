// Seleciona os elementos do DOM
const symptomInput = document.getElementById('symptom-input');
const symptomsList = document.getElementById('symptoms-list');
const diagnosisResult = document.getElementById('diagnosis-result');
const showMoreBtn = document.getElementById('show-more-btn');
const diseasesList = document.getElementById('diseases-list');
const pagination = document.getElementById('pagination');
const prevBtn = document.getElementById('prev-btn');
const nextPageNumber = document.getElementById('page-number');
const nextBtn = document.getElementById('next-btn');
const symptomForm = document.querySelector('form');

// Listner para buscar
symptomForm.addEventListener('submit', event => {
    event.preventDefault();
    const symptoms = symptomInput.value.trim().split(',');
    const matchingDiseases = searchDiseases(symptoms);
    showDiagnosis(matchingDiseases);
    showDiseases(matchingDiseases);
});


// Array de doenças (simulado)
const diseases = [
    { 
      id: 1, 
      name: 'Enxaqueca', 
      symptoms: ['dor de cabeça', 'sensibilidade à luz', 'náusea'], 
      treatment: 'Tomar paracetamol e descansar', 
      causes: ['Causa 1', 'Causa 2'] 
    },
    { 
      id: 2, 
      name: 'Gripe', 
      symptoms: ['dor de cabeça', 'febre', 'tosse'], 
      treatment: 'Descansar e beber líquidos', 
      causes: ['Vírus da gripe'] 
    },
    // Outras doenças...
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
      const diagnosisText = `Você pode ter ${diseases.map(disease => disease.name).join(', ')}. Tratamento recomendado: ${diseases[0].treatment}.`;
      diagnosisResult.textContent = diagnosisText;
    }
  }
  

// Função para exibir a lista de doenças
function showDiseases(diseases) {
  diseasesList.innerHTML = '';
  diseases.forEach(disease => {
    const diseaseListItem = document.createElement('li');
    diseaseListItem.textContent = disease.name;
    diseasesList.appendChild(diseaseListItem);
  });
}

// Função para lidar com a paginação
function paginationHandler(pageNumber) {
  const startIndex = (pageNumber - 1) * 10;
  const endIndex = startIndex + 10;
  const paginatedDiseases = diseases.slice(startIndex, endIndex);
  showDiseases(paginatedDiseases);
}

// Event listeners
symptomInput.addEventListener('submit', event => {
    event.preventDefault();
    const symptoms = symptomInput.value.trim().split(',');
    const matchingDiseases = searchDiseases(symptoms);
    showDiagnosis(matchingDiseases);
    showDiseases(matchingDiseases);
});


showMoreBtn.addEventListener('click', () => {
  // Mostrar mais informações sobre o diagnóstico
});

prevBtn.addEventListener('click', () => {
  const currentPageNumber = parseInt(nextPageNumber.textContent);
  const newPageNumber = currentPageNumber - 1;
  paginationHandler(newPageNumber);
});

nextBtn.addEventListener('click', () => {
  const currentPageNumber = parseInt(nextPageNumber.textContent);
  const newPageNumber = currentPageNumber + 1;
  paginationHandler(newPageNumber);
});