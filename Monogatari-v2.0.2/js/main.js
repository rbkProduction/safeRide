'use strict';
/* global Monogatari */
/* global monogatari */

/**
 * =============================================================================
 * This is the file where you should put all your custom JavaScript code,
 * depending on what you want to do, there are 3 different places in this file
 * where you can add code.
 *
 * 1. Outside the $_ready function: At this point, the page may not be fully
 *    loaded yet, however you can interact with Monogatari to register new
 *    actions, components, labels, characters, etc.
 *
 * 2. Inside the $_ready function: At this point, the page has been loaded, and
 *    you can now interact with the HTML elements on it.
 *
 * 3. Inside the init function: At this point, Monogatari has been initialized,
 *    the event listeners for its inner workings have been registered, assets
 *    have been preloaded (if enabled) and your game is ready to be played.
 *
 * You should always keep the $_ready function as the last thing on this file.
 * =============================================================================
 **/

const { $_ready, $_ } = Monogatari;

// 1. Outside the $_ready function:


$_ready (() => {
	// 2. Inside the $_ready function:
	$_('[data-action="stats"]').click (function() {
		monogatari.component ('game-screen').template (() => {
			return `
				<div data-content="visuals">
					<div id="tsparticles" data-ui="particles"></div>
					<div id="background" data-ui="background"></div>
					<div data-component="modal" data-ui="stats">
						<label for="statBar"> Dépenses : </label>
						<progress id="statBar" value="0" max="7500" data-stat="expenses"></progress>
					</div>
				</div>
			`;
		});
		monogatari.component('game-screen').template (() => {
			('[data-stat]').value (monogatari.storage ().expenses)
		}); 
	});
	monogatari.init ('#monogatari').then (() => {
		// 3. Inside the init function:

	});
});
