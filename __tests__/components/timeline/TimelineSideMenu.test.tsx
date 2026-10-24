import { fireEvent, render, screen } from '@testing-library/react';

import { TimelineSideMenu } from '@/components/shared/timeline';

const ranges = [
  { id: '2020', label: '2020', startYear: 2020, endYear: 2020 },
  { id: '2018', label: '2018', startYear: 2018, endYear: 2018 },
];
const items = [
  { yearRangeId: '2020', startYear: 2020 },
  { yearRangeId: '2020', startYear: 2020 },
  { yearRangeId: '2018', startYear: 2018 },
];

describe('TimelineSideMenu', () => {
  it('renders all and year buttons with counts', () => {
    const onSelect = jest.fn();
    render(
      <TimelineSideMenu
        menuLabel="Anos"
        allLabel="Todos"
        ranges={ranges}
        items={items}
        activeRange="all"
        onSelectRange={onSelect}
      />,
    );
    expect(screen.getByText('Todos')).toBeInTheDocument();
    expect(screen.getByText('2020')).toBeInTheDocument();
    fireEvent.click(screen.getByText('2020'));
    expect(onSelect).toHaveBeenCalledWith('2020');
  });
});
