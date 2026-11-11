<script setup lang="ts">
const {t} = useI18n()
const {form, token, status, submit} = useContactForm()
const turnstile = ref()

const fields = [
  {id: 'name', type: 'text', autocomplete: 'name', required: true},
  {id: 'email', type: 'email', autocomplete: 'email', required: true},
  {id: 'phone', type: 'tel', autocomplete: 'tel', required: false},
] as const

const isSending = computed(() => status.value === 'sending')
const isSent = computed(() => status.value === 'success')
const hasResult = computed(() => isSent.value || status.value === 'error')

const handleSubmit = async () => {
  await submit()
  turnstile.value?.reset()
}
</script>

<template>
  <div>
    <form
        v-if="!isSent"
        class="contact-form"
        @submit.prevent="handleSubmit"
    >
      <div
          v-for="field in fields"
          :key="field.id"
          class="contact-form__field"
      >
        <label :for="`contact-${field.id}`">
          {{ t(`contact.form.${field.id}`) }}
        </label>

        <input
            :id="`contact-${field.id}`"
            v-model="form[field.id]"
            :name="field.id"
            :type="field.type"
            :autocomplete="field.autocomplete"
            :required="field.required"
        />
      </div>

      <div class="contact-form__field">
        <label for="contact-message">
          {{ t('contact.form.message') }}
        </label>

        <textarea
            id="contact-message"
            v-model="form.message"
            name="message"
            rows="6"
            required
        />
      </div>

      <NuxtTurnstile ref="turnstile" v-model="token"/>

      <button
          class="contact-form__submit"
          type="submit"
          :disabled="isSending || !token"
      >
        {{ t(isSending ? 'contact.form.sending' : 'contact.form.submit') }}
      </button>
    </form>

    <p
        role="status"
        :class="['contact-form__status', `contact-form__status--${status}`]"
    >
      <template v-if="hasResult">
        {{ t(`contact.form.${status}`) }}
      </template>
    </p>
  </div>
</template>