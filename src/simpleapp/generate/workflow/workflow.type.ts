/**
 * This file was automatically generated by simpleapp generator. Every
 * MODIFICATION OVERRIDE BY GENERATEOR
 * last change 2024-02-23
 * Author: Ks Tan
 */
import { UserContext } from '../commons/user.context';

export type WorkflowSettingApiSchema = {
  userServiceUrl: string;
  callBackUrl?: string;
  assignee?: string;
  candidateUsers?: string[];
  candidategroups?: string[];
};

export type WorkflowDataApiSchema = {
  data: any;
  workflowSetting: WorkflowSettingApiSchema;
};

export type WorkflowTask = {
  id: string;
  name: string;
  assignee: string;
  candidateUsers: string[];
  candidateGroups: string[];
  type: string;
};
export type WorkflowProcess = {
  id: string;
  name: string;
  status: string;
  startedAt: string;
  items: WorkflowTask[];
};

export type UserTaskActors = {
  assignee: string;
  candidateUsers: string[];
  candidateGroups: string[];
};

export type UserTaskType = {
  id: string;
  taskId: string;
  elementId: string;
  name: string;
  processName: string;
  assignee: string;
  candidateUsers: string[];
  candidateGroups: string[];
  data: any;
  vars: any;
  startedAt: string;
  followUpDate: string;
  dueDate: string;
  priority: string;
  type: string;
  userId: string;
};

export type UserTaskEventType = 'start' | 'wait' | 'invoked' | 'end' | 'assign';
export type UserTaskData = {
  workflowName: string;
  eventType: UserTaskEventType; //assign = modify properties but not change state
  elementType: 'bpmn:UserTask';
  elementId: string;
  elementName: string;
  vars: any;
  elementProps: {
    startedAt: string;
    assignee?: string;
    candidateGroups?: string | string[];
    candidateUsers?: string | string[];
    dueDate?: string;
    followUpDate?: string;
    priority?: string;
    formKey?: string;
  };
  data: any;
  options: WorkflowOptions;
};
export type ServiceTaskEventType = 'start' | 'end';
export type WorkflowOptions = {
  appuser: UserContext;
  [key: string]: any;
};
export type ServiceTaskData = {
  workflowName: string;
  eventType: 'start' | 'end';
  elementType: 'bpmn:ServiceTask';
  elementId: string;
  elementName: string;
  data: any;
  vars: any;
  options: WorkflowOptions;
};