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
            size="md"
          />
        </div>
      </section>

      <!-- Daffodil Studios Press Release Section -->
      <section class="relative pb-12 sm:pb-16">
        <div class="container mx-auto px-4 sm:px-6">
          <div class="max-w-7xl mx-auto">
            <UiSectionHeader 
              title="Daffodil Studios Press Release"
              size="md"
              :level="2"
            />
            
            <div class="glass-card rounded-xl overflow-hidden p-4 sm:p-6 lg:p-8">
              <div class="space-y-3 sm:space-y-4">
                <h3 class="text-xl sm:text-2xl lg:text-3xl font-bold text-white leading-tight">
                  Saffron Kingdom: Brave Kashmiri Independent Film Sheds Light on Kashmiri Oppression and Strength
                </h3>
                
                <p class="text-xs sm:text-sm text-gray-400 font-semibold">WASHINGTON, DC (4th November 2025)</p>
                
                <button
                  @click="showPressRelease = !showPressRelease"
                  class="inline-flex items-center gap-2 text-brand-gradient active:text-gray-400 transition-colors font-semibold text-xs min-h-[40px]"
                >
                  {{ showPressRelease ? 'Hide' : 'Read' }} Full Press Release
                  <svg 
                    class="w-4 h-4 transition-transform" 
                    :class="{ 'rotate-180': showPressRelease }"
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                  </svg>
                </button>
                
                <div v-show="showPressRelease" class="space-y-4 text-gray-300 leading-relaxed pt-4">
                  <p>
                    Saffron Kingdom is a poignant Kashmiri American independent film highlighting one family's fight to find peace after fleeing violence and oppression in their homeland. Inspired by true events, the internationally celebrated and award-winning Saffron Kingdom explores the Kashmir conflict through a family's journey from Srinagar in the 1990s to Atlanta, Georgia in 2019. The film was recently acquired by Watermelon Pictures, the recently launched, Oscar-nominated production and distribution company committed to amplifying the voices of underrepresented filmmakers.
                  </p>
                  
                  <p>
                    The story follows Masrat, a woman who witnesses insurgency violence as a child and later flees to America after her husband is abducted. Masrat struggles to find a new identity after moving to Atlanta, and her relationship with her son Rizwan is strained while he lives with intergenerational trauma and loss.
                  </p>
                  
                  <p>
                    For decades, Kashmiri Muslims have faced violence, human rights abuses, and political disenfranchisement, and their stories have been largely kept quiet due to fear of reprisal. Saffron Kingdom is a politically urgent film, and debut director Arfat Sheikh centers humanity and honesty in this intensely dramatic story of love, loss, and resilience.
                  </p>
                  
                  <p>
                    Sheikh has been announced as the inaugural recipient of the Emerging Filmmaker Activist Award at the 20th annual Teaneck International Film Festival. Saffron Kingdom exposes issues many would like kept in the dark and reflects on identity, justice, and the struggle to reclaim one's narrative amidst turmoil.
                  </p>
                  
                  <div class="bg-gray-800/50 p-4 rounded-lg border-l-4 border-brand-accent my-6">
                    <p class="italic">
                      "I wanted to tell a deeply human story that reflects the collective grief Kashmiris feel from misrepresentation, and the strength it takes to keep going."
                    </p>
                    <p class="text-sm text-gray-400 mt-2">- Arfat Sheikh, producer and director of Saffron Kingdom</p>
                  </div>
                  
                  <div class="bg-gray-800/50 p-4 rounded-lg border-l-4 border-brand-accent my-6">
                    <p class="italic">
                      "As the debut film from Daffodil Studios, Saffron Kingdom is a clear example of how art and storytelling can shed light on dispossession around the world."
                    </p>
                    <p class="text-sm text-gray-400 mt-2">- G. Mir, executive producer of Saffron Kingdom and president of Daffodil Studios</p>
                  </div>
                  
                  <p>
                    Many in the Kashmiri diaspora remain afraid to attend screenings due to fears of surveillance, and few actors or credited participants are Kashmiri, as involvement could jeopardize their return home. Through the courage of its cast and crew, Saffron Kingdom brings untold stories to light and honors those who speak out.
                  </p>
                  
                  <div class="pt-4 space-y-2">
                    <p>
                      Daffodil Studios is a nonprofit film studio focused on impact-driven storytelling: 
                      <a href="https://www.daffodilstudios.org/" target="_blank" rel="noopener noreferrer" class="text-brand-gradient hover:text-gray-400 underline">
                        https://www.daffodilstudios.org/
                      </a>
                    </p>
                    <p>
                      <a href="https://www.saffronkingdomfilm.com/" target="_blank" rel="noopener noreferrer" class="text-brand-gradient hover:text-gray-400 underline">
                        https://www.saffronkingdomfilm.com/
                      </a>
                    </p>
                    <p class="font-semibold text-white pt-2">
                      Streaming release of Saffron Kingdom on Watermelon+ in May 2026
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Articles Section -->
      <section class="relative pb-12">
        <div class="container mx-auto px-4 sm:px-6">
          <div class="max-w-7xl mx-auto">
            <UiSectionHeader 
              title="Articles"
              size="md"
              align="center"
              :level="2"
            />
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              <CardPress
                v-for="article in visibleArticles"
                :key="article.id"
                :item="article"
              />
            </div>
          
          <!-- See More Button -->
          <div v-if="hasMoreArticles" class="text-center mt-6 sm:mt-8">
            <UiToggleButton
              :expanded="showAllArticles"
              :expanded-label="'Show Less'"
              :collapsed-label="`See More Articles (${articles.length - 3} more)`"
              @toggle="showAllArticles = !showAllArticles"
            />
          </div>
        </div>
        </div>
      </section>

      <!-- Podcasts Section -->
      <section class="relative pb-16 sm:pb-24">
        <div class="container mx-auto px-4 sm:px-6">
          <div class="max-w-7xl mx-auto">
            <UiSectionHeader 
              title="Podcasts"
              size="md"
              align="center"
              :level="2"
            />
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              <CardPress
                v-for="podcast in visiblePodcasts"
                :key="podcast.id"
                :item="podcast"
              />
            </div>
          
          <!-- See More Button -->
          <div v-if="hasMorePodcasts" class="text-center mt-6 sm:mt-8">
            <UiToggleButton
              :expanded="showAllPodcasts"
              :expanded-label="'Show Less'"
              :collapsed-label="`See More Podcasts (${podcasts.length - 3} more)`"
              @toggle="showAllPodcasts = !showAllPodcasts"
            />
          </div>
        </div>
        </div>
      </section>
    </UiBackgroundPattern>
  </div>
