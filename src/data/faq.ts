export interface FaqItem {
  id: string
  question: string
  answers: string[]
}

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'pourquoi',
    question: 'Pourquoi donner des aliments complémentaires à son cheval ?',
    answers: [
      "Les aliments complémentaires pour chevaux ne sont pas simplement une option, mais souvent une nécessité pour soutenir la santé, le bien-être et la performance de l'animal.",
      "L'alimentation de base (foin, herbe, grains) n'apporte pas toujours tous les nutriments nécessaires, en particulier en vitamines, minéraux et oligo-éléments.",
      'Chaque cheval a des besoins nutritionnels uniques, selon son âge, son activité ou sa condition de santé.',
      'Certains aliments complémentaires aident à prévenir ou à accompagner le traitement de troubles spécifiques.',
    ],
  },
  {
    id: 'frequence',
    question: 'À quelle fréquence doit-on donner des aliments complémentaires à un cheval ?',
    answers: [
      "La fréquence de distribution dépend du type d'aliment, des besoins spécifiques du cheval et des objectifs visés. Pour être efficaces, les compléments doivent cependant être administrés de manière régulière et adaptée.",
      "La plupart des aliments complémentaires sont conçus pour être donnés chaque jour, l'organisme du cheval ayant besoin d'un apport constant pour maintenir son équilibre nutritionnel.",
      'Certains compléments sont plus efficaces donnés en cure limitée dans le temps, lorsqu\'ils visent à répondre à un besoin ponctuel ou à soutenir l\'organisme à un moment clé.',
    ],
  },
  {
    id: 'nutrition-equine',
    question: 'Les compléments Nutrition Équine : pensés pour chaque cheval',
    answers: [
      "Tous les chevaux ont des besoins nutritionnels spécifiques : nos formules s'adaptent à chacun d'entre eux, de l'entretien quotidien à la récupération après l'effort.",
    ],
  },
  {
    id: 'risques',
    question: 'Quel risque à donner des aliments complémentaires ?',
    answers: [
      "Donner des aliments complémentaires à son cheval peut être bénéfique, mais présente certains risques si les produits ne sont pas utilisés correctement ou s'ils ne sont pas adaptés à ses besoins spécifiques. En cas de doute, demandez conseil à votre vétérinaire.",
    ],
  },
]
