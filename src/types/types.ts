export interface Task {
    _id: string;
    name: string;
    description: string;
    status: string; 
  }

  export interface Post {
    _id: string;
    photoUrl: string;
    caption: string;
  }
   
export interface User {
    _id: string;
    name: string;
    email: string;
  }

  export interface FormData {
    email: string;
    otp: string;
  }

  export interface Task {
    _id: string;
    name: string;
    description: string;
    status: string;
  }
   
  export interface DragItem {
    id: string;
    status: string;
    type: string;
  }

  export interface TaskUpdates {
    name?: string;
    description?: string;
    status: string;
  }
 