import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router-dom'
import { toast } from 'sonner'
import { twMerge } from 'tailwind-merge'
import { z } from 'zod'

import { signIn } from '@/api/sign-in'
import { Button, buttonVariants } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const signInSchema = z.object({
  email: z.string().email(),
})

type SignInSchema = z.infer<typeof signInSchema>

export function SignIn() {
  const [searchParams] = useSearchParams()

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SignInSchema>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: searchParams.get('email') ?? '',
    },
  })

  const { mutateAsync: authenticate } = useMutation({
    mutationFn: signIn,
  })

  async function handleAuthenticate({ email }: SignInSchema) {
    try {
      await authenticate({ email })

      if (email !== 'demo@vilmarbatista.com.br') {
        toast.success('Enviamos um link de autenticação para seu e-mail.', {
          action: {
            label: 'Reenviar',
            onClick: () => authenticate({ email }),
          },
        })
      }
    } catch (err) {
      toast.error('Credenciais inválidas')
    }
  }

  return (
    <div className="flex w-full flex-1 flex-col justify-between">
      <a
        href="/sign-up"
        className={twMerge(
          buttonVariants({ variant: 'ghost' }),
          'absolute right-2 top-4',
        )}
      >
        Novo estabelecimento
      </a>

      <div className="mx-auto flex w-[350px] flex-1 flex-col items-center justify-center">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Acessar painel
          </h1>
          <p className="text-sm text-muted-foreground">
            Acompanhe suas vendas pelo painel do parceiro!
          </p>
        </div>

        <div className="w-full gap-6">
          <form onSubmit={handleSubmit(handleAuthenticate)}>
            <div className="grid gap-4">
              <div className="mt-4 grid gap-2">
                <Label htmlFor="email">Seu e-mail</Label>
                <Input
                  id="email"
                  type="email"
                  autoCapitalize="none"
                  autoComplete="email"
                  autoCorrect="off"
                  {...register('email')}
                />
              </div>

              <Button type="submit" disabled={isSubmitting}>
                Acessar painel
              </Button>
            </div>
          </form>
        </div>
      </div>

      <div>
        <footer className="pb-4 pr-4 text-right text-sm">
          Painel do parceiro &copy; pizza.shop - {new Date().getFullYear()}
        </footer>
      </div>
    </div>
  )
}
