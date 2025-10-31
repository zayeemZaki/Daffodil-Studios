<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white relative">
    <!-- Background Pattern -->
    <UiBackgroundPattern>
      <!-- Hero Section -->
      <section class="relative pb-16">
        <div class="container mx-auto px-6">
          <UiSectionHeader 
            title="Press & Media Coverage" 
            subtitle="Saffron Kingdom and Daffodil Studios have been covered in a number of media outlets since the film's premiere at Wake Forest International Film Festival. Here is a list outlining that coverage."
            size="lg"
          />
        </div>
      </section>

      <!-- Press Coverage Section -->
      <section class="relative pb-24">
        <div class="container mx-auto px-6">
          <div class="max-w-5xl mx-auto space-y-6">
            <!-- Press Item -->
            <div 
              v-for="article in pressArticles" 
              :key="article.id"
              class="glass-card rounded-xl p-6 hover:scale-[1.02] transition-transform duration-300"
            >
              <div class="flex flex-col md:flex-row md:items-start gap-4">
                <!-- Publication Badge -->
                <div class="flex-shrink-0">
                  <span class="inline-block px-4 py-2 bg-brand-accent rounded-lg text-sm font-semibold whitespace-nowrap">
                    {{ article.publication }}
                  </span>
                </div>
                
                <!-- Content -->
                <div class="flex-grow">
                  <h3 class="text-xl font-bold text-white mb-2 hover:text-brand-gradient transition-colors">
                    <a 
                      v-if="article.url" 
                      :href="article.url" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      class="hover:underline"
                    >
                      {{ article.title }}
                    </a>
                    <span v-else>{{ article.title }}</span>
                  </h3>
                  <p class="text-gray-300 leading-relaxed">
                    {{ article.description }}
                  </p>
                  
                  <!-- Read More Link -->
                  <a 
                    v-if="article.url"
                    :href="article.url" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    class="inline-flex items-center gap-2 mt-3 text-brand-gradient hover:text-yellow-400 transition-colors font-semibold text-sm"
                  >
                    Read Article
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </UiBackgroundPattern>
  </div>
</template>

<script setup lang="ts">
interface PressArticle {
  id: number
  publication: string
  title: string
  description: string
  url?: string
}

