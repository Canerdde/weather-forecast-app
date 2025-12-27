import { NextRequest, NextResponse } from 'next/server'

const BASE_URL = 'https://api.openweathermap.org/data/2.5'

export async function GET(request: NextRequest) {
  const API_KEY = process.env.OPENWEATHER_API_KEY

  // API key kontrolü
  if (!API_KEY) {
    console.error('OPENWEATHER_API_KEY environment variable is not set')
    return NextResponse.json(
      { error: 'API anahtarı yapılandırılmamış. Lütfen .env.local dosyasını kontrol edin ve sunucuyu yeniden başlatın.' },
      { status: 500 }
    )
  }

  const searchParams = request.nextUrl.searchParams
  const city = searchParams.get('city')

  if (!city) {
    return NextResponse.json(
      { error: 'Şehir adı gereklidir' },
      { status: 400 }
    )
  }

  try {
    // Anlık hava durumu
    const currentUrl = `${BASE_URL}/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric&lang=tr`
    const currentResponse = await fetch(currentUrl)

    if (!currentResponse.ok) {
      const errorData = await currentResponse.json().catch(() => ({}))
      const errorMessage = errorData.message || 'Bilinmeyen hata'
      
      console.error('OpenWeatherMap API Error:', {
        status: currentResponse.status,
        statusText: currentResponse.statusText,
        message: errorMessage,
        url: currentUrl.replace(API_KEY, 'HIDDEN')
      })

      if (currentResponse.status === 401) {
        return NextResponse.json(
          { error: 'API anahtarı geçersiz. Lütfen API anahtarınızı kontrol edin.' },
          { status: 401 }
        )
      }
      
      if (currentResponse.status === 404) {
        return NextResponse.json(
          { error: 'Şehir bulunamadı. Lütfen şehir adını kontrol edin.' },
          { status: 404 }
        )
      }

      if (currentResponse.status === 429) {
        return NextResponse.json(
          { error: 'Çok fazla istek yapıldı. Lütfen daha sonra tekrar deneyin.' },
          { status: 429 }
        )
      }

      return NextResponse.json(
        { error: `API hatası: ${errorMessage}` },
        { status: currentResponse.status }
      )
    }

    const currentData = await currentResponse.json()

    // 5 günlük tahmin
    const forecastUrl = `${BASE_URL}/forecast?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric&lang=tr`
    const forecastResponse = await fetch(forecastUrl)

    if (!forecastResponse.ok) {
      const errorData = await forecastResponse.json().catch(() => ({}))
      const errorMessage = errorData.message || 'Tahmin bilgisi alınamadı'
      
      console.error('OpenWeatherMap Forecast API Error:', {
        status: forecastResponse.status,
        statusText: forecastResponse.statusText,
        message: errorMessage
      })

      // Eğer current data varsa, sadece forecast'i atlayabiliriz
      // Ama şimdilik hata döndürelim
      return NextResponse.json(
        { error: `Tahmin hatası: ${errorMessage}` },
        { status: forecastResponse.status }
      )
    }

    const forecastData = await forecastResponse.json()

    // Veriyi frontend'in beklediği formata dönüştür
    return NextResponse.json({
      current: {
        name: currentData.name,
        main: currentData.main,
        weather: currentData.weather,
        wind: currentData.wind,
        visibility: currentData.visibility,
        dt: currentData.dt,
      },
      forecast: {
        list: forecastData.list,
      },
    })
  } catch (error) {
    console.error('Weather API Error:', error)
    const errorMessage = error instanceof Error ? error.message : 'Bilinmeyen hata'
    return NextResponse.json(
      { error: `Hava durumu bilgileri alınamadı: ${errorMessage}` },
      { status: 500 }
    )
  }
}

