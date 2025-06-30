import { createClient } from '@sanity/client'

export const client = createClient({
  projectId: '883sse5d',
  dataset: 'production',
  useCdn: process.env.NODE_ENV === 'production',
  apiVersion: '2024-04-23',
})

// ===== TYPY DANYCH =====

// Typy dla Part
export interface Part {
  _id: string;
  name: string;
  icon: string;
  image?: any;
  _createdAt: string;
  _updatedAt: string;
}

// Typy dla Lesson
export interface Lesson {
  _key: string;
  subject: string;
  desc: string;
  image?: any;
  content: any[];
}

// Typy dla Course
export interface Course {
  _id: string;
  subject: string;
  part: Part;
  ocena: boolean;
  image?: any;
  content: any[];
  lesson: Lesson[];
  _createdAt: string;
  _updatedAt: string;
}

// Typy dla Prompts
export interface Prompt {
  _id: string;
  name: string;
  content_date: string;
  code_content: string;
  paragraph_content: string;
  _createdAt: string;
  _updatedAt: string;
}

// Typy dla AIOP
export interface AiopBodyItem {
  _key: string;
  title: string;
  icon: string;
  image?: any;
  content: any[];
}

export interface AiopCourse {
  _key: string;
  part: string;
  subject: string;
  desc: string;
  icon: string;
  body: AiopBodyItem[];
}

export interface Aiop {
  _id: string;
  name: string;
  subtitle: string;
  image?: any;
  icon: string;
  courses: AiopCourse[];
  _createdAt: string;
  _updatedAt: string;
}

// Typy dla Challenges
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

// ===== FUNKCJE DLA PART =====

export async function getAllParts(): Promise<Part[]> {
  const query = `*[_type == "part"] | order(name asc) {
    _id,
    name,
    icon,
    image,
    _createdAt,
    _updatedAt
  }`;
  return await client.fetch(query);
}

export async function getPartById(id: string): Promise<Part | null> {
  const query = `*[_type == "part" && _id == $id][0] {
    _id,
    name,
    icon,
    image,
    _createdAt,
    _updatedAt
  }`;
  return await client.fetch(query, { id });
}

// ===== FUNKCJE DLA COURSE =====

export async function getAllCourses(): Promise<Course[]> {
  const query = `*[_type == "course"] | order(subject asc) {
    _id,
    subject,
    part->{
      _id,
      name,
      icon,
      image
    },
    ocena,
    image,
    content,
    lesson[]{
      _key,
      subject,
      desc,
      image,
      content
    },
    _createdAt,
    _updatedAt
  }`;
  return await client.fetch(query);
}

export async function getCourseById(id: string): Promise<Course | null> {
  const query = `*[_type == "course" && _id == $id][0] {
    _id,
    subject,
    part->{
      _id,
      name,
      icon,
      image
    },
    ocena,
    image,
    content,
    lesson[]{
      _key,
      subject,
      desc,
      image,
      content
    },
    _createdAt,
    _updatedAt
  }`;
  return await client.fetch(query, { id });
}

export async function getCoursesByPart(partId: string): Promise<Course[]> {
  const query = `*[_type == "course" && part._ref == $partId] | order(subject asc) {
    _id,
    subject,
    part->{
      _id,
      name,
      icon,
      image
    },
    ocena,
    image,
    content,
    lesson[]{
      _key,
      subject,
      desc,
      image,
      content
    },
    _createdAt,
    _updatedAt
  }`;
  return await client.fetch(query, { partId });
}

// ===== FUNKCJE DLA PROMPTS =====

export async function getAllPrompts(): Promise<Prompt[]> {
  const query = `*[_type == "prompts"] | order(content_date desc) {
    _id,
    name,
    content_date,
    code_content,
    paragraph_content,
    _createdAt,
    _updatedAt
  }`;
  return await client.fetch(query);
}

export async function getPromptById(id: string): Promise<Prompt | null> {
  const query = `*[_type == "prompts" && _id == $id][0] {
    _id,
    name,
    content_date,
    code_content,
    paragraph_content,
    _createdAt,
    _updatedAt
  }`;
  return await client.fetch(query, { id });
}

export async function getPromptsByDateRange(startDate: string, endDate: string): Promise<Prompt[]> {
  const query = `*[_type == "prompts" && content_date >= $startDate && content_date <= $endDate] | order(content_date desc) {
    _id,
    name,
    content_date,
    code_content,
    paragraph_content,
    _createdAt,
    _updatedAt
  }`;
  return await client.fetch(query, { startDate, endDate });
}

export async function searchPrompts(searchTerm: string): Promise<Prompt[]> {
  const query = `*[_type == "prompts" && (
    name match $searchTerm ||
    code_content match $searchTerm ||
    paragraph_content match $searchTerm
  )] | order(content_date desc) {
    _id,
    name,
    content_date,
    code_content,
    paragraph_content,
    _createdAt,
    _updatedAt
  }`;
  return await client.fetch(query, { searchTerm: `*${searchTerm}*` });
}

// ===== FUNKCJE DLA AIOP =====

export async function getAllAiops(): Promise<Aiop[]> {
  const query = `*[_type == "aiop"] | order(name asc) {
    _id,
    name,
    subtitle,
    image,
    icon,
    courses[]{
      _key,
      part,
      subject,
      desc,
      icon,
      body[]{
        _key,
        title,
        icon,
        image,
        content
      }
    },
    _createdAt,
    _updatedAt
  }`;
  return await client.fetch(query);
}

export async function getAiopById(id: string): Promise<Aiop | null> {
  const query = `*[_type == "aiop" && _id == $id][0] {
    _id,
    name,
    subtitle,
    image,
    icon,
    courses[]{
      _key,
      part,
      subject,
      desc,
      icon,
      body[]{
        _key,
        title,
        icon,
        image,
        content
      }
    },
    _createdAt,
    _updatedAt
  }`;
  return await client.fetch(query, { id });
}

// ===== FUNKCJE KOMBINOWANE =====

// Pobierz wszystkie części z przypisanymi kursami
export async function getPartsWithCourses() {
  const query = `*[_type == "part"]{
    _id,
    name,
    icon,
    image,
    "courses": *[_type == "course" && references(^._id)]{
      _id,
      subject,
      ocena,
      image,
      content,
      lesson[]{
        _key,
        subject,
        desc,
        image,
        content
      }
    }
  }`;
  return await client.fetch(query);
}

// Pobierz statystyki
export async function getStats() {
  const query = `{
    "partsCount": count(*[_type == "part"]),
    "coursesCount": count(*[_type == "course"]),
    "promptsCount": count(*[_type == "prompts"]),
    "aiopCount": count(*[_type == "aiop"]),
    "challengesCount": count(*[_type == "challenges"])
  }`;
  return await client.fetch(query);
}

// ===== FUNKCJE DLA CHALLENGES =====

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