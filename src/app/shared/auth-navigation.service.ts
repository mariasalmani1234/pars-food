import { Injectable } from '@angular/core';
import { Params, PRIMARY_OUTLET, Router } from '@angular/router';
import { safeReturnUrl } from './safe-return-url';

/** Keep purchase context on alternate auth links without forwarding other queries. */
@Injectable({ providedIn: 'root' })
export class AuthNavigationService {
  constructor(private router: Router) {}

  queryFor(target: 'login' | 'register'): Params {
    const current = this.router.parseUrl(this.router.url);
    const segments = current.root.children[PRIMARY_OUTLET]?.segments;
    if (segments?.length !== 1 || !['login', 'register'].includes(segments[0].path)) return {};

    const query: Params = {};
    const destination = safeReturnUrl(current.queryParamMap.get('returnUrl'));
    if (destination) query['returnUrl'] = destination;
    if (target === 'login' && segments[0].path === 'login' && current.queryParamMap.get('registered') === '1') {
      query['registered'] = '1';
    }
    return query;
  }
}
