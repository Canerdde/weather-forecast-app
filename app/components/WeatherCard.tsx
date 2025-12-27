'use client'

import { WeatherData } from '../types/weather'

interface WeatherCardProps {
  data: WeatherData['current']
}

export default function WeatherCard({ data }: WeatherCardProps) {
  const getWeatherIcon = (icon: string) => {
    return `https://openweathermap.org/img/wn/${icon}@2x.png`
  }

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp * 1000)
    const days = ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi']
    const months = [
      'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
      'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'
    ]
    return `${days[date.getDay()]}, ${date.getDate()} ${months[date.getMonth()]}`
  }

  const getWeatherBg = (main: string) => {
    const weatherMap: { [key: string]: string } = {
      'Clear': 'bg-gradient-to-br from-yellow-400 to-orange-500',
      'Clouds': 'bg-gradient-to-br from-gray-400 to-gray-600',
      'Rain': 'bg-gradient-to-br from-blue-400 to-blue-600',
      'Drizzle': 'bg-gradient-to-br from-blue-300 to-blue-500',
      'Thunderstorm': 'bg-gradient-to-br from-purple-600 to-indigo-800',
      'Snow': 'bg-gradient-to-br from-gray-100 to-blue-200',
      'Mist': 'bg-gradient-to-br from-gray-300 to-gray-400',
      'Fog': 'bg-gradient-to-br from-gray-300 to-gray-400',
    }
    return weatherMap[main] || 'bg-gradient-to-br from-gray-400 to-gray-600'
  }

  return (
    <div className={`${getWeatherBg(data.weather[0].main)} rounded-2xl p-6 sm:p-8 text-white shadow-2xl mb-8`}>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
        <div>
          <h2 className="text-3xl sm:text-4xl font-bold mb-2">{data.name}</h2>
          <p className="text-base sm:text-lg opacity-90">{formatDate(data.dt)}</p>
        </div>
        <img
          src={getWeatherIcon(data.weather[0].icon)}
          alt={data.weather[0].description}
          className="w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0"
        />
      </div>

      <div className="mb-6">
        <div className="text-5xl sm:text-7xl font-bold mb-2">{Math.round(data.main.temp)}°C</div>
        <p className="text-lg sm:text-xl capitalize">{data.weather[0].description}</p>
        <p className="text-base sm:text-lg opacity-90">
          Hissedilen: {Math.round(data.main.feels_like)}°C
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
        <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
          <p className="text-sm opacity-90 mb-1">Min/Max</p>
          <p className="text-xl font-semibold">
            {Math.round(data.main.temp_min)}° / {Math.round(data.main.temp_max)}°
          </p>
        </div>
        <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
          <p className="text-sm opacity-90 mb-1">Nem</p>
          <p className="text-xl font-semibold">{data.main.humidity}%</p>
        </div>
        <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
          <p className="text-sm opacity-90 mb-1">Rüzgar</p>
          <p className="text-xl font-semibold">{data.wind.speed} m/s</p>
        </div>
        <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
          <p className="text-sm opacity-90 mb-1">Basınç</p>
          <p className="text-xl font-semibold">{data.main.pressure} hPa</p>
        </div>
      </div>
    </div>
  )
}

