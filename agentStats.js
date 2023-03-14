const noImageAbilities = ["Uncanny Marksman", "Toxic", "Heating Up"];

const createAbilityTile = (item, number) => {
    const agentAbility = document.createElement('div');
    agentAbility.classList.add('agent-ability')

    const agentAbilityImg = document.createElement('div');
    agentAbilityImg.classList.add('agent-ability-img');
    const img = document.createElement('img');

    if (noImageAbilities.includes(item.displayName)) img.src = "./assets/images/x.png";
    else img.src = item.displayIcon;

    img.alt = item.displayName;
    agentAbilityImg.appendChild(img);

    const agentAbilityDescription = document.createElement('div');
    const h3 = document.createElement('h3');
    h3.innerText = item.slot + ": " + item.displayName;
    agentAbilityDescription.appendChild(h3);

    const p = document.createElement('p');
    p.innerText = item.description;
    agentAbilityDescription.appendChild(p);

    if (number % 2) {
        agentAbilityDescription.classList.add('agent-ability-description-left')
        agentAbility.appendChild(agentAbilityImg);
        agentAbility.appendChild(agentAbilityDescription);
    }
    else {
        agentAbility.style.backgroundColor = '#262626';
        agentAbilityDescription.classList.add('agent-ability-description-right');
        agentAbility.appendChild(agentAbilityDescription);
        agentAbility.appendChild(agentAbilityImg);
    }

    return agentAbility;
}

export const loadAgentStats = (item) => {
    document.querySelector('.home-main').style.display = "none";
    document.querySelector('.agent-section').style.display = "flex";

    document.querySelector('.agent-image > img').src = item.fullPortrait;
    document.querySelector('.agent-image > img').alt = item.displayName;
    document.querySelector('.agent-name > h1').innerText = item.displayName;
    document.querySelector('.agent-description').innerText = item.description;

    document.querySelector('.agent-role > img').src = item.role.displayIcon;
    document.querySelector('.agent-role > img').alt = item.role.displayName;
    document.querySelector('.agent-description-cont > h3').innerText = item.role.displayName;
    document.querySelector('.agent-description-cont > p').innerText = item.role.description;

    const agentAbilitiesContainer = document.querySelector('.agent-abilities');
    agentAbilitiesContainer.innerHTML = '';

    const h2 = document.createElement('h2');
    h2.innerText = "Abilities:";
    agentAbilitiesContainer.appendChild(h2);

    for (var i = 0; i < item.abilities.length; i++) agentAbilitiesContainer.appendChild(createAbilityTile(item.abilities[i], i))
}