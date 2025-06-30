import { client } from './sanity';
import { Aiop, AiopCourse, AiopBodyItem } from './sanity';

// ===== DODATKOWE FUNKCJE DLA AIOP =====

// Pobierz podstawowe informacje o wszystkich AIOP (bez zagnieżdżonych danych)
export async function getAiopSummary() {
  const query = `*[_type == "aiop"] | order(name asc) {
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

// Wyszukiwanie AIOP po nazwie lub podtytule
export async function searchAiop(searchTerm: string): Promise<Aiop[]> {
  const query = `*[_type == "aiop" && (
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

// Pobierz AIOP z konkretną częścią (part)
export async function getAiopByPart(partName: string): Promise<Aiop[]> {
  const query = `*[_type == "aiop" && $partName in courses[].part] {
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

// Pobierz tylko kursy z konkretnego AIOP
export async function getAiopCourses(aiopId: string): Promise<AiopCourse[]> {
  const query = `*[_type == "aiop" && _id == $aiopId][0].courses[]{
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
  return await client.fetch(query, { aiopId });
}

// Pobierz konkretny kurs z AIOP
export async function getAiopCourse(aiopId: string, courseKey: string): Promise<AiopCourse | null> {
  const query = `*[_type == "aiop" && _id == $aiopId][0].courses[_key == $courseKey][0] {
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
  return await client.fetch(query, { aiopId, courseKey });
}

// Pobierz elementy body z konkretnego kursu AIOP
export async function getAiopCourseBody(aiopId: string, courseKey: string): Promise<AiopBodyItem[]> {
  const query = `*[_type == "aiop" && _id == $aiopId][0].courses[_key == $courseKey][0].body[]{
    _key,
    title,
    icon,
    image,
    content
  }`;
  return await client.fetch(query, { aiopId, courseKey });
}

// Pobierz statystyki AIOP
export async function getAiopStats() {
  const query = `{
    "totalAiop": count(*[_type == "aiop"]),
    "totalCourses": count(*[_type == "aiop"].courses[]),
    "totalBodyItems": count(*[_type == "aiop"].courses[].body[]),
    "aiopWithMostCourses": *[_type == "aiop"] | order(count(courses) desc)[0] {
      name,
      "coursesCount": count(courses)
    }
  }`;
  return await client.fetch(query);
}

// Pobierz najnowsze AIOP (ostatnio utworzone)
export async function getLatestAiop(limit: number = 5) {
  const query = `*[_type == "aiop"] | order(_createdAt desc)[0..$limit] {
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

// Pobierz AIOP z obrazkami
export async function getAiopWithImages(): Promise<Aiop[]> {
  const query = `*[_type == "aiop" && defined(image)] {
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

// Pobierz unikalne części (parts) z wszystkich AIOP
export async function getUniqueAiopParts(): Promise<string[]> {
  const query = `array::unique(*[_type == "aiop"].courses[].part)`;
  return await client.fetch(query);
}

// Wyszukiwanie w treści elementów body
export async function searchInAiopContent(searchTerm: string) {
  const query = `*[_type == "aiop"] {
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

// Pobierz AIOP z określoną liczbą kursów
export async function getAiopWithMinCourses(minCourses: number) {
  const query = `*[_type == "aiop" && count(courses) >= $minCourses] {
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

// Pobierz AIOP z paginacją
export async function getAiopPaginated(page: number = 0, limit: number = 10) {
  const start = page * limit;
  const end = start + limit - 1;
  
  const query = `*[_type == "aiop"] | order(name asc) [$start..$end] {
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

// Sprawdź integralność danych AIOP
export async function checkAiopDataIntegrity() {
  const query = `*[_type == "aiop"] {
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

// Pobierz AIOP pogrupowane po ikonach
export async function getAiopGroupedByIcon() {
  const query = `*[_type == "aiop"] | order(icon asc) {
    _id,
    name,
    subtitle,
    icon,
    "coursesCount": count(courses)
  } | group(icon)`;
  return await client.fetch(query);
}

// Eksportuj wszystkie dane AIOP (pełna struktura)
export async function exportAllAiopData() {
  const query = `*[_type == "aiop"] {
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

// Pobierz AIOP z rozszerzonymi informacjami o liczbie elementów
export async function getAiopWithCounts(): Promise<Aiop[]> {
  const query = `*[_type == "aiop"] | order(name asc) {
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

// Pobierz konkretny element body po tytule
export async function searchAiopBodyByTitle(titleSearch: string) {
  const query = `*[_type == "aiop"] {
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