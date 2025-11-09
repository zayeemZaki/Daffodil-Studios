<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white relative">
    <!-- Background Pattern -->
    <UiBackgroundPattern>
      <!-- Hero Section -->
      <section class="relative pb-16">
        <div class="container mx-auto px-6">
          <UiSectionHeader 
            title="About Daffodil Studios" 
            subtitle="We are passionate storytellers dedicated to bringing important narratives to audiences worldwide through powerful documentary filmmaking."
            size="lg"
          />
        </div>
      </section>

      <!-- About Content -->
      <section class="relative pb-16">
        <div class="container mx-auto px-6">
          <div class="max-w-4xl mx-auto">
            <div class="glass-card rounded-2xl p-8 md:p-12 mb-16">
              <h2 class="text-3xl font-bold text-brand-gradient mb-6">Our Mission</h2>
              <p class="text-lg text-gray-300 leading-relaxed mb-6">
                Daffodil Studios is committed to creating documentaries that shed light on untold stories and 
                amplify voices that need to be heard. Through our films, we strive to educate, inspire, and 
                foster meaningful dialogue about important social and cultural issues.
              </p>
              <p class="text-lg text-gray-300 leading-relaxed">
                Our work spans diverse topics and regions, always with a focus on authenticity, depth, and 
                respect for the communities and individuals whose stories we tell.
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- Contact Form Section -->
      <section class="relative pb-24">
        <div class="container mx-auto px-6">
          <div class="max-w-4xl mx-auto">
            <div class="text-center mb-12">
              <h2 class="text-4xl font-bold text-brand-gradient mb-4">Get In Touch</h2>
              <p class="text-xl text-gray-300">
                Request a screening or send us a message
              </p>
            </div>

            <div class="glass-card rounded-2xl p-8 md:p-12">
              <form @submit.prevent="handleSubmit" class="space-y-6">
                <!-- Name -->
                <div>
                  <label for="name" class="block text-sm font-semibold text-gray-300 mb-2">
                    Name *
                  </label>
                  <input
                    id="name"
                    v-model="formData.name"
                    type="text"
                    required
                    class="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 text-white placeholder-gray-400 focus:ring-2 focus:ring-brand-yellow/50 focus:border-brand-yellow transition-all duration-300"
                    placeholder="Your name"
                  >
                </div>

                <!-- Email -->
                <div>
                  <label for="email" class="block text-sm font-semibold text-gray-300 mb-2">
                    Email *
                  </label>
                  <input
                    id="email"
                    v-model="formData.email"
                    type="email"
                    required
                    class="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 text-white placeholder-gray-400 focus:ring-2 focus:ring-brand-yellow/50 focus:border-brand-yellow transition-all duration-300"
                    placeholder="your.email@example.com"
                  >
                </div>

                <!-- Subject -->
                <div>
                  <label for="subject" class="block text-sm font-semibold text-gray-300 mb-2">
                    Subject *
                  </label>
                  <select
                    id="subject"
                    v-model="formData.subject"
                    required
                    class="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 text-white focus:ring-2 focus:ring-brand-yellow/50 focus:border-brand-yellow transition-all duration-300 appearance-none cursor-pointer"
                  >
                    <option value="" disabled class="bg-gray-800">Select a subject</option>
                    <option value="screening-request" class="bg-gray-800">Request a Screening</option>
                    <option value="general-inquiry" class="bg-gray-800">General Inquiry</option>
                    <option value="partnership" class="bg-gray-800">Partnership Opportunity</option>
                    <option value="press" class="bg-gray-800">Press/Media</option>
                    <option value="other" class="bg-gray-800">Other</option>
                  </select>
                </div>

                <!-- Organization (Optional for screening requests) -->
                <div v-if="formData.subject === 'screening-request'">
                  <label for="organization" class="block text-sm font-semibold text-gray-300 mb-2">
                    Organization/Venue
                  </label>
                  <input
                    id="organization"
                    v-model="formData.organization"
                    type="text"
                    class="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 text-white placeholder-gray-400 focus:ring-2 focus:ring-brand-yellow/50 focus:border-brand-yellow transition-all duration-300"
                    placeholder="Your organization or venue name"
                  >
                </div>

                <!-- Message -->
                <div>
                  <label for="message" class="block text-sm font-semibold text-gray-300 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    v-model="formData.message"
                    required
                    rows="6"
                    class="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 text-white placeholder-gray-400 focus:ring-2 focus:ring-brand-yellow/50 focus:border-brand-yellow transition-all duration-300 resize-none"
                    placeholder="Tell us about your screening request or inquiry..."
                  ></textarea>
                </div>

                <!-- Submit Button -->
                <div class="flex justify-center pt-4">
                  <button
                    type="submit"
                    :disabled="isSubmitting"
                    class="bg-gradient-to-br from-brand-yellow via-brand-yellow-light to-brand-yellow text-gray-900 px-12 py-4 rounded-full text-lg font-bold hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-glow-yellow disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {{ isSubmitting ? 'Sending...' : 'Send Message' }}
                  </button>
                </div>

                <!-- Success/Error Message -->
                <div v-if="submitMessage" class="text-center mt-4">
                  <p :class="submitSuccess ? 'text-green-400' : 'text-red-400'" class="text-lg">
                    {{ submitMessage }}
                  </p>
                </div>
              </form>
            </div>

            <!-- Contact Info -->
            <div class="text-center mt-12">
              <p class="text-gray-300 text-lg">
                Or email us directly at 
                <a href="mailto:contact@daffodilstudios.org" class="text-brand-yellow hover:text-brand-yellow-light transition-colors font-bold">
                  contact@daffodilstudios.org
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </UiBackgroundPattern>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'

interface FormData {
  name: string
  email: string
  subject: string
  organization: string
  message: string
}

const formData = reactive<FormData>({
  name: '',
  email: '',
  subject: '',
  organization: '',
  message: ''
})

const isSubmitting = ref(false)
const submitMessage = ref('')
const submitSuccess = ref(false)

const handleSubmit = async () => {
  isSubmitting.value = true
  submitMessage.value = ''
  submitSuccess.value = false
  
  try {
    // Send form data to API endpoint
    const response = await $fetch('/api/contact', {
      method: 'POST',
      body: {
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        organization: formData.organization,
        message: formData.message
      }
    })

    if (response.success) {
      submitMessage.value = response.message || 'Thank you! Your message has been sent successfully. We\'ll get back to you soon.'
      submitSuccess.value = true
      
      // Reset form after successful submission
      setTimeout(() => {
        formData.name = ''
        formData.email = ''
        formData.subject = ''
        formData.organization = ''
        formData.message = ''
        submitMessage.value = ''
      }, 5000)
    }
  } catch (error: any) {
    console.error('Form submission error:', error)
    submitMessage.value = error.data?.message || 'Sorry, there was an error sending your message. Please email us directly at contact@daffodilstudios.org'
    submitSuccess.value = false
  } finally {
    isSubmitting.value = false
  }
}
</script>
