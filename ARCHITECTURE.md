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

### ✅ שלב 4: בדיקות (Tests) - **הושלם**

**סטטוס**: כל הבדיקות פועלות ועוברות בהצלחה!

#### בדיקות מיושמות:
- ✅ `src/core/__tests__/Graph.test.ts` - 36 בדיקות למחלקת Graph
- ✅ `src/core/__tests__/Algorithms.test.ts` - 5 בדיקות לאלגוריתמים
- ✅ `src/components/__tests__/GraphVisualizer.test.tsx` - 4 בדיקות לקומפוננטה

#### תוצאות:
- **Test Suites**: 3 passed, 3 total ✅
- **Tests**: 41 passed, 41 total ✅
- **Coverage**: 90.83% statements, 85.12% branches, 93.93% functions ✅

#### בעיות שתוקנו:
1. ✅ **מיקום בדיקות**: הועברו מ-`tests/` ל-`src/**/__tests__/`
2. ✅ **ייבוא**: תוקן ייבוא של Algorithms מ-named ל-default export
3. ✅ **לוגיקת בדיקות**: תוקנו בדיקות שנכשלו (גילוי מעגלים, בדיקות קומפוננטות)
4. ✅ **נגישות**: נוסף aria-label ל-SVG

### ✅ שלב 5: CI/CD Pipeline - **הושלם**

#### תהליך CI המוגדר (`.github/workflows/ci.yml`):
1. ✅ **Checkout code** - עובד
2. ✅ **Setup Node.js** (16.x, 18.x) - עובד
3. ✅ **Install dependencies** (`npm ci`) - עובד
4. ✅ **Lint code** (`npm run lint`) - עובד (**0 warnings**)
5. ✅ **Run tests** (`npm test -- --coverage --watchAll=false`) - עובד (**41 tests passing**)
6. ✅ **Build project** (`npm run build`) - עובד
7. ✅ **Upload coverage** - מתבצע בהצלחה

### ✅ שלב 6: Build Process - **הושלם**
- ✅ `npm run build` - פועל בהצלחה
- ✅ יצירת bundle מוטמע: `build/static/js/main.0ec826e3.js` (46.38 kB gzip)
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
│       └── ci.yml          # תצורת CI/CD ✅
├── public/                 # קבצים סטטיים
├── src/                    # קוד המקור
│   ├── core/              # לוגיקת ליבה
│   │   ├── __tests__/     # בדיקות core ✅
│   │   │   ├── Graph.test.ts       # 36 בדיקות ✅
│   │   │   └── Algorithms.test.ts  # 5 בדיקות ✅
│   │   ├── Graph.ts       # מחלקת גרף ✅
│   │   ├── Algorithms.ts  # אלגוריתמי גרפים ✅
│   │   └── types.ts       # הגדרות טיפוסים ✅
│   ├── components/        # קומפוננטות React
│   │   ├── __tests__/     # בדיקות components ✅
│   │   │   └── GraphVisualizer.test.tsx # 4 בדיקות ✅
│   │   ├── GraphVisualizer.tsx ✅
│   │   ├── MatrixView.tsx      ✅
│   │   └── NodeEdgeView.tsx    ✅
│   ├── App.tsx            # אפליקציה ראשית ✅
│   ├── index.tsx          # נקודת כניסה ✅
│   └── setupTests.ts      # תצורת בדיקות ✅
├── package.json           # הגדרות npm ותלויות
├── tsconfig.json          # תצורת TypeScript
├── jest.config.js         # תצורת Jest (לא בשימוש)
├── .eslintrc.js          # תצורת ESLint
├── .prettierrc           # תצורת Prettier
└── README.md             # תיעוד

```

## סקריפטים זמינים

- `npm start` - הרצת שרת פיתוח
- `npm run build` - בניית פרודקשן ✅ עובד (46.38 kB)
- `npm test` - הרצת בדיקות ✅ עובר (41 tests)
- `npm run lint` - בדיקת קוד ✅ עובר (0 warnings)
- `npm run lint:fix` - תיקון אוטומטי של בעיות lint
- `npm run format` - פורמט קוד עם Prettier
- `npm run format:check` - בדיקת פורמט

## סיכום מצב פרויקט

### מה עובד:
✅ תשתית פרויקט מלאה  
✅ מחלקות ליבה מיושמות וממוקדות  
✅ אלגוריתמי גרפים בסיסיים  
✅ קומפוננטות React בסיסיות  
✅ Linting עובר בהצלחה (0 warnings)  
✅ Build process עובד (46.38 kB)  
✅ מערך בדיקות מלא (41 tests, 90.83% coverage) 🆕
✅ CI/CD pipeline עובר במלואו 🆕
✅ מוכן לפריסה  

### מה חסר (Features מתקדמים):
❌ UI אינטראקטיבי מלא  
❌ יכולות עריכה ויצירה דרך ממשק  
❌ אנימציות אלגוריתמים  
❌ ייצוא/ייבוא גרפים  

## השלב הנוכחי: **שלב 6 (Build) - הושלם!** 🎉

הפרויקט עבר בהצלחה את כל שלבי הפיתוח הבסיסיים:
1. ✅ תשתית בסיסית
2. ✅ מחלקות ליבה
3. ✅ קומפוננטות React
4. ✅ מערך בדיקות מלא
5. ✅ CI/CD Pipeline
6. ✅ Build Process

**הקוד מוכן לפריסה ולהמשך פיתוח של features מתקדמים!**

**צעד הבא מומלץ**: פיתוח UI אינטראקטיבי ואנימציות אלגוריתמים (שלב 7).
