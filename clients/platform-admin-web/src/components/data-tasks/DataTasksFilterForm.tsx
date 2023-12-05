import type { FC } from 'react';
import type { UUID } from '@tymlez/platform-api-interfaces';
import { SelectForm } from '@tymlez/frontend-libs';
import { useDataFlows } from '../../api/useDataFlows';

interface Props {
  filter: { dataFlowId?: UUID };
  onFilterChange: (filter: { dataFlowId: UUID }) => void;
}

export const DataTasksFilterForm: FC<Props> = ({ filter, onFilterChange }) => {
  const { queryResult } = useDataFlows();
  const dataFlows = queryResult.data;

  return (
    <SelectForm
      title="Filter by Flow"
      options={
        dataFlows?.map((dataFlow) => {
          return {
            name: dataFlow.name,
            value: dataFlow.id,
          };
        }) || []
      }
      value={filter.dataFlowId || 'all'}
      onUpdate={(value: string) => {
        onFilterChange({
          dataFlowId: value,
        });
      }}
    />
  );
};
