// ===== PRZYKŁADY KOMPONENTÓW NEXT.JS =====

import { 
  getAllParts, 
  getAllCourses, 
  getAllPrompts, 
  getAllAiops,
  getAllChallenges,
  getPartsWithCourses,
  getStats,
  Part,
  Course,
  Prompt,
  Aiop,
  Challenge
} from '../lib/sanity';

// ===== STRONA GŁÓWNA Z WSZYSTKIMI DANYMI =====
export async function HomePage() {
  const [parts, courses, prompts, aiops, challenges, stats] = await Promise.all([
    getAllParts(),
    getAllCourses(),
    getAllPrompts(),
    getAllAiops(),
    getAllChallenges(),
    getStats()
  ]);

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">FocusYourAI Dashboard</h1>
      
      {/* Statystyki */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
        <div className="bg-blue-100 p-4 rounded-lg text-center">
          <h3 className="text-2xl font-bold text-blue-600">{stats.partsCount}</h3>
          <p className="text-blue-800">Części</p>
        </div>
        <div className="bg-green-100 p-4 rounded-lg text-center">
          <h3 className="text-2xl font-bold text-green-600">{stats.coursesCount}</h3>
          <p className="text-green-800">Kursy</p>
        </div>
        <div className="bg-yellow-100 p-4 rounded-lg text-center">
          <h3 className="text-2xl font-bold text-yellow-600">{stats.promptsCount}</h3>
          <p className="text-yellow-800">Prompty</p>
        </div>
        <div className="bg-purple-100 p-4 rounded-lg text-center">
          <h3 className="text-2xl font-bold text-purple-600">{stats.aiopCount}</h3>
          <p className="text-purple-800">AIOP</p>
        </div>
        <div className="bg-orange-100 p-4 rounded-lg text-center">
          <h3 className="text-2xl font-bold text-orange-600">{stats.challengesCount}</h3>
          <p className="text-orange-800">Wyzwania</p>
        </div>
      </div>

      {/* Części */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">📚 Części</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {parts.map((part) => (
            <div key={part._id} className="border rounded-lg p-4">
              <h3 className="font-semibold">{part.name}</h3>
              <span className="text-2xl">{part.icon}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Kursy */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">🎓 Kursy</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {courses.map((course) => (
            <div key={course._id} className="border rounded-lg p-4">
              <h3 className="font-semibold">{course.subject}</h3>
              <p className="text-sm text-gray-600">
                Część: {course.part.name}
              </p>
              <p className="text-sm">
                Lekcji: {course.lesson.length}
              </p>
              <span className={`inline-block px-2 py-1 text-xs rounded ${
                course.ocena ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
              }`}>
                {course.ocena ? 'Z oceną' : 'Bez oceny'}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Prompty */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">💡 Najnowsze Prompty</h2>
        <div className="space-y-4">
          {prompts.slice(0, 5).map((prompt) => (
            <div key={prompt._id} className="border rounded-lg p-4">
              <h3 className="font-semibold">{prompt.name}</h3>
              <p className="text-sm text-gray-600 mb-2">
                {new Date(prompt.content_date).toLocaleDateString('pl-PL')}
              </p>
              {prompt.code_content && (
                <code className="bg-gray-100 p-2 rounded block text-sm mb-2">
                  {prompt.code_content}
                </code>
              )}
              {prompt.paragraph_content && (
                <p className="text-gray-700 text-sm">
                  {prompt.paragraph_content.substring(0, 200)}...
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* AIOP */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">🤖 AI-Driven Operating Procedures</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {aiops.map((aiop) => (
            <div key={aiop._id} className="border rounded-lg p-4">
              <h3 className="font-semibold">{aiop.name}</h3>
              <p className="text-sm text-gray-600 mb-2">{aiop.subtitle}</p>
              <p className="text-sm">
                Kursów: {aiop.courses.length}
              </p>
              <span className="text-2xl">{aiop.icon}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Wyzwania */}
      <section>
        <h2 className="text-2xl font-bold mb-4">🏆 Wyzwania AI</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {challenges.map((challenge) => (
            <div key={challenge._id} className="border rounded-lg p-4">
              <h3 className="font-semibold">{challenge.title}</h3>
              <p className="text-sm text-gray-600 mb-2">{challenge.description}</p>
              <div className="flex justify-between items-center text-sm mb-2">
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
                  {challenge.time_duration}
                </span>
                <span className={`px-2 py-1 rounded ${
                  challenge.difficulty === 'beginner' ? 'bg-green-100 text-green-800' :
                  challenge.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-800' :
                  challenge.difficulty === 'advanced' ? 'bg-orange-100 text-orange-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {challenge.difficulty}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500">
                  Dni: {challenge.days.length}
                </span>
                <span className={`text-xs px-2 py-1 rounded ${
                  challenge.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                }`}>
                  {challenge.is_active ? 'Aktywne' : 'Nieaktywne'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

// ===== STRONA CZĘŚCI Z KURSAMI =====
export async function PartsWithCoursesPage() {
  const partsWithCourses = await getPartsWithCourses();

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Części i Kursy</h1>
      
      {partsWithCourses.map((part) => (
        <section key={part._id} className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <span>{part.icon}</span>
            {part.name}
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {part.courses.map((course) => (
              <div key={course._id} className="border rounded-lg p-4">
                <h3 className="font-semibold mb-2">{course.subject}</h3>
                <p className="text-sm text-gray-600 mb-2">
                  Lekcji: {course.lesson.length}
                </p>
                
                {/* Lista lekcji */}
                <div className="space-y-1">
                  {course.lesson.slice(0, 3).map((lesson) => (
                    <div key={lesson._key} className="text-xs text-gray-500">
                      • {lesson.subject}
                    </div>
                  ))}
                  {course.lesson.length > 3 && (
                    <div className="text-xs text-gray-400">
                      ... i {course.lesson.length - 3} więcej
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          
          {part.courses.length === 0 && (
            <p className="text-gray-500 italic">Brak kursów w tej części.</p>
          )}
        </section>
      ))}
    </main>
  );
}

// ===== STRONA PROMPTÓW Z WYSZUKIWANIEM =====
'use client';

import { useState, useEffect } from 'react';
import { searchPrompts, getAllPrompts } from '../lib/sanity';

export function PromptsSearchPage() {
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPrompts();
  }, []);

  const loadPrompts = async () => {
    setLoading(true);
    try {
      const data = await getAllPrompts();
      setPrompts(data);
    } catch (error) {
      console.error('Error loading prompts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (term: string) => {
    setSearchTerm(term);
    if (term.trim() === '') {
      loadPrompts();
      return;
    }

    setLoading(true);
    try {
      const results = await searchPrompts(term);
      setPrompts(results);
    } catch (error) {
      console.error('Error searching prompts:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">💡 Prompty</h1>
      
      {/* Wyszukiwarka */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Szukaj promptów..."
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Lista promptów */}
      {loading ? (
        <div className="text-center py-8">Ładowanie...</div>
      ) : (
        <div className="space-y-6">
          {prompts.map((prompt) => (
            <div key={prompt._id} className="border rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-2">{prompt.name}</h2>
              <p className="text-sm text-gray-600 mb-4">
                {new Date(prompt.content_date).toLocaleDateString('pl-PL')}
              </p>
              
              {prompt.code_content && (
                <div className="mb-4">
                  <h3 className="font-medium mb-2">Kod:</h3>
                  <pre className="bg-gray-100 p-3 rounded overflow-x-auto">
                    <code>{prompt.code_content}</code>
                  </pre>
                </div>
              )}
              
              {prompt.paragraph_content && (
                <div>
                  <h3 className="font-medium mb-2">Treść:</h3>
                  <p className="text-gray-700 whitespace-pre-wrap">
                    {prompt.paragraph_content}
                  </p>
                </div>
              )}
            </div>
          ))}
          
          {prompts.length === 0 && !loading && (
            <div className="text-center py-8 text-gray-500">
              {searchTerm ? 'Nie znaleziono promptów.' : 'Brak promptów.'}
            </div>
          )}
        </div>
      )}
    </main>
  );
}

// ===== API ROUTES =====

// app/api/parts/route.ts
export async function GET() {
  try {
    const parts = await getAllParts();
    return Response.json(parts);
  } catch (error) {
    return Response.json({ error: 'Failed to fetch parts' }, { status: 500 });
  }
}

// app/api/courses/route.ts
export async function GET() {
  try {
    const courses = await getAllCourses();
    return Response.json(courses);
  } catch (error) {
    return Response.json({ error: 'Failed to fetch courses' }, { status: 500 });
  }
}

// app/api/prompts/route.ts
export async function GET() {
  try {
    const prompts = await getAllPrompts();
    return Response.json(prompts);
  } catch (error) {
    return Response.json({ error: 'Failed to fetch prompts' }, { status: 500 });
  }
}

// app/api/aiop/route.ts  
export async function GET() {
  try {
    const aiops = await getAllAiops();
    return Response.json(aiops);
  } catch (error) {
    return Response.json({ error: 'Failed to fetch AIOP' }, { status: 500 });
  }
}

// app/api/challenges/route.ts
export async function GET() {
  try {
    const challenges = await getAllChallenges();
    return Response.json(challenges);
  } catch (error) {
    return Response.json({ error: 'Failed to fetch challenges' }, { status: 500 });
  }
}

// ===== STRONA WYZWAŃ Z FILTRAMI =====
'use client';

import { useState, useEffect } from 'react';
import { 
  getAllChallenges, 
  getActiveChallenges, 
  searchChallenges,
  getUniqueChallengeCategories,
  getUniqueDifficultyLevels 
} from '../lib/sanity';

export function ChallengesPage() {
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [difficulties, setDifficulties] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [showActiveOnly, setShowActiveOnly] = useState(false);

  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    setLoading(true);
    try {
      const [challengesData, categoriesData, difficultiesData] = await Promise.all([
        getAllChallenges(),
        getUniqueChallengeCategories(),
        getUniqueDifficultyLevels()
      ]);
      
      setChallenges(challengesData);
      setCategories(categoriesData.filter(Boolean));
      setDifficulties(difficultiesData.filter(Boolean));
    } catch (error) {
      console.error('Error loading challenges data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (term: string) => {
    setSearchTerm(term);
    if (term.trim() === '') {
      loadChallenges();
      return;
    }

    setLoading(true);
    try {
      const results = await searchChallenges(term);
      setChallenges(results);
    } catch (error) {
      console.error('Error searching challenges:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadChallenges = async () => {
    setLoading(true);
    try {
      const data = showActiveOnly ? await getActiveChallenges() : await getAllChallenges();
      setChallenges(data);
    } catch (error) {
      console.error('Error loading challenges:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!searchTerm) {
      loadChallenges();
    }
  }, [showActiveOnly]);

  const filteredChallenges = challenges.filter(challenge => {
    const matchesCategory = !selectedCategory || challenge.category === selectedCategory;
    const matchesDifficulty = !selectedDifficulty || challenge.difficulty === selectedDifficulty;
    return matchesCategory && matchesDifficulty;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-orange-100 text-orange-800';
      case 'expert': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">🏆 Wyzwania AI</h1>
      
      {/* Filtry */}
      <div className="bg-gray-50 p-4 rounded-lg mb-6">
        <div className="grid md:grid-cols-4 gap-4 mb-4">
          {/* Wyszukiwarka */}
          <input
            type="text"
            placeholder="Szukaj wyzwań..."
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          
          {/* Kategoria */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Wybierz kategorię wyzwania"
          >
            <option value="">Wszystkie kategorie</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
          
          {/* Poziom trudności */}
          <select
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
            className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Wybierz poziom trudności"
          >
            <option value="">Wszystkie poziomy</option>
            {difficulties.map(difficulty => (
              <option key={difficulty} value={difficulty}>{difficulty}</option>
            ))}
          </select>
          
          {/* Tylko aktywne */}
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={showActiveOnly}
              onChange={(e) => setShowActiveOnly(e.target.checked)}
              className="rounded"
            />
            <span className="text-sm">Tylko aktywne</span>
          </label>
        </div>
        
        <div className="text-sm text-gray-600">
          Znaleziono: {filteredChallenges.length} wyzwań
        </div>
      </div>

      {/* Lista wyzwań */}
      {loading ? (
        <div className="text-center py-8">Ładowanie...</div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredChallenges.map((challenge) => (
            <div key={challenge._id} className="border rounded-lg p-6 hover:shadow-lg transition-shadow">
              <div className="flex justify-between items-start mb-3">
                <h2 className="text-xl font-semibold">{challenge.title}</h2>
                <span className={`text-xs px-2 py-1 rounded ${
                  challenge.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                }`}>
                  {challenge.is_active ? 'Aktywne' : 'Nieaktywne'}
                </span>
              </div>
              
              <p className="text-gray-600 mb-4">{challenge.description}</p>
              
              <div className="space-y-2 mb-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Czas trwania:</span>
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                    {challenge.time_duration}
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Poziom:</span>
                  <span className={`px-2 py-1 rounded text-sm ${getDifficultyColor(challenge.difficulty)}`}>
                    {challenge.difficulty}
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Kategoria:</span>
                  <span className="text-sm text-gray-600">{challenge.category}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Liczba dni:</span>
                  <span className="text-sm text-gray-600">{challenge.days.length}</span>
                </div>
              </div>
              
              {/* Podgląd pierwszych dni */}
              {challenge.days.length > 0 && (
                <div className="border-t pt-3">
                  <h3 className="text-sm font-medium mb-2">Pierwsze dni:</h3>
                  <div className="space-y-1">
                    {challenge.days.slice(0, 3).map((day) => (
                      <div key={day._key} className="text-xs text-gray-500 flex items-center">
                        <span className="mr-2">{day.icon}</span>
                        {day.title}
                      </div>
                    ))}
                    {challenge.days.length > 3 && (
                      <div className="text-xs text-gray-400">
                        ... i {challenge.days.length - 3} więcej dni
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      
      {filteredChallenges.length === 0 && !loading && (
        <div className="text-center py-8 text-gray-500">
          {searchTerm || selectedCategory || selectedDifficulty ? 
            'Nie znaleziono wyzwań spełniających kryteria.' : 
            'Brak wyzwań.'}
        </div>
      )}
    </main>
  );
} 