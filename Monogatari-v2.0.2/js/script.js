/* global monogatari */

// Define the messages used in the game.
monogatari.action ('message').messages ({
	'Help': {
		title: 'Help',
		subtitle: 'Some useful Links',
		body: `
			<p><a href='https://developers.monogatari.io/documentation/'>Documentation</a> - Everything you need to know.</p>
			<p><a href='https://monogatari.io/demo/'>Demo</a> - A simple Demo.</p>
		`
	},
	'Question1_correct': {
		title: 'Correct !',
		subtitle: 'Le porte du casque n\'est pas obligatoire.',
		body: 'Effectivement, le port du casque n\'est pas obligatoire pour les vélos, bien que vivement recommandé ! Ne serait-ce que pour montrer l\'exemple aux plus jeunes. Il est revanche obligé de le porter pour les personnes qui se déplacent en vélo électrique.',
	},
	'Question1_incorrect': {
		title: 'Incorrect !',
		subtitle: 'Le porte du casque n\'est pas obligatoire.',
		body: 'Effectivement, le port du casque n\'est pas obligatoire pour les vélos, bien que vivement recommandé ! Ne serait-ce que pour montrer l\'exemple aux plus jeunes. Il est revanche obligé de le porter pour les personnes qui se déplacent en vélo électrique.',
	},
});

// Define the notifications used in the game
monogatari.action ('notification').notifications ({
	'Welcome': {
		title: 'Bienvenue',
		body: 'Vous jouez au jeu « Safe Ride »',
		icon: './favicon.ico',
	}
});

// Define the Particles JS Configurations used in the game
monogatari.action ('particles').particles ({

});

// Define the canvas objects used in the game
monogatari.action ('canvas').objects ({

});

// Credits of the people involved in the creation of this awesome game
monogatari.configuration ('Credits', {
	'About': {
		'Rebecca Kneubuehler': [
			'Developping',
		],
		'Github': [
			'<a href="https://github.com/rbkProduction/customRide">Code source</a>',
		],
	},
	'Sources': {
		'Images': '<a href="https://www.freepik.com">Freepik</a> <br>', 
		'Images': '<a href="https://www.canva.com/">Canva</a>',
		'Sprites': '<a href="https://www.freepik.com">Freepik</a>',
		'Music & sounds': '<p>YouTube Audio Library</p>',
	}
});


// Define the images that will be available on your game's image gallery
monogatari.assets ('gallery', {
	
});

// Define the music used in the game.
monogatari.assets ('music', {
	intro: 'intro/Georges Lament_Ryan McCaffrey.mp3',
	game: 'game/Time Slips By_Ryan McCaffrey.mp3',
	end: 'end/In Dreams - Lish Grooves.mp3',
});

// Define the voice files used in the game.
monogatari.assets ('voices', {

});

// Define the sounds used in the game.
monogatari.assets ('sounds', {
	'tools': 'sound_toolsRepair.mp3',
	'cash': 'sound_cash.mp3',
	'transition': 'sound_transition.mp3',
});

// Define the videos used in the game.
monogatari.assets ('videos', {

});

// Define the images used in the game.
monogatari.assets ('images', {
	
});

// Define the backgrounds for each scene.
monogatari.assets ('scenes', {
	'menu': 'menu.png',
	'homepage': 'homepage.svg',
	'street': 'street.svg',
	'chapter1': 'chapter1.svg',
	'chapter1_background': 'chapter1_background.svg',
	'chapter2': 'chapter2.svg',
	'chapter2_background': 'chapter2_background.svg',
	'chapter3': 'chapter3.svg',
	'chapter3_background': 'chapter3_background.svg',
	'black': 'blackBackground.svg',
});


