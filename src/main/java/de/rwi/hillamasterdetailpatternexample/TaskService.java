package de.rwi.hillamasterdetailpatternexample;

import com.vaadin.flow.server.auth.AnonymousAllowed;
import com.vaadin.hilla.BrowserCallable;
import com.vaadin.hilla.crud.CrudRepositoryService;

@BrowserCallable
@AnonymousAllowed
public class TaskService extends CrudRepositoryService<Task, Long, TaskRepository> {

}
