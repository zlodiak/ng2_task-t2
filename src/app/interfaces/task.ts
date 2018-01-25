export interface Task {
  id: number;
  title: string;
  owner: string;
  desc: string;
  priority: number;
  status: number;
  createdDateUnix: number;
  planningTimeUnix: number;
  dealTimeUnix: number;
}


