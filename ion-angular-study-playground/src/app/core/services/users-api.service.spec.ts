import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { User } from '../models/user.model';
import { UsersApiService } from './users-api.service';

describe('UsersApiService', () => {
  let service: UsersApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule] });
    service = TestBed.get(UsersApiService);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  it('consulta a lista de usuários na rota esperada', () => {
    service.getUsers().subscribe((users) => expect(users.length).toBe(1));

    const request = httpMock.expectOne('https://jsonplaceholder.typicode.com/users');
    expect(request.request.method).toBe('GET');
    request.flush([{ id: 1, name: 'Ada', username: 'ada', email: 'ada@example.com' } as User]);
  });
});
