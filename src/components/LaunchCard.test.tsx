import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import userEvent from '@testing-library/user-event';
import { MantineProvider } from '@mantine/core';
import LaunchCard from './LaunchCard';

const launchMock = {
  mission_name: 'Test mission',
  rocket: { rocket_name: 'Test rocket' },
  details: 'Some mission details',
  links: { mission_patch_small: 'test-image.png' }
} as any;

describe('Компонент Card', () => {
  let modalRoot: HTMLElement;

  beforeEach(() => {
    modalRoot = document.createElement('div');
    modalRoot.setAttribute('id', 'modal');
    document.body.appendChild(modalRoot);
  });

  afterEach(() => {
    document.body.removeChild(modalRoot);
  });

  it('Отображает информацию о запуске', () => {
    render(
      <MantineProvider>
        <LaunchCard launch={launchMock} />
      </MantineProvider>
    );

    expect(screen.getByText('Test mission')).toBeInTheDocument();
    expect(screen.getByText('Test rocket')).toBeInTheDocument();
  });

  it('Открывает модальное окно при клике по кнопке "See more"', async () => {
    render(
      <MantineProvider>
        <LaunchCard launch={launchMock} />
      </MantineProvider>
    );

    const button = screen.getByRole('button', { name: /see more/i });
    await userEvent.click(button);

    expect(screen.getByTestId('modal')).toBeInTheDocument();
  });

  it('Закрывает модальное окно при срабатывании onClose', async () => {
    render(
      <MantineProvider>
        <LaunchCard launch={launchMock} />
      </MantineProvider>
    );

    const button = screen.getByRole('button', { name: /see more/i });
    await userEvent.click(button);

    const closeBtn = screen.getByTestId('modal-close');
    await userEvent.click(closeBtn);

    expect(screen.queryByTestId('modal')).not.toBeInTheDocument();
  });
});
