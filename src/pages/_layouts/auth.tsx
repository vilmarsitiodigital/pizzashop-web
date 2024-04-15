import Autoplay from 'embla-carousel-autoplay'
import { CheckCircle, Pizza, Rocket, Settings } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Outlet } from 'react-router-dom'

import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel'

export function AuthLayout() {
  const plugin = useRef(
    Autoplay({
      delay: 4000,
    }),
  )

  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  useEffect(() => {
    if (!api) {
      return
    }

    setCurrent(api.selectedScrollSnap() + 1)

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])

  return (
    <div className="container min-h-screen max-w-none flex-col items-center justify-center px-0 antialiased lg:grid lg:grid-cols-2">
      <div className="relative hidden h-full flex-col border-r border-foreground/5 bg-muted p-10 text-muted-foreground dark:border-r lg:flex">
        <div className="flex items-center gap-3 text-lg font-medium text-foreground">
          <Pizza className="h-5 w-5" />
          <span className="font-semibold">pizza.shop</span>
        </div>
        <Carousel
          setApi={setApi}
          plugins={[plugin.current]}
          className="mx-auto my-auto w-full"
        >
          <CarouselContent>
            <CarouselItem>
              <div className="flex flex-col items-center justify-center gap-3">
                <Settings color="red" className="h-20 w-20" />
                <h1 className="text-2xl font-semibold tracking-tight">
                  Customizável
                </h1>
                <p className="w-[350px] text-center">
                  Trabalhar com um painel customizável é essencial para o
                  gerenciamento de conteúdo.
                </p>
              </div>
            </CarouselItem>
            <CarouselItem>
              <div className="flex flex-col items-center justify-center gap-3">
                <CheckCircle color="red" className="h-20 w-20" />
                <h1 className="text-2xl font-semibold tracking-tight">
                  Descomplicado
                </h1>
                <p className="w-[350px] text-center">
                  Simplifique tarefas complexas para uma experiência de usuário
                  descomplicada.
                </p>
              </div>
            </CarouselItem>
            <CarouselItem>
              <div className="flex flex-col items-center justify-center gap-3">
                <Rocket color="red" className="h-20 w-20" />
                <h1 className="text-2xl font-semibold tracking-tight">Ágil</h1>
                <p className="w-[350px] text-center">
                  Nosso painel permite ações ágeis e gerenciamento eficaz para
                  sua produtividade.
                </p>
              </div>
            </CarouselItem>
          </CarouselContent>
          <div className="w-full py-8">
            <div className="flex flex-row justify-center gap-3">
              <button
                onClick={() => api?.scrollTo(0)}
                className={`block h-2 rounded-full ${
                  current === 1 ? 'w-8 bg-red-600' : 'w-2 dark:bg-gray-100'
                }`}
              ></button>
              <button
                onClick={() => api?.scrollTo(1)}
                className={`block h-2 w-2 rounded-full ${
                  current === 2 ? 'w-8 bg-red-600' : 'w-2 dark:bg-gray-100'
                }`}
              ></button>
              <button
                onClick={() => api?.scrollTo(2)}
                className={`block h-2 w-2 rounded-full ${
                  current === 3 ? 'w-8 bg-red-600' : 'w-2 dark:bg-gray-100'
                }`}
              ></button>
            </div>
          </div>
        </Carousel>
      </div>

      <div className="relative flex min-h-screen flex-col items-center justify-center">
        <Outlet />
      </div>
    </div>
  )
}
