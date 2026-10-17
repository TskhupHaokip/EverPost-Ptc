export class User {
  id: number;
  username: string;

  constructor(id: number, username: string) {
    this.id = id;
    this.username = username;
  }

  getDetails(): string {
    return `${this.username} `;
  }
}

export interface ProfileProps {
  id: number;
  nick_name: string;
  bio: string;
  pic: string;
  cover: string;
  user:string
}

export interface PostProps {
  id: number;
  caption: string;
  image: string | null;
  created_at: string;
  updated_at: string;
  user: string;
}



export interface FakeFutureProps {
  user_id: number;
  target_id: number;
  messages: string;
  CheckAvailability: Date;
  triggerDate: Date;
}
