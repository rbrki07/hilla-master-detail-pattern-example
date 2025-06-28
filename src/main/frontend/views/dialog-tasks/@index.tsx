import { ViewConfig } from '@vaadin/hilla-file-router/types.js';
import { AutoForm, AutoGrid, AutoGridRef } from '@vaadin/hilla-react-crud';
import { useSignal } from '@vaadin/hilla-react-signals';
import { Dialog, GridActiveItemChangedEvent, VerticalLayout } from '@vaadin/react-components';
import Task from 'Frontend/generated/de/rwi/hillamasterdetailpatternexample/Task';
import TaskModel from 'Frontend/generated/de/rwi/hillamasterdetailpatternexample/TaskModel';
import { TaskService } from 'Frontend/generated/endpoints';
import { useCallback, useRef } from 'react';

export const config: ViewConfig = {
  title: 'Dialog Tasks',
  menu: {
    order: 2,
    title: 'Dialog',
  },
};

export default function DialogTasksView() {
  const activeItem = useSignal<Task>();
  const detailDialogOpened = useSignal(false);
  const gridRef = useRef<AutoGridRef>(null);

  const closeDialog = useCallback(() => {
    detailDialogOpened.value = false;
    gridRef.current?.refresh();
  }, [detailDialogOpened]);

  return (
    <VerticalLayout className="h-full">
      <AutoGrid
        ref={gridRef}
        model={TaskModel}
        service={TaskService}
        onActiveItemChanged={(event: GridActiveItemChangedEvent<Task>) => {
          const item = event.detail.value;
          if (item) {
            activeItem.value = item;
            detailDialogOpened.value = true;
          }
        }}
      />
      <Dialog
        headerTitle={'Task details'}
        opened={detailDialogOpened.value}
        onOpenedChanged={({ detail }) => {
          detailDialogOpened.value = detail.value;
        }}
        resizable
        draggable>
        <AutoForm
          model={TaskModel}
          service={TaskService}
          item={activeItem.value}
          deleteButtonVisible
          onDeleteSuccess={closeDialog}
          onSubmitSuccess={closeDialog}
        />
      </Dialog>
    </VerticalLayout>
  );
}
