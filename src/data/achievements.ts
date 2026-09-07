export interface Achievement {
  id: string;
  title: string;
  prominent: boolean;
  stat: string;
}

export const ACHIEVEMENTS_DATA: Achievement[] = [
  {
    id: 'innixo-hackathon',
    title:
      'Ranked among the Top 30 teams out of 600+ participating teams in the Innixo Hackathon.',
    prominent: true,
    stat: 'Top 30',
  },
  {
    id: 'sih-college',
    title:
      'Selected among the Top 5 teams in the college round of Smart India Hackathon (SIH).',
    prominent: true,
    stat: 'Top 5',
  },
  {
    id: 'ctf-top3',
    title:
      'Secured Top 3 in the college-level Capture the Flag (CTF) cybersecurity competition.',
    prominent: true,
    stat: 'Top 3',
  },
  {
    id: 'cyber-quiz',
    title: 'Winner of the college Cyber Quiz.',
    prominent: true,
    stat: 'Winner',
  },
  {
    id: 'german-language',
    title:
      'Completed German language coursework to strengthen cross-cultural communication skills.',
    prominent: true,
    stat: 'Completed',
  },
];
