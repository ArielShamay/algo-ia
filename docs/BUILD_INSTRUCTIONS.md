# 🔨 הוראות בנייה: פרויקט ויזואליזציית אלגוריתמי גרפים

מסמך זה מכיל הוראות מפורטות לבניית הפרויקט בשבעה שלבים (0-6).
**כל סוכן חייב לקרוא את המסמך הזה לפני תחילת העבודה על השלב שלו.**

## 📋 עקרונות כלליים לכל השלבים

### 1. קריאת מסמכי יסוד

לפני תחילת כל שלב, קרא:

- `docs/ARCHITECTURE.md` — הארכיטקטורה הכוללת של הפרויקט
- `docs/BUILD_INSTRUCTIONS.md` (מסמך זה) — השלב הספציפי שלך

### 2. מניעת לולאות אין סופיות ודליפות זיכרון

**כללי בטיחות חובה לכל שלב:**

- **Timeouts**: כל לולאה/פונקציה/בדיקה חייבת להיות מוגבלת בזמן או במספר iterations
- **Counters**: הוסף מונים למעקב אחר מספר iterations (max iterations לפי גודל input)
- **Logging מוגבל**: לא יותר מ-100 שורות log בכל execution
- **Memory limits**: ודא שאין צבירת זיכרון בלתי מוגבלת (arrays, objects, closures)
- **Early exits**: הוסף תנאי יציאה מוקדמים בלולאות
- **Recursion depth**: הגבל עומק רקורסיה למקסימום 100
- **Testing timeouts**: כל test חייב להיות עם timeout מפורש

### 3. Git Workflow

- Branch naming: `feature/<stage-number>-<description>` (למשל: `feature/0-infra-setup`)
- Commit messages: בעברית או אנגלית, תיאור קצר וברור
- PR template:
  ```
  ## שלב: [מספר ושם השלב]
  ## שינויים:
  - [רשימת שינויים]
  ## בדיקות שבוצעו:
  - [רשימת בדיקות]
  ## קריטריוני קבלה:
  - [✓/✗] [קריטריון 1]
  - [✓/✗] [קריטריון 2]
  ```

### 4. Code Style

- TypeScript strict mode: `"strict": true` ב-tsconfig.json
- ESLint + Prettier: הרץ לפני כל commit
- Comments: בעברית או אנגלית, תיאור קצר ל-functions מורכבות
- Type safety: אסור להשתמש ב-`any` — רק טיפוסים מפורשים

---

## 🔧 שלב 0 — הכנה ותשתית (Core/Infra Agent)

### מטרת השלב

הקמת התשתית הבסיסית של הפרויקט: TypeScript, React, testing, CI/CD, ומבנה תיקיות.

### מטלות

1. **יצירת Repo ו-Init**

   - צור repo חדש ב-GitHub (אם לא קיים)
   - הרץ: `npm init -y`
   - התקן dependencies:
     ```powershell
     npm install react react-dom typescript vite --save
     npm install -D @types/react @types/react-dom eslint prettier husky lint-staged vitest @testing-library/react @testing-library/jest-dom
     ```

2. **קבצי Config**

   - צור `tsconfig.json`:
     ```json
     {
       "compilerOptions": {
         "target": "ES2020",
         "useDefineForClassFields": true,
         "lib": ["ES2020", "DOM", "DOM.Iterable"],
         "module": "ESNext",
         "skipLibCheck": true,
         "moduleResolution": "bundler",
         "allowImportingTsExtensions": true,
         "resolveJsonModule": true,
         "isolatedModules": true,
         "noEmit": true,
         "jsx": "react-jsx",
         "strict": true,
         "noUnusedLocals": true,
         "noUnusedParameters": true,
         "noFallthroughCasesInSwitch": true
       },
       "include": ["src"],
       "references": [{ "path": "./tsconfig.node.json" }]
     }
     ```
   - צור `.eslintrc.json`:
     ```json
     {
       "extends": [
         "eslint:recommended",
         "plugin:@typescript-eslint/recommended"
       ],
       "parser": "@typescript-eslint/parser",
       "plugins": ["@typescript-eslint"],
       "root": true
     }
     ```
   - צור `.prettierrc`:
     ```json
     {
       "semi": true,
       "singleQuote": true,
       "tabWidth": 2,
       "trailingComma": "es5"
     }
     ```