// Define the Characters
monogatari.characters ({
	'm': {
		name: 'Marie',
		color: 'darkred',
		directory: 'marie',
		sprites: {
			back: 'back.png',
			doubting: 'doubting.png',
			front: 'front.png',
			laughing: 'laughing.png',
			leftSide: 'leftSide.png',
			smiling: 'smiling.png',
			shocked: 'shocked.png',
			surprised: 'surprised.png',
			thirdSide: 'thirdSide.png',
		},
	},
	'p': {
		name: '{{player.name}}',
		color: 'darkolivegreen',
		directory: 'player',
		sprites: {
			front: 'front.png',
			doubting: 'doubting.png',
			back: 'back.png',
			interested: 'interested.png',
			laughing: 'laughing.png',
			rightSide: 'rightSide.png',
			shocked: 'shocked.png',
			smiling: 'smiling.png',
			surprised: 'surprised.png',
			thirdSide: 'thirdSide.png',
		},
	},
});

let capital = 100;
// Function to upload the statBar
function uploadStatBar() {
	const statBar = document.getElementById("statBar");
	const capitalSpan = document.getElementById("capital")
	// Upload the value of the statBar
	statBar.value = capital
	// Upload the display of the amount spent
	capitalSpan.textContent = capital;
	// Upload in the user's storage
	monogatari.storage ().newCapital = capital;
};

// Function to add an expense
function revertCapital() {
	// Add the amount of risk to be added to the score
	capital += 5;
	// Upload the stat bar
	uploadStatBar();
	return true;
};

// Function to substract an expense
function updateCapital() {
	// Add the amount of risk to be deducted to the score
	capital -= 5;
	// Upload the stat bar
	uploadStatBar();
	// Updating the last answer's score of the player in the storage
	monogatari.storage ().lastCapitalDeducted = 5;
};

/*
// OLD FUNCTION - Function to substract an expense
function substractExpense(amount) {
	// Add the amount of the expense to the total of expenses
	capital -= amount;
	// Upload the stat bar
	uploadStatBar();
	return true;

	// Function to limit the choices depending on the expenses
	if (capital > 100){
		monogatari.storage ().overBudget = false;
	};
	return true;
};
*/


