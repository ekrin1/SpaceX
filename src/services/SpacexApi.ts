import type { Launch } from "../types/Launch";

export async function fetchLaunches(): Promise<Launch[]> {
    const response = await fetch(
        'https://api.spacexdata.com/v3/launches?launch_year=2020'
    );

    if(!response.ok) {
        throw new Error('Не удалось получить результаты запуска');
    }

    const data: Launch[] = await response.json();

    return data;
}
