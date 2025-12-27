'use client'

import { useState, useEffect } from 'react'
import WeatherCard from './components/WeatherCard'
import ForecastCard from './components/ForecastCard'
import { WeatherData } from './types/weather'

// Popüler şehirler listesi
const POPULAR_CITIES = [
  'İstanbul', 'Ankara', 'İzmir', 'Bursa', 'Antalya', 
  'London', 'Paris', 'Berlin', 'New York', 'Tokyo'
]

export default function Home() {
  const [city, setCity] = useState('')
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [favoriteCities, setFavoriteCities] = useState<string[]>([])

  // Favori şehirleri localStorage'dan yükle
  useEffect(() => {
    const saved = localStorage.getItem('favoriteCities')
    if (saved) {
      try {
        setFavoriteCities(JSON.parse(saved))
      } catch (e) {
        console.error('Error loading favorite cities:', e)
      }
    }
  }, [])

  // Favori şehirleri localStorage'a kaydet
  const saveFavoriteCities = (cities: string[]) => {
    localStorage.setItem('favoriteCities', JSON.stringify(cities))
    setFavoriteCities(cities)
  }

  const fetchWeather = async () => {
    if (!city.trim()) {
      setError('Lütfen bir şehir adı girin')
      return
    }

    setLoading(true)
    setError(null)

    try {
      const response = await fetch(`/api/weather?city=${encodeURIComponent(city)}`)
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Bir hata oluştu')
      }

      setWeatherData(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Hava durumu bilgileri alınamadı')
      setWeatherData(null)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    fetchWeather()
  }

  const handleCityClick = async (cityName: string) => {
    setCity(cityName)
    setLoading(true)
    setError(null)

    try {
      const response = await fetch(`/api/weather?city=${encodeURIComponent(cityName)}`)
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Bir hata oluştu')
      }

      setWeatherData(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Hava durumu bilgileri alınamadı')
      setWeatherData(null)
    } finally {
      setLoading(false)
    }
  }

  const toggleFavorite = (cityName: string, e: React.MouseEvent) => {
    e.stopPropagation()
    const newFavorites = favoriteCities.includes(cityName)
      ? favoriteCities.filter(c => c !== cityName)
      : [...favoriteCities, cityName]
    saveFavoriteCities(newFavorites)
  }

  const isFavorite = (cityName: string) => favoriteCities.includes(cityName)

  return (
    <main className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-white mb-4 drop-shadow-lg">
            Hava Durumu
          </h1>
          <p className="text-white/90 text-lg">
            Şehir adını girerek anlık hava durumu bilgilerini öğrenin
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mb-6">
          <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Şehir adı girin (örn: İstanbul, Ankara, London)"
              className="flex-1 px-6 py-4 rounded-xl bg-white/20 backdrop-blur-md border-2 border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent text-base sm:text-lg"
            />
            <button
              type="submit"
              disabled={loading}
              className="px-8 py-4 bg-white text-purple-600 rounded-xl font-semibold hover:bg-white/90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl text-base sm:text-lg"
            >
              {loading ? 'Yükleniyor...' : 'Ara'}
            </button>
          </div>
        </form>

        {/* Popüler Şehirler */}
        <div className="mb-6 max-w-2xl mx-auto">
          <p className="text-white/80 text-sm mb-3 font-medium">Popüler Şehirler:</p>
          <div className="flex flex-wrap gap-2 justify-center">
            {POPULAR_CITIES.map((cityName) => (
              <button
                key={cityName}
                onClick={() => handleCityClick(cityName)}
                className="px-4 py-2 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-lg text-white text-sm font-medium transition-all duration-300 hover:scale-105 border border-white/20"
              >
                {cityName}
              </button>
            ))}
          </div>
        </div>

        {/* Favori Şehirler */}
        {favoriteCities.length > 0 && (
          <div className="mb-6 max-w-2xl mx-auto">
            <p className="text-white/80 text-sm mb-3 font-medium">Favori Şehirlerim:</p>
            <div className="flex flex-wrap gap-2 justify-center">
              {favoriteCities.map((cityName) => (
                <div key={cityName} className="relative group">
                  <button
                    onClick={() => handleCityClick(cityName)}
                    className="px-4 py-2 bg-yellow-500/30 hover:bg-yellow-500/40 backdrop-blur-md rounded-lg text-white text-sm font-medium transition-all duration-300 hover:scale-105 border border-yellow-400/30 flex items-center gap-2"
                  >
                    <span>⭐</span>
                    {cityName}
                  </button>
                  <button
                    onClick={(e) => toggleFavorite(cityName, e)}
                    className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                    title="Favorilerden kaldır"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {error && (
          <div className="max-w-2xl mx-auto mb-8 bg-red-500/20 backdrop-blur-md border-2 border-red-400/50 rounded-xl p-4 text-white">
            <p className="text-center">{error}</p>
          </div>
        )}

        {weatherData && (
          <div className="space-y-8 animate-fadeIn">
            <div className="relative">
              <WeatherCard data={weatherData.current} />
              <button
                onClick={(e) => toggleFavorite(weatherData.current.name, e)}
                className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-full p-3 text-white transition-all duration-300 hover:scale-110 border border-white/20"
                title={isFavorite(weatherData.current.name) ? 'Favorilerden kaldır' : 'Favorilere ekle'}
              >
                {isFavorite(weatherData.current.name) ? (
                  <svg className="w-6 h-6 fill-yellow-400" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                ) : (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                )}
              </button>
            </div>
            <ForecastCard data={weatherData.forecast} />
          </div>
        )}

        {!weatherData && !loading && !error && (
          <div className="text-center mt-16">
            <div className="inline-block p-8 bg-white/10 backdrop-blur-md rounded-2xl">
              <svg
                className="w-24 h-24 mx-auto text-white/50 mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
                />
              </svg>
              <p className="text-white/70 text-lg">
                Hava durumu bilgilerini görmek için bir şehir arayın
              </p>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
    </main>
  )
}

