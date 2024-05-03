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
			'<a href="https://github.com/rbkProduction/Alter-Eco">Code source</a>',
		],
	},
	'Sources': {
		'Images': '<a href="https://www.freepik.com">Freepik</a> <br>', 
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
	'storefront': 'storefront.svg',
	'insideStore': 'insideStore.svg',
	'cadre': 'cadre.svg',
	'guidon': 'guidon.svg',
});


// Define the Characters
monogatari.characters ({
	's': {
		name: 'Marie',
		color: 'orange',
		directory: 'seller',
		sprites: {
			dubitative: 'dubitative.png',
			explaining: 'explaining.png',
			happy: 'happy.png',
			showing: 'showing.png',
			standing: 'standing.png',
			thinking: 'thinking.png',
		},
	},
	'u': {
		name: '{{player.name}}',
		color: 'red',
		directory: 'user',
		sprites: {
			dontKnow: 'dontKnow.png',
			doubting: 'doubting.png',
			laughing: 'laughing.png',
			showing: 'showing.png',
			happy: 'happy.png',
			standing: 'standing.png',
			thinking: 'thinking.png',
		},
	},
});

// Defining the progess bar that shows the current expenses


// Function to keep track of the expenses througout the choices of the user
function addExpense(expenses, price){
	monogatari.storage ().expenses += price;
	$_('[data-stat="${expenses}"]').value (monogatari.storage ().expenses);
	return true;
};

function substractExpense(expenses, price){
	monogatari.storage ().expenses -= price;
	$_('[data-stat="${expenses}"]').value (monogatari.storage ().expenses);
	return true;
};



monogatari.script ({
	// The game starts here.
	'Start': [
		'show scene storefront',
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
		'centered Ton objectif aujourd\'hui est de te rendre dans ce magasin et d\'acheter un vélo de course.',
		'centered Cela fait quelques temps maintenant que tu fais du vélo et tu souhaites investir afin de prendre plus de plaisir en roulant.',
		'centered Tu es limité en terme de budget et tu peux te permettre de dépenser CHF ???. Mais tu souhaites malgré tout repartir avec un vélo léger, fiable et au goût du jour.',
		'centered À toi de jouer !',
		'jump Scene1',
	],

	'Scene1': [
		'show scene insideStore with fadeIn',
		'show character u standing on left with fadeIn end-fadeOut',
		'play music inShop with loop with volume 50',
		'show character s standing on right with fadeIn end-fadeOut',
		's Bonjour. Bienvenue chez Bike\&Co ! Je suis Marie, comment puis-je vous aider ?',
		'u Bonjour. Je souhaiterais acheter un vélo de course.',
		's Vous êtes au bon endroit dans ce cas ! Nous avons des vélos prêts à la vente, mais si vous êtes un connaisseur, on peut aussi vous proposer le montage complet du vélo.',
		's Vous pourrez alors choisir chaque composant selon vos propres besoins. Mais ne vous inquiétez pas, je vais vous accompagner pendant tout le processus !',
		'u Ça me va. Faisons comme cela.',
		's Super, je vous laisse me suivre. Onv va commencer par choisir un cadre.',
		'jump Scene2',
	],


	'Scene2': [
		'show scene cadre with fadeIn',
		'show character u standing on left with fadeIn end-fadeOut',
		'show character s standing on right with fadeIn end-fadeOut',
		's Alors, voilà. Il y a trois sortes de cadre principales. Les cadres en aluminium, les cadres en carbone et ceux en acier.',
		's Les cadres en acier sont très résistants et comfortables. En revanche, il faut les entretenir plus fréquemment vu que le risque de rouille est élevé. Et ils sont également assez lourds.',
		's L\'aluminium, lui, est plus léger que l\'acier, mais il se conservera moins bien sur le long terme. Il est plus abordable en terme de budget qu\'un cadre en carbone ou en titane par exemple.',
		's Enfin, le cadre en carbone est une très bonne option pour les cyclistes. Il est léger, flexible et comfortable. En revanche il est plus fragile et resistera moins bien aux chocs. Et le budget reste conséquent.',
		'u Je vois, je vois. Huuum, laissez-moi réfléchir...',
		{
			'Choice': {
				'Cadre en acier': {
					// https://www.fabrikcycles.ch/products/fabrik-kit-cadre-mei93?variant=39561821519933&currency=CHF&utm_medium=product_sync&utm_source=google&utm_content=sag_organic&utm_campaign=sag_organic&srsltid=AfmBOoq0d6fnRjlKMPoXGiiNaLh_ATEf5dDACArVe9CsssnDNtsZgj2BsIU
					'Text': 'Cadre en acier - CHF 229',
					'onChosen': function(){addExpense(monogatari.storage ().expenses, 229)},
					'onRevert': function(){substractExpense(monogatari.storage ().expenses, 229)},
					'Do': 'jump Scene3',
				},
				'Cadre en aluminium': {
					'Text': 'Cadre en aluminium - CHF 729.99',
					'onChosen': function(){addExpense(monogatari.storage ().expenses, 729.99)},
					'onRevert': function(){substractExpense(monogatari.storage ().expenses, 729.99)},
					'Do': 'jump Scene3',
				},
				'Cadre en carbone': {
					// https://bmc-switzerland.com/fr/collections/road-racing-bikes-teammachine-slr/products/teammachine-slr-frs-bike-frames-bmc-23-10611-010
					'Text': 'Cadre en carbone - CHF 2\'299',
					'onChosen': function(){addExpense(monogatari.storage ().expenses, 2299)},
					'onRevert': function(){substractExpense(monogatari.storage ().expenses, 2299)},
					'Do': 'jump Scene3',
				},
			},
		},
	],

	'Scene3': [
		'show scene guidon with fadeIn',
		'show character u doubting on left with fadeIn end-fadeOut',
		'show character s standing on right with fadeIn end-fadeOut',
		's Tu as depensé déjà CHF {{expenses}} pour le cadre.',
		's Maintenant que nous avons la base du vélo. Nous allons passer au guidon.',
		's ',
	],


	'Scene4': [
		'show scene scene4 with fadeIn',
		'show character u normal on right with fadeIn',

	],

	'Scene5': [
		'show scene scene5 with fadeIn',
		'show character u satisfied on right with fadeIn',
		
	],


	'Scene6': [
		'show scene scene6 with fadeIn',
		'show character u doubting on right',
	
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