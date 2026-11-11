type ContactStatus = 'idle' | 'sending' | 'success' | 'error'

const emptyForm = () => ({
    name: '',
    email: '',
    phone: '',
    message: '',
})

export const useContactForm = () => {
    const {public: {contactApiUrl}} = useRuntimeConfig()

    const form = reactive(emptyForm())
    const token = ref('')
    const status = ref<ContactStatus>('idle')

    const submit = async () => {
        status.value = 'sending'

        try {
            // @ts-ignore
            await $fetch('/form/contact', {
                baseURL: contactApiUrl,
                method: 'POST',
                body: {...form, cloudflareTurnstileResponses: token.value},
            })
            Object.assign(form, emptyForm())
            status.value = 'success'
        } catch {
            status.value = 'error'
        } finally {
            token.value = ''
        }
    }

    return {form, token, status, submit}
}