'use client'

import * as React from 'react'
import axios from 'axios'
import { debounce } from 'lodash'

import { Check, ChevronsUpDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '../components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '../components/ui/popover'
import { Button } from '../components/ui/button'

export type Plant = {
  id: number
  common_name: string
  sunlight: string[]
  watering: string
  cycle: string
}

const API_KEY = ''

export function PlantCombobox({onSelectPlant,}: {onSelectPlant: (plant: Plant) => void}) {
  const [open, setOpen] = React.useState(false)
  const [selectedPlant, setSelectedPlant] = React.useState<string | null>(null)
  const [plants, setPlants] = React.useState<Plant[]>([])
  const [searchTerm, setSearchTerm] = React.useState('')

  const fetchPlants = React.useCallback(
    debounce(async (query: string) => {
      console.log('Query recebida:', `"${query}"`)
      if (!query.trim()) return;
      try {
        const res = await axios.get(
          `https://perenual.com/api/species-list?key=${API_KEY}&q=${query}&page=1`
        )
        const data = res.data.data.map((plant: any) => ({
          id: plant.id,
          common_name: plant.common_name || 'Nome desconhecido',
          sunlight: plant.sunlight || [],
          watering: plant.watering || 'unknown',
          cycle: plant.cycle || 'unknown',
        }))
        setPlants(data)
      } catch (err) {
        console.error('Erro ao buscar plantas:', err)
      }
    }, 500),
    []
  )

  React.useEffect(() => {
    if (searchTerm) {
      fetchPlants(searchTerm)
    }
  }, [searchTerm, fetchPlants])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[300px] justify-between"
        >
          {selectedPlant
            ? plants.find((plant) => plant.common_name === selectedPlant)?.common_name
            : 'Selecione uma planta...'}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0">
        <Command>
          <CommandInput
            placeholder="Buscar planta..."
            onValueChange={(value) => setSearchTerm(value)}
          />
          <CommandEmpty>Nenhuma planta encontrada.</CommandEmpty>
          <CommandGroup>
            {plants.map((plant) => (
              <CommandItem
                key={plant.id}
                value={plant.common_name}
                onSelect={() => {
                  setSelectedPlant(plant.common_name)
                  onSelectPlant(plant)
                  setOpen(false)
                }}
              >
                <Check
                  className={cn(
                    'mr-2 h-4 w-4',
                    selectedPlant === plant.common_name ? 'opacity-100' : 'opacity-0'
                  )}
                />
                {plant.common_name}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export default PlantCombobox