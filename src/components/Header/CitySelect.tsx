import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {AppDispatch, RootState} from "../../app/store.tsx";
import {City, setCities, setCity} from "../../features/citySlice.ts";
import {fetchCities} from "../../api/city.ts";

export function CitySelect() {
  const dispatch = useDispatch<AppDispatch>()
  const { cities, selected } = useSelector((s: RootState) => s.city)

  useEffect(() => {
    fetchCities()
        .then((data: City[]) => {
          dispatch(setCities(data))
          const savedId = Number(localStorage.getItem('cityId'))
          const initial = data.find((c) => c.id === savedId) || data[0]
          dispatch(setCity(initial))
        })
        .catch((err) => {
          console.error('Ошибка загрузки городов', err)
        })
  }, [dispatch])

  return (
      <select
          value={selected?.id ?? ''}
          onChange={(e) => {
            const cityId = Number(e.target.value)
            const city = cities.find((c) => c.id === cityId)
            if (city) dispatch(setCity(city))
          }}
      >
        {cities.map((c: City) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
        ))}
      </select>
  )
}
