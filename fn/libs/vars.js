const LOCATIONS = /Pinar del Rio|La Habana|Artemisa|Mayabeque|Isla de la Juventud|Matanzas|Cienfuegos|Villa Clara|Santi Spiritus|Ciego de Ávila|Camagüey|Las Tunas|Holguín|Granma|Santiago de Cuba|Guatánamo/i;
const REPETITIONS = /(\W)\1{2,}/ig;

module.exports = {
    reLocations: LOCATIONS,
    reRepetition: REPETITIONS,
};