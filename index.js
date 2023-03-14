import { getAgents, getWeapons } from './api.js';
import {
    addSliderIndexTilesToSlider,
    addSliderItemToSlider,
    decrementSliderIndex,
    incrementSliderIndex,
} from './utils.js';
import { setBestAndWorstWeaponStats } from './weaponStats.js';

const weaponSlider = document.querySelector('.weapon-slider');
const agentSlider = document.querySelector('.agent-slider');
const sliders = document.querySelectorAll('.slider');

const loadHomePage = () => {
    weaponSlider.querySelector('.slider-content').innerHTML = '';
    agentSlider.querySelector('.slider-content').innerHTML = '';
    agentSlider.querySelector('.slider-index-indicator').innerHTML = '';
    weaponSlider.querySelector('.slider-index-indicator').innerHTML = '';

    getWeapons().then((weapons) => {
        addSliderIndexTilesToSlider(weaponSlider, weapons);
        setBestAndWorstWeaponStats(weapons);
        weapons.forEach((weapon) => addSliderItemToSlider(weaponSlider, weapon.displayIcon, weapon.displayName, weapon));
    });

    getAgents().then((agents) => {
        addSliderIndexTilesToSlider(agentSlider, agents);
        agents.forEach((agent) => addSliderItemToSlider(agentSlider, agent.displayIcon, agent.displayName, agent));
    });

    sliders.forEach((slider) => {
        const nextButton = slider.querySelector('.next-page-button');
        const prevButton = slider.querySelector('.prev-page-button');

        nextButton.addEventListener('click', () => incrementSliderIndex(slider));
        prevButton.addEventListener('click', () => decrementSliderIndex(slider));
    });

    window.addEventListener('resize', () =>
        sliders.forEach((slider) => {
            addSliderIndexTilesToSlider(slider, slider.querySelectorAll('.slider-item'));
            slider.style.setProperty('--slider-index', '0');
        }),
    );

    document.querySelector('.logo-container').addEventListener('click', function () {
        document.querySelector('.weapon-stats').innerHTML = '';
        document.querySelector('.agent-image > img').src = '#';
        document.querySelector('.weapon-section').style.display = 'none';
        document.querySelector('.agent-section').style.display = 'none';
        document.querySelector('.home-main').style.display = 'flex';
    });
};

loadHomePage();
