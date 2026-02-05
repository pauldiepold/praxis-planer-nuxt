<script setup lang="ts">
definePageMeta({
  title: 'Über uns',
  layout: 'home',
})

useHead({
  title: 'Über uns',
})

const doctors = [
  {
    id: 'diepold',
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
      { icon: 'i-lucide-heart', text: 'Mitglied IPPNW seit 1992' },
      { icon: 'i-lucide-music', text: 'Geigerin im Orchester der deutschen Kinderärzte' },
      { icon: 'i-lucide-music', text: 'Stellvertretende Vorsitzende der AOV Göttingen' },
    ],
    personal: 'Seit 2002 mit Th. Holstein-Diepold verheiratet, wir haben 2 erwachsene Kinder und leben in Göttingen.',
  },
  {
    id: 'holstein',
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
] as const

const teamMembers = [
  { name: 'Regine Feil', role: 'MFA' },
  { name: 'Kerstin Voigt', role: 'MFA' },
  { name: 'Elena Lorenz', role: 'MFA' },
  { name: 'Zeynep Boga', role: 'MFA' },
  { name: 'Marina Gottfried', role: 'MFA' },
  { name: 'Pauline Mönkemeyer', role: 'Auszubildende' },
  { name: 'Malak El Batal', role: 'Auszubildende' },
  { name: 'Peter Reese', role: 'Freier Mitarbeiter' },
] as const
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
            Unsere Ärzte
          </h2>
        </div>

        <div class="grid gap-8 lg:grid-cols-2">
          <PraxisDoctorCard
            v-for="doctor in doctors"
            :key="doctor.id"
            :name="doctor.name"
            :title="doctor.title"
            :short-bio="doctor.shortBio"
            :qualifications="doctor.qualifications"
            :full-bio="doctor.fullBio"
            :interests="doctor.interests"
            :personal="doctor.personal"
          />
        </div>
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

        <PraxisCard
          class="bg-muted"
          content-class="p-12 text-center"
        >
          <UIcon
            name="i-lucide-images"
            class="mx-auto mb-4 size-16 text-muted-foreground"
          />
          <p class="text-muted">
            Hier können später Fotos der Praxisräumlichkeiten eingefügt werden.
          </p>
        </PraxisCard>
      </UContainer>
    </section>
  </div>
</template>
