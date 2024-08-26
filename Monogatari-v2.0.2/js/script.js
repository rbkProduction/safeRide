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
});

// Define the notifications used in the game
monogatari.action ('notification').notifications ({
	'Welcome': {
		title: 'Bienvenue',
		body: 'Vous jouez au jeu « Custom Ride »',
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
	'cadreAcier': 'cadre/cadreAcier.svg',
	'cadreAlu': 'cadre/cadreAlu.svg',
	'cadreCarbone': 'cadre/cadreCarbone.svg',
	'cintreBMC': 'cintre/cintreBMC.svg',
	'cintreBontrager': 'cintre/cintreBontrager.svg',
	'cintreSyncros': 'cintre/cintreSyncros.svg',
	'freinsShimano': 'freins/freinsPatins_shimano.svg',
	'freinsSram': 'freins/freinsPatins_sram.svg',
	'freinsDisque': 'freins/freinsDisque_shimano.svg',
	'selleFizik': 'selle/selleFizik.svg',
	'selleItalia': 'selle/selleItalia.svg',
	'sellePro': 'selle/sellePro.svg',
	'pedalierCampagnolo': 'pedalier/pedalierCampagnolo.svg',
	'pedalierShimano': 'pedalier/pedalierShimano.svg',
	'pedalierSram': 'pedalier/pedalierSram.svg',
	'calesGarmin': 'pedales/cales_garminPuissance1.svg',
	'calesWahoo': 'pedales/cales_wahoo.svg',
	'calesWahoo2': 'pedales/cales_wahooPuissance2.svg',
	'rouesDtSwiss': 'roues/rouesDtswiss.svg',
	'rouesSpecialized': 'roues/rouesSpecialized.svg',
	'rouesZipp': 'roues/rouesZipp.svg',
});

// Define the backgrounds for each scene.
monogatari.assets ('scenes', {
	'homepage': 'homepage.png',
	'storefront': 'storefront.svg',
	'shop': 'shop.svg',
	'bikeFinal': 'bikeFinal.svg',
	'cadre': 'cadre.svg',
	'guidon': 'guidon.svg',
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

let totalAmountSpent = 0;
// Function to upload the statBar
function uploadStatBar() {
	const statBar = document.getElementById("statBar");
	const totalAmountSpentSpan = document.getElementById("totalAmountSpent")
	// Upload the value of the statBar
	statBar.value = totalAmountSpent
	// Upload the display of the amount spent
	totalAmountSpentSpan.textContent = totalAmountSpent;
	// Upload in the user's storage
	monogatari.storage ().expenses = totalAmountSpent;
};

// Function to add an expense
function addExpense(amount) {
	// Add the amount of the expense to the total of expenses
	totalAmountSpent += amount;
	// Upload the stat bar
	uploadStatBar();
	// Updating the lastExpense in the storage of the player
	monogatari.storage ().lastExpense = amount;
	// Function to limit the choices depending on the expenses
	if (totalAmountSpent > 6000){
		monogatari.storage ().overBudget = false;
	};
	return true;
};

// Function to substract an expense
function substractExpense(amount) {
	// Add the amount of the expense to the total of expenses
	totalAmountSpent -= amount;
	// Upload the stat bar
	uploadStatBar();
	return true;
};

monogatari.script ({
	// The game starts here.
	'Start': [
		'show scene storefront',
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
		'centered Safe ride est un jeu de prévention sur les codes de la route à vélo et les infractions auquel tu peux être sujet lors de tes sorties.',
		'centered Tu vas découvrir les gestes de sécurité à appliquer, ainsi que les r\éflexes à adopter pour une bonne conduite sur la route.',
		'centered Marie va t\'accompagner pendant le jeu et te donnera toute sorte de conseil ou commentaire pour améliorer ton score.',
		'centered Tu vas commencer le jeu avec un capital risque de 100%.',
		'centered Réponds correctement au maximum de questions et tu feras baisser ton capital risque.',
		'jump Scene1',
	],

	'Scene1': [
		'show scene shop with fadeIn',
		'show character p rightSide on left with fadeIn',
		'show character m leftSide on right with fadeIn',
		'm Bonjour toi, j\'ai entendu dire que tu souhaitais en savoir plus sur le vélo et la sécurité à appliquer pour rouler sereinement.',
		'm Ça tombe bien, je suis experte en la matière ! Voyons tout de suite si on doit te considérer comme un danger sur la voie publique ou si tu peux rouler en toute sûreté.',
		'show character m smiling on right',
		'show character p front on left',
		'jump Scene2',
	],


	'Scene2': [
		'show scene cadre with fadeIn',
		'stop music intro',
		'play music game on loop with volume 30',
		'show character p smiling on left with fadeIn',
		'show character m smiling on right with fadeIn',
		'm ',
		'show image cadreAcier on left with fadeIn',
		'm Les cadres en acier sont très résistants et comfortables. En revanche, il faut les entretenir plus fréquemment vu que le risque de rouille est élevé. Et ils sont également assez lourds.',
		'show image cadreAlu on center on top with fadeIn',
		'm L\'aluminium, lui, est plus léger que l\'acier, mais il se conservera un peu moins bien sur le long terme. Et il est plus abordable en terme de budget qu\'un cadre en carbone ou en titane par exemple.',
		'show image cadreCarbone on right with fadeIn',
		'm Enfin, le cadre en carbone offre une meilleure légèreté et une meilleur absorption des vibrations. Il est plus cher, mais offre des performances supérieures.',
		'p Je vois, je vois. Huuum, laissez-moi réfléchir...',
		{
			'Choice': {
				'Cadre en acier': {
					// https://www.trekbikes.com/ch/fr_CH/vélos/vélos-de-randonnée-et-cyclotourisme/520/kit-cadre-520-disque/p/34200/?colorCode=red
					'Text': 'A) Cadre en acier - CHF 819',
					'Class': 'choicesButtonsLeft',
					'onChosen': function(){addExpense(819)},
					'onRevert': function(){substractExpense(819)},
				},
				'Cadre en aluminium': {
					// https://www.trekbikes.com/ch/fr_CH/vélos/vélos-de-randonnée-et-cyclotourisme/920/kit-cadre-920/p/21995/?colorCode=tan
					'Text': 'B) Cadre en aluminium - CHF 1399',
					'Class': 'choicesButtonsCenter',
					'onChosen': function(){addExpense(1399)},
					'onRevert': function(){substractExpense(1399)},
				},
				'Cadre en carbone': {
					// https://www.trekbikes.com/ch/fr_CH/vélos/vélos-de-route/vélos-de-route-performance/domane/domane-slr/kit-cadre-domane-slr-4e-gén-/p/37303/?colorCode=black_grey
					'Text': 'C) Cadre en carbone - CHF 5499',
					'Class': 'choicesButtonsRight',
					'onChosen': function(){addExpense(5499)},
					'onRevert': function(){substractExpense(5499)},
				},
			},
		},
		'play sound cash',
		'hide image cadreAlu',
		'hide image cadreAcier',
		'hide image cadreCarbone',
		'centered Tu as depensé CHF {{lastExpense}} pour le cadre.',
		'jump Scene3',
	],

	'Scene3': [
		'show scene shop with fadeIn',
		'show character p interested on left with fadeIn',
		'show character m front on right with fadeIn',
		'm Maintenant que nous avons la base du vélo. Voyons quel cintre vous souhaitez pour votre guidon.',
		'show character m front on right',
		'show character p smiling on left',
		'm Les cintres pour vélo de courses permettent une variation de placement des mains.',
		'm Le cycliste peut les poser soit sur le dessus, soit vers les cocottes du bas pour une position plus aggressive.',
		'show character p rightSide on left',
		'm Votre choix de cintre sera donc plutôt orienté esthétique et confort.',
		'show image cintreBMC on left with fadeIn',
		'show image cintreBontrager on center on top with fadeIn',
		'show image cintreSyncros on right',
		'show character m smiling on right',
		'm Lequel vous fait de l\'œil?',
		'show character p doubting on left',
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
		'hide image cintreBMC',
		'hide image cintreBontrager',
		'hide image cintreSyncros',
		'centered Tu as depensé CHF {{lastExpense}} pour le cintre.',
		'show character p surprised on left',
		{
			'Conditional': {
				'Condition': function(){
						return monogatari.storage ('overBudget');
				},
				'True': 'jump Scene4',
				'False': 'jump Lose',
			}
		},
	],
		
	'Scene4': [
		'show scene shop',
		'show character p smiling on left with fadeIn',
		'show character m surprised on right with fadeIn',
		'm Alors, concernant les freins, vous avez le choix entre des freins mécaniques ou des freins hydrauliques.',
		'm Les freins mécaniques fonctionnent avec un système de patins qui vont venir faire le frottement avec la jante de la roue lorsque vous freinez. Il s\'agit d\'un étrier que l\'on va venir fixer à l\'avant et à l\'arrière des roues.',
		'show image freinsShimano on left with fadeIn',
		'm Shimano et SRAM proposent tous deux un très bon système, abordable et amplement efficace.',
		'show image freinsSram on center on top with fadeIn',
		'm Les freins hydrauliques fonctionnent à l\'aide de disques et représentent un système plus coûteux et plus haut de gamme. Mais qui simplifie l\'allure esthétique du vélo et et procurent un meilleur contrôle.',
		'show image freinsDisque on right with fadeIn',
		'm On place un disque à l\'avant et à l\'arrière qui sera aussi bloqué par des étriers. Mais ceux-ci sont placés au niveau de l\'axe de la roue ; vous aurez donc moins de câblage apparents sur le cadre du vélo.',
		'm Ils nécessitent également de l\'huile qui l\'on va introduire dans les manettes de freins, d\'où le terme « hydraulique ».',
		'p Et au niveau ensuite de l\'entretien, y-a-t-il une différence entre les deux ?',
		'm Légèrement, oui.',
		'show character p shocked on left with fadeIn',
		'm Les freins à disque vont avoir besoin d\'une purge du liquide une à doix fois par an selon votre fréquence d\'utilisation. Aussi, de temps en temps, quand vous lavez votre vélo par exemple, vous devriez juste mettre un peu de produit dégraissant sur les disques et essuyez avec un chiffon propre.',
		'm Mais attention, surtout ne touchez jamais les disques avec vos mains, qui sont par défaut plutôt grasses. Un vieux t-shirt que vous déchirez en morceaux fera très bien l\'affaire.',
		'p Et les freins à patins ?',
		'm Les freins à patins ne nécessitent pas de produits ou de purge. En revanche, avec l\'usure, vous devrez changer les patins puisque la gomme sera sollicitée avec les frottements. Tout dépend de la fréquence à laquelle vous utiliserez votre vélo, mais en général il faut les changer une fois par an.',
		'p D\'accord, je comprends mieux.',
		'm Au final, les freins hydrauliques offrent une meilleure modulation et une meilleure puissance de freinage, mais sont plus chers.',
		'p Huh-huh.',
		'm Qu\'est-ce que vous souhaitez installer sur votre vélo du coup ?',
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
		'hide image freinsShimano',
		'hide image freinsSram',
		'hide image freinsDisque',
		'centered Tu as depensé CHF {{lastExpense}} pour les freins.',
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
		'show scene shop',
		'show character p front on left',
		'show character m thirdSide on right',
		'm Passons mainteant au choix de la selle.',
		'm Je vous laisse me suivre..',
		'show character p smiling on left',
		'show character m smiling on right',
		'm Pour la selle, comme pour le cintre, c\'est une question de confort et d\'esthétique. Je vous présente ici trois selles de bonne qualité.',
		'm Pour savoir si la selle vous convient, il va falloir que vous la testiez pendant quelques sorties à vélo.',
		'm Chez custom Ride, nous vous donnons la possibilité de la rapporter - même utilisée ! - jusqu\'à un mois après l\'achat si elle ne vous convient pas ! ',
		'show image selleFizik on left with fadeIn',
		'show image selleItalia on center on top with fadeIn',
		'show image sellePro on right with fadeIn',
		'm Laquelle vous plairait ?',
		'show character p doubting on left with fadeIn',
		'p Uuumm...',
		{
			'Choice': {
				'selleFizik': {
					// https://www.fizik.com/eu_en/vento-antares-r3-adaptive.html
					'Text': 'A) Selle Fizik - CHF 259',
					'Class': 'choicesButtonsLeft',
					'Clickable': function(){
						return monogatari.storage().overBudget
					},
					'onChosen': function(){addExpense(259)},
					'onRevert': function(){substractExpense(259)},
				},
				'selleItalia': {
					// https://www.selleitalia.com/slr-boost-kit-carbonio/?_gl=1*134esjr*_up*MQ..*_ga*MTk2ODM1Mjc3Ni4xNzE1MDE3NTUz*_ga_4KB6M1439M*MTcxNTAxNzU1Mi4xLjAuMTcxNTAxNzU3Ni4wLjAuMA..
					'Text': 'B) Selle Italia - CHF 314.90',
					'Class': 'choicesButtonsCenter',
					'Clickable': function(){
						return monogatari.storage().overBudget
					},
					'onChosen': function(){addExpense(314,90)},
					'onRevert': function(){substractExpense(314,90)},
				},
				'sellePro': {
					// https://www.selleitalia.com/slr-boost-kit-carbonio/?_gl=1*134esjr*_up*MQ..*_ga*MTk2ODM1Mjc3Ni4xNzE1MDE3NTUz*_ga_4KB6M1439M*MTcxNTAxNzU1Mi4xLjAuMTcxNTAxNzU3Ni4wLjAuMA..
					'Text': 'C) Selle Pro - CHF 125',
					'Class': 'choicesButtonsRight',
					'Clickable': function(){
						return monogatari.storage().overBudget
					},
					'onChosen': function(){addExpense(125)},
					'onRevert': function(){substractExpense(125)},
				},
			}
		},
		'play sound cash',
		'hide image selleFizik',
		'hide image selleItalia',
		'hide image sellePro',
		'centered Tu as depensé CHF {{lastExpense}} pour la selle.',
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
		'show scene shop',
		'show character p interested on left',
		'show character m leftSide on right',
		'm Concernant le pédalier, les trois plus grandes marques sont Shimano, SRAM et Campagnolo.',
		'm SRAM et Campagnolo sont de très très bonnes marques, mais si je peux me permettre, je vous recommande Shimano.',
		'm Avec Shimano, vous aurez une aisance à entretenir les pièces puisque c\'est une marque qui est très répandue. En plus, Shimano est qualitatif et fonctionne plutôt intuitivement.',
		'p J\'y ai déjà réfléchi et effectivement je voulais partir sur du Shimano. Je me suis déjà renseigné sur la marque.',
		'm Aaaah, monsieur connaît à ce que je vois !',
		'show image pedalierSram on left with fadeIn',
		'm Le pédalier de la marque SRAM.',
		'show image pedalierShimano on center on top with fadeIn',
		'm Le pédalier de la marque Shimano.',
		'show image pedalierCampagnolo on right with fadeIn',
		'm Le pédalier de la marque Campagnolo.',
		'show character m smiling on right with fadeIn',
		'p Voyons. ',
		{
			'Choice': {
				'pedalierSram': {
					// https://www.sram.com/fr/sram/models/fc-frc-d1
					'Text': 'A) Pédalier SRAM 12V - CHF 277',
					'Class': 'choicesButtonsRight',
					'Clickable': function(){
						return monogatari.storage().overBudget
					},
					'onChosen': function(){addExpense(1338,95)},
					'onRevert': function(){substractExpense(1338,95)},
				},
				'pedalierShimano': {
					// https://bike.shimano.com/fr-FR/product/component/dura-ace-r9200/FC-R9200.html
					'Text': 'B) Pédalier Shimano Dura-Ace 12V - CHF 402.90',
					'Class': 'choicesButtonsCenter',
					'Clickable': function(){
						return monogatari.storage().overBudget
					},
					'onChosen': function(){addExpense(1464,85)},
					'onRevert': function(){substractExpense(1464,85)},
				},
				'pedalierCampagnolo': {
					// https://www.campagnolo.com/ch-fr/p%C3%A9dalier-super-record-12x2-speed/CFCSUPERRECORD12S.html
					'Text': 'C) Pédalier Campagnolo 12V - CHF 602.30',
					'Class': 'choicesButtonsLeft',
					'Clickable': function(){
						return monogatari.storage().overBudget
					},
					'onChosen': function(){addExpense(1664,25)},
					'onRevert': function(){substractExpense(1664,25)},
				},
			}
		},
		'play sound cash',
		'hide image pedalierCampagnolo',
		'hide image pedalierShimano',
		'hide image pedalierSram',
		'centered Tu as depensé CHF {{lastExpense}} pour ton nouveau pédalier !',
		'centered Mais à ta plus grande surprise, Marie t\'annonce ensuite que... ',
		'm Ha oui, j\'ai oublié de vous préciser qu\'avec le pédalier, il faut aussi prévoir le coût de la cassette adaptée (CHF 227), du dérailleur arrière et avant (CHF 486,35 + CHF 294,8), ainsi que de la chaîne de 12V (CHF 53,80).',
		'm Cela ajoute donc CHF 1\'061,95 à vos dépenses actuelles.',
		'show character p surprised on left', 
		{
			'Conditional': {
				'Condition': function(){
					return monogatari.storage ('overBudget');
				},
				'True': 'jump Scene7',
				'False': 'jump Lose',
			}
		},
	],

	'Scene7': [
		'show scene shop',
		'show character p doubting on left',
		'show character m front on right',
		'm Pour les pédales, je vous recommande deux marques qui ont un grand succès auprès du public.',
		'show image calesWahoo with fadeIn on left',
		'm Il y a d\'abord ces pédales de la marque Wahoo, qui sont de très bonne qualité et au goût du jour. Mais enfin, voilà. Ce sont des cales quoi. Classiques.',
		'show image calesWahoo2 on right with fadeIn',
		'm Ensuite la même marque propose des pédales avec capteur de puissance intégré.',
		'm Cette fonctionnalité permet aux cyclistes d\'avoir un meilleur suivi de leurs courbes de puissance, en fonction du moulinage.',
		'show image calesGarmin with fadeIn on center on top',
		'm Enfin, les cales Garmin sont un très bon compromis entre les deux autres, car elles proposent aussi un système de capteur de puissance, mais sur qu\'une seule pédale.',
		'm Certes, il y aura légèrement moins de précisions au niveau de la puissance, mais vous aurez la fonctionnalité en profitant d\'un prix plus abordable.',
		'p Je pense que je vais prendre... ',
		{
			'Choice': {
				'calesWahoo': {
					// https://fr-eu.wahoofitness.com/devices/pedals/speedplay/speedplay-nano-buy
					'Text': 'A) Cales Wahoo Speedplay - CHF 449.90',
					'Class': 'choicesButtonsLeft',
					'Clickable': function(){
						return monogatari.storage().overBudget
					},
					'onChosen': function(){addExpense(449,90)},
					'onRevert': function(){substractExpense(449,90)},
				},
				'calesGarmin': {
					// https://www.garmin.com/fr-CH/p/658661/pn/010-02388-03
					'Text': 'B) Cales Garmin Rally RS100  - CHF 499.90',
					'Class': 'choicesButtonsRight',
					'Clickable': function(){
						return monogatari.storage().overBudget
					},
					'onChosen': function(){addExpense(499,90)},
					'onRevert': function(){substractExpense(499,90)},
				},
				'calesWahoo2': {
					// https://fr-eu.wahoofitness.com/devices/pedals/powrlink/powrlink-zero-dual-power-pedal-buy
					'Text': 'C) Cales Wahoo Speedplay PowerMeter - CHF 999.90',
					'Class': 'choicesButtonsCenter',
					'Clickable': function(){
						return monogatari.storage().overBudget
					},
					'onChosen': function(){addExpense(999,90)},
					'onRevert': function(){substractExpense(999,90)},
				},
			}
		},
		'play sound cash',
		'hide image calesWahoo with fadeIn',
		'hide image calesWahoo2 with fadeIn',
		'hide image calesGarmin',
		'centered Tu as depensé CHF {{lastExpense}} pour tes pédales !',
		{
			'Conditional': {
				'Condition': function(){
					return monogatari.storage ('overBudget');
				},
				'True': 'jump Scene8',
				'False': 'jump Lose',
			}
		},
	],

	'Scene8': [
		'show scene shop',
		'show character p shocked on left',
		'show character m laughing on right',
		'm Pour finir, nous allons décider les roues que vous souhaitez installer.',
		'show image rouesSpecialized with fadeIn on left',
		'm Les roues specialized font très bien l\'affaire pour leur prix !',
		'show image rouesZipp on right with fadeIn',
		'm Ensuite la marque Zipp est aussi connue et plus abordable.',
		'show image rouesDtSwiss on center on top with fadeIn',
		'm Les roues DT Swiss sont très réputées et considérées comme du haut de gamme. Et pour le prix de CHF 2\'948, c\'est le cas de le dire !',
		'm Si vous voulez mon avis, les roues Speciliazed feront très bien l\'affaire pour le rythme auquel vous allez rouler.',
		'm Vous pourrez toujours réinvestir dans du matériel plus technologique par la suite et petit à petit.',
		'm Parce que le cyclisme, ça coûte cher malgré tout ! ',
		'p Effecivement, merci pour vos conseils.',
		'm Alors, quelles roues souhaitez-vous ?',
		{
			'Choice': {
				'rouesSpecialized': {
					// https://www.specialized.com/ch/fr/roval-alpinist-cl-ii/p/205468?color=330010-205468
					'Text': 'A) Roues Specialized  - CHF 850',
					'Class': 'choicesButtonsRight',
					'Clickable': function(){
						return monogatari.storage().overBudget
					},
					'onChosen': function(){addExpense(850)},
					'onRevert': function(){substractExpense(850)},
				},
				'rouesDtSwiss': {
					// https://www.dtswiss.com/fr/roues/roues-route/performance/prc-1100-dicut-mon-chasseral
					'Text': 'B) Roues DT Swiss - CHF 2948',
					'Class': 'choicesButtonsLeft',
					'Clickable': function(){
						return monogatari.storage().overBudget
					},
					'onChosen': function(){addExpense(2948)},
					'onRevert': function(){substractExpense(2948)},
				},
				'rouesZipp': {
					// https://www.dtswiss.com/fr/roues/roues-route/performance/prc-1100-dicut-mon-chasseral
					'Text': 'C) Roues Zipp - CHF 1118',
					'Class': 'choicesButtonsCenter',
					'Clickable': function(){
						return monogatari.storage().overBudget
					},
					'onChosen': function(){addExpense(1118)},
					'onRevert': function(){substractExpense(1118)},
				},
				
			}
		},
		'play sound cash',
		'hide image rouesDtSwiss with fadeIn',
		'hide image rouesZipp with fadeIn',
		'hide image rouesSpecialized with fadeIn',
		'centered Tu as depensé CHF {{lastExpense}} pour tes roues !',
		{
			'Conditional': {
				'Condition': function(){
					return monogatari.storage ('overBudget');
				},
				'True': 'jump Scene9',
				'False': 'jump Lose',
			}
		},
	],

	'Scene9': [
		'show scene shop',
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