const stats = {
    "magazineSize": {
        "displayName": "Magazine Size", "best": 0, "worst": Infinity, "reverse": false,
        "get": (weapon) => weapon.weaponStats.magazineSize
    },
    "fireRate": {
        "displayName": "Fire Rate", "best": 0, "worst": Infinity, "reverse": false,
        "get": (weapon) => weapon.weaponStats.fireRate,
    },
    "runSpeedMultiplier": {
        "displayName": "Run Speed Multiplier", "best": 0, "worst": Infinity, "reverse": false,
        "get": (weapon) => weapon.weaponStats.runSpeedMultiplier,
    },
    "firstBulletAccuracy": {
        "displayName": "First Bullet Accuracy", "best": 0, "worst": Infinity, "reverse": false,
        "get": (weapon) => weapon.weaponStats.firstBulletAccuracy,
    },
    "cost": {
        "displayName": "Cost", "best": 0, "worst": Infinity, "reverse": true,
        "get": (weapon) => weapon.shopData.cost,
    },
    "equipTimeSeconds": {
        "displayName": "Equip Time (s)", "best": 0, "worst": Infinity, "reverse": true,
        "get": (weapon) => weapon.weaponStats.equipTimeSeconds,
    },
    "reloadTimeSeconds": {
        "displayName": "Reload Time (s)", "best": 0, "worst": Infinity, "reverse": true,
        "get": (weapon) => weapon.weaponStats.reloadTimeSeconds,
    },
}

export const setBestAndWorstWeaponStats = (weapons) => {
    weapons.forEach((weapon) => {
        Object.values(stats).forEach((stat) => {
            if (stat.get(weapon) > stat.best) stat.best = stat.get(weapon);
            if (stat.get(weapon) < stat.worst) stat.worst = stat.get(weapon);
        });
    });
};

const bestPercent = (value, stat) => (((value - stat.worst) / (stat.best - stat.worst)) * 100);

const createWeaponStatTile = (stat, statValue) => {
    const weaponStat = document.createElement('div');
    weaponStat.classList.add('weapon-stat');

    const weaponStatName = document.createElement('div');
    weaponStatName.classList.add('weapon-stat-name');

    const weaponStatNameP = document.createElement('p');
    weaponStatNameP.innerText = stat.displayName;
    weaponStatName.appendChild(weaponStatNameP);

    const weaponStatValue = document.createElement('div');
    weaponStatValue.classList.add('weapon-stat-value');
    weaponStatValue.innerText = statValue;

    const weaponStatLvlLeft = document.createElement('div');
    weaponStatLvlLeft.classList.add('weapon-stat-lvl-left');
    weaponStatLvlLeft.innerText = stat.worst;

    const weaponStatLvl = document.createElement('div');
    weaponStatLvl.classList.add('weapon-stat-lvl');

    const weaponStatLvlMarker = document.createElement('div');
    weaponStatLvlMarker.style = 'width: ' + bestPercent(statValue, stat) + "%";
    weaponStatLvlMarker.classList.add('weapon-stat-lvl-marker');
    
    if (bestPercent(statValue, stat) < 50)
    {
        if(stat.reverse)
        {
            weaponStatLvlMarker.classList.add('good');
        }
        else 
        {
            weaponStatLvlMarker.classList.add('bad');
        }
    }
    else
    {
        if (stat.reverse) {
            weaponStatLvlMarker.classList.add('bad');
        }
        else
        {
            weaponStatLvlMarker.classList.add('good');
        }

    }


    const weaponStatLvlRight = document.createElement('div');
    weaponStatLvlRight.classList.add('weapon-stat-lvl-right');
    weaponStatLvlRight.innerText = stat.best;
    weaponStatLvl.appendChild(weaponStatLvlMarker);

    weaponStat.appendChild(weaponStatName);
    weaponStat.appendChild(weaponStatValue);
    weaponStat.appendChild(weaponStatLvlLeft);
    weaponStat.appendChild(weaponStatLvl);
    weaponStat.appendChild(weaponStatLvlRight);

    return weaponStat;
}

export const loadWeaponStats = (weapon) => {
    document.querySelector('.home-main').style = 'display: none';
    document.querySelector('.weapon-section').style = 'display: flex';

    const weaponImageDiv = document.createElement('div');
    const weaponImage = document.createElement('img');
    document.querySelector('.weapon-name > h1').innerText = weapon.displayName;
    document.querySelector('.weapon-image > img').src = weapon.displayIcon;

    const weaponName = document.createElement('div');
    const weaponNameH1 = document.createElement('h1');

    weaponNameH1.innerText = weapon.displayName;
    weaponName.appendChild(weaponNameH1);
    weaponImage.src = weapon.displayIcon;
    weaponImageDiv.appendChild(weaponImage);

    Object.values(stats).forEach((stat) => document.querySelector('.weapon-stats').appendChild(createWeaponStatTile(stat, stat.get(weapon))));
};
