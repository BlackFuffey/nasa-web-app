
let comets;



const services = {
    // preload all data
    preLoad: async () => {
        comets = (await fetch("/data/comets.json")).json();
    },

    getCometData: () => comets

}

export default services;
