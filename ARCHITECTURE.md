# ארכיטקטורת פרויקט algo-ia

## סקירה כללית
הפרויקט הוא אפליקציית אינטרנט לוויזואליזציה של אלגוריתמי גרפים, בנויה באמצעות TypeScript ו-React.

## שלב הפיתוח הנוכחי

### ✅ שלב 1: תשתית בסיסית - **הושלם**
- **תצורת פרויקט**: React + TypeScript
- **כלי בנייה**: react-scripts (Create React App)
- **ניהול חבילות**: npm
- **בקרת גרסאות**: Git + GitHub
- **הגדרות TypeScript**: tsconfig.json מוגדר
- **ESLint**: מוגדר ועובר בהצלחה
- **Prettier**: מוגדר לפורמט קוד
- **Husky + lint-staged**: Git hooks לבדיקות לפני commit

### ✅ שלב 2: מחלקות ליבה - **הושלם**
המחלקות הבסיסיות מומשו במלואן:

#### Graph.ts
- **constructor**: יצירת גרף עם מטריצת שכנויות
- **validateMatrix**: ולידציה מלאה של מטריצת גרפים
- **loadGraph**: טעינת גרף חדש
- **generateRandomGraph**: יצירת גרף אקראי עם אפשרויות גמישות
- **getNeighbors**: מציאת שכנים של צומת
- **getEdgeWeight**: קבלת משקל קשת
- **getNumberOfNodes**: מספר צמתים בגרף
- **isDirectedGraph**: בדיקה אם הגרף מכוון
- **getMatrix**: קבלת העתק של מטריצת השכנויות
- **isSymmetric**: בדיקת סימטריה

#### Algorithms.ts
אלגוריתמי גרפים מיושמים:
- **isConnected**: בדיקת קשירות גרף (DFS)
- **shortestPath**: מסלול קצר ביותר (Dijkstra/BFS)
- **isContainsCycle**: גילוי מעגלים (DFS)
- **isBipartite**: בדיקת דו-צדדיות (BFS + צביעה)
- **negativeCycle**: גילוי מעגלים שליליים (Bellman-Ford)

#### types.ts
הגדרות טיפוסים:
- `ShortestPathResult`
- `CycleResult`
- `BipartiteResult`
- `NegativeCycleResult`
- `RandomGraphOptions`

### ✅ שלב 3: קומפוננטות React - **הושלם**
- **GraphVisualizer.tsx**: קומפוננטה ראשית להצגת גרף
- **MatrixView.tsx**: תצוגת מטריצת שכנויות
- **NodeEdgeView.tsx**: תצוגה גרפית של צמתים וקשתות (SVG)
- **App.tsx**: קומפוננטה ראשית עם state management (useReducer)

### ⚠️ שלב 4: בדיקות (Tests) - **מומש חלקית**

**סטטוס**: קיימים קבצי בדיקות אך אינם פועלים כראוי.

#### בדיקות קיימות:
- ✅ `tests/core/Graph.test.ts` - בדיקות למחלקת Graph (קיים)
- ✅ `tests/core/Algorithms.test.ts` - בדיקות לאלגוריתמים (קיים)
- ✅ `tests/components/GraphVisualizer.test.tsx` - בדיקות לקומפוננטה (קיים)

#### בעיות זוהו:
1. **בדיקות לא מתגלות**: react-scripts מחפש בדיקות ב-`src/**/*.test.{ts,tsx}` אך הן ממוקמות ב-`tests/`
2. **תצורת jest**: קיימת תצורה עצמאית ב-`jest.config.js` אך לא משתמשים בה דרך `react-scripts test`
3. **ייבוא ב-Algorithms.test.ts**: ייבוא שגוי - `import { Algorithms }` במקום `import Algorithms`

#### פתרון נדרש:
- להעביר קבצי בדיקות ל-`src/` או
- לשנות את תצורת react-scripts או
- לעבור לשימוש ב-jest ישירות

### ⚠️ שלב 5: CI/CD Pipeline - **מוגדר אך נכשל בבדיקות**

#### תהליך CI המוגדר (`.github/workflows/ci.yml`):
1. ✅ **Checkout code** - עובד
2. ✅ **Setup Node.js** (16.x, 18.x) - עובד
3. ✅ **Install dependencies** (`npm ci`) - עובד
4. ✅ **Lint code** (`npm run lint`) - עובד (**0 warnings**)
5. ❌ **Run tests** (`npm test -- --coverage --watchAll=false`) - נכשל (אין בדיקות)
6. ✅ **Build project** (`npm run build`) - עובד
7. ⏸️ **Upload coverage** - לא מתבצע בגלל כשל הבדיקות

