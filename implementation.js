async function get_geocode(params, userSettings) {

    const { location, language = 'en' } = params;
    const { count = 5 } = userSettings;
    const locationParts = location.split(',').map(part => part.trim());
    const cityName = locationParts[0];
    const geocodeApiUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cityName)}&count=${count}&language=${language}&format=json`;

    try {
        const geocodeResponse = await fetch(geocodeApiUrl);
        const geocodeData = await geocodeResponse.json();
        if (!geocodeData.results || geocodeData.results.length === 0) {
            console.error('No location found');
            return { error: 'No location found' };
        }
        return geocodeData
    } catch (error) {
        console.error('Error:', error.message);
        return { error: error.message };
    }
}