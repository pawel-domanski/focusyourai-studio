import { client } from './sanity';

// ===== TYPY DANYCH DLA CHALLENGES =====

export interface ChallengeDayItem {
  _key: string;
  title: string;
  description: string;
  icon: string;
  image?: any;
  content: any[];
}

export interface Challenge {
  _id: string;
  challenge_id: number;
  title: string;
  description: string;
  time_duration: string;
  image?: any;
  difficulty: string;
  category: string;
  is_active: boolean;
  days: ChallengeDayItem[];
  _createdAt: string;
  _updatedAt: string;
}

// ===== FUNKCJE DLA CHALLENGES =====

// Pobierz wszystkie wyzwania z pełną strukturą
export async function getAllChallenges(): Promise<Challenge[]> {
  const query = `*[_type == "challenges"] | order(challenge_id asc) {
    _id,
    challenge_id,
    title,
    description,
    time_duration,
    image,
    difficulty,
    category,
    is_active,
    days[]{
      _key,
      title,
      description,
      icon,
      image,
      content
    },
    _createdAt,
    _updatedAt
  }`;
  return await client.fetch(query);
}

// Pobierz jedno wyzwanie po ID
export async function getChallengeById(id: string): Promise<Challenge | null> {
  const query = `*[_type == "challenges" && _id == $id][0] {
    _id,
    challenge_id,
    title,
    description,
    time_duration,
    image,
    difficulty,
    category,
    is_active,
    days[]{
      _key,
      title,
      description,
      icon,
      image,
      content
    },
    _createdAt,
    _updatedAt
  }`;
  return await client.fetch(query, { id });
}

// Pobierz wyzwanie po challenge_id
export async function getChallengeByNumber(challengeId: number): Promise<Challenge | null> {
  const query = `*[_type == "challenges" && challenge_id == $challengeId][0] {
    _id,
    challenge_id,
    title,
    description,
    time_duration,
    image,
    difficulty,
    category,
    is_active,
    days[]{
      _key,
      title,
      description,
      icon,
      image,
      content
    },
    _createdAt,
    _updatedAt
  }`;
  return await client.fetch(query, { challengeId });
}

// Pobierz podstawowe informacje o wyzwaniach (bez dni)
export async function getChallengesSummary() {
  const query = `*[_type == "challenges"] | order(challenge_id asc) {
    _id,
    challenge_id,
    title,
    description,
    time_duration,
    image,
    difficulty,
    category,
    is_active,
    "daysCount": count(days),
    _createdAt,
    _updatedAt
  }`;
  return await client.fetch(query);
}

// Pobierz tylko aktywne wyzwania
export async function getActiveChallenges(): Promise<Challenge[]> {
  const query = `*[_type == "challenges" && is_active == true] | order(challenge_id asc) {
    _id,
    challenge_id,
    title,
    description,
    time_duration,
    image,
    difficulty,
    category,
    days[]{
      _key,
      title,
      description,
      icon,
      image,
      content
    },
    _createdAt,
    _updatedAt
  }`;
  return await client.fetch(query);
}

// Wyszukiwanie wyzwań po tytule lub opisie
export async function searchChallenges(searchTerm: string): Promise<Challenge[]> {
  const query = `*[_type == "challenges" && (
    title match $searchTerm ||
    description match $searchTerm
  )] | order(challenge_id asc) {
    _id,
    challenge_id,
    title,
    description,
    time_duration,
    image,
    difficulty,
    category,
    is_active,
    days[]{
      _key,
      title,
      description,
      icon,
      image,
      content
    },
    _createdAt,
    _updatedAt
  }`;
  return await client.fetch(query, { searchTerm: `*${searchTerm}*` });
}

// Pobierz wyzwania według kategorii
export async function getChallengesByCategory(category: string): Promise<Challenge[]> {
  const query = `*[_type == "challenges" && category == $category] | order(challenge_id asc) {
    _id,
    challenge_id,
    title,
    description,
    time_duration,
    image,
    difficulty,
    category,
    is_active,
    days[]{
      _key,
      title,
      description,
      icon,
      image,
      content
    },
    _createdAt,
    _updatedAt
  }`;
  return await client.fetch(query, { category });
}

// Pobierz wyzwania według poziomu trudności
export async function getChallengesByDifficulty(difficulty: string): Promise<Challenge[]> {
  const query = `*[_type == "challenges" && difficulty == $difficulty] | order(challenge_id asc) {
    _id,
    challenge_id,
    title,
    description,
    time_duration,
    image,
    difficulty,
    category,
    is_active,
    days[]{
      _key,
      title,
      description,
      icon,
      image,
      content
    },
    _createdAt,
    _updatedAt
  }`;
  return await client.fetch(query, { difficulty });
}

// Pobierz wyzwania według czasu trwania
export async function getChallengesByDuration(timeDuration: string) {
  const query = `*[_type == "challenges" && time_duration == $timeDuration] | order(challenge_id asc) {
    _id,
    challenge_id,
    title,
    description,
    time_duration,
    image,
    difficulty,
    category,
    is_active,
    "daysCount": count(days),
    _createdAt,
    _updatedAt
  }`;
  return await client.fetch(query, { timeDuration });
}