### ✅ שלב 6: Build Process - **הושלם**
- ✅ `npm run build` - פועל בהצלחה
- ✅ יצירת bundle מוטמע: `build/static/js/main.2b91fe67.js` (46.35 kB gzip)
- ✅ הפרויקט מוכן לפריסה (deployment)

### 🔄 שלב 7: Features מתקדמים - **בתכנון**
תכונות שטרם מומשו לפי README:
- אינטראקציה עם הגרף (עריכת צמתים וקשתות)
- יצירת גרף אקראי דרך UI
- הרצת אלגוריתמים דרך UI
- אנימציה של אלגוריתמים
- ייצוא/ייבוא גרפים

## תלויות (Dependencies)

### Production:
- `react` ^18.2.0
- `react-dom` ^18.2.0
- `react-scripts` 5.0.1
- `seedrandom` ^3.0.5 (לגרפים אקראיים דטרמיניסטיים)
- `typescript` ^4.9.5

### Development:
- `@testing-library/jest-dom` ^5.16.5
- `@testing-library/react` ^13.4.0
- `@typescript-eslint/eslint-plugin` ^5.62.0
- `eslint` ^8.45.0
- `prettier` ^2.8.8
- `husky` ^8.0.3
- `lint-staged` ^13.2.3

## מבנה קבצים

```
algo-ia/
├── .github/
│   └── workflows/
│       └── ci.yml          # תצורת CI/CD
├── public/                 # קבצים סטטיים
├── src/                    # קוד המקור
│   ├── core/              # לוגיקת ליבה
│   │   ├── Graph.ts       # מחלקת גרף ✅
│   │   ├── Algorithms.ts  # אלגוריתמי גרפים ✅
│   │   └── types.ts       # הגדרות טיפוסים ✅
│   ├── components/        # קומפוננטות React
│   │   ├── GraphVisualizer.tsx ✅
│   │   ├── MatrixView.tsx      ✅
│   │   └── NodeEdgeView.tsx    ✅
│   ├── App.tsx            # אפליקציה ראשית ✅
│   └── index.tsx          # נקודת כניסה ✅
├── tests/                 # בדיקות (לא פעילות כרגע) ⚠️
│   ├── core/
│   │   ├── Graph.test.ts
│   │   └── Algorithms.test.ts
│   └── components/
│       └── GraphVisualizer.test.tsx
├── package.json           # הגדרות npm ותלויות
├── tsconfig.json          # תצורת TypeScript
├── jest.config.js         # תצורת Jest (לא בשימוש)
├── .eslintrc.js          # תצורת ESLint
├── .prettierrc           # תצורת Prettier
└── README.md             # תיעוד

```

## סקריפטים זמינים

- `npm start` - הרצת שרת פיתוח
- `npm run build` - בניית פרודקשן ✅ עובד
- `npm test` - הרצת בדיקות ❌ נכשל
- `npm run lint` - בדיקת קוד ✅ עובר
- `npm run lint:fix` - תיקון אוטומטי של בעיות lint
- `npm run format` - פורמט קוד עם Prettier
- `npm run format:check` - בדיקת פורמט

## סיכום מצב פרויקט

### מה עובד:
✅ תשתית פרויקט מלאה  
✅ מחלקות ליבה מיושמות וממוקדות  
✅ אלגוריתמי גרפים בסיסיים  
✅ קומפוננטות React בסיסיות  
✅ Linting עובר בהצלחה  
✅ Build process עובד  
✅ מוכן לפריסה  

### מה דורש תיקון:
⚠️ **בעיית בדיקות**: צריך להעביר בדיקות ל-`src/` או לשנות תצורה  
⚠️ **CI pipeline**: נכשל בגלל בדיקות  
⚠️ **Bug בייבוא**: `Algorithms.test.ts` מייבא בצורה שגויה  

### מה חסר:
❌ UI אינטראקטיבי מלא  
❌ יכולות עריכה ויצירה דרך ממשק  
❌ אנימציות אלגוריתמים  
❌ ייצוא/ייבוא גרפים  

## השלב הנוכחי: **שלב 4-5 (בדיקות ו-CI/CD)**

הפרויקט נמצא במעבר בין שלב 3 (קומפוננטות) לשלב 6 (בנייה). הקוד הבסיסי מוכן וניתן לבניה, אך יש לתקן את מערך הבדיקות כדי להשלים את תהליך ה-CI/CD ולהמשיך לשלב הפיתוח הבא.

**צעד הבא מומלץ**: תיקון תצורת הבדיקות כדי ש-CI pipeline יעבור במלואו.
