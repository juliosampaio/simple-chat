export interface ICharacter {
  id: number;
  name: string;
  avatar?: string;
}

const characters: ICharacter[] = [
  {
    id: 1,
    name: 'Rick Sanchez',
  },
  {
    id: 2,
    name: 'Morty Smith',
  },
  {
    id: 3,
    name: 'Summer Smith',
  },
  {
    id: 4,
    name: 'Beth Smith',
  },
  {
    id: 5,
    name: 'Jerry Smith',
  },
  {
    id: 6,
    name: 'Abadango Cluster Princess',
  },
  {
    id: 7,
    name: 'Abradolf Lincler',
  },
  {
    id: 8,
    name: 'Adjudicator Rick',
  },
  {
    id: 9,
    name: 'Agency Director',
  },
  {
    id: 10,
    name: 'Alan Rails',
  },
  {
    id: 11,
    name: 'Albert Einstein',
  },
  {
    id: 12,
    name: 'Alexander',
  },
  {
    id: 13,
    name: 'Alien Googah',
  },
  {
    id: 14,
    name: 'Alien Morty',
  },
  {
    id: 16,
    name: 'Amish Cyborg',
  },
  {
    id: 17,
    name: 'Annie',
  },
  {
    id: 18,
    name: 'Antenna Morty',
  },
  {
    id: 19,
    name: 'Antenna Rick',
  },
  {
    id: 20,
    name: 'Ants in my Eyes Johnson',
  },
];

export const getRandomCharacter = (): ICharacter => {
  const index = Math.floor(Math.random() * characters.length);
  const char = characters[index];
  char.avatar = `https://rickandmortyapi.com/api/character/avatar/${char.id}.jpeg`;
  return char;
};