</template>

<script setup lang="ts">
// Import custom thumbnails from assets
import bbcUrduThumb from '@/assets/images/pages/press/bbc-urdu-thumbnail.jpeg'
import asianSundayThumb from '@/assets/images/pages/press/asian-sunday-thumbnail.jpeg'

interface PressArticle {
  id: number
  publication: string
  title: string
  description: string
  url?: string
  image?: string
  type: 'article' | 'podcast'
}

// Reactive state for press release toggle
const showPressRelease = ref(false)
const showAllArticles = ref(false)
const showAllPodcasts = ref(false)

// Computed properties to filter articles and podcasts
const articles = computed(() => pressArticles.filter(item => item.type === 'article'))
const podcasts = computed(() => pressArticles.filter(item => item.type === 'podcast'))

// Computed properties for visible items (show 3 initially for 1 row, or all if expanded)
const visibleArticles = computed(() => showAllArticles.value ? articles.value : articles.value.slice(0, 3))
const visiblePodcasts = computed(() => showAllPodcasts.value ? podcasts.value : podcasts.value.slice(0, 3))

// Check if there are more items to show
const hasMoreArticles = computed(() => articles.value.length > 3)
const hasMorePodcasts = computed(() => podcasts.value.length > 3)

useHead({
  title: 'Press & Media Coverage - Daffodil Studios',
  meta: [
    {
      name: 'description',
      content: 'Press coverage, interviews, and podcast appearances featuring Daffodil Studios and Saffron Kingdom.'
    },
    {
      property: 'og:title',
      content: 'Press & Media Coverage - Daffodil Studios'
    },
    {
      property: 'og:description',
      content: 'Explore press coverage and media appearances for Daffodil Studios and Saffron Kingdom.'
    }
  ]
})