// Pobierz tylko dni z konkretnego wyzwania
export async function getChallengeDays(challengeId: string): Promise<ChallengeDayItem[]> {
  const query = `*[_type == "challenges" && _id == $challengeId][0].days[]{
    _key,
    title,
    description,
    icon,
    image,
    content
  }`;
  return await client.fetch(query, { challengeId });
}

// Pobierz konkretny dzień z wyzwania
export async function getChallengeDay(challengeId: string, dayKey: string): Promise<ChallengeDayItem | null> {
  const query = `*[_type == "challenges" && _id == $challengeId][0].days[_key == $dayKey][0] {
    _key,
    title,
    description,
    icon,
    image,
    content
  }`;
  return await client.fetch(query, { challengeId, dayKey });
}

// Pobierz statystyki wyzwań
export async function getChallengesStats() {
  const query = `{
    "totalChallenges": count(*[_type == "challenges"]),
    "activeChallenges": count(*[_type == "challenges" && is_active == true]),
    "totalDays": count(*[_type == "challenges"].days[]),
    "challengesByCategory": *[_type == "challenges"] | group(category),
    "challengesByDifficulty": *[_type == "challenges"] | group(difficulty),
    "averageDaysPerChallenge": count(*[_type == "challenges"].days[]) / count(*[_type == "challenges"])
  }`;
  return await client.fetch(query);
}

// Pobierz najnowsze wyzwania
export async function getLatestChallenges(limit: number = 5) {
  const query = `*[_type == "challenges"] | order(_createdAt desc)[0..$limit] {
    _id,
    challenge_id,
    title,
    description,
    time_duration,
    image,
    difficulty,
    category,
    is_active,
    "daysCount": count(days),
    _createdAt,
    _updatedAt
  }`;
  return await client.fetch(query, { limit: limit - 1 });
}

// Pobierz wyzwania z obrazkami
export async function getChallengesWithImages(): Promise<Challenge[]> {
  const query = `*[_type == "challenges" && defined(image)] {
    _id,
    challenge_id,
    title,
    description,
    time_duration,
    image,
    difficulty,
    category,
    is_active,
    days[]{
      _key,
      title,
      description,
      icon,
      image,
      content
    },
    _createdAt,
    _updatedAt
  }`;
  return await client.fetch(query);
}

// Pobierz unikalne kategorie wyzwań
export async function getUniqueChallengeCategories(): Promise<string[]> {
  const query = `array::unique(*[_type == "challenges"].category)`;
  return await client.fetch(query);
}

// Pobierz unikalne poziomy trudności
export async function getUniqueDifficultyLevels(): Promise<string[]> {
  const query = `array::unique(*[_type == "challenges"].difficulty)`;
  return await client.fetch(query);
}

// Pobierz unikalne czasy trwania
export async function getUniqueTimeDurations(): Promise<string[]> {
  const query = `array::unique(*[_type == "challenges"].time_duration)`;
  return await client.fetch(query);
}

// Wyszukiwanie w treści dni
export async function searchInChallengeContent(searchTerm: string) {
  const query = `*[_type == "challenges"] {
    _id,
    challenge_id,
    title,
    days[pt::text(content) match $searchTerm]{
      _key,
      title,
      description,
      icon,
      image,
      content
    }
  }[count(days) > 0]`;
  return await client.fetch(query, { searchTerm: `*${searchTerm}*` });
}

// Pobierz wyzwania z określoną liczbą dni
export async function getChallengesWithDayRange(minDays: number, maxDays: number) {
  const query = `*[_type == "challenges" && count(days) >= $minDays && count(days) <= $maxDays] {
    _id,
    challenge_id,
    title,
    description,
    time_duration,
    "daysCount": count(days),
    difficulty,
    category,
    is_active
  }`;
  return await client.fetch(query, { minDays, maxDays });
}

// Pobierz wyzwania z paginacją
export async function getChallengesPaginated(page: number = 0, limit: number = 10) {
  const start = page * limit;
  const end = start + limit - 1;
  
  const query = `*[_type == "challenges"] | order(challenge_id asc) [$start..$end] {
    _id,
    challenge_id,
    title,
    description,
    time_duration,
    image,
    difficulty,
    category,
    is_active,
    "daysCount": count(days),
    _createdAt,
    _updatedAt
  }`;
  return await client.fetch(query, { start, end });
}

// Sprawdź integralność danych wyzwań
export async function checkChallengesDataIntegrity() {
  const query = `*[_type == "challenges"] {
    _id,
    challenge_id,
    title,
    "hasDescription": defined(description),
    "hasImage": defined(image),
    "hasDifficulty": defined(difficulty),
    "hasCategory": defined(category),
    "daysCount": count(days),
    "daysWithoutContent": count(days[!defined(content) || count(content) == 0]),
    "daysWithoutDescription": count(days[!defined(description) || description == ""])
  }`;
  return await client.fetch(query);
}

// Eksportuj wszystkie dane wyzwań
export async function exportAllChallengesData() {
  const query = `*[_type == "challenges"] {
    _id,
    _type,
    _createdAt,
    _updatedAt,
    _rev,
    challenge_id,
    title,
    description,
    time_duration,
    image,
    difficulty,
    category,
    is_active,
    days[]{
      _key,
      _type,
      title,
      description,
      icon,
      image,
      content
    }
  }`;
  return await client.fetch(query);
} 