monogatari.script ({
	// The game starts here.
	'Start': [
		'show scene homepage',
		'play music intro with volume 30',
		'show notification Welcome',
		{
			'Input': {
				'Text': 'Quel est ton nom ?',
				'Validation': function (input) {
					return input.trim ().length > 0;
				},
				'Save': function (input) {
					this.storage ({
						player: {
							name: input
						}
					});
					return true;
				},
				'Revert': function () {
					this.storage ({
						player: {
							name: ''
						}
					});
				},
				'Warning': 'Il faut entrer un nom.'
			}
		},
		'centered Bonjour {{player.name}}.',
		'centered Safe ride est un jeu de prévention sur les codes de la route et les infractions auquel tu peux être sujet lors de tes sorties à vélo.',
		'centered Tu vas découvrir les gestes de sécurité à appliquer, ainsi que les r\éflexes à adopter pour une bonne conduite sur la route.',
		'centered Marie va t\'accompagner pendant le jeu et te donnera toute sorte de conseil ou commentaire pour améliorer ton score.',
		'centered Tu vas commencer le jeu avec un capital risque de 100%.',
		'centered Réponds correctement au maximum de questions et tu feras baisser ton capital risque. Essaie de finir le jeu avec le pourcentage le plus faible !',
		'stop music intro',
		'jump Scene1',
	],

	'Scene1': [
		'show scene street with fadeIn',
		'show character p rightSide on left with fadeIn',
		'show character m leftSide on right with fadeIn',
		'm Bonjour toi, j\'ai entendu dire que tu souhaitais en savoir plus sur le vélo et la sécurité à appliquer pour rouler en toute sérénité.',
		'p C\'est exact. Je crois que cela ne me ferait pas de mal de revoir les bases.',
		'm Ça tombe bien, je suis experte en la matière ! Voyons tout de suite si on doit te considérer comme un danger sur la voie publique ou si tu peux rouler en toute confiance.',
		'show character m smiling on right',
		'show character p front on left',
		'jump Scene2',
	],


	'Scene2': [
		'show scene chapter1 with fadeIn duration 10s',
		'jump Scene3',
	],
	
	'Scene3': [
		'play music game on loop with volume 30',
		'show scene chapter1_background with fadeIn duration 3s',
		'show character p smiling on left with fadeIn',
		'show character m smiling on right with fadeIn',
		'm Avoir un matériel adéquat est primordial à vélo. Que ce soit du port du casque aux accessoires comme la sonnette et le cadenas, tu vas découvrir que ces objets peuvent t\'être utile, voir même te sauver la vie.',
		'p Oui, effectivement. Quels sont les objets élémentaires dans ce cas ?',
		'm Typiquement, le casque. Selon toi, est-il obligatoire de porter un casque à vélo ? ',
		{
			'Choice': {
				// Question 1
				'Oui': {
					'Text': 'Oui, absolument !',
					// 'Class': 'choicesButtonsLeft',
					'show message': 'Question1_incorrect',
				},
				'Non': {
					'Text': 'Évidemment que non.. En plus, j\'ai l\'air ridicule avec un casque.',
					// 'Class': 'choicesButtonsCenter',
					'show message': 'Question1_incorrect',

				},
				'Autre': {
					'Text': 'Oui, mais uniquement pour les vélos électriques.',
					// 'Class': 'choicesButtonsRight',
					'onChosen': function(){updateCapital()},
					'onRevert': function(){revertCapital()},
					'show message': 'Question1_correct',
				},
			},
		},
		'play sound cash',
		'm Le port du casque, bien que pas obligatoire, peut sauver ta vie dans beaucoup de circonstances.',
		'm C\'est connu d\'ailleurs.. «Le style vient après la vie» !',
		'p C\'est vrai.',
		'm Poursuivons.',
		'm Les lumières sont également très importantes à vélo, surtout lorsqu\'il fait obscure ou que les routes sont mal éclairées.',
		'm Imagines que tu te trouves sur une route comme illustré ci-dessus. De quelle puissance de lumière as-tu au minimum besoin pour y voir assez clair en roulant ?',
		{
			'Choice': {
				// Question 2
				'100 lumen': {
					'Text': '100 lumen',
					'Class': 'choicesButtonsLeft',
					'onChosen': function(){addExpense(819)},
					'onRevert': function(){substractExpense(819)},
				},
				'300 lumen': {
					'Text': '300 lumen',
					'Class': 'choicesButtonsCenter',
					'onChosen': function(){addExpense(1399)},
					'onRevert': function(){substractExpense(1399)},
				},
				'1000 lumen': {
					'Text': '1000 lumen',
					'Class': 'choicesButtonsRight',
					'onChosen': function(){addExpense(5499)},
					'onRevert': function(){substractExpense(5499)},
				},
			},
		},
		'jump Scene4',
	],

	'Scene4': [
		'show scene chapter2 with fadeIn',
		'show character p interested on left with fadeIn',
		'show character m front on right with fadeIn',
		{
			'Choice': {
				'cintreBMC': {
					// https://bmc-switzerland.com/fr/collections/components/products/handlebar-ics-aero-bike-components-bmc-22-10801-005
					'Text': 'A) Cintre BMC - CHF 349',
					'Class': 'choicesButtonsLeft',
					'Clickable': function(){
						return monogatari.storage().overBudget
					},
					'onChosen': function(){addExpense(349)},
					'onRevert': function(){substractExpense(349)},
				},
				'cintreBontrager': {
					// https://www.trekbikes.com/ch/fr_CH/equipement/composants-pour-vélo/cintres-de-vélo/cintres-de-vélos-route/cintre-route-bontrager-pro-vr-c/p/32645/?colorCode=black
					'Text': 'B) Cintre Bontrager - CHF 259',
					'Class': 'choicesButtonsRight',
					'Clickable': function(){
						return monogatari.storage().overBudget
					},
					'onChosen': function(){addExpense(259)},
					'onRevert': function(){substractExpense(259)},
				},
				'cintreSyncros': {
					// https://www.syncros.com/ch/fr/product/syncros-creston-1-5-compact-handlebar
					'Text': 'C) Cintre Syncros - CHF 76.99',
					'Class': 'choicesButtonsCenter',
					'Clickable': function(){
						return monogatari.storage().overBudget
					},
					'onChosen': function(){addExpense(76,99)},
					'onRevert': function(){substractExpense(76,99)},
				},
			},
		},
		'play sound cash',
		'centered Tu as depensé CHF {{lastExpense}} pour le cintre.',
		'show character p surprised on left',
		{
			'Conditional': {
				'Condition': function(){
						return monogatari.storage ('overBudget');
				},
				'True': 'jump Scene5',
				'False': 'jump Lose',
			}
		},
	],
		
	'Scene5': [
		'show scene chapter3',
		'show character p smiling on left with fadeIn',
		'show character m surprised on right with fadeIn',
		{
			'Choice': {
				'Les freins à patins - Shimano Dura-Ace': {
					// https://bike.shimano.com/fr-FR/product/component/dura-ace-r9200/BR-R9200.html
					'Text': 'A) Les freins à patins Shimano Dura-Ace - CHF 132',
					'Class': 'choicesButtonsLeft',
					'Clickable': function(){
						return monogatari.storage().overBudget
					},
					'onChosen': function(){addExpense(132)},
					'onRevert': function(){substractExpense(132)},
				},
				'Les freins à patins - SRAM Force': {
					// https://www.sram.com/en/sram/models/rb-frc-d1
					'Text': 'B) Les freins à patins SRAM Force - CHF 85',
					'Class': 'choicesButtonsCenter',
					'Clickable': function(){
						return monogatari.storage().overBudget
					},
					'onChosen': function(){addExpense(85)},
					'onRevert': function(){substractExpense(85)},
				},
				'Les freins à disque': {
					// https://bike.shimano.com/fr-FR/product/component/dura-ace-r9200/BR-R9270.html
					'Text': 'C) Les freins à disque Shimano Dura-Ace - CHF 114 + CHF 61.90',
					'Class': 'choicesButtonsRight',
					'Clickable': function(){
						return monogatari.storage().overBudget
					},
					'onChosen': function(){addExpense(175,9)},
					'onRevert': function(){substractExpense(175,9)},
				}
			}
		},
		'play sound cash',
		'centered Tu as depensé CHF {{lastExpense}} pour les freins.',
		{
			'Conditional': {
				'Condition': function(){
					return monogatari.storage ('overBudget');
				},
				'True': 'jump Scene6',
				'False': 'jump Lose',
			}
		},
	],

	'Scene6': [
		'show scene street',
		'show character m smiling on right',
		'show character p laughing on left',
		'm Félicitations, nous y sommes arrivés ! Vous avez monté votre vélo de A à Z.',
		'stop music game',
		'm Passons à la caisse pendant que le méchanicien commence à travailler sur votre vélo.',
		'play sound tools',
		'show scene black with fadeIn',
		'centered Le méchanicien assemble ton vélo...',
		'jump Win',
	],
	

	'Win': [
		'stop music game',
		'play music end on loop with volume 50',
		'show scene bikeFinal',
		'show character p smiling on left with fadeIn',
		'centered Bravo, tu as réussi à respecter ton budget et tu es repart avec ton propre vélo.',
		'end',
	],

	'Lose': [
		'stop music game',
		'play music end on loop with volume 50',
		'show scene storefront',
		'show character p shocked on left with fadeIn',
		'centered Aïe, tu as dépassé le budget... ',
		'centered ce n\'est pas si simple de maintenir un budget lorsqu\'on nous présente tous ces beaux produits ! ',
		'centered T\'en fais pas. Le but, c\'est que tu aies acquéris des connaissances sur le montage d\'un vélo de route.',
		'end',
	],

});