const pressArticles: PressArticle[] = [
  {
    id: 1,
    publication: "BBC Urdu",
    title: "'Saffron Kingdom': Filmmaker talks about why he couldn't cast Kashmiris in his film",
    description: "An Urdu-language interview with Saffron Kingdom director Arfat Sheikh with the BBC discussing the process of making the film as well as its impact.",
    url: "https://www.youtube.com/watch?v=BBWLEyzuMbU"
  },
  {
    id: 2,
    publication: "The Independent",
    title: "An indie filmmaker seeks to challenge Bollywood narrative on Kashmir",
    description: "An interview with director Arfat Sheikh as well as an examination of Saffron Kingdom itself by UK tabloid The Independent. Includes background on Arfat, the Kashmir issue at large, and how Saffron Kingdom helps reclaim the Kashmiri voice.",
    url: "https://www.the-independent.com/asia/india/kashmir-saffron-kingdom-arfat-sheikh-bollywood-b2653709.html"
  },
  {
    id: 3,
    publication: "TRT World",
    title: "A Kashmiri filmmaker's quest to reclaim narrative through cinema",
    description: "Interview with director Arfat Sheikh and an examination of how Saffron Kingdom challenges narratives and stereotypes by Turkish media agency TRT World. Discusses the Bollywood portrayal of Kashmiris, the symbolism of Saffron Kingdom, and how the film aims to preserve Kashmir's collective memory.",
    url: "https://www.trtworld.com/article/18208777"
  },
  {
    id: 4,
    publication: "The Kashmiriyat",
    title: "Saffron Kingdom: A Kashmiri filmmaker's journey through exile, memory, and belonging",
    description: "Interview with director Arfat Sheikh about his personal story and the creation of Saffron Kingdom by Kashmiri newspaper The Kashmiriyat. Discusses the backlash from India, the process of creating the film, and future plans for Daffodil Studios.",
    url: "https://thekashmiriyat.co.uk/saffron-kingdom-a-kashmiri-filmmakers-journey-through-exile-memory-and-belonging/?noamp=available#google_vignette"
  },
  {
    id: 5,
    publication: "Asian Sunday",
    title: "Independent filmmaker strives to amplify Kashmiri voices beyond Bollywood",
    description: "Interview with director Arfat Sheikh and discussion on how Saffron Kingdom responds to the erasure of Kashmiri history and culture by UK weekly Asian Sunday. Discusses how the film was made for a global audience, the harmful stereotypes perpetuated in Bollywood, and why Saffron Kingdom was created.",
    url: "https://www.asiansunday.co.uk/indie-filmmaker-takes-on-bollywood-to-reclaim-kashmirs-voice/"
  },
  {
    id: 6,
    publication: "Kashmir Times",
    title: "\"I set out to reclaim agency, but also made cross-regional connections\": Arfat Sheikh",
    description: "Interview with director Arfat Sheikh discussing his personal story and what led to the creation of Saffron Kingdom by Kashmiri newspaper Kashmir Times. Discusses difficulties in production, the inspiration behind the film, and its international reach.",
    url: "https://kashmirtimes.com/culture/i-set-out-to-reclaim-agency-but-also-made-cross-regional-connections-arfat-sheikh"
  },
  {
    id: 7,
    publication: "Georgia Entertainment",
    title: "Georgia lensed Saffron Kingdom set to release after festival circuit wins",
    description: "Discusses Saffron Kingdom's festival successes and its production taking place primarily in Atlanta, GA by Georgia Entertainment. Includes quotes from director Arfat Sheikh and actor Ahmed Ghafouri.",
    url: "https://www.georgiaentertainment.com/2025/02/georgia-lensed-saffron-kingdom-set-to-release-after-festival-circuit-wins/"
  },
  {
    id: 8,
    publication: "Saporta Report",
    title: "Georgia-made 'Saffron Kingdom' tells Kashmiri narrative through film",
    description: "Interview with director Arfat Sheikh and an examination of Saffron Kingdom as a whole by Atlanta-based paper Saporta Report. Discusses the film's production, its story, and its global reach.",
    url: "https://saportareport.com/georgia-made-saffron-kingdom-tells-kashmiri-narrative-through-film/columnists/delaney-tarr/delaneytarr/"
  },
  {
    id: 9,
    publication: "Kashmir Pen",
    title: "The Untold Kashmir: A Journey of Redemption in Saffron Kingdom…",
    description: "An examination of the film as a whole and the importance of its creation by Kashmiri newspaper Kashmir Pen. Describes how the film breaks new ground by doing what Bollywood and regional film industries have failed to do: tell the truth about Kashmir. Discusses its place in the wider milieu of Kashmiri artists seeking to reclaim their people's voice.",
    url: "https://www.kashmirpen.in/the-untold-kashmira-journey-of-redemption-in-saffron-kingdom/"
  },
  {
    id: 10,
    publication: "RNada",
    title: "\"Saffron Kingdom\" Explores Kashmir's Trauma and the Immigrant Experience",
    description: "An article discussing the production of Saffron Kingdom and its themes of intergenerational trauma and the experience of immigrants by film blog RNada. Includes discussion on the film's creation and its future.",
    url: "https://www.rnada.com/archives/31079"
  },
  {
    id: 11,
    publication: "285 South",
    title: "A movie about Kashmir, filmed in metro Atlanta",
    description: "A discussion of Saffron Kingdom's production in Atlanta, GA and the overall importance of the film by Atlanta-based immigrant media platform 285 South. Describes the film's production, themes, and global reach.",
    url: "https://285south.com/a-movie-about-kashmir-filmed-in-metro-atlanta/"
  },
  {
    id: 12,
    publication: "IndieWrap",
    title: "Interview with Director Arfat Sheikh",
    description: "An interview with Saffron Kingdom director Arfat Sheikh about the creation of the film and the challenges that came with it by independent film magazine IndieWrap. Includes discussion on the casting, the crew, and the film's impact.",
    url: "https://indiewrapmag.com/interviews/interview-with-director-arfat-sheikh/"
  },
  {
    id: 13,
    publication: "Counterview",
    title: "Saffron Kingdom – a cinematic counter-narrative to The Kashmir Files",
    description: "A review of Saffron Kingdom by Indian news site Counterview that attempts to paint it as a response to Bollywood propaganda film The Kashmir Files. Discusses some basic information about the film and describes how it tells the story of the Kashmiri Muslim majority.",
    url: "https://www.counterview.net/2025/09/saffron-kingdom-cinematic-counter.html?m=1"
  },
  {
    id: 14,
    publication: "Central Desi",
    title: "NY film premiere brings attention to Kashmir",
    description: "A review of the film framed via its sold-out New York City premiere by South Asian-American newsletter Central Desi. Also includes an interview with director Arfat Sheikh discussing the creation of Saffron Kingdom and its overall themes.",
    url: "https://centraldesi.beehiiv.com/p/ny-film-premiere-brings-attention-to-kashmir"
  },
  {
    id: 15,
    publication: "Hostile Homelands",
    title: "Saffron Kingdom: A love letter to Kashmir",
    description: "A review of Saffron Kingdom by anti-colonial newsletter Hostile Homelands. Describes the creation of the film, its visual themes, and how it authentically captures the Kashmiri experience.",
    url: "https://azadessa.substack.com/p/saffron-kingdom-kashmir-film-review?utm_campaign=post&utm_medium=email&triedRedirect=true"
  },
  {
    id: 16,
    publication: "The India Observer",
    title: "'Saffron Kingdom'- a haunting response to \"Kashmir File\"",
    description: "An article discussing the film by Indian news site The India Observer that tries to paint it as a response to The Kashmir Files. Discusses how the film reclaims the Kashmiri narrative and how it will likely be banned or restricted in India due to this.",
    url: "https://theindiaobserver.com/saffron-kingdom-a-haunting-response-to-kashmir-file/"
  },
  {
    id: 17,
    publication: "Made in Kashmir",
    title: "Zafran",
    description: "A review of Saffron Kingdom from an artistic perspective by Kashmiri newsletter Made in Kashmir. Examines the film's plot, its portrayal of the Kashmiri experience, and how it represents an achievement of exile filmmaking and protest.",
    url: "https://faysal.substack.com/p/zafran?r=3upj3k&utm_medium=ios&triedRedirect=true"
  },
  {
    id: 18,
    publication: "The Contrapuntal",
    title: "Saffron Kingdom | An Epistemic Tremor!",
    description: "A review of Saffron Kingdom that discusses the power of the film to break stereotypes and mainstream narratives to uncover the truth about Kashmir by independent publication The Contrapuntal. Includes discussion on exile and the importance of art in making change possible.",
    url: "https://thecontrapuntal.com/saffron-kingdom-an-epistemic-tremor/?fbclid=PAZnRzaANC1ntleHRuA2FlbQIxMQABp1w8RcPv_-3y7s8IbOml_EoGizxRxlwu_9mIH7qD0a_LFfFtNWLmwWlX7lDU_aem_K9ZT1EPZgTYt2j0a2SA32Q"
  },
  {
    id: 19,
    publication: "Project Censored",
    title: "Journalism and Free Expression from the US to Kashmir",
    description: "A podcast episode discussing free speech and free press with a US context and a Kashmiri context by Project Censored. Includes an interview with Saffron Kingdom director Arfat Sheikh discussing the repression against Kashmiri voices and the film's importance.",
    url: "https://www.projectcensored.org/journalism-free-expression-us-kashmir/"
  },
  {
    id: 20,
    publication: "Classic American Movies",
    title: "Ep. 70 - Arfat Sheikh (Saffron Kingdom)",
    description: "A podcast episode interviewing director Arfat Sheikh about the film by Classic American Movies. Discusses his personal journey as well as the creation of Saffron Kingdom.",
    url: "https://open.spotify.com/episode/1iYDySenuMpYzCmWuq0kF4?si=xn-Md8iUTS25iuiQ3ixosw&nd=1&dlsi=1ba4ccfbc27a4cc0"
  },
  {
    id: 21,
    publication: "oZone Podcast",
    title: "Arfat Sheikh's Saffron Kingdom [OP9]",
    description: "A podcast episode interviewing director Arfat Sheikh about the film by oZone Podcast. Discusses the history of the Kashmir occupation as well as the journey of making Saffron Kingdom.",
    url: "https://podcasts.apple.com/us/podcast/arfat-sheikhs-saffron-kingdom-op9/id1717284649?i=1000697547933"
  },
  {
    id: 22,
    publication: "RoughDraft Atlanta",
    title: "Crash Zoom: an interview with Arfat Sheikh",
    description: "A podcast episode interviewing director Arfat Sheikh about the film by RoughDraft Atlanta. Discusses the Kashmir occupation and the film's themes.",
    url: "https://roughdraftatlanta.com/2025/05/14/crash-zoom-an-interview-with-arfat-sheikh/"
  }
]
</script>
