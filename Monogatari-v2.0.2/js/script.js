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
	'homepage': 'homepage.svg',
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
		color: 'red',
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
		color: 'green',
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
	if (totalAmountSpent > 7500){
		this.storage ().overBudget = false;
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
		'centered Cela fait quelques temps maintenant que tu t\'es mis au cyclisme et tu souhaites investir dans un nouveau vélo de course.',
		'centered Tu t\'es rendu chez Custom Ride, l\'expert du montage à la carte. Et tu as rendez-vous avec Marie qui va te conseiller tout au long du processus.',
		'centered Par contre, tu es limité en terme de budget et tu peux te permettre de dépenser CHF ??? au maximum.',
		'centered Ce que tu recherches pour ton nouveau vélo : de la légèreté, de la polyvalence et du style.',
		'centered Bonne chance et attention au budget !',
		'jump Scene1',
	],

	'Scene1': [
		'show scene shop with fadeIn',
		'show character p rightSide on left with fadeIn',
		'show character m leftSide on right with fadeIn',
		'm Bonjour. Bienvenue chez Custom Ride ! Je suis Marie, comment puis-je vous aider ?',
		'show character m smiling on right',
		'show character p front on left',
		'p Bonjour. Je suis à la recherche d\'un nouveau vélo de course et j\'aimerais assembler le mien pièce par pièce. Pouvez-vous m\'aider à choisir les composants ?',
		'm Bien sûr ! Nous allons vous faire un montage à la carte.',
		'p Exactement.',
		'm Super, je vous laisse me suivre. On va commencer par choisir un cadre.',
		'jump Scene2',
	],


	'Scene2': [
		'show scene cadre with fadeIn',
		'stop music intro',
		'play music game on loop with volume 30',
		'show character p smiling on left with fadeIn',
		'show character m smiling on right with fadeIn',
		'm Alors, voilà. Il y a trois options principales qui s\'offrent à vous pour le cadre. Les cadres en aluminium, les cadres en carbone et ceux en acier.',
		'show image cadreAcier on left with fadeIn',
		'm Les cadres en acier sont très résistants et comfortables. En revanche, il faut les entretenir plus fréquemment vu que le risque de rouille est élevé. Et ils sont également assez lourds.',
		'show image cadreAlu on center with fadeIn',
		'm L\'aluminium, lui, est plus léger que l\'acier, mais il se conservera un peu moins bien sur le long terme. Et il est plus abordable en terme de budget qu\'un cadre en carbone ou en titane par exemple.',
		'show image cadreCarbone on right with fadeIn',
		'm Enfin, le cadre en carbone offre une meilleure légèreté et une meilleur absorption des vibrations. Il est plus cher, mais offre des performances supérieures.',
		'p Je vois, je vois. Huuum, laissez-moi réfléchir...',
		{
			'Choice': {
				'Cadre en acier': {
					// https://www.trekbikes.com/ch/fr_CH/vélos/vélos-de-randonnée-et-cyclotourisme/520/kit-cadre-520-disque/p/34200/?colorCode=red
					'Text': 'Cadre en acier - CHF 819',
					'Class': 'choicesButtonsLeft',
					'onChosen': function(){addExpense(819)},
					'onRevert': function(){substractExpense(819)},
				},
				'Cadre en aluminium': {
					// https://www.trekbikes.com/ch/fr_CH/vélos/vélos-de-randonnée-et-cyclotourisme/920/kit-cadre-920/p/21995/?colorCode=tan
					'Text': 'Cadre en aluminium - CHF 1399',
					'Class': 'choicesButtonsCenter',
					'onChosen': function(){addExpense(1399)},
					'onRevert': function(){substractExpense(1399)},
				},
				'Cadre en carbone': {
					// https://www.trekbikes.com/ch/fr_CH/vélos/vélos-de-route/vélos-de-route-performance/domane/domane-slr/kit-cadre-domane-slr-4e-gén-/p/37303/?colorCode=black_grey
					'Text': 'Cadre en carbone - CHF 5499',
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
		'jump Scene4',
	],


	'Scene4': [
		'show scene shop',
		'show character m front on right',
		'show character p smiling on left',
		'm Les cintres pour vélo de courses permettent une variation de placement des mains.',
		'm Le cycliste peut les poser soit sur le dessus, soit vers les cocottes du bas pour une position plus aggressive.',
		'show character p front on left',
		'm Votre choix de cintre sera donc plutôt orienté esthétique et confort.',
		'show image cintreBMC on left with fadeIn',
		'show image cintreBontrager on center with fadeIn',
		'show image cintreSyncros on right',
		'show character m smiling on right',
		'm Lequel vous fait de l\'œil?',
		'show character p doubting on left',
		{
			'Choice': {
				'cintreBMC': {
					// https://bmc-switzerland.com/fr/collections/components/products/handlebar-ics-aero-bike-components-bmc-22-10801-005
					'Text': 'Cintre BMC - CHF 349',
					'Class': 'choicesButtonsLeft',
					'Clickable': function(){
						return this.storage().overBudget
					},
					'onChosen': function(){addExpense(349)},
					'onRevert': function(){substractExpense(349)},
				},
				'cintreSyncros': {
					// https://www.syncros.com/ch/fr/product/syncros-creston-1-5-compact-handlebar
					'Text': 'Cintre Syncros - CHF 76.99',
					'Class': 'choicesButtonsCenter',
					'Clickable': function(){
						return this.storage().overBudget
					},
					'onChosen': function(){addExpense(76.99)},
					'onRevert': function(){substractExpense(76.99)},
				},
				'cintreBontrager': {
					// https://www.trekbikes.com/ch/fr_CH/equipement/composants-pour-vélo/cintres-de-vélo/cintres-de-vélos-route/cintre-route-bontrager-pro-vr-c/p/32645/?colorCode=black
					'Text': 'Cintre Bontrager - CHF 259',
					'Class': 'choicesButtonsRight',
					'Clickable': function(){
						return this.storage().overBudget
					},
					'onChosen': function(){addExpense(259)},
					'onRevert': function(){substractExpense(259)},
				},
			},
		},
		'play sound cash',
		'hide image cintreBMC with fadeIn',
		'hide image cintreBontrager with fadeIn',
		'hide image cintreSyncros with fadeIn',
		'centered Tu as depensé CHF {{lastExpense}} pour le cintre.',
		'show character p surprised on left',
		'jump Scene5',
	],

	'Scene5': [
		'show scene shop with fadeIn',
		'show character p smiling on left with fadeIn',
		'show character m surprised on right with fadeIn',
		'm Alors, concernant les freins, vous avez le choix entre des freins mécaniques ou des freins hydrauliques.',
		'm Les freins mécaniques fonctionnent avec un système de patins qui vont venir faire le frottement avec la jante de la roue lorsque vous freinez. Il s\'agit d\'un étrier que l\'on va venir fixer à l\'avant et à l\'arrière des roues.',
		'show image freinsShimano on left with fadeIn',
		'show image freinsSram on center with fadeIn',
		'm Shimano est SRAM proposent tous deux un très bon système, abordable et amplement efficace.',
		'show image freinsDisque on right with fadeIn',
		'm Les freins hydrauliques fonctionnent à l\'aide de disques et représentent un système plus coûteux et plus haut de gamme.',
		'm On place un disque à l\'avant et à l\'arrière qui sera aussi bloqué par des étriers. Mais ceux-ci sont placés au niveau de l\'axe de la roue et vous aurez moins de câblage apparents sur le cadre du vélo.',
		'm Ils nécessitent également de l\'huile qui l\'on va introduire dans les manettes de freins, d\'où le terme « hydraulique ».',
		'p Et au niveau ensuite de l\'entretien, y-a-t-il une différence entre les deux ?',
		'm Légèrement, oui.',
		'show character p shocked on left with fadeIn',
		'm Les freins à disque vont avoir besoin d\'une purge du liquide une à doix fois par an selon votre fréquence d\'utilisation. Aussi, de temps en temps, quand vous lavez votre vélo par exemple, vous devrez juste mettre un peu de produit dégraissant sur les disques et essuyez avec un chiffon propre.',
		'm Mais attention, surtout ne touchez jamais les disques avec vos mains, qui sont par défaut plutôt grasses. Un vieux t-shirt que vous déchirez en morceaux fera très bien l\'affaire.',
		'p Et les freins à patins ?',
		'm Les freins à patins ne nécessitent pas de produits ou de purge. En revanche, avec l\'usure, vous devrez changer les patins puisque la gomme sera sollicitée avec le temps. Tout dépend de la fréquence à laquelle vous utiliserez votre vélo, mais en général il faut les changer une fois par an.',
		'p D\'accord, je comprends mieux.',
		'm Au final, les freins hydrauliques offrent une meilleure modulation et une meilleure puissance de freinage, mais sont plus chers.',
		'p Huh-huh.',
		'm Qu\'est-ce que vous souhaitez installer sur votre vélo du coup ?',
		{
			'Choice': {
				'Les freins à patins - Shimano Dura-Ace': {
					// https://bike.shimano.com/fr-FR/product/component/dura-ace-r9200/BR-R9200.html
					'Text': 'Les freins à patins Shimano Dura-Ace - CHF 132',
					'Class': 'choicesButtonsLeft',
					'Clickable': function(){
						return this.storage().overBudget
					},
					'onChosen': function(){addExpense(132)},
					'onRevert': function(){substractExpense(132)},
				},
				'Les freins à patins - SRAM Force': {
					// https://www.sram.com/en/sram/models/rb-frc-d1
					'Text': 'Les freins à patins SRAM Force - CHF 85',
					'Class': 'choicesButtonsCenter',
					'Clickable': function(){
						return this.storage().overBudget
					},
					'onChosen': function(){addExpense(85)},
					'onRevert': function(){substractExpense(85)},
				},
				'Les freins à disque': {
					// https://bike.shimano.com/fr-FR/product/component/dura-ace-r9200/BR-R9270.html
					'Text': 'Les freins à disque Shimano Dura-Ace - CHF 114 + CHF 61.90',
					'Class': 'choicesButtonsRight',
					'Clickable': function(){
						return this.storage().overBudget
					},
					'onChosen': function(){addExpense(175.9)},
					'onRevert': function(){substractExpense(175.9)},
				}
			}
		},
		'play sound cash',
		'hide image freinsShimano',
		'hide image freinsSram',
		'hide image freinsDisque',
		'centered Tu as depensé CHF {{lastExpense}} pour les freins.',
		'jump Scene6',
	],

	'Scene6': [
		'show scene shop',
		'show character p front on left',
		'show character m thirdSide on right',
		'm Passons mainteant au choix de la selle.',
		'p Hum, excusez-moi, il reste encore beaucoup de composants à acheter pour mon vélo ?',
		'm Non, rassurez-vous, nous sommes presques au bout. Il nous reste encore la selle, le pédalier, les deux dérailleurs, les roues et les pneus, ainsi que les pédales.',
		'show character p interested on left with fadeIn',
		'p D\'accord, je me rends compte quand même de l\'investissement que cela représente.',
		'm Je vous laisse me suivre..',
		'jump Scene7',
	],

	'Scene7': [
		'show scene shop with fadeIn',
		'show character p smiling on left',
		'show character m smiling on right',
		'm Pour la selle, comme pour le cintre, c\'est une question de confort et d\'esthétique. Je vous présente ici trois selles de bonne qualité.',
		'show image selleFizik on left with fadeIn',
		'show image selleItalia on center with fadeIn',
		'show image sellePro on right with fadeIn',
		'm Laquelle vous plairait ?',
		'show character p doubting on left with fadeIn',
		'p Uuumm...',
		{
			'Choice': {
				'selleFizik': {
					// https://www.fizik.com/eu_en/vento-antares-r3-adaptive.html
					'Text': 'Selle Fizik - CHF 259',
					'Class': 'choicesButtonsLeft',
					'Clickable': function(){
						return this.storage().overBudget
					},
					'onChosen': function(){addExpense(259)},
					'onRevert': function(){substractExpense(259)},
				},
				'selleItalia': {
					// https://www.selleitalia.com/slr-boost-kit-carbonio/?_gl=1*134esjr*_up*MQ..*_ga*MTk2ODM1Mjc3Ni4xNzE1MDE3NTUz*_ga_4KB6M1439M*MTcxNTAxNzU1Mi4xLjAuMTcxNTAxNzU3Ni4wLjAuMA..
					'Text': 'Selle Italia - CHF 314.90',
					'Class': 'choicesButtonsCenter',
					'Clickable': function(){
						return this.storage().overBudget
					},
					'onChosen': function(){addExpense(314.90)},
					'onRevert': function(){substractExpense(314.90)},
				},
				'sellePro': {
					// https://www.selleitalia.com/slr-boost-kit-carbonio/?_gl=1*134esjr*_up*MQ..*_ga*MTk2ODM1Mjc3Ni4xNzE1MDE3NTUz*_ga_4KB6M1439M*MTcxNTAxNzU1Mi4xLjAuMTcxNTAxNzU3Ni4wLjAuMA..
					'Text': 'Selle Pro - CHF 125',
					'Class': 'choicesButtonsRight',
					'Clickable': function(){
						return this.storage().overBudget
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
		'jump Scene8',
	],

	'Scene8': [
		'show scene shop with fadeIn',
		'show character p interested on left',
		'show character m leftSide on right',
		'm Concernant le pédalier, les trois plus grandes marques sont Shimano, SRAM et Campagnolo.',
		'm SRAM et Campagnolo sont de très très bonnes marques, mais si je peux me permettre, je vous recommande Shimano.',
		'm Avec Shimano, vous aurez une aisance à entretenir les pièces puisque c\'est une marque qui est très répandue. En plus, Shimano est très qualitatif et fonctionne très facilement.',
		'p J\'y ai déjà réfléchi et effectivement je voulais partir sur du Shimano. Je me suis déjà renseigné sur la marque.',
		'm Aaaah, monsieur connaît à ce que je vois !',
		'show image pedalierCampagnolo on left with fadeIn',
		'show character m smiling on right with fadeIn',
		'm Le pédalier de la marque Campagnolo.',
		'show image pedalierShimano on center with fadeIn',
		'm Le pédalier de la marque Shimano.',
		'show image pedalierSram on right with fadeIn',
		'm Et le pédalier de la marque SRAM.',
		'p Voyons. ',
		{
			'Choice': {
				'pedalierCampagnolo': {
					// https://www.campagnolo.com/ch-fr/p%C3%A9dalier-super-record-12x2-speed/CFCSUPERRECORD12S.html
					'Text': 'Pédalier Campagnolo 12V - CHF 602.30',
					'Class': 'choicesButtonsLeft',
					'Clickable': function(){
						return this.storage().overBudget
					},
					'onChosen': function(){addExpense(602.30)},
					'onRevert': function(){substractExpense(602.30)},
				},
				'pedalierShimano': {
					// https://bike.shimano.com/fr-FR/product/component/dura-ace-r9200/FC-R9200.html
					'Text': 'Pédalier Shimano Dura-Ace 12V - CHF 402.90',
					'Class': 'choicesButtonsCenter',
					'Clickable': function(){
						return this.storage().overBudget
					},
					'onChosen': function(){addExpense(1464,85)},
					'onRevert': function(){substractExpense(1464,85)},
				},
				'pedalierSram': {
					// https://www.sram.com/fr/sram/models/fc-frc-d1
					'Text': 'Pédalier SRAM 12V - CHF 277',
					'Class': 'choicesButtonsRight',
					'Clickable': function(){
						return this.storage().overBudget
					},
					'onChosen': function(){addExpense(277)},
					'onRevert': function(){substractExpense(277)},
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
		'm Cela ajoute donc CHF 1\'464,85 à vos dépenses actuelles.',
		'show character p surprised on left', 
		'jump Scene9',
	],

	'Scene9': [
		'show scene shop with fadeIn',
		'show character p doubting on left',
		'show character m front on right',
		'show image calesWahoo with fadeIn on left',
		'm Il y a d\'abord ces pédales de la marque Wahoo, qui sont de très bonne qualité et au goût du jour.',
		'show image calesWahoo2 on center with fadeIn',
		'm Ensuite la même marque propose des pédales avec capteur de puissance intégré.',
		'm Cette fonctionnalité permet aux cyclistes d\'avoir un meilleur suivi de leurs dépenses caloriques.',
		'show image calesGarmin with fadeIn on right',
		'm Enfin, les cales Garmin sont un très bon compromis entre les deux autres, car elles proposent aussi un système de capteur de puissance, mais sur qu\'une seule pédale.',
		'm Certes, il y aura légèrement moins de précisions au niveau de la puissance, mais vous aurez la fonctionnalité ainsi qu\'un prix plus abordable.',
		'p Je pense que je vais prendre... ',
		{
			'Choice': {
				'calesWahoo': {
					// https://fr-eu.wahoofitness.com/devices/pedals/speedplay/speedplay-nano-buy
					'Text': 'Cales Wahoo Speedplay - CHF 449.90',
					'Class': 'choicesButtonsLeft',
					'Clickable': function(){
						return this.storage().overBudget
					},
					'onChosen': function(){addExpense(449.90)},
					'onRevert': function(){substractExpense(449.90)},
				},
				'calesWahoo2': {
					// https://fr-eu.wahoofitness.com/devices/pedals/powrlink/powrlink-zero-dual-power-pedal-buy
					'Text': 'Cales Wahoo Speedplay PowerMeter - CHF 999.90',
					'Class': 'choicesButtonsCenter',
					'Clickable': function(){
						return this.storage().overBudget
					},
					'onChosen': function(){addExpense(999.90)},
					'onRevert': function(){substractExpense(999.90)},
				},
				'calesGarmin': {
					// https://www.garmin.com/fr-CH/p/658661/pn/010-02388-03
					'Text': 'Cales Garmin Rally RS100  - CHF 499.90',
					'Class': 'choicesButtonsRight',
					'Clickable': function(){
						return this.storage().overBudget
					},
					'onChosen': function(){addExpense(499.90)},
					'onRevert': function(){substractExpense(499.90)},
				},
			}
		},
		'play sound cash',
		'hide image calesWahoo with fadeIn',
		'hide image calesWahoo2 with fadeIn',
		'hide image calesGarmin with fadeIn',
		'centered Tu as depensé CHF {{lastExpense}} pour tes pédales !',
		'jump Scene10',
	],

	'Scene10': [
		'show scene shop with fadeIn',
		'show character p shocked on left',
		'show character m laughing on right',
		'm Pour finir, nous allons décider les roues que vous souhaitez installer.',
		'show image rouesDtSwiss on left with fadeIn',
		'm Les roues DT Swiss sont très réputées et considérées comme du haut de gamme. Et pour le prix de CHF 2\'948, c\'est le cas de le dire !',
		'show image rouesZipp on center with fadeIn',
		'm Ensuite la marque Zipp est aussi réputé et plus abordable.',
		'show image rouesSpecialized with fadeIn on right',
		'm Puis, les roues specialized font aussi très bien l\'affaire pour leur prix !',
		'm Quelles roues souhaitez-vous ?',
		{
			'Choice': {
				'rouesDtSwiss': {
					// https://www.dtswiss.com/fr/roues/roues-route/performance/prc-1100-dicut-mon-chasseral
					'Text': 'Roues DT Swiss - CHF 2948',
					'Class': 'choicesButtonsLeft',
					'Clickable': function(){
						return this.storage().overBudget
					},
					'onChosen': function(){addExpense(2948)},
					'onRevert': function(){substractExpense(2948)},
				},
				'rouesZipp': {
					// https://www.dtswiss.com/fr/roues/roues-route/performance/prc-1100-dicut-mon-chasseral
					'Text': 'Roues Zipp - CHF 1118',
					'Class': 'choicesButtonsCenter',
					'Clickable': function(){
						return this.storage().overBudget
					},
					'onChosen': function(){addExpense(1118)},
					'onRevert': function(){substractExpense(1118)},
				},
				'rouesSpecialized': {
					// https://www.specialized.com/ch/fr/roval-alpinist-cl-ii/p/205468?color=330010-205468
					'Text': 'Roues Specialized  - CHF 850',
					'Class': 'choicesButtonsRight',
					'Clickable': function(){
						return this.storage().overBudget
					},
					'onChosen': function(){addExpense(850)},
					'onRevert': function(){substractExpense(850)},
				},
			}
		},
		'play sound cash',
		'hide image rouesDtSwiss with fadeIn',
		'hide image rouesZipp with fadeIn',
		'hide image rouesSpecialized with fadeIn',
		'centered Tu as depensé CHF {{lastExpense}} pour tes roues !',
		'jump Scene11',
	],

	'Scene11': [
		'show scene store',
		'show character m smiling on right',
		'show character p laughing on left',
		'm Félicitations, nous y sommes arrivés ! Vous avez monté votre vélo de A à Z.',
		'stop music game',
		'm Passons à la caisse pendant que le méchanicien commence à travailler sur votre vélo.',
		'show scene black with fadeIn',
		'centered Le méchanicien assemble ton vélo...',
		'play sound tools with volume 80',
		'jump Ending',
	],
	

	'Ending': [
		'play music end on loop with volume 50',
		'show scene bikeFinal',
		'show character p smiling on left with fadeIn',
		'centered Bravo, tu as réussi à respecter ton budget et tu es repart avec ton propre vélo.',
		'end',
	],

});