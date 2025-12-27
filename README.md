# Hava Durumu Uygulaması

Modern ve kullanıcı dostu bir hava durumu uygulaması. Next.js 14, TypeScript ve Tailwind CSS kullanılarak geliştirilmiştir.

## Özellikler

- 🌡️ **Anlık Hava Durumu**: Girdiğiniz şehir için gerçek zamanlı hava durumu bilgileri
- 📅 **5 Günlük Tahmin**: Detaylı 5 günlük hava durumu tahminleri
- 🎨 **Modern Tasarım**: Minimal ve mobil uyumlu arayüz
- 🌈 **Dinamik İkonlar**: Hava durumuna göre değişen görsel gösterimler
- ⚡ **Hızlı ve Performanslı**: Next.js ile optimize edilmiş performans

## Teknolojiler

- **Next.js 14** - React framework
- **TypeScript** - Tip güvenliği
- **Tailwind CSS** - Modern CSS framework
- **OpenWeatherMap API** - Hava durumu verileri

## Kurulum

1. Bağımlılıkları yükleyin:
```bash
npm install
```

2. Geliştirme sunucusunu başlatın:
```bash
npm run dev
```

3. Tarayıcınızda [http://localhost:3000](http://localhost:3000) adresini açın

## API Key Kurulumu

Uygulama OpenWeatherMap API kullanmaktadır. API key'i `.env.local` dosyasında tanımlamanız gerekir:

1. Proje kök dizininde `.env.local` dosyası oluşturun
2. Aşağıdaki satırı ekleyin (kendi API key'inizi kullanın):

```env
OPENWEATHER_API_KEY=your_api_key_here
```

API key'i [OpenWeatherMap](https://home.openweathermap.org/api_keys) adresinden alabilirsiniz.

## Kullanım

1. Ana sayfada şehir adını girin
2. "Ara" butonuna tıklayın
3. Anlık hava durumu ve 5 günlük tahmin bilgilerini görüntüleyin

## Proje Yapısı

```
├── app/
│   ├── api/
│   │   └── weather/
│   │       └── route.ts      # API endpoint
│   ├── components/
│   │   ├── WeatherCard.tsx   # Anlık hava durumu kartı
│   │   └── ForecastCard.tsx  # 5 günlük tahmin kartı
│   ├── types/
│   │   └── weather.ts        # TypeScript tipleri
│   ├── globals.css           # Global stiller
│   ├── layout.tsx            # Root layout
│   └── page.tsx              # Ana sayfa
├── package.json
├── tailwind.config.js
└── tsconfig.json
```

## Lisans

Bu proje eğitim ve portföy amaçlı geliştirilmiştir.

