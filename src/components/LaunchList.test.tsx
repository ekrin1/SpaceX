import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect } from 'vitest';
import { MantineProvider } from '@mantine/core';
import CardList from './LaunchList';

const mockData = [
  {
    mission_name: 'Mission 1',
    rocket: { rocket_name: 'Rocket 1' },
    details: 'Some test details',
    links: { mission_patch_small: 'img1.png' },
  },
  {
    mission_name: 'Mission 2',
    rocket: { rocket_name: 'Rocket 2' },
    details: 'More test details',
    links: { mission_patch_small: 'img2.png' },
  },
] as any[];

describe('Компонент CardList', () => {
  it('Отображает заголовок списка', () => {
    render(
      <MantineProvider>
        <CardList data={mockData} />
      </MantineProvider>
    );

    expect(screen.getByText('SpaceX Launches 2020')).toBeInTheDocument();
  });

  it('Рендерит корректное количество карточек', () => {
    render(
      <MantineProvider>
        <CardList data={mockData} />
      </MantineProvider>
    );

    expect(screen.getByText('Mission 1')).toBeInTheDocument();
    expect(screen.getByText('Mission 2')).toBeInTheDocument();
  });
});
