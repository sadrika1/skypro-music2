const API_URL = 'https://skypro-music-api.skyeng.tech/catalog/track/all/'

export async function getAllTracks() {
    const res = await fetch(API_URL)
    if (!res.ok) {
        throw new Error('Ошибка загрузки треков')
    } 
    return res.json()
}