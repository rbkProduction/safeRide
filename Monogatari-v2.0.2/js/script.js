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
	inShop: 'The Urban Symphonia - Unicorn Heads.mp3',
});

// Define the voice files used in the game.
monogatari.assets ('voices', {

});

// Define the sounds used in the game.
monogatari.assets ('sounds', {
	
});

// Define the videos used in the game.
monogatari.assets ('videos', {

});

// Define the images used in the game.
monogatari.assets ('images', {
	
});

// Define the backgrounds for each scene.
monogatari.assets ('scenes', {
	'homepage': 'homepage.svg',
	'intro': 'intro.svg',
	'insideStore': 'insideStore.svg',
	'cadre': 'cadre.svg',
	'guidon': 'guidon.svg',
});


// Define the Characters
monogatari.characters ({
	'm': {
		name: 'Marie',
		color: 'orange',
		directory: 'marie',
		sprites: {
			thirdSide: '3-4.png',
			back: 'back.png',
			doubting: 'doubting.png',
			front: 'front.png',
			laughing: 'laughing.png',
			leftSide: 'leftSide.png',
			shocked: 'shocked.png',
			smiling: 'smiling.png',
			surprised: 'surprised.png',
		},
	},
	'p': {
		name: '{{player.name}}',
		color: 'green',
		directory: 'player',
		sprites: {
			thirdSide: 'thirdSide.png',
			back: 'back.png',
			doubting: 'doubting.png',
			front: 'front.png',
			interested: 'interested.png',
			laughing: 'laughing.png',
			rightSide: 'rightSide.png',
			shocked: 'shocked.png',
			smiling: 'smiling.png',
			surprised: 'surprised.png',
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
		'show scene intro',
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
		'show scene insideStore with fadeIn',
		'show character p 3-4 on left with fadeIn',
		'play music inShop with loop with volume 50',
		'show character m leftSide on right with fadeIn',
		'm Bonjour. Bienvenue chez Bike\&Co ! Je suis Marie, comment puis-je vous aider ?',
		'show character m front on right',
		'show character p front on left',
		'p Bonjour. Je suis à la recherche d\'un nouveau vélo de course et j\'aimerais assembler le mien pièce par pièce. Pouvez-vous m\'aider à choisir les composants ?',
		'show character m smiling on right',
		'm Bien sûr ! Nous allons vous faire un montage à la carte.',
		'p Exactement.',
		'm Super, je vous laisse me suivre. On va commencer par choisir un cadre.',
		'show character m leftSide',
		'show character m back',
		'show character p rightSide',
		'show character p back',
		'jump Scene2',
	],


	'Scene2': [
		'show scene cadre with fadeIn',
		'show character p front on left with fadeIn',
		'show character m front on right with fadeIn',
		'm Alors, voilà. Il y a trois options principales qui s\'offrent à vous pour le cadre. Les cadres en aluminium, les cadres en carbone et ceux en acier.',
		'm Les cadres en acier sont très résistants et comfortables. En revanche, il faut les entretenir plus fréquemment vu que le risque de rouille est élevé. Et ils sont également assez lourds.',
		'm L\'aluminium, lui, est plus léger que l\'acier, mais il se conservera un peu moins bien sur le long terme. Et il est plus abordable en terme de budget qu\'un cadre en carbone ou en titane par exemple.',
		'm Enfin, le cadre en carbone offre une meilleure légèreté et une meilleur absorption des vibrations. Il est plus cher, mais offre des performances supérieures.',
		'p Je vois, je vois. Huuum, laissez-moi réfléchir...',
		{
			'Choice': {
				'Cadre en acier': {
					// https://www.fabrikcycles.ch/products/fabrik-kit-cadre-mei93?variant=39561821519933&currency=CHF&utm_medium=product_sync&utm_source=google&utm_content=sag_organic&utm_campaign=sag_organic&srsltid=AfmBOoq0d6fnRjlKMPoXGiiNaLh_ATEf5dDACArVe9CsssnDNtsZgj2BsIU
					'Text': 'Cadre en acier - CHF 229',
					'onChosen': function(){addExpenseExpense(229)},
					'onRevert': function(){substractExpense(229)},
				},
				'Cadre en aluminium': {
					'Text': 'Cadre en aluminium - CHF 729.99',
					'onChosen': function(){addExpense(729.99)},
					'onRevert': function(){substractExpense(729.99)},
				},
				'Cadre en carbone': {
					// https://bmc-switzerland.com/fr/collections/road-racing-bikes-teammachine-slr/products/teammachine-slr-frs-bike-frames-bmc-23-10611-010
					'Text': 'Cadre en carbone - CHF 2\'299',
					'onChosen': function(){addExpense(2299)},
					'onRevert': function(){substractExpense(2299)},
				},
			},
		},
		'centered Tu as depensé CHF {{amount} pour le cadre.',
		'jump Scene3',
	],

	'Scene3': [
		'show scene insideStore with fadeIn',
		'show character p rightSide on left with fadeIn',
		'show character m 3-4 on right with fadeIn',
		'm Maintenant que nous avons la base du vélo. Voyons quel cintre vous souhaitez pour votre guidon.',
		'jump Scene4',
	],


	'Scene4': [
		'show scene guidon with fadeIn',
		'show character p front on left with fadeIn',
		'show character m smiling on right with fadeIn',
		'm Les cintres pour vélo de courses permettent une variation de placement des mains.',
		'm Le cycliste peut les poser soit sur le dessus, soit vers les cocottes du bas pour une position plus aggressive.',
		'p (En respouttant discrètement) Oui, ça merci. Je le savais..',
		'show character m surprised on right',
		'centered Marie a remarqué ton commentaire.',
		'm Votre choix de cintre sera donc plutôt orienté esthétique et confort.',
		'show scene guidon_1',
		'm Lequel vous fait de l\'œil?',
		{
			'Choice': {
				'Guidon 1': {
					'Text': 'Guidon 1',
					'onChosen': function(){addExpense(69.99)},
					'onRevert': function(){substractExpense(69.99)},
				},
				'Guidon 2': {
					'Text': 'Guidon 2',
					'onChosen': function(){addExpense(729.99)},
					'onRevert': function(){substractExpense(729.99)},
				},
				'Guidon 3': {
					'Text': 'Guidon 4',
					'onChosen': function(){addExpense(729.99)},
					'onRevert': function(){substractExpense(729.99)},
				},
				'Guidon 4': {
					'Text': 'Guidon 4',
					'onChosen': function(){addExpense(729.99)},
					'onRevert': function(){substractExpense(729.99)},
				},
			},
		},
		'centered Tu as depensé CHF {{amount}} pour le cadre.',
		'show character p surprised on left',
		'jump Scene5',
	],

	'Scene5': [
		'show scene freins with fadeIn',
		'show character p doubting on left with fadeIn',
		'show character m 3-4 on right with fadeIn',
		'm Alors, concernant les freins, vous avez le choix entre des freins mécaniques ou des freins hydrauliques.',
		'm Les freins mécaniques fonctionnent avec un système de patins qui vont venir faire le frottement avec la jante de la roue lorsque vous freinez. Il s\'agit d\'un étrier que l\'on va venir fixer à l\'avant et à l\'arrière des roues.',
		'm C\'est un très bon système, abordable et amplement efficace.',
		'm Les freins hydrauliques fonctionnent à l\'aide de disques et représentent un système plus coûteux et plus haut de gamme.',
		'm On place un disque à l\'avant et à l\'arrière qui sera aussi bloqué par des étriers. Mais ceux-ci sont placés au niveau de l\'axe de la roue et vous aurez moins de câblage apparents sur le cadre du vélo.',
		'm Ils nécessitent également de l\'huile qui l\'on va introduire dans les manettes de freins, d\'où le terme « hydraulique ».',
		'm Et au niveau ensuite de l\'entretien, y-a-t-il une différence entre les deux ?',
		'm Légèrement, oui.',
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
				'Les freins à patins': {
					'Text': 'Les freins à patins - CHF 729.99',
					'onChosen': function(){addExpense(729.99)},
					'onRevert': function(){substractExpense(729.99)},
				},
				'Les freins à disque': {
					'Text': 'Les freins à disque - CHF 729.99',
					'onChosen': function(){addExpense(729.99)},
					'onRevert': function(){substractExpense(729.99)},
				}
			}
		},
		'centered Tu as depensé CHF {{amount}} pour le cadre.',
		'jump Scene 6',
	],


	'Scene6': [
		'show scene manettes with fadeIn',
		'show character u thinking on left with fadeIn end-fadeOut',
		'show character s showing on right with fadeIn end-fadeOut',
		's Avec les étriers de frein, il vous faut les manettes qu\'on va venir fixer sur le guidon. Les manettes doivent aussi être compatibles avec la transmission que vous allez choisir.',
		'u Attendez, la transmission ? ',
		's Oui, c\' est tout le système qui va vous permettre de changer de vitesses.',
		's À ce stade, vous devez choisir sur quelle système de transmission vous aller vous orienter.',
		's Les trois plus grandes marques sont Shimano, SRAM et Campagnolo.',
		's SRAM et Campagnolo sont de très très bonnes marques, mais si je peux me permettre, je vous recommande Shimano.',
		's Avec Shimano, vous aurez une aisance à entretenir les pièces puisque c\'est une marque qui est très répandue. En plus, Shimano est très qualitatif et fonctionne très facilement.',
		's Dites-moi combien de vitesses vous souhaiteriez et ensuite je serais en mesure de vous intégrer les manettes compatibles.',
		'u J\'y ai déjà réfléchi et j\'hésitais entre du 11 ou du 12 vitesses.',
		's Aaaah, monsieur connaît à ce que je vois ! Écoutez, effectivement je pense qu\'on peut déjà publier le 10 vitesses si vous roulez régulièrement.',
		's Ensuite, à mon avis, vous allez prendre du double non ?',
		'u Comment ça du double ?',
		's Du double vitesse. C\'est-à-dire deux plateaux avant. Enfait, les pignons arrières vont composer vos 11 ou vos 12 vitesses. Et pour l\'avant, vous avez le choix entre 1 ou 2 plateaux.',
		's Si vous prenez deux plateaux - ce qui est le plus répandu chez tous les coureurs professionnels - vous débloquerez plus de vitesses et vous pourrez adapter au mieux votre moulinage en fonction du dénivelé.',
		'u Alors je pense que je vais choisir...',
		{
			'Choice': {
				'1x 11S': {
					'Text': '1x 11S - CHF 729.99',
					'onChosen': function(){addExpense(729.99)},
					'onRevert': function(){substractExpense(729.99)},
				},
				'2x 11S': {
					'Text': '2x 11S - CHF 729.99',
					'onChosen': function(){addExpense(729.99)},
					'onRevert': function(){substractExpense(729.99)},
				},
				'1x 12S': {
					'Text': '1x 12S - CHF 729.99',
					'onChosen': function(){addExpense(729.99)},
					'onRevert': function(){substractExpense(729.99)},
				},
				'2x 12S': {
					'Text': '2x 12S - CHF 729.99',
					'onChosen': function(){addExpense(729.99)},
					'onRevert': function(){substractExpense(729.99)},
				},
			},
		},
	
	],


	'Scene7': [
		'show scene scene7 with fadeIn',
		'show character u normal on right',
	
	],


	'Scene8': [
		'show scene scene8 with fadeIn',
		'show character u doubting on right',

	],


	'Scene9': [
		'show scene scene9 with fadeIn',
		'show character u doubting on right',

	],
	

	'Ending': [
		'show character u happy with fadeIn',
		'show character s plant5 with fadeIn',
		'end',
	],

});