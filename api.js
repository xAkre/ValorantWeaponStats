const BASE_URL = 'https://valorant-api.com/v1/';

export const getWeapons = async () => {
    const response = await fetch(BASE_URL + 'weapons');
    const data = await response.json();
    data.data.pop();
    return data.data;
};

export const getAgents = async () => {
    const response = await fetch(BASE_URL + 'agents?isPlayableCharacter=true');
    const data = await response.json();
    return data.data;
};
