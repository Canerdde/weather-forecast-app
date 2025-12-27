export interface WeatherData {
  current: {
    name: string
    main: {
      temp: number
      feels_like: number
      temp_min: number
      temp_max: number
      humidity: number
      pressure: number
    }
    weather: Array<{
      main: string
      description: string
      icon: string
    }>
    wind: {
      speed: number
    }
    visibility: number
    dt: number
  }
  forecast: {
    list: Array<{
      dt: number
      main: {
        temp: number
        temp_min: number
        temp_max: number
        humidity: number
      }
      weather: Array<{
        main: string
        description: string
        icon: string
      }>
      wind: {
        speed: number
      }
      dt_txt: string
    }>
  }
}