3. **מבנה תיקיות**

   ```
   src/
     core/
       types.ts (יצוץ בשלב 1)
       Graph.ts (יצוץ בשלב 1)
       Algorithms.ts (יצוץ בשלב 2)
     components/
       GraphVisualizer.tsx (יצוץ בשלב 3)
       MatrixView.tsx (יצוץ בשלב 3)
       NodeEdgeView.tsx (יצוץ בשלב 3)
     App.tsx (יצוץ בשלב 4)
     main.tsx
   tests/
     core/
       Graph.test.ts (יצוץ בשלב 1)
       Algorithms.test.ts (יצוץ בשלב 2)
   ```

4. **Scripts ב-package.json**

   ```json
   "scripts": {
     "dev": "vite",
     "build": "tsc && vite build",
     "test": "vitest",
     "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
     "format": "prettier --write \"src/**/*.{ts,tsx}\""
   }
   ```

5. **CI/CD — GitHub Actions**
   - צור `.github/workflows/ci.yml`:
     ```yaml
     name: CI
     on: [push, pull_request]
     jobs:
       build:
         runs-on: windows-latest
         timeout-minutes: 10
         steps:
           - uses: actions/checkout@v3
           - uses: actions/setup-node@v3
             with:
               node-version: '18'
           - run: npm ci
           - run: npm run lint
           - run: npm run build
           - run: npm test
     ```

### קריטריוני קבלה

- [✓] `npm install` עובר ללא שגיאות
- [✓] `npm run build` עובר ללא שגיאות
- [✓] `npm run test` עובר (גם אם אין בדיקות עדיין)
- [✓] `npm run lint` עובר ללא שגיאות
- [✓] GitHub Actions workflow רץ בהצלחה
- [✓] מבנה תיקיות src/ ו-tests/ קיים

### הוראות בטיחות

- **CI timeout**: הוגדר ל-10 דקות מקסימום למניעת תקיעות
- **Husky hooks**: אם מוסיפים, ודאו שאין loops — הוסיפו timeout של 30 שניות
- **Logging**: הגבילו logging ב-scripts ל-100 שורות

### זמן מוערך

0.5–1 יום

---

## 📊 שלב 1 — חוזה טיפוסים ו-Graph API (Core Agent)

### מטרת השלב

הגדרת כל טיפוסי הנתונים (interfaces) ומימוש class Graph עם ולידציה ויצירה רנדומלית.

### מטלות

1. **src/core/types.ts**
   הגדר את כל ה-interfaces:

   ```typescript
   export interface GraphError {
     message: string;
     code: 'INVALID_MATRIX' | 'NEGATIVE_WEIGHT' | 'OUT_OF_BOUNDS';
   }

   export interface ShortestPathResult {
     distance: number;
     path?: number[];
     visited?: number[];
     error?: string;
   }

   export interface CycleResult {
     hasCycle: boolean;
     cycle?: number[];
     visited?: number[];
   }

   export interface BipartiteResult {
     isBipartite: boolean;
     partitions?: [number[], number[]];
     error?: string;
   }

   export interface NegativeCycleResult {
     hasNegativeCycle: boolean;
     cycle?: number[];
   }

   export interface RandomGraphOptions {
     vertices: number;
     directed: boolean;
     density: number; // 0-1
     weightRange: [number, number];
     seed?: number;
   }

   export type AlgorithmResult =
     | ShortestPathResult
     | CycleResult
     | BipartiteResult
     | NegativeCycleResult;
   ```

