import Cookie from 'universal-cookie';

interface CookieGetOptions {
    doNotParse?: boolean;
}

interface CookieSetOptions {
    path?: string;
    expires?: Date;
    maxAge?: number;
    domain?: string;
    secure?: boolean;
    httpOnly?: boolean;
    sameSite?: boolean | 'none' | 'lax' | 'strict';
}

export class CookieOven {

	private cookies: Cookie;

	constructor() {
		this.cookies = new Cookie('radiosavta');
	}

	public clear(name: string, options?: CookieSetOptions) {
		return this.cookies.remove(name, options)
	}

	public bakeCookie(name: string, value: any, options?: CookieSetOptions): void {
		return this.cookies.set(name, value, options)
	}

	public eatCookie<T>(name: string, options?: CookieGetOptions) {
		return this.cookies.get<T>(name, options)
	}
}