<template>
  <div class="Body text-white mt-4">
    <Section>dl</Section>
  </div>
</template>

<script setup>
import { inject, onMounted } from 'vue'
import Section from '../section/Section.vue'
import useTemplateService from '../../services/useTemplateService.js'

const domain = inject('$domain')
const apiKey = inject('$apiKey')

const { getTemplate } = useTemplateService(domain, apiKey)

const loadTemplate = async (keyname) => {
  console.log('roge templateService ---->', keyname)
  try {
    const template = await getTemplate(keyname)
    const frames = JSON.parse(template.body)
    console.log('roge data ---->', frames)
  } catch (err) {
    console.error(err)
  }
}

onMounted(async () => {
  await loadTemplate('example-editor3')
})
</script>
