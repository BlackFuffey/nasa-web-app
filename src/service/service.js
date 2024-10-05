let data;

const Services = {
    // preload all data
    preLoad: async () => {
        data = {
            comets: (await fetch("/data/comets.json")).json(),
            planets: (await fetch("/data/planets.json")).json(),
        }
    },

    getCometConst: () => data.comets,

    getPlanetConst: () => data.planets

}

export default Services;
