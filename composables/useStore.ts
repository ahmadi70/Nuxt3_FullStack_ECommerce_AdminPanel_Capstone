import type { APIError } from "~/types"
import { useToast } from "~/components/ui/toast/use-toast"

interface State {
  isLoading: boolean
  appError: APIError | null
  isAlertPopupVisible: boolean
}

const state = reactive<State>({
  isLoading: false,
  appError: null,
  isAlertPopupVisible: false
})

export default () => {
  const { isLoading, appError, isAlertPopupVisible } = toRefs(state)
  const { toast } = useToast()

  const toggleLoading = (value: boolean) => {
    state.isLoading = value
  }

  const toggleAlertPopup = (value: boolean) => {
    state.isAlertPopupVisible = value
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
    showMessage,
    isAlertPopupVisible,
    toggleAlertPopup
  }
}