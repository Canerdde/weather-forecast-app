'use client'

import { WeatherData } from '../types/weather'

interface ForecastCardProps {
  data: WeatherData['forecast']
}

export default function ForecastCard({ data }: ForecastCardProps) {
  const getWeatherIcon = (icon: string) => {
    return `https://openweathermap.org/img/wn/${icon}@2x.png`
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const days = ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi']
    const months = [
      'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
      'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'
    ]
    return {
      day: days[date.getDay()],
      date: `${date.getDate()} ${months[date.getMonth()]}`,
      time: `${date.getHours()}:00`
    }
  }

  // Günlük tahminleri grupla ve her günün gerçek min/max değerlerini hesapla
  const groupByDay = (list: typeof data.list) => {
    const grouped: { [key: string]: typeof data.list } = {}
    
    list.forEach((item) => {
      const date = new Date(item.dt_txt)
      const dayKey = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
      
      if (!grouped[dayKey]) {
        grouped[dayKey] = []
      }
      grouped[dayKey].push(item)
    })
    
    return Object.values(grouped)
      .slice(0, 5)
      .map((dayItems) => {
        // Günün min ve max sıcaklıklarını hesapla
        const temps = dayItems.map(item => item.main.temp)
        const minTemps = dayItems.map(item => item.main.temp_min)
        const maxTemps = dayItems.map(item => item.main.temp_max)
        
        const minTemp = Math.min(...minTemps)
        const maxTemp = Math.max(...maxTemps)
        
        // Günün ortasındaki bir item'ı temsilci olarak al (günün durumunu gösterir)
        const representativeIndex = Math.floor(dayItems.length / 2)
        const representative = dayItems[representativeIndex]
        
        return {
          ...representative,
          main: {
            ...representative.main,
            temp_min: minTemp,
            temp_max: maxTemp,
          }
        }
      })
  }

  const dailyForecasts = groupByDay(data.list)

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-xl">
      <h3 className="text-2xl font-bold text-white mb-6">5 Günlük Tahmin</h3>
      <div className="space-y-4">
        {dailyForecasts.map((item) => {
          const dateInfo = formatDate(item.dt_txt)
          return (
            <div
              key={item.dt}
              className="bg-white/20 backdrop-blur-sm rounded-lg p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 hover:bg-white/30 transition-all duration-300"
            >
              <div className="flex items-center gap-4 flex-1 w-full md:w-auto">
                <div className="text-white min-w-[100px]">
                  <p className="font-semibold">{dateInfo.day}</p>
                  <p className="text-sm opacity-80">{dateInfo.date}</p>
                </div>
                <img
                  src={getWeatherIcon(item.weather[0].icon)}
                  alt={item.weather[0].description}
                  className="w-16 h-16 flex-shrink-0"
                />
                <div className="text-white flex-1">
                  <p className="capitalize font-medium">{item.weather[0].description}</p>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 mt-1 text-sm">
                    <span>Nem: {item.main.humidity}%</span>
                    <span>Rüzgar: {item.wind.speed} m/s</span>
                  </div>
                </div>
              </div>
              <div className="text-white text-left md:text-right w-full md:w-auto">
                <p className="text-2xl font-bold">{Math.round(item.main.temp)}°C</p>
                <p className="text-sm opacity-80">
                  {Math.round(item.main.temp_min)}° / {Math.round(item.main.temp_max)}°
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

