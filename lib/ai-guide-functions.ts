import { client } from './sanity';

// ===== TYPY DANYCH DLA AI GUIDE =====

export interface AiGuideBodyItem {
  _key: string;
  title: string;
  icon: string;
  image?: any;
  content: any[];
}

export interface AiGuideCourse {
  _key: string;
  part: string;
  subject: string;
  desc: string;
  icon: string;
  body: AiGuideBodyItem[];
}

export interface AiGuide {
  _id: string;
  name: string;
  subtitle: string;
  image?: any;
  icon: string;
  courses: AiGuideCourse[];
  _createdAt: string;
  _updatedAt: string;
}

// ===== FUNKCJE DLA AI GUIDE =====

// Pobierz wszystkie AI Guide z pełną strukturą
export async function getAllAiGuides(): Promise<AiGuide[]> {
  const query = `*[_type == "aiGuide"] | order(name asc) {
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

// Pobierz jeden AI Guide po ID
export async function getAiGuideById(id: string): Promise<AiGuide | null> {
  const query = `*[_type == "aiGuide" && _id == $id][0] {
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

// Pobierz podstawowe informacje o AI Guide
export async function getAiGuideSummary() {
  const query = `*[_type == "aiGuide"] | order(name asc) {
    _id,
    name,
    subtitle,
    image,
    icon,
    "coursesCount": count(courses),
    _createdAt,
    _updatedAt
  }`;
  return await client.fetch(query);
}

// Wyszukiwanie AI Guide
export async function searchAiGuides(searchTerm: string): Promise<AiGuide[]> {
  const query = `*[_type == "aiGuide" && (
    name match $searchTerm ||
    subtitle match $searchTerm
  )] | order(name asc) {
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
  return await client.fetch(query, { searchTerm: `*${searchTerm}*` });
}

// Pobierz AI Guide z konkretnym rozdziałem (part)
export async function getAiGuideByPart(partName: string): Promise<AiGuide[]> {
  const query = `*[_type == "aiGuide" && $partName in courses[].part] {
    _id,
    name,
    subtitle,
    image,
    icon,
    courses[part == $partName]{
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
  return await client.fetch(query, { partName });
}

// Pobierz tylko kursy z konkretnego AI Guide
export async function getAiGuideCourses(guideId: string): Promise<AiGuideCourse[]> {
  const query = `*[_type == "aiGuide" && _id == $guideId][0].courses[]{
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
  }`;
  return await client.fetch(query, { guideId });
}

// Pobierz konkretny kurs z AI Guide
export async function getAiGuideCourse(guideId: string, courseKey: string): Promise<AiGuideCourse | null> {
  const query = `*[_type == "aiGuide" && _id == $guideId][0].courses[_key == $courseKey][0] {
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
  }`;
  return await client.fetch(query, { guideId, courseKey });
}

// Pobierz elementy body z konkretnego kursu AI Guide
export async function getAiGuideCourseBody(guideId: string, courseKey: string): Promise<AiGuideBodyItem[]> {
  const query = `*[_type == "aiGuide" && _id == $guideId][0].courses[_key == $courseKey][0].body[]{
    _key,
    title,
    icon,
    image,
    content
  }`;
  return await client.fetch(query, { guideId, courseKey });
}

// Pobierz statystyki AI Guide
export async function getAiGuideStats() {
  const query = `{
    "totalGuides": count(*[_type == "aiGuide"]),
    "totalCourses": count(*[_type == "aiGuide"].courses[]),
    "totalBodyItems": count(*[_type == "aiGuide"].courses[].body[]),
    "guideWithMostCourses": *[_type == "aiGuide"] | order(count(courses) desc)[0] {
      name,
      "coursesCount": count(courses)
    }
  }`;
  return await client.fetch(query);
}

// Pobierz najnowsze AI Guide
export async function getLatestAiGuides(limit: number = 5) {
  const query = `*[_type == "aiGuide"] | order(_createdAt desc)[0..$limit] {
    _id,
    name,
    subtitle,
    image,
    icon,
    "coursesCount": count(courses),
    _createdAt,
    _updatedAt
  }`;
  return await client.fetch(query, { limit: limit - 1 });
}

// Pobierz AI Guide z obrazkami
export async function getAiGuidesWithImages(): Promise<AiGuide[]> {
  const query = `*[_type == "aiGuide" && defined(image)] {
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

// Pobierz unikalne części (parts) z wszystkich AI Guide
export async function getUniqueAiGuideParts(): Promise<string[]> {
  const query = `array::unique(*[_type == "aiGuide"].courses[].part)`;
  return await client.fetch(query);
}

// Wyszukiwanie w treści elementów body
export async function searchInAiGuideContent(searchTerm: string) {
  const query = `*[_type == "aiGuide"] {
    _id,
    name,
    subtitle,
    courses[]{
      _key,
      subject,
      body[pt::text(content) match $searchTerm]{
        _key,
        title,
        icon,
        image,
        content
      }
    }
  }[count(courses[].body) > 0]`;
  return await client.fetch(query, { searchTerm: `*${searchTerm}*` });
}

// Pobierz AI Guide z określoną liczbą kursów
export async function getAiGuidesWithMinCourses(minCourses: number) {
  const query = `*[_type == "aiGuide" && count(courses) >= $minCourses] {
    _id,
    name,
    subtitle,
    "coursesCount": count(courses),
    courses[]{
      _key,
      part,
      subject,
      desc,
      icon
    }
  }`;
  return await client.fetch(query, { minCourses });
}

// Pobierz AI Guide z paginacją
export async function getAiGuidesPaginated(page: number = 0, limit: number = 10) {
  const start = page * limit;
  const end = start + limit - 1;
  
  const query = `*[_type == "aiGuide"] | order(name asc) [$start..$end] {
    _id,
    name,
    subtitle,
    image,
    icon,
    "coursesCount": count(courses),
    _createdAt,
    _updatedAt
  }`;
  return await client.fetch(query, { start, end });
}

// Sprawdź integralność danych AI Guide
export async function checkAiGuideDataIntegrity() {
  const query = `*[_type == "aiGuide"] {
    _id,
    name,
    "hasSubtitle": defined(subtitle),
    "hasImage": defined(image),
    "hasIcon": defined(icon),
    "coursesCount": count(courses),
    "coursesWithoutBody": count(courses[count(body) == 0]),
    "totalBodyItems": count(courses[].body[]),
    "bodyItemsWithoutContent": count(courses[].body[!defined(content) || count(content) == 0])
  }`;
  return await client.fetch(query);
}

// Pobierz AI Guide pogrupowane po ikonach
export async function getAiGuidesGroupedByIcon() {
  const query = `*[_type == "aiGuide"] | order(icon asc) {
    _id,
    name,
    subtitle,
    icon,
    "coursesCount": count(courses)
  } | group(icon)`;
  return await client.fetch(query);
}

// Eksportuj wszystkie dane AI Guide
export async function exportAllAiGuideData() {
  const query = `*[_type == "aiGuide"] {
    _id,
    _type,
    _createdAt,
    _updatedAt,
    _rev,
    name,
    subtitle,
    image,
    icon,
    courses[]{
      _key,
      _type,
      part,
      subject,
      desc,
      icon,
      body[]{
        _key,
        _type,
        title,
        icon,
        image,
        content
      }
    }
  }`;
  return await client.fetch(query);
}

// Pobierz AI Guide z rozszerzonymi informacjami o liczbie elementów
export async function getAiGuidesWithCounts(): Promise<AiGuide[]> {
  const query = `*[_type == "aiGuide"] | order(name asc) {
    _id,
    name,
    subtitle,
    image,
    icon,
    "coursesCount": count(courses),
    "totalBodyItems": count(courses[].body[]),
    courses[]{
      _key,
      part,
      subject,
      desc,
      icon,
      "bodyItemsCount": count(body),
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

// Pobierz kursy pogrupowane po części (part)
export async function getAiGuideCoursesGroupedByPart(guideId: string) {
  const query = `*[_type == "aiGuide" && _id == $guideId][0] {
    _id,
    name,
    courses[]{
      _key,
      part,
      subject,
      desc,
      icon
    }
  } | {
    "parts": array::unique(courses[].part),
    "coursesByPart": courses[] | group(part)
  }`;
  return await client.fetch(query, { guideId });
}

// Pobierz AI Guide z kursami zawierającymi konkretną ikonę
export async function getAiGuidesByIcon(iconName: string) {
  const query = `*[_type == "aiGuide" && $iconName in courses[].icon] {
    _id,
    name,
    subtitle,
    courses[icon == $iconName]{
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
    }
  }`;
  return await client.fetch(query, { iconName });
}

// Pobierz elementy body z obrazkami
export async function getAiGuideBodyItemsWithImages() {
  const query = `*[_type == "aiGuide"] {
    _id,
    name,
    courses[]{
      _key,
      subject,
      body[defined(image)]{
        _key,
        title,
        icon,
        image,
        content
      }
    }
  }[count(courses[].body) > 0]`;
  return await client.fetch(query);
}

// Wyszukaj AI Guide po przedmiocie kursu
export async function searchAiGuidesBySubject(subjectSearch: string) {
  const query = `*[_type == "aiGuide" && $subjectSearch in courses[].subject] {
    _id,
    name,
    subtitle,
    courses[subject match $subjectSearch]{
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
    }
  }`;
  return await client.fetch(query, { subjectSearch: `*${subjectSearch}*` });
}

// Pobierz konkretny element body po tytule
export async function searchAiGuideBodyByTitle(titleSearch: string) {
  const query = `*[_type == "aiGuide"] {
    _id,
    name,
    courses[]{
      _key,
      subject,
      body[title match $titleSearch]{
        _key,
        title,
        icon,
        image,
        content
      }
    }
  }[count(courses[].body) > 0]`;
  return await client.fetch(query, { titleSearch: `*${titleSearch}*` });
} 