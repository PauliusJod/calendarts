export interface IGroupCreate {
  groupName: string;
  groupDescription: string;
}
export interface IGroupGet {
  creationDate: Date;
  groupDescription: string;
  groupId: number;
  groupName: string;
  groupOwnerId: string;
  isVisible: boolean;
}
