$(document).ready(function () {
  // Gestion des offres d'emploi
  const offres = JSON.parse(localStorage.getItem('offres')) || [];
  const offresList = $('#offres-list');

  // Fonction pour afficher les offres
  function afficherOffres(offres) {
    offresList.empty(); // Vide la liste actuelle
    offres.forEach((offre, index) => {
      offresList.append(`
        <div class="col-md-4 mb-4">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">${offre.titre}</h5>
              <p class="card-text"><strong>Entreprise :</strong> ${offre.entreprise}</p>
              <p class="card-text">${offre.description}</p>
              <p class="card-text"><strong>Contact :</strong> ${offre.contact}</p>
              <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#candidatureModal" onclick="setOffreIndex(${index})">Postuler</button>
              <button class="btn btn-danger" onclick="supprimerOffre(${index})">Supprimer</button>
            </div>
          </div>
        </div>
      `);
    });
  }

  // Affiche les offres au chargement de la page
  afficherOffres(offres);

   // Gestion de la recherche d'offres
  $('#search-input').on('input', function () {
    const searchTerm = $(this).val().toLowerCase(); // Récupère le terme de recherche
    const filteredOffres = offres.filter(offre =>
      offre.titre.toLowerCase().includes(searchTerm) ||
      offre.description.toLowerCase().includes(searchTerm) ||
      offre.entreprise.toLowerCase().includes(searchTerm)
    );
    afficherOffres(filteredOffres); // Affiche les offres filtrées
  });


  // Gestion du formulaire d'ajout d'offre
  $('#offre-form').submit(function (e) {
    e.preventDefault(); // Empêche le rechargement de la page

    // Récupère les valeurs du formulaire
    const entreprise = $('#entreprise').val();
    const titre = $('#titre').val();
    const description = $('#description').val();
    const contact = $('#contact').val();

    // Récupère la liste des offres depuis LocalStorage
    const offres = JSON.parse(localStorage.getItem('offres')) || [];

    // Ajoute la nouvelle offre
    offres.push({ entreprise, titre, description, contact });

    // Enregistre la liste mise à jour dans LocalStorage
    localStorage.setItem('offres', JSON.stringify(offres));

    // Affiche un message de confirmation
    alert('Offre ajoutée avec succès !');

    // Réinitialise le formulaire
    $('#entreprise').val('');
    $('#titre').val('');
    $('#description').val('');
    $('#contact').val('');

    // Recharge la liste des offres
    afficherOffres(offres);
  });

  // Gestion des candidats
  const candidats = JSON.parse(localStorage.getItem('candidats')) || [];
  const candidatsList = $('#candidats-list');

  // Affiche les candidats disponibles
  candidats.forEach((candidat, index) => {
    candidatsList.append(`
      <div class="col-md-4 mb-4">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">${candidat.nom}</h5>
            <p class="card-text">Compétences : ${candidat.competences}</p>
            <p class="card-text">Expérience : ${candidat.experience}</p>
            <p class="card-text">Contact : ${candidat.contact}</p>
            <button class="btn btn-danger" onclick="supprimerCandidat(${index})">Supprimer</button>
          </div>
        </div>
      </div>
    `);
  });

  // Gestion du formulaire d'ajout de candidat
  $('#candidat-form').submit(function (e) {
    e.preventDefault(); // Empêche le rechargement de la page

    // Récupère les valeurs du formulaire
    const nom = $('#nom').val();
    const competences = $('#competences').val();
    const experience = $('#experience').val();
    const contact = $('#contact').val();

    // Récupère la liste des candidats depuis LocalStorage
    const candidats = JSON.parse(localStorage.getItem('candidats')) || [];

    // Ajoute le nouveau candidat
    candidats.push({ nom, competences, experience, contact });

    // Enregistre la liste mise à jour dans LocalStorage
    localStorage.setItem('candidats', JSON.stringify(candidats));

    // Affiche un message de confirmation
    alert('Profil ajouté avec succès !');

    // Réinitialise le formulaire
    $('#nom').val('');
    $('#competences').val('');
    $('#experience').val('');
    $('#contact').val('');

    // Recharge la page pour afficher la liste mise à jour
    location.reload();
  });
});

// Fonction pour définir l'index de l'offre
function setOffreIndex(index) {
  currentOffreIndex = index;
}

// Fonction pour postuler à une offre
function postuler(index) {
  alert(`Vous avez postulé à l'offre ${index + 1}`);
}

// Fonction pour supprimer une offre
function supprimerOffre(index) {
  const offres = JSON.parse(localStorage.getItem('offres')) || [];
  offres.splice(index, 1); // Supprime l'offre à l'index donné
  localStorage.setItem('offres', JSON.stringify(offres)); // Met à jour LocalStorage
  location.reload(); // Recharge la page pour afficher la liste mise à jour
}

// Fonction pour supprimer un candidat
function supprimerCandidat(index) {
  const candidats = JSON.parse(localStorage.getItem('candidats')) || [];
  candidats.splice(index, 1); // Supprime le candidat à l'index donné
  localStorage.setItem('candidats', JSON.stringify(candidats)); // Met à jour LocalStorage
  location.reload(); // Recharge la page pour afficher la liste mise à jour
}

// formulaire pour postule

let currentOffreIndex = null; // Variable pour stocker l'index de l'offre à laquelle l'utilisateur postule

// Fonction pour définir l'index de l'offre
function setOffreIndex(index) {
  currentOffreIndex = index;
}

// Gestion du formulaire de candidature
$(document).ready(function () {
  $('#candidature-form').submit(function (e) {
    e.preventDefault(); // Empêche le rechargement de la page

    // Récupère les valeurs du formulaire
    const nom = $('#nom-candidat').val();
    const email = $('#email-candidat').val();
    const message = $('#message-candidat').val();

    // Récupère l'offre à laquelle l'utilisateur postule
    const offres = JSON.parse(localStorage.getItem('offres')) || [];
    const offre = offres[currentOffreIndex];

    // Affiche un message de confirmation avec les détails de la candidature
    alert(`Merci, ${nom} !\nVotre candidature pour le poste "${offre.titre}" chez ${offre.entreprise} a été envoyée.\n\nEmail : ${email}\nMessage : ${message}`);

    // Réinitialise le formulaire
    $('#nom-candidat').val('');
    $('#email-candidat').val('');
    $('#message-candidat').val('');

    // Ferme le modal
    $('#candidatureModal').modal('hide');
  });
});