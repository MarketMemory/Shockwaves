// Mock DJI data - in een echte app zou dit van een API komen
export const djiData = [
  { date: "2024-01-01", value: 37689 },
  { date: "2024-01-15", value: 37592 },
  { date: "2024-02-01", value: 38654 },
  { date: "2024-02-15", value: 38989 },
  { date: "2024-03-01", value: 39087 },
  { date: "2024-03-09", value: 32456 }, // Corona crash simulation
  { date: "2024-03-15", value: 31234 },
  { date: "2024-04-01", value: 33567 },
  { date: "2024-04-15", value: 35234 },
  { date: "2024-05-01", value: 36789 },
  { date: "2024-05-15", value: 37234 },
  { date: "2024-06-01", value: 38456 },
  { date: "2024-06-15", value: 38789 },
  { date: "2024-07-01", value: 39234 },
  { date: "2024-07-15", value: 39567 },
  { date: "2024-08-01", value: 40123 },
  { date: "2024-08-15", value: 40456 },
  { date: "2024-09-01", value: 41234 },
  { date: "2024-09-15", value: 41567 },
  { date: "2024-10-01", value: 42123 },
  { date: "2024-10-15", value: 42456 },
  { date: "2024-11-01", value: 43234 },
  { date: "2024-11-15", value: 43567 },
  { date: "2024-12-01", value: 44123 },
  { date: "2024-12-15", value: 34721 },
]

// Mock gebeurtenissen data
export const events = [
  {
    date: "2024-03-09",
    title: "COVID-19 Pandemie Impact",
    description:
      "Wereldwijde lockdowns en economische onzekerheid leiden tot een sterke daling van de aandelenmarkten.",
    type: "crisis",
    impact: -15.2,
  },
  {
    date: "2024-05-15",
    title: "Fed Renteverhoging",
    description: "De Federal Reserve verhoogt de rente met 0.75% om inflatie te bestrijden.",
    type: "economic",
    impact: -2.1,
  },
  {
    date: "2024-07-01",
    title: "Sterke Q2 Earnings",
    description:
      "Veel bedrijven rapporteren beter dan verwachte kwartaalcijfers, wat vertrouwen geeft aan investeerders.",
    type: "economic",
    impact: 3.4,
  },
  {
    date: "2024-08-15",
    title: "Geopolitieke Spanningen",
    description: "Toenemende spanningen in Oost-Europa zorgen voor volatiliteit op de markten.",
    type: "political",
    impact: -1.8,
  },
  {
    date: "2024-10-01",
    title: "Tech Sector Rally",
    description: "Sterke prestaties van technologiebedrijven stuwen de index naar nieuwe hoogtes.",
    type: "economic",
    impact: 4.2,
  },
  {
    date: "2024-11-15",
    title: "Verkiezingsuitslag",
    description: "Verkiezingsresultaten brengen duidelijkheid over toekomstig economisch beleid.",
    type: "political",
    impact: 2.1,
  },
  {
    date: "2024-12-15",
    title: "Energiecrisis",
    description: "Stijgende energieprijzen en zorgen over leveringszekerheid beïnvloeden de markten negatief.",
    type: "crisis",
    impact: -6.8,
  },
]

// Functie om real-time data te simuleren (voor toekomstige uitbreiding)
export function generateRealtimeData() {
  const lastValue = djiData[djiData.length - 1].value
  const change = (Math.random() - 0.5) * 200 // Random change tussen -100 en +100
  return {
    date: new Date().toISOString().split("T")[0],
    value: Math.round(lastValue + change),
  }
}
