// Liste des produits de Boutique Hafsa
const produits = [
    {
        id: 1,
        nom: "Sac à main",
        categorie: "Mode",
        prix: 250,
        image: "images/sac.jpg",
        disponible: true
    },
    {
        id: 2,
        nom: "Robe élégante",
        categorie: "Mode",
        prix: 350,
        image: "images/robe.jpg",
        disponible: true
    },
    {
        id: 3,
        nom: "Montre",
        categorie: "Mode",
        prix: 400,
        image: "images/montre.jpg",
        disponible: false
    },
    {
        id: 4,
        nom: "Collier de perles",
        categorie: "Mode",
        prix: 180,
        image: "images/collier perle.jpg",
        disponible: false
        
    },
    {
        id: 5,
        nom: "Crème de soin",
        categorie: "Beauté",
        prix: 120,
        image: "images/creme.jpg",
        disponible: true
    },
    {
        id: 6,
        nom: "Parfum",
        categorie: "Beauté",
        prix: 300,
        image: "images/parfun.jpg",
        disponible: true
    },
    {
        id: 7,
        nom: "Rouge à lèvres",
        categorie: "Beauté",
        prix: 90,
        image: "images/rouge a levre.jpg",
        disponible: true
    },
    {
        id: 8,
        nom: "Masque de beauté",
        categorie: "Beauté",
        prix: 70,
        image: "images/masque.jpg",
        disponible: false
    },
    {
        id: 9,
        nom: "Lampe décorative",
        categorie: "Maison",
        prix: 220,
        image: "images/lampe.jpg",
        disponible: true
    },
    {
        id: 10,
        nom: "Brosse",
        categorie: "Maison",
        prix: 85,
        image: "images/brosse.jpg",
        disponible: true
    },
    {
        id: 11,
        nom: "AirPods",
        categorie: "Électronique",
        prix: 450,
        image: "images/airpods.jpg",
        disponible: true
    },
    {
        id: 12,
        nom: "Palette de maquillage",
        categorie: "Beauté",
        prix: 160,
        image: "images/palette.jpg",
        disponible: true
    }
];

// Panier : tableau des produits ajoutés
let panier = [];

// Récupération des éléments HTML
const listeProduits = document.getElementById("listeProduits");
const recherche = document.getElementById("recherche");
const categorie = document.getElementById("categorie");
const tri = document.getElementById("tri");
const disponiblesSeulement =
    document.getElementById("disponiblesSeulement");

const modal = document.getElementById("modal");
const modalPanier = document.getElementById("modalPanier");

// Afficher les produits
function afficherProduits(liste) {
    listeProduits.innerHTML = "";

    if (liste.length === 0) {
        listeProduits.innerHTML = "<p>Aucun produit trouvé.</p>";
    }

    liste.forEach(function(produit) {
        const carte = document.createElement("div");
        carte.className = "produit";

        carte.innerHTML = `
            <img src="${produit.image}" alt="${produit.nom}">

            <div class="produit-info">
                <h3>${produit.nom}</h3>
                <p class="categorie">${produit.categorie}</p>
                <p class="prix">${produit.prix} DH</p>

                <p class="${produit.disponible ? 'disponible' : 'indisponible'}">
                    ${produit.disponible ? '✓ Disponible' : '✕ Indisponible'}
                </p>

                <div class="actions">
                    <button class="voir" onclick="voirDetails(${produit.id})">
                        Voir détails
                    </button>

                    <button class="ajouter"
                        onclick="ajouterPanier(${produit.id})"
                        ${!produit.disponible ? 'disabled' : ''}>
                        Ajouter
                    </button>
                </div>
            </div>
        `;

        listeProduits.appendChild(carte);
    });

    afficherStatistiques(liste);
}

