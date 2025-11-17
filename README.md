# 📊 ויזואליזציית אלגוריתמי גרפים

פרויקט אינטראקטיבי לויזואליזציה של אלגוריתמים על גרפים, בנוי עם TypeScript ו-React.

## 🎯 מטרת הפרויקט

אפליקציית web המאפשרת:

- **הצגה ויזואלית** של גרפים (מכוונים/לא מכוונים)
- **הרצת אלגוריתמים** על גרפים בזמן אמת
- **יצירת גרפים** באופן רנדומלי או טעינה מ-JSON
- **למידה אינטראקטיבית** של אלגוריתמי גרפים

## ✨ תכונות

### אלגוריתמים מיושמים

- 🔗 **בדיקת קשירות** (BFS/DFS)
- 🛤️ **מסלול קצר ביותר** (Bellman-Ford) — תומך במשקלים שליליים
- 🔄 **זיהוי מעגלים** (DFS)
- ⚖️ **בדיקת דו-צדדיות** (BFS עם צביעה)
- ⚠️ **זיהוי מעגלים שליליים** (Bellman-Ford)

### תצוגות

- 📊 **תצוגת מטריצת שכנויות** — טבלה מעוצבת
- 🎨 **תצוגת גרף ויזואלית** — SVG עם קודקודים וקשתות
- 🔄 מעבר חלק בין התצוגות

## 🚀 התחלה מהירה

### דרישות מקדימות

- Node.js 18+
- npm או yarn

### התקנה והרצה

```powershell
# שכפול הפרויקט
git clone https://github.com/ArielShamay/algo-ia.git
cd algo-ia

# התקנת תלויות
npm install

# הרצה במצב פיתוח
npm run dev

# בנייה לייצור
npm run build

# הרצת בדיקות
npm test
```

## 📁 מבנה הפרויקט

```
algo-ia/
├── docs/
│   ├── BUILD_INSTRUCTIONS.md  # הוראות בנייה מפורטות (7 שלבים)
│   └── ARCHITECTURE.md         # תיאור ארכיטקטוני מלא
├── src/
│   ├── core/
│   │   ├── types.ts           # הגדרות טיפוסים וממשקים
│   │   ├── Graph.ts           # מחלקת Graph (ניהול נתוני גרף)
│   │   └── Algorithms.ts      # אלגוריתמים על גרפים
│   ├── components/
│   │   ├── GraphVisualizer.tsx  # רכיב ראשי להצגת גרף
│   │   ├── MatrixView.tsx       # תצוגת מטריצה
│   │   └── NodeEdgeView.tsx     # תצוגת גרף (SVG)
│   ├── App.tsx                  # רכיב אפליקציה ראשי
│   └── main.tsx                 # Entry point
├── tests/
│   └── core/
│       ├── Graph.test.ts
│       └── Algorithms.test.ts
└── public/
    └── index.html
```

## 📚 מסמכים חשובים

- **[הוראות בנייה](docs/BUILD_INSTRUCTIONS.md)** — מדריך מפורט ל-7 שלבי הבנייה (לסוכנים ומפתחים)
- **[ארכיטקטורה](docs/ARCHITECTURE.md)** — עקרונות עיצוב, מבנה, ושיקולים טכניים

## 🎮 שימוש באפליקציה

### טעינת גרף

1. הזן מטריצת שכנויות בפורמט JSON:
   ```json
   [
     [0, 1, 0],
     [0, 0, 1],
     [0, 0, 0]
   ]
   ```
2. לחץ על "טען גרף"

### יצירת גרף רנדומלי

- לחץ על "צור גרף רנדומלי" ליצירת גרף אוטומטית

### הרצת אלגוריתמים

- בחר אלגוריתם מרשימת הכפתורים
- התוצאות יוצגו בפורמט JSON

### החלפת תצוגות

- השתמש בכפתורים למעלה למעבר בין תצוגת מטריצה לתצוגת גרף

## 🧪 בדיקות

```powershell
# הרצת כל הבדיקות
npm test

# הרצה עם כיסוי
npm test -- --coverage

# הרצת בדיקה ספציפית
npm test Graph.test.ts
```

## 🛠️ Scripts זמינים

| Script           | תיאור                  |
| ---------------- | ---------------------- |
| `npm run dev`    | הרצת dev server (Vite) |
| `npm run build`  | בנייה לייצור           |
| `npm run test`   | הרצת בדיקות (Vitest)   |
| `npm run lint`   | בדיקת ESLint           |
| `npm run format` | עיצוב קוד עם Prettier  |

## 🏗️ פיתוח

### סדר בנייה מומלץ

הפרויקט מחולק ל-7 שלבים (0-6). לפרטים מלאים ראה [BUILD_INSTRUCTIONS.md](docs/BUILD_INSTRUCTIONS.md):

0. **תשתית** — TypeScript, React, Testing, CI/CD
1. **טיפוסים ו-Graph API** — types.ts, Graph.ts
2. **אלגוריתמים** — Algorithms.ts
3. **רכיבי UI** — Components
4. **אינטגרציה** — App.tsx, State Management
5. **בדיקות** — E2E, Performance
6. **דוקומנטציה** — README, Examples

### Code Style

- TypeScript strict mode מופעל
- ESLint + Prettier לקוד אחיד
- Type safety — אין שימוש ב-`any`

## 🤝 תרומה לפרויקט

נשמח לתרומות! אנא:

1. צור branch חדש: `feature/<description>`
2. עשה commit עם הודעה ברורה
3. פתח Pull Request עם תיאור מפורט
4. ודא שכל הבדיקות עוברות

## 📄 רישיון

MIT License — ראה [LICENSE](LICENSE) לפרטים

## 👨‍💻 יוצר

**Ariel Shamay**  
GitHub: [@ArielShamay](https://github.com/ArielShamay)

---

**🎓 נבנה למטרות לימודיות** — פרויקט להדגמת אלגוריתמי גרפים בצורה ויזואלית ואינטראקטיבית
