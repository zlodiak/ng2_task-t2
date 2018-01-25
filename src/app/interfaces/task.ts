export interface Task {
  id: number;
  title: string;
  author: string;
  owner: string;
  desc: string;
  priority: number;
  status: number;
  createdDateUnix: number;
  planningDateUnix?: number;
  dealDateUnix?: number;
}


