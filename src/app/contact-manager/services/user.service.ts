import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userList: BehaviorSubject<User[]>;
  private dataStore: {
    users: User[];
  };

  constructor(private http: HttpClient) {
    this.dataStore = { users: [] };
    this.userList = new BehaviorSubject<User[]>([]);
  }

  get users(): Observable<User[]> {
    return this.userList.asObservable();
  }

  addUser(user: User): Promise<User> {
    return new Promise((resolve, reject) => {
      user.id = this.dataStore.users.length + 1;
      this.dataStore.users.push(user);
      this.userList.next(Object.assign({}, this.dataStore).users);
      resolve(user);
    });
  }

  userById(id: number) {
    const user = this.dataStore.users.find(x => x.id == id);
    return user;
  }

  loadAll() {
    const usersUrl = 'https://angular-material-api.azurewebsites.net/users';

    return this.http.get<User[]>(usersUrl)
      .subscribe(data => {
        this.dataStore.users = data;
        this.userList.next(Object.assign({}, this.dataStore).users);
      }, error => {
        console.log('Failed to fetch users');
      });
  }
}
