<script setup lang="ts">
definePageMeta({
  title: 'Über uns',
})

useSeoMeta({
  title: 'Über uns',
  description: 'Lernen Sie unser Praxisteam kennen: Thomas Holstein-Diepold und Dr. med. Katharina Diepold mit ihrem Team.',
})

useBreadcrumbSchema([
  { name: 'Über uns', item: '/ueber-uns' },
])

type Doctor = {
  id: string
  image?: string
  name: string
  title: string
  shortBio: string
  fullBio: readonly string[]
  qualifications: readonly string[]
  interests: readonly { icon: string, text: string }[]
  personal: string
}

const doctors: Doctor[] = [
  {
    id: 'diepold',
    image: '/team/doctors/diepold.webp',
    name: 'Dr. Katharina Diepold',
    title: 'Kinder- und Jugendärztin',
    shortBio: 'Fachärztin mit Schwerpunkt Neuropädiatrie. Oberärztin am Klinikum Kassel bis 2021, seit Dezember 2020 in unserer Berufsausübungsgemeinschaft.',
    fullBio: [
      'Geboren 1968 in Göttingen',
      '1986-1992 Studium der Biochemie in den USA',
      '1992-1998 Studium der Medizin in Berlin',
      'Famulaturen u.a. in New York und Mwanza (Tanzania)',
      'Praktisches Jahr in Chicago, New York und Berlin',
      'Wissenschaftliche Mitarbeiterin im Forschungslabor der Kinderklinik Halle/Saale 1999 bis 2000',
      'Facharztausbildung und Fachärztin an der UMG Göttingen 2000 bis 2006',
      'Oberärztin Neuropädiatrie Klinikum Kassel 2006 bis 2021',
      'Ab Dezember 2020 Berufsausübungsgemeinschaft mit meinem Mann Th. Holstein-Diepold',
    ],
    qualifications: ['Neuropädiatrie', 'Palliativmedizin'],
    interests: [
      { icon: 'i-lucide-stethoscope', text: 'ärztliche Betreuung des Kinderhospizes "Sternenlichter" in Göttingen' },
      { icon: 'i-lucide-heart', text: 'Mitglied IPPNW seit 1992' },
      { icon: 'i-lucide-music', text: 'Geigerin und im Vorstand im Orchester der deutschen Kinderärzte' },
    ],
    personal: 'Seit 2002 mit Th. Holstein-Diepold verheiratet, wir haben 2 erwachsene Kinder und leben in Göttingen.',
  },
  {
    id: 'holstein',
    image: '/team/doctors/holstein.webp',
    name: 'Thomas Holstein-Diepold',
    title: 'Kinder- und Jugendarzt',
    shortBio: 'Seit 2007 in eigener Praxis in Northeim. 2025 Zertifikat der DGMSM für Manuelle und Osteopathische Säuglings- und Kinderbehandlung.',
    fullBio: [
      'Geboren 1968 in Berlin-Hohenschönhausen, aufgewachsen in der DDR',
      '1984 bis 1989 Tätigkeit in diakonischen Einrichtungen',
      '1985 bis 1987 Hochschulreife an der Volkshochschule Berlin-Pankow',
      'Medizinstudium in Köln und Berlin (1990 bis 1997)',
      'Famulaturen u.a. in Zagreb und Mwanza (Tansania)',
      'Praktisches Jahr in Chicago und New York City (1996 bis 1997)',
      'Facharztausbildung an den Universitätskliniken Halle/Saale und Göttingen 1998 bis 2006',
      'Forschungsaufenthalt in Ghana (2001)',
      'Seit 2007 in eigener Praxis in Northeim',
      '2025 Zertifikat der DGMSM zur Manuellen und Osteopathischen Säuglings- und Kinderbehandlung',
    ],
    qualifications: ['Manuelle und Osteopathische Säuglings- und Kinderbehandlung'],
    interests: [
      { icon: 'i-lucide-heart', text: 'Mitglied IPPNW seit 1992' },
    ],
    personal: 'Seit 2002 mit Dr. K. Diepold verheiratet, wir haben zwei Kinder und leben in Göttingen.',
  },
]

type TeamMember = { name: string, role: string, image?: string, objectFit?: 'cover' | 'contain' }
// Optional pro Person: image: '/team/staff/slug.jpg' – Bild in public/team/staff/ ablegen
/** Gemeinsamer privater Abschnitt (einmal unter beiden Ärzten, zentriert) */
const doctorsSharedPersonal = 'Wir sind seit 2002 verheiratet, haben zwei erwachsene Kinder und leben in Göttingen.'

