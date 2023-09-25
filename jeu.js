"use strict";
let tab =[];
let currentNumber = 1;
let MEMORIZATION_DURATION = $("#time").val() * 1000; // 3 * 1000 milisecondes
// Mélange le tableau donné
function shuffle(tab) {
    for (let i = tab.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [tab[i], tab[j]] = [tab[j], tab[i]];
    }
    return tab;
}

// Crée une séquence mélangée avec les valeurs de 1 à 7.
// Retourne : un tableau d’entiers.
function createShuffledSequence() {
    tab = shuffle(tab)
    return tab;
}

function tryAgain(){
    $("footer").append("<form><button>Try again</button></form>");
}

function showSequence(tab) {
    for (let i = 0; i < tab.length; i++) {
        $("#sequence").children().eq(i).text(tab[i])
    }
}

function hideSequence() {
    $("#sequence button").addClass("hide2").click(clickNumber)
}

function startGame() {
    tab = recupValue(); //crée le tableau
    tab = createShuffledSequence(); //mélange le tableau
    createButton(tab); // crée les boutons
    showSequence(tab); // affiche le tableau
    $(".run").addClass("hide1"); // cache le bouton jouer
    MEMORIZATION_DURATION = $("#time").val() * 1000; // 3 * 1000 milisecondes
    setTimeout(hideSequence, MEMORIZATION_DURATION);
}

function main() {
    $(".run").click(function(){
        if($("#number").val() == ""){ // si  pas de nombre entrer
            end("You need to select a number !");
            tryAgain();
        }
        startGame();
    })
}

function createButton(tab) {
        for(let i =0;i<tab.length;i++){
            $("#sequence").append("<button></button>");
        }
}

function end(message) {
    $("#fin").text(message);
    showSequence(tab);
    $("#sequence button").css("color", "white");
    $("#sequence button").prop("disabled", true);
}

function clickNumber() {
    let index = $(this).index();
    let nombre = tab[index];

    if (currentNumber === nombre) {
        $(this).addClass("right");
        currentNumber++;
        if (currentNumber === tab.length+1) { // +1 car tab commence à zero
            end("YOU WIN !");
            tryAgain();
        }
    }
    else {
        $(this).addClass("wrong");
        end("YOU LOSE !");
        tryAgain();
    }
}

function createTab(size){
    let tab = [];
    for(let i =0;i<size;i++){
        tab[i] = i+1;
    }
    return tab;
}

function recupValue(tab){
    tab = createTab($("#number").val());
    return tab;
}

$(document).ready(main);

