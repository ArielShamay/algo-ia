🏛️ תוכנית ארכיטקטונית: פרויקט ויזואליזציית אלגוריתמי גרפים

מסמך זה מתאר את התוכנית הארכיטקטונית לבניית הפרויקט. יש להתייחס למסמך זה לאורך כל תהליך הפיתוח כדי להבין את מבנה המערכת וה"למה" מאחורי כל חלק.

הארכיטקטורה מבוססת על TypeScript ו-React.

1. עקרונות ליבה

הפרדת אחריויות (Separation of Concerns): הפרדה מוחלטת בין לוגיקת הליבה (src/core) לבין התצוגה (src/components).

מקור אמת יחיד (Single Source of Truth): אובייקט הגרף (Graph.ts) יהיה מקור האמת היחיד. הוא ינוהל ב-App.tsx ויועבר (props) לרכיבי התצוגה.

חוזה ברור (Clear Contracts): כל טיפוסי הנתונים (במיוחד תוצאות אלגוריתמים) יוגדרו בקובץ src/core/types.ts וישמשו כחוזה בין הלוגיקה ל-UI.

2. מבנה הפרויקט

א. שכבת הליבה (Core Logic)

שכבה ללא UI, המכילה לוגיקה טהורה.

1. src/core/types.ts

אחריות: הגדרת כל ה-interfaces וה-types של הפרויקט.

עיקרים: GraphError, ShortestPathResult, CycleResult, BipartiteResult וכו'.

2. src/core/Graph.ts

אחריות: ניהול הנתונים של הגרף.

מבנה: class Graph שיחזיק adjacencyMatrix: number[][] ו-directed: boolean.

פונקציות עיקריות:

loadGraph(matrix: number[][]): טוען מטריצה. חייב לבצע ולידציה:

לוודא שהמטריצה אינה ריקה.

לוודא שהמטריצה ריבועית (מספר השורות == מספר העמודות).

לוודא שאין משקלים שליליים באלכסון (matrix[i][i] !== 0).

static generateRandomGraph(options: RandomGraphOptions): Graph:

RandomGraphOptions יכלול: vertices: number, directed: boolean, density: number (בין 0 ל-1), weightRange: [number, number] (טווח משקלים) ו-seed?: number (אופציונלי, לבדיקות).

getNeighbors(node: number): number[]

getEdgeWeight(from: number, to: number): number

getNumberOfNodes(): number

isDirectedGraph(): boolean

3. src/core/Algorithms.ts

אחריות: ביצוע כל האלגוריתמים על הגרף.

מבנה: מחלקה סטטית (או namespace). כל הפונקציות מקבלות graph: Graph.

פונקציות עיקריות (עם טיפוסי החזרה מ-types.ts):

static isConnected(graph: Graph): boolean (אלגוריתם: DFS/BFS)

static shortestPath(graph: Graph, start: number, end: number): ShortestPathResult (אלגוריתם: Bellman-Ford, כדי לתמוך במשקלים שליליים)

static isContainsCycle(graph: Graph): CycleResult (אלגוריתם: DFS)

static isBipartite(graph: Graph): BipartiteResult (אלגוריתם: BFS צביעה)

static negativeCycle(graph: Graph): NegativeCycleResult (אלגוריתם: Bellman-Ford)

ב. שכבת התצוגה (UI Layer - React Components)

1. src/components/GraphVisualizer.tsx (ה"לוח הלבן")

אחריות: הרכיב המרכזי שמציג את הגרף.

Props: interface { graph: Graph | null; }

מבנה: יכיל useState להחלפה בין שתי תצוגות:

MatrixView: תצוגת מטריצת שכנויות.

NodeEdgeView: תצוגת קודקודים וקשתות.

2. src/components/MatrixView.tsx

אחריות: להציג את number[][] כטבלה ויזואלית (HTML <table>).

Props: interface { matrix: number[][] }

3. src/components/NodeEdgeView.tsx

אחריות: לצייר את הגרף באמצעות SVG.

Props: interface { graph: Graph }

מימוש:

חישוב מיקומי קודקודים (בצורת מעגל).

רינדור <circle> ו-<text> לכל קודקוד.

רינדור <line> לכל קשת, כולל <text> למשקל.

עבור גרפים מכוונים, הוספת <marker> (ראש חץ) לכל קשת.

4. src/App.tsx (הרכיב הראשי)

אחריות: ניהול מצב האפליקציה וחיבור הלוגיקה ל-UI.

מצב (State): מומלץ להשתמש ב-useReducer לניהול המצב המורכב (שינוי גרף, טעינה, תוצאות אלגוריתמים). המצב יכיל:

graph: Graph | null

algorithmResult: AlgorithmResultType | null

loading: boolean

בקרים (Controls): יכיל את הכפתורים והשדות לכל הפעולות (טעינה, יצירה רנדומלית, הפעלת אלגוריתמים).

תצוגה: יציג את <GraphVisualizer graph={state.graph} /> ואת תוצאת האלגוריתם בפורמט קריא (למשל <pre>{JSON.stringify(state.algorithmResult)}</pre>).

3. שיקולי פיתוח ובדיקות

בדיקות יחידה (Unit Tests): יש להשתמש ב-Jest (או Vitest) כדי לבדוק את שכבת הליבה.

יש לבדוק את Graph.ts (ולידציה, יצירה רנדומלית עם seed קבוע).

יש לבדוק כל פונקציה ב-Algorithms.ts על גרף מכוון, לא מכוון, וגרפי קצה.

ביצועים (Performance):

SVG (ברירת מחדל): מתאים לגרפים קטנים עד בינוניים (עד ~100 קודקודים).

Canvas (שיקול עתידי): אם נדרשת תמיכה בגרפים גדולים מאוד, יש לשקול מעבר ל-Canvas לרינדור מהיר יותר.