// Recherche, catégorie et tri
function filtrerProduits() {
    const texte = recherche.value.toLowerCase().trim();
    const choixCategorie = categorie.value;
    const choixTri = tri.value;

    let resultat = produits.filter(function(produit) {
        const correspondNom = produit.nom.toLowerCase().includes(texte);

        const correspondCategorie =
            choixCategorie === "Toutes" ||
            produit.categorie === choixCategorie;

        const correspondDisponibilite =
    !disponiblesSeulement.checked || produit.disponible;

return correspondNom &&
       correspondCategorie &&
       correspondDisponibilite;
    });

    if (choixTri === "croissant") {
        resultat.sort(function(a, b) {
            return a.prix - b.prix;
        });
    }

    if (choixTri === "decroissant") {
        resultat.sort(function(a, b) {
            return b.prix - a.prix;
        });
    }

    afficherProduits(resultat);
}

// Statistiques du catalogue affiché
function afficherStatistiques(liste) {
    const total = liste.length;

    const disponibles = liste.filter(function(produit) {
        return produit.disponible;
    }).length;

    let somme = 0;

    liste.forEach(function(produit) {
        somme += produit.prix;
    });

    const moyenne = total > 0 ? somme / total : 0;

    document.getElementById("totalProduits").textContent = total;
    document.getElementById("produitsDisponibles").textContent = disponibles;
    document.getElementById("prixMoyen").textContent =
        moyenne.toFixed(2) + " DH";
}

// Afficher les détails d'un produit
function voirDetails(id) {
    const produit = produits.find(function(p) {
        return p.id === id;
    });

    if (!produit) return;

    document.getElementById("detailsProduit").innerHTML = `
        <img src="${produit.image}" alt="${produit.nom}">
        <h2>${produit.nom}</h2>
        <p>Catégorie : ${produit.categorie}</p>
        <p>Prix : ${produit.prix} DH</p>
        <p>
            Disponibilité :
            ${produit.disponible ? "En stock" : "Rupture de stock"}
        </p>
    `;

    modal.style.display = "flex";
}

// Ajouter un produit au panier
function ajouterPanier(id) {
    const produit = produits.find(function(p) {
        return p.id === id;
    });

    if (produit && produit.disponible) {
        panier.push(produit);
        actualiserPanier();
        alert(produit.nom + " a été ajouté au panier !");
    }
}

// Actualiser le nombre de produits
function actualiserPanier() {
    document.getElementById("nombrePanier").textContent = panier.length;
}

// Afficher le contenu du panier
function afficherPanier() {
    const contenu = document.getElementById("contenuPanier");
    contenu.innerHTML = "";

    let total = 0;

    if (panier.length === 0) {
        contenu.innerHTML = "<p>Votre panier est vide.</p>";
    }

    panier.forEach(function(produit, index) {
        total += produit.prix;

        const ligne = document.createElement("div");
        ligne.className = "ligne-panier";

        const nom = document.createElement("span");
        nom.textContent = produit.nom + " - " + produit.prix + " DH";

        const bouton = document.createElement("button");
        bouton.textContent = "Retirer";
        bouton.addEventListener("click", function() {
            retirerPanier(index);
        });

        ligne.appendChild(nom);
        ligne.appendChild(bouton);
        contenu.appendChild(ligne);
    });

    document.getElementById("totalPanier").textContent =
        "Total : " + total + " DH";

    modalPanier.style.display = "flex";
}

// Retirer un produit du panier
function retirerPanier(index) {
    panier.splice(index, 1);
    actualiserPanier();
    afficherPanier();
}

// Événements
recherche.addEventListener("input", filtrerProduits);
categorie.addEventListener("change", filtrerProduits);
tri.addEventListener("change", filtrerProduits);
disponiblesSeulement.addEventListener(
    "change",
    filtrerProduits
);
document.getElementById("fermerModal").addEventListener("click", function() {
    modal.style.display = "none";
});

document.getElementById("boutonPanier").addEventListener("click", afficherPanier);

document.getElementById("fermerPanier").addEventListener("click", function() {
    modalPanier.style.display = "none";
});

// Fermer les fenêtres en cliquant à l'extérieur
window.addEventListener("click", function(event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }

    if (event.target === modalPanier) {
        modalPanier.style.display = "none";
    }
});

afficherProduits(produits);