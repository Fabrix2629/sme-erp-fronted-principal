import { TestBed } from '@angular/core/testing';

import { SmClienteService } from '../sm-cliente.service';

describe('SmClienteService', () => {
  let service: SmClienteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SmClienteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
