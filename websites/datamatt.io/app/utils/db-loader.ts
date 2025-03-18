interface DbLoaderOptions<T> {
  tableName: string;
  columns: string[];
  mockData?: T[];
  context: any;
}

interface DbLoaderDiscGolfOptions<T> {
  context: any;
}

export async function dbLoader<T>({
  tableName,
  columns,
  mockData,
  context,
}: DbLoaderOptions<T>) {
  const db = context.cloudflare.env.DATAMATT_DB;

  // Return mock data in development environment
  if (process.env.NODE_ENV === "development") {
    return Response.json({
      items: mockData || [],
      error: null,
    });
  }

  if (!db) {
    console.error("Database not available in production");
    return Response.json({
      items: [],
      error: "Database connection error in production environment",
    });
  }

  try {
    const items = await db
      .prepare(
        `SELECT ${columns.join(", ")} FROM ${tableName} ORDER BY ${
          columns[0]
        } ASC`
      )
      .all();

    return Response.json({
      items: items.results,
      error: null,
    });
  } catch (error) {
    console.error("Database error:", error);
    return Response.json({
      items: [],
      error: `Database error: ${
        error instanceof Error ? error.message : "Unknown error"
      }`,
    });
  }
}

export async function dbLoaderDiscGolf<T>({
  context,
}: DbLoaderDiscGolfOptions<T>) {
  const db = context.cloudflare.env.DATAMATT_DB;
  const mockData = [
    {
      course_name: "Campus Course",
      course_description: "This is a sample course.",
      hole_number: "1",
      hole_description: "This is a test hole.",
    },
    {
      course_name: "Campus Course",
      course_description: "This is a sample course.",
      hole_number: "2",
      hole_description: "This is also a test hole.",
    },
    {
      course_name: "Off Campus Course",
      course_description: "This is a sample course.",
      hole_number: "1",
      hole_description: "This is a test hole.",
    },
    {
      course_name: "Off Campus Course",
      course_description: "This is a sample course.",
      hole_number: "2",
      hole_description: "This is also a test hole.",
    },
  ];

  // Return mock data in development environment
  if (process.env.NODE_ENV === "development") {
    return Response.json({
      items: mockData || [],
      error: null,
    });
  }

  if (!db) {
    console.error("Database not available in production");
    return Response.json({
      items: [],
      error: "Database connection error in production environment",
    });
  }

  try {
    const items = await db
      .prepare(
        `SELECT 
                c.course_id,
                c.name AS course_name,
                c.description AS course_description,
                h.hole_number,
                h.description AS hole_description
            FROM clemson_disc_golf_courses c
            LEFT JOIN clemson_disc_golf_holes h ON c.course_id = h.course_id
            ORDER BY c.course_id, h.hole_number
           `
      )
      .all();

    return Response.json({
      items: items.results,
      error: null,
    });
  } catch (error) {
    console.error("Database error:", error);
    return Response.json({
      items: [],
      error: `Database error: ${
        error instanceof Error ? error.message : "Unknown error"
      }`,
    });
  }
}