const teamMembers: TeamMember[] = [
  { name: 'Regine Feil', role: 'MFA', image: '/team/staff/01-feil.webp' },
  { name: 'Kerstin Voigt', role: 'MFA', image: '/team/staff/02-voigt.webp' },
  { name: 'Elena Lorenz', role: 'MFA', image: '/team/staff/03-lorenz.webp' },
  { name: 'Zeynep Boga', role: 'MFA', image: '/team/staff/04-boga.webp' },
  { name: 'Marina Gottfried', role: 'MFA', image: '/team/staff/05-gottfried.webp' },
  { name: 'Pauline Mönkemeyer', role: 'MFA', image: '/team/staff/06-moenkemeyer.webp' },
  { name: 'Malak El Batal', role: 'Auszubildende', image: '/team/staff/07-batal.webp' },
  { name: 'Tanja Preußner', role: 'Mitarbeiterin' },
  { name: 'Peter Reese', role: 'Freier Mitarbeiter', image: '/team/staff/09-reese.jpg' },
]
</script>

<template>
  <div>
    <!-- Hero Header (wie Kontakt) -->
    <section class="bg-primary-50 py-12">
      <UContainer>
        <h1 class="mb-2 text-3xl font-bold text-highlighted md:text-4xl">
          Über uns
        </h1>
        <p class="text-muted">
          Lernen Sie unser Ärzteteam und die Mitarbeiterinnen unserer Praxis kennen.
          Wir freuen uns darauf, Sie und Ihre Familie zu betreuen.
        </p>
      </UContainer>
    </section>

    <section class="py-10">
      <UContainer>
        <div class="mb-10 flex items-center gap-3">
          <div class="h-1 w-12 rounded-full bg-primary" />
          <h2 class="text-2xl font-bold text-highlighted md:text-3xl">
            Ärztin und Arzt
          </h2>
        </div>

        <!-- Trennung zwischen den Ärzten: Desktop vertikaler Strich (dezent), Mobile horizontaler Strich -->
        <div class="grid gap-0 lg:grid-cols-2">
          <div
            v-for="(doctor, index) in doctors"
            :key="doctor.id"
            :class="index === 0
              ? 'border-b-2 border-primary/20 pb-8 lg:border-b-0 lg:border-r-2 lg:border-primary/20 lg:pr-8'
              : 'pt-8 lg:pt-0 lg:pl-8'"
          >
            <PraxisDoctorCard
              :name="doctor.name"
              :title="doctor.title"
              :short-bio="doctor.shortBio"
              :qualifications="doctor.qualifications"
              :full-bio="doctor.fullBio"
              :interests="doctor.interests"
              :personal="''"
              :image="doctor.image"
            />
          </div>
        </div>
        <p class="mt-8 max-w-xl mx-auto text-center text-sm italic text-muted">
          {{ doctorsSharedPersonal }}
        </p>
      </UContainer>
    </section>

    <section class="bg-elevated/50 py-10">
      <UContainer>
        <div class="mb-10 flex items-center gap-3">
          <div class="h-1 w-12 rounded-full bg-[var(--praxis-accent)]" />
          <h2 class="text-2xl font-bold text-highlighted md:text-3xl">
            Unser Team
          </h2>
        </div>

        <div class="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          <PraxisTeamMemberCard
            v-for="member in teamMembers"
            :key="member.name"
            :name="member.name"
            :role="member.role"
            :image="member.image"
            :object-fit="member.objectFit"
          />
        </div>
      </UContainer>
    </section>

    <section class="py-10">
      <UContainer>
        <div class="mb-10 flex items-center gap-3">
          <div class="h-1 w-12 rounded-full bg-primary" />
          <h2 class="text-2xl font-bold text-highlighted md:text-3xl">
            Praxisansichten
          </h2>
        </div>

        <BaseCard
          class="bg-muted"
          content-class="p-12 text-center"
        >
          <UIcon
            name="i-lucide-images"
            class="mx-auto mb-4 size-16 text-muted-foreground"
          />
          <p class="text-muted">
            Hier folgen Photos der Praxisräumlichkeiten.
          </p>
        </BaseCard>
      </UContainer>
    </section>
  </div>
</template>
