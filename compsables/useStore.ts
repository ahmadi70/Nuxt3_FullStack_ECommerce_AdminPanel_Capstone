import type { APIError } from "~/types"
import { useToast } from "~/components/ui/toast/use-toast"

interface State {
  isLoading: boolean
  appError: APIError | null
}

const state = reactive<State>({
  isLoading: false,
  appError: null
})

export default () => {
  const { isLoading, appError } = toRefs(state)
  const { toast } = useToast()

  const toggleLoading = (value: boolean) => {
    state.isLoading = value
  }

  const toggleError = (error: null | APIError) => {
    state.appError = error
  }

  const showError = (error: APIError) => {
    toast({
      variant: 'destructive',
      title: error.statusCode + '',
      description: error.message ? error.message : error.statusMessage
    })
  }

  const showMessage = (content: {
    title: string,
    description?: string,
    variant?: 'destructive' | 'default' | null | undefined
  }) => {
    toast({
      variant: content.variant,
      title: content.title,
      description: content.description
    })
  }

  return {
    isLoading,
    appError,
    toggleLoading,
    toggleError,
    showError,
    showMessage
  }
}