2. **src/core/Graph.ts**
   מימוש class Graph עם:

   - ולידציה מלאה של מטריצה (ריבועית, לא ריקה, אין שליליים באלכסון)
   - `loadGraph()`, `getNeighbors()`, `getEdgeWeight()`, `getNumberOfNodes()`, `isDirectedGraph()`
   - `static generateRandomGraph()` עם seed לדטרמיניזם
   - הגנה מפני out-of-bounds ולולאות אין סופיות

3. **tests/core/Graph.test.ts**
   בדיקות יחידה:
   - יצירת גרף תקין
   - זריקת errors על מטריצות לא תקינות
   - generator deterministc עם seed
   - טיפול נכון ב-out-of-bounds

### קריטריוני קבלה

- [✓] src/core/types.ts קיים עם כל ה-interfaces
- [✓] src/core/Graph.ts מיושם עם כל השיטות
- [✓] ולידציה עובדת: זורקת errors על מטריצות לא תקינות
- [✓] generateRandomGraph עם seed מחזיר אותו גרף בכל ריצה
- [✓] tests/core/Graph.test.ts עובר עם כיסוי ≥80%
- [✓] אין לולאות אין סופיות (בדיקה: timeouts על tests)

### הוראות בטיחות

- **Loop limits**: בכל for loop, הוסף תנאי `&& i < maxIterations`
- **Test timeouts**: כל test עם `timeout: 5000` (5 שניות)
- **Bounds checking**: בכל גישה למטריצה, בדוק bounds
- **Memory**: אל תצבור arrays גדולים — השתמש ב-generators אם צריך

### זמן מוערך

1–2 ימים

---

## 🧮 שלב 2 — אלגוריתמים גרפיים (Algorithms Agent)

### מטרת השלב

מימוש כל האלגוריתמים על גרפים: isConnected, shortestPath, isContainsCycle, isBipartite, negativeCycle.

### מטלות

1. **src/core/Algorithms.ts**
   מימוש מחלקה סטטית עם:

   - `isConnected()` — BFS/DFS, O(V + E)
   - `shortestPath()` — Bellman-Ford, O(V \* E)
   - `isContainsCycle()` — DFS, O(V + E)
   - `isBipartite()` — BFS צביעה, O(V + E)
   - `negativeCycle()` — Bellman-Ford detection, O(V \* E)

   **דרישות:**

   - כל אלגוריתם מחזיר טיפוס מבני מ-types.ts
   - הגבלת iterations למניעת לולאות אין סופיות
   - Early exits כשאפשר
   - הגנה מפני עומק רקורסיה (max 100)
   - תיעוד מורכבות זמן/זיכרון

2. **tests/core/Algorithms.test.ts**
   בדיקות יחידה לכל אלגוריתם:
   - גרפים מכוונים/לא מכוונים
   - Edge cases (גרף ריק, קודקוד בודד, וכו')
   - גרפים עם משקלים שליליים
   - זיהוי מעגלים שליליים

### קריטריוני קבלה

- [✓] src/core/Algorithms.ts מיושם עם כל 5 האלגוריתמים
- [✓] כל אלגוריתם מחזיר טיפוס נכון מ-types.ts
- [✓] tests/core/Algorithms.test.ts עובר עם כיסוי ≥80%
- [✓] יש תיעוד (comments) למורכבות זמן/זיכרון
- [✓] אין לולאות אין סופיות (בדיקה: timeouts על tests)

### הוראות בטיחות

- **Iteration limits**: בכל while loop, הוסף `iterations < maxIterations`
- **Recursion depth**: ב-DFS, הגבל עומק ל-100
- **Test timeouts**: כל test עם `timeout: 10000` (10 שניות)
- **Early exits**: ב-Bellman-Ford, צא מוקדם אם לא השתנה
- **Cycle detection**: הגבל אורך מעגל ל-n קודקודים

### זמן מוערך

2–3 ימים

---

## 🎨 שלב 3 — רכיבי UI בסיסיים (UI Agent)

### מטרת השלב

מימוש רכיבי React להצגת הגרף: MatrixView, NodeEdgeView, GraphVisualizer.

### מטלות

1. **src/components/MatrixView.tsx**

   - קבלת `matrix: number[][]` ב-props
   - הצגה כטבלת HTML
   - הגבלת תצוגה ל-100 שורות מקסימום
   - עיצוב ברור עם borders וצבעים

2. **src/components/NodeEdgeView.tsx**

   - קבלת `graph: Graph` ב-props
   - רינדור SVG עם קודקודים וקשתות
   - מיקום קודקודים במעגל
   - הצגת משקלים על הקשתות
   - חיצים לגרפים מכוונים
   - הגבלה ל-100 קודקודים/500 קשתות
   - שימוש ב-useMemo לאופטימיזציה

3. **src/components/GraphVisualizer.tsx**
   - קבלת `graph: Graph | null` ב-props
   - מעבר בין MatrixView ו-NodeEdgeView
   - כפתורי החלפה
   - טיפול בגרף null

### קריטריוני קבלה

- [✓] src/components/{MatrixView.tsx, NodeEdgeView.tsx, GraphVisualizer.tsx} מיושמים
- [✓] הרכיבים מציגים גרף דוגמה (10–30 צמתים) בצורה נכונה
- [✓] עובדים עם directed/undirected
- [✓] אין side-effects או state mutations
- [✓] הגבלת רינדור ל-100 קודקודים/500 קשתות
- [✓] אין re-renders אין סופיים (בדיקה: React DevTools)

### הוראות בטיחות

- **Render limits**: הגבל מספר elements ב-SVG/table ל-1000 מקסימום
- **useMemo**: השתמש ב-useMemo לחישובים כבדים (positions, edges)
- **useCallback**: השתמש ב-useCallback ל-event handlers
- **useEffect dependencies**: ודא שאין loops ב-useEffect
- **Memory**: אל תשמור state גדול ברכיב — העבר דרך props

### זמן מוערך

1–2 ימים

---

## 🔗 שלב 4 — חיבור אינטגרציה, state וניהול (App Agent)

### מטרת השלב

מימוש App.tsx — הרכיב הראשי שמנהל את כל ה-state ומחבר בין הלוגיקה ל-UI.

### מטלות

1. **src/App.tsx**

   - שימוש ב-useReducer לניהול state:
     - `graph: Graph | null`
     - `algorithmResult: AlgorithmResult | null`
     - `loading: boolean`
   - Actions: SET_GRAPH, SET_ALGORITHM_RESULT, SET_LOADING, CLEAR_RESULT
   - בקרים (controls):
     - טעינת מטריצה מ-JSON (textarea + כפתור)
     - יצירת גרף רנדומלי
     - כפתורים להרצת כל אלגוריתם
     - ניקוי תוצאות
   - תצוגת תוצאות אלגוריתם (JSON מעוצב)
   - אינטגרציה עם GraphVisualizer
   - Timeout למניעת תקיעות (30 שניות)

2. **src/main.tsx**

   - Entry point לאפליקציה
   - ReactDOM.render עם React.StrictMode

3. **public/index.html**
   - HTML בסיסי עם `<div id="root">`
   - RTL support (dir="rtl")

### קריטריוני קבלה

- [✓] src/App.tsx מיושם עם useReducer לניהול state
- [✓] ניתן לטעון גרף מ-JSON ולייצר רנדומלי
- [✓] ניתן להריץ כל אלגוריתם ולראות תוצאות
- [✓] טיפול בשגיאות (try-catch + alerts)
- [✓] loading state מוצג למשתמש
- [✓] timeout למניעת תקיעות

### הוראות בטיחות

- **Reducer loops**: ודא שאין state updates loops על ידי actions יחידות
- **Timeouts**: כל הרצת אלגוריתם עם timeout של 30 שניות
- **Memory**: נקה state כשצריך (CLEAR_RESULT action)
- **Error handling**: כל פעולה עטופה ב-try-catch
- **Max actions**: הגבל מספר dispatches per render

### זמן מוערך

1–2 ימים

---

## 🧪 שלב 5 — בדיקות אינטגרציה ו-perf (Test/Perf Agent)

### מטרת השלב

כתיבת בדיקות end-to-end ובדיקות ביצועים.

### מטלות

1. **בדיקות E2E**

   - שימוש ב-Playwright או Vitest + Testing Library
   - תרחישים:
     - טעינת גרף והצגתו
     - יצירת גרף רנדומלי
     - הרצת כל אלגוריתם
     - מעבר בין תצוגות
   - Timeouts: 30 שניות לכל test

2. **בדיקות ביצועים**

   - רינדור SVG ל-100 קודקודים
   - מדידת זמן ביצוע אלגוריתמים
   - בדיקת memory usage
   - המלצות לשיפור (Canvas, virtualization)

3. **דוח ביצועים**
   - מסמך עם תוצאות מדידות
   - המלצות לאופטימיזציה

### קריטריוני קבלה

- [✓] e2e tests כתובים ועוברים
- [✓] בדיקות ביצועים בוצעו
- [✓] דוח ביצועים מוכן עם המלצות
- [✓] אין memory leaks בבדיקות

### הוראות בטיחות

- **Test timeouts**: כל test עם timeout גלובלי (30 שניות)
- **Memory limits**: בדיקות perf עם max 10MB memory
- **Assertions**: הוסף counters למניעת loops
- **Logging**: הגבל ל-100 entries

### זמן מוערך

1–2 ימים

---

## 📝 שלב 6 — דוקומנטציה, דוגמאות ומשוחרר (Docs/Release Agent)

### מטרת השלב

השלמת דוקומנטציה, הוספת דוגמאות, והכנת הפרויקט לשחרור.

### מטלות

1. **README.md**

   - מטרת הפרויקט
   - הוראות התקנה והרצה
   - דוגמאות שימוש
   - API documentation
   - סקרינשוטים/GIFs

2. **דוגמאות**

   - קובץ עם מטריצות דוגמה
   - Demo page עם גרפים מוכנים
   - קובץ JSON לטעינה

3. **CHANGELOG.md**

   - רשימת שינויים לפי גרסאות
   - תיעוד features חדשים

4. **תרשימי זרימה (אופציונלי)**
   - הוספת diagrams ל-ARCHITECTURE.md
   - תרשים של data flow

### קריטריוני קבלה

- [✓] README מעודכן עם כל המידע הדרוש
- [✓] דוגמאות גרפים זמינות
- [✓] CHANGELOG מעודכן
- [✓] הפרויקט מוכן להרצה ב-dev server
- [✓] דוקומנטציה ברורה למשתמשים חדשים

### הוראות בטיחות

- **Scripts בטוחים**: כל demo או script ללא loops אין סופיים
- **Animations מוגבלות**: הגבל ל-10 שניות
- **Logging**: הגבל ב-examples
- **Memory**: ודא ב-dev server עם monitoring

### זמן מוערך

0.5–1 יום

---

## 📋 Checklist כללי לכל שלב

לפני סיום כל שלב, ודא:

- [ ] הקוד עובר lint (`npm run lint`)
- [ ] הקוד עובר build (`npm run build`)
- [ ] כל הבדיקות עוברות (`npm run test`)
- [ ] אין warnings ב-console
- [ ] הקוד מתועד (comments חשובים)
- [ ] אין קוד מת (dead code)
- [ ] אין console.log מיותרים
- [ ] Git commit messages ברורים
- [ ] PR מוכן עם template מלא

## 🎯 סיכום

הפרויקט בנוי בשבעה שלבים מתוכננים היטב: 0. תשתית

1. טיפוסים ו-Graph
2. אלגוריתמים
3. רכיבי UI
4. אינטגרציה
5. בדיקות
6. דוקומנטציה

כל שלב בנוי על הקודם ומספק value עצמאי. עבוד לפי הסדר, עמוד בקריטריוני הקבלה, ושמור על בטיחות הקוד.

**בהצלחה! 🚀**
