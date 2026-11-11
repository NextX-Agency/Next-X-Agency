/** What "software op maat" means at NextX, in terms a business owner recognises. */
export const softwareKinds = [
  {
    title: 'Webapplicaties',
    text: 'Een toepassing in de browser voor klanten of medewerkers: bestellen, reserveren, aanvragen of inloggen.',
  },
  {
    title: 'Dashboards',
    text: 'Eén scherm met de cijfers en lijsten waar u op stuurt, in plaats van losse spreadsheets.',
  },
  {
    title: 'Interne systemen',
    text: 'Voorraad, planning of administratie in een systeem dat uw eigen werkwijze volgt.',
  },
  {
    title: 'Koppelingen',
    text: 'Uw website, WhatsApp en bestaande tools met elkaar laten praten, zodat niemand iets hoeft over te typen.',
  },
] as const

/** Software that can be checked in live work. Each line describes behaviour visible on the site. */
export const softwareProof = [
  {
    project: 'shop-nextx',
    name: 'Shop NextX',
    text: 'De winkelwagen controleert de voorraad en zet de complete bestelling klaar als WhatsApp-bericht.',
  },
  {
    project: 'bhaggoes-car-palace',
    name: 'Bhaggoes Car Palace',
    text: 'Een voorraad van auto’s, doorzoekbaar op merk, model, prijs en bouwjaar, met favorieten per apparaat.',
  },
] as const