const pressArticles: PressArticle[] = [
  {
    id: 1,
    publication: "BBC",
    title: "'Saffron Kingdom': Filmmaker talks about why he couldn't cast Kashmiris in his film",
    description: "An Urdu-language interview with Saffron Kingdom director Arfat Sheikh with the BBC discussing the process of making the film as well as its impact.",
    url: "https://www.youtube.com/watch?v=BBWLEyzuMbU",
    image: bbcUrduThumb,
    type: "article"
  },
  {
    id: 2,
    publication: "The Independent",
    title: "An indie filmmaker seeks to challenge Bollywood narrative on Kashmir",
    description: "An interview with director Arfat Sheikh as well as an examination of Saffron Kingdom itself by UK tabloid The Independent. Includes background on Arfat, the Kashmir issue at large, and how Saffron Kingdom helps reclaim the Kashmiri voice.",
    url: "https://www.the-independent.com/asia/india/kashmir-saffron-kingdom-arfat-sheikh-bollywood-b2653709.html",
    type: "article"
  },
  {
    id: 3,
    publication: "TRT World",
    title: "A Kashmiri filmmaker's quest to reclaim narrative through cinema",
    description: "Interview with director Arfat Sheikh and an examination of how Saffron Kingdom challenges narratives and stereotypes by Turkish media agency TRT World. Discusses the Bollywood portrayal of Kashmiris, the symbolism of Saffron Kingdom, and how the film aims to preserve Kashmir's collective memory.",
    url: "https://www.trtworld.com/article/18208777",
    type: "article"
  },
  {
    id: 4,
    publication: "The Kashmiriyat",
    title: "Saffron Kingdom: A Kashmiri filmmaker's journey through exile, memory, and belonging",
    description: "Interview with director Arfat Sheikh about his personal story and the creation of Saffron Kingdom by Kashmiri newspaper The Kashmiriyat. Discusses the backlash from India, the process of creating the film, and future plans for Daffodil Studios.",
    url: "https://thekashmiriyat.co.uk/saffron-kingdom-a-kashmiri-filmmakers-journey-through-exile-memory-and-belonging/?noamp=available#google_vignette",
    type: "article"
  },
  {
    id: 5,
    publication: "Asian Sunday",
    title: "Independent filmmaker strives to amplify Kashmiri voices beyond Bollywood",
    description: "Interview with director Arfat Sheikh and discussion on how Saffron Kingdom responds to the erasure of Kashmiri history and culture by UK weekly Asian Sunday. Discusses how the film was made for a global audience, the harmful stereotypes perpetuated in Bollywood, and why Saffron Kingdom was created.",
    url: "https://www.asiansunday.co.uk/indie-filmmaker-takes-on-bollywood-to-reclaim-kashmirs-voice/",
    image: asianSundayThumb,
    type: "article"
  },
  {
    id: 6,
    publication: "Kashmir Times",
    title: "\"I set out to reclaim agency, but also made cross-regional connections\": Arfat Sheikh",
    description: "Interview with director Arfat Sheikh discussing his personal story and what led to the creation of Saffron Kingdom by Kashmiri newspaper Kashmir Times. Discusses difficulties in production, the inspiration behind the film, and its international reach.",
    url: "https://kashmirtimes.com/culture/i-set-out-to-reclaim-agency-but-also-made-cross-regional-connections-arfat-sheikh",
    type: "article"
  },
  {
    id: 7,
    publication: "Georgia Entertainment",
    title: "Georgia lensed Saffron Kingdom set to release after festival circuit wins",
    description: "Discusses Saffron Kingdom's festival successes and its production taking place primarily in Atlanta, GA by Georgia Entertainment. Includes quotes from director Arfat Sheikh and actor Ahmed Ghafouri.",
    url: "https://www.georgiaentertainment.com/2025/02/georgia-lensed-saffron-kingdom-set-to-release-after-festival-circuit-wins/",
    type: "article"
  },
  {
    id: 8,
    publication: "Saporta Report",
    title: "Georgia-made 'Saffron Kingdom' tells Kashmiri narrative through film",
    description: "Interview with director Arfat Sheikh and an examination of Saffron Kingdom as a whole by Atlanta-based paper Saporta Report. Discusses the film's production, its story, and its global reach.",
    url: "https://saportareport.com/georgia-made-saffron-kingdom-tells-kashmiri-narrative-through-film/columnists/delaney-tarr/delaneytarr/",
    type: "article"
  },
  {
    id: 9,
    publication: "Kashmir Pen",
    title: "The Untold Kashmir: A Journey of Redemption in Saffron Kingdom…",
    description: "An examination of the film as a whole and the importance of its creation by Kashmiri newspaper Kashmir Pen. Describes how the film breaks new ground by doing what Bollywood and regional film industries have failed to do: tell the truth about Kashmir. Discusses its place in the wider milieu of Kashmiri artists seeking to reclaim their people's voice.",
    url: "https://www.kashmirpen.in/the-untold-kashmira-journey-of-redemption-in-saffron-kingdom/",
    type: "article"
  },
  {
    id: 10,
    publication: "RNada",
    title: "\"Saffron Kingdom\" Explores Kashmir's Trauma and the Immigrant Experience",
    description: "An article discussing the production of Saffron Kingdom and its themes of intergenerational trauma and the experience of immigrants by film blog RNada. Includes discussion on the film's creation and its future.",
    url: "https://www.rnada.com/archives/31079",
    type: "article"
  },
  {
    id: 11,
    publication: "285 South",
    title: "A movie about Kashmir, filmed in metro Atlanta",
    description: "A discussion of Saffron Kingdom's production in Atlanta, GA and the overall importance of the film by Atlanta-based immigrant media platform 285 South. Describes the film's production, themes, and global reach.",
    url: "https://285south.com/a-movie-about-kashmir-filmed-in-metro-atlanta/",
    type: "article"
  },
  {
    id: 12,
    publication: "IndieWrap",
    title: "Interview with Director Arfat Sheikh",
    description: "An interview with Saffron Kingdom director Arfat Sheikh about the creation of the film and the challenges that came with it by independent film magazine IndieWrap. Includes discussion on the casting, the crew, and the film's impact.",
    url: "https://indiewrapmag.com/interviews/interview-with-director-arfat-sheikh/",
    type: "article"
  },
  {
    id: 13,
    publication: "Counterview",
    title: "Saffron Kingdom – a cinematic counter-narrative to The Kashmir Files",
    description: "A review of Saffron Kingdom by Indian news site Counterview that attempts to paint it as a response to Bollywood propaganda film The Kashmir Files. Discusses some basic information about the film and describes how it tells the story of the Kashmiri Muslim majority.",
    url: "https://www.counterview.net/2025/09/saffron-kingdom-cinematic-counter.html?m=1",
    type: "article"
  },
  {
    id: 14,
    publication: "Central Desi",
    title: "NY film premiere brings attention to Kashmir",
    description: "A review of the film framed via its sold-out New York City premiere by South Asian-American newsletter Central Desi. Also includes an interview with director Arfat Sheikh discussing the creation of Saffron Kingdom and its overall themes.",
    url: "https://centraldesi.beehiiv.com/p/ny-film-premiere-brings-attention-to-kashmir",
    type: "article"
  },
  {
    id: 15,
    publication: "Hostile Homelands",
    title: "Saffron Kingdom: A love letter to Kashmir",
    description: "A review of Saffron Kingdom by anti-colonial newsletter Hostile Homelands. Describes the creation of the film, its visual themes, and how it authentically captures the Kashmiri experience.",
    url: "https://azadessa.substack.com/p/saffron-kingdom-kashmir-film-review?utm_campaign=post&utm_medium=email&triedRedirect=true",
    type: "article"
  },
  {
    id: 16,
    publication: "The India Observer",
    title: "'Saffron Kingdom'- a haunting response to \"Kashmir File\"",
    description: "An article discussing the film by Indian news site The India Observer that tries to paint it as a response to The Kashmir Files. Discusses how the film reclaims the Kashmiri narrative and how it will likely be banned or restricted in India due to this.",
    url: "https://theindiaobserver.com/saffron-kingdom-a-haunting-response-to-kashmir-file/",
    type: "article"
  },
  {
    id: 17,
    publication: "Made in Kashmir",
    title: "Zafran",
    description: "A review of Saffron Kingdom from an artistic perspective by Kashmiri newsletter Made in Kashmir. Examines the film's plot, its portrayal of the Kashmiri experience, and how it represents an achievement of exile filmmaking and protest.",
    url: "https://faysal.substack.com/p/zafran?r=3upj3k&utm_medium=ios&triedRedirect=true",
    type: "article"
  },
  {
    id: 18,
    publication: "The Contrapuntal",
    title: "Saffron Kingdom | An Epistemic Tremor!",
    description: "A review of Saffron Kingdom that discusses the power of the film to break stereotypes and mainstream narratives to uncover the truth about Kashmir by independent publication The Contrapuntal. Includes discussion on exile and the importance of art in making change possible.",
    url: "https://thecontrapuntal.com/saffron-kingdom-an-epistemic-tremor/?fbclid=PAZnRzaANC1ntleHRuA2FlbQIxMQABp1w8RcPv_-3y7s8IbOml_EoGizxRxlwu_9mIH7qD0a_LFfFtNWLmwWlX7lDU_aem_K9ZT1EPZgTYt2j0a2SA32Q",
    type: "article"
  },
  {
    id: 20,
    publication: "northjersey.com",
    title: "Teaneck film fest marks 20 years with lineup of films to inspire local activism",
    description: "Article on the Teaneck International Film Festival by northjersey.com. Discusses the festival, where Saffron Kingdom is being shown and director Arfat Sheikh is being presented with the Emerging Filmmaker Activist Award.",
    url: "https://www.northjersey.com/story/news/bergen/teaneck/2025/11/05/teaneck-nj-film-fest-movies-inspire-activism/87087028007/?gnt-cfr=1&gca-cat=p&gca-uir=false&gca-epti=z115649p116250c116250d00----v115649&gca-ft=199&gca-ds=sophi",
    type: "article"
  },
  {
    id: 21,
    publication: "New Jersey Stage",
    title: "Teaneck International Film Festival announces Arfat Sheikh as Inaugural Emerging Filmmaker Activist Award Recipient",
    description: "Article discussing director Arfat Sheikh receiving the Emerging Filmmaker Activist Award at the 20th annual Teaneck International Film Festival. Includes some discussion on Saffron Kingdom.",
    url: "https://www.newjerseystage.com/articles2/2025/10/22/teaneck-international-film-festival-announces-arfat-sheikh-as-inaugural-emerging-filmmaker-activist-award-recipient/",
    type: "article"
  },
  {
    id: 26,
    publication: "Birmingham Live",
    title: "A movie premiering in Solihull has sparked a row - as director addresses 'smear campaign'",
    description: "Article discussing the Birmingham premiere of Saffron Kingdom and the Indian-backed disinformation campaign targeting it. Includes an interview with director Arfat Sheikh about the situation and the film.",
    url: "https://www.birminghammail.co.uk/news/midlands-news/movie-premiering-solihull-sparked-row-33180515",
    type: "article"
  },
  {
    id: 27,
    publication: "News18",
    title: "Opinion | 'Saffron Kingdom': A Movie With A Message Or An Agenda?",
    description: "Opinion article by Indian media about the film written by someone who has never watched it. Tries to paint it as a response to The Kashmir Files and accuses the film of being \"Pakistani propaganda\".",
    url: "https://www.news18.com/opinion/opinion-saffron-kingdom-a-movie-with-a-message-or-an-agenda-ws-l-9818700.html",
    type: "article"
  },
  {
    id: 28,
    publication: "5Pillars",
    title: "Saffron Kingdom movie exposes true cost of India's brutal occupation of Kashmir",
    description: "A review of Saffron Kingdom by Muslim news service 5Pillars. Discusses the emotional nature of the film, gives context about the Kashmir occupation, and describes the performances and the representation of Kashmiri culture in the film.",
    url: "https://5pillarsuk.com/2026/01/14/more-than-a-movie-saffron-kingdom-exposes-the-true-cost-of-indias-brutal-occupation-of-kashmir/",
    type: "article"
  },
  {
    id: 29,
    publication: "IMAGES (Dawn)",
    title: "'Bollywood is used as an instrument of oppression': Filmmaker Arfat Sheikh is reclaiming Kashmir's stories",
    description: "An interview with director Arfat Sheikh about the film by Pakistani newspaper Dawn's cultural section \"IMAGES\". Discusses his journey in becoming a filmmaker, the process of creating Saffron Kingdom, how Bollywood serves as a tool for oppression, and future Daffodil Studios projects.",
    url: "https://images.dawn.com/news/1194833",
    type: "article"
  },
  {
    id: 22,
    publication: "Project Censored",
    title: "Journalism and Free Expression from the US to Kashmir",
    description: "A podcast episode discussing free speech and free press with a US context and a Kashmiri context by Project Censored. Includes an interview with Saffron Kingdom director Arfat Sheikh discussing the repression against Kashmiri voices and the film's importance.",
    url: "https://www.projectcensored.org/journalism-free-expression-us-kashmir/",
    type: "podcast"
  },
  {
    id: 23,
    publication: "Classic American Movies",
    title: "Ep. 70 - Arfat Sheikh (Saffron Kingdom)",
    description: "A podcast episode interviewing director Arfat Sheikh about the film by Classic American Movies. Discusses his personal journey as well as the creation of Saffron Kingdom.",
    url: "https://open.spotify.com/episode/1iYDySenuMpYzCmWuq0kF4?si=xn-Md8iUTS25iuiQ3ixosw&nd=1&dlsi=1ba4ccfbc27a4cc0",
    type: "podcast"
  },
  {
    id: 24,
    publication: "oZone Podcast",
    title: "Arfat Sheikh's Saffron Kingdom [OP9]",
    description: "A podcast episode interviewing director Arfat Sheikh about the film by oZone Podcast. Discusses the history of the Kashmir occupation as well as the journey of making Saffron Kingdom.",
    url: "https://podcasts.apple.com/us/podcast/arfat-sheikhs-saffron-kingdom-op9/id1717284649?i=1000697547933",
    type: "podcast"
  },
  {
    id: 25,
    publication: "RoughDraft Atlanta",
    title: "Crash Zoom: an interview with Arfat Sheikh",
    description: "A podcast episode interviewing director Arfat Sheikh about the film by RoughDraft Atlanta. Discusses the Kashmir occupation and the film's themes.",
    url: "https://roughdraftatlanta.com/2025/05/14/crash-zoom-an-interview-with-arfat-sheikh/",
    type: "podcast"
  }
]
</script>
