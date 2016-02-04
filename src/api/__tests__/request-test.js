import { expect } from 'chai';
import { formatUrl, formatParams } from 'api/request';
import { apiHost, apiPort } from 'config';

describe('api', () => {
    describe('formatUrl', () => {
        it('client', () => {
            expect(formatUrl(undefined, false)).to.equal(`/api/`);
        });

        it('server', () => {
            expect(formatUrl(undefined, true)).to.equal(`http://${apiHost}:${apiPort}/`);
        });

        it('without \'/\'', () => {
            expect(formatUrl('path', false)).to.equal(`/api/path`);
        });

        it('singel \'/\'', () => {
            expect(formatUrl('/path', false)).to.equal(`/api/path`);
        });

        it('more than one \'/\'', () => {
            expect(formatUrl('///path', false)).to.equal(`/api/path`);
        });

        it('\'/\' not at the start', () => {
            expect(formatUrl('path/to', false)).to.equal(`/api/path/to`);
        });
    });

    describe('formatParams', () => {
        const DEFAULTS = {
            credentials: 'same-origin',
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            body: undefined
        };


        it('without args', () => {
            expect(formatParams()).to.deep.equal(DEFAULTS);
        });


        it('with headers', () => {
            const result = formatParams({
                headers: {
                    'Access': '*/*'
                }
            });

            const params = {
                ...DEFAULTS,
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Access': '*/*'
                })
            };

            expect(result).to.deep.equal(params);
        });


        it('with body from object', () => {
            const result = formatParams({
                body: {
                    foo: 'baz'
                }
            });

            const params = {
                ...DEFAULTS,
                body: JSON.stringify({
                    foo: 'baz'
                })
            };

            expect(result).to.deep.equal(params);
        });


        it('with body from args', () => {
            const result = formatParams(undefined, {
                foo: 'baz'
            });

            const params = {
                ...DEFAULTS,
                body: JSON.stringify({
                    foo: 'baz'
                })
            };

            expect(result).to.deep.equal(params);
        });


        it('with body from obj and args', () => {
            const result = formatParams({
                body: {
                    bar: 'baz'
                }
            }, {
                foo: 'baz'
            });

            const params = {
                ...DEFAULTS,
                body: JSON.stringify({
                    foo: 'baz'
                })
            };

            expect(result).to.deep.equal(params);
        });


        it('with some params (not headers and not body)', () => {
            const result = formatParams({
                foo: 'baz'
            });

            const params = {
                ...DEFAULTS,
                foo: 'baz'
            };

            expect(result).to.deep.equal(params);
        });


        it('headers, params and body in obj body in args', () => {
            const result = formatParams({
                headers: {
                    Access: '*/*'
                },
                body: {
                    foo: 'bar'
                },
                baz: 'boo'
            }, {
                bar: 'foo'
            });

            const params = {
                ...DEFAULTS,
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Access': '*/*'
                }),
                body: JSON.stringify({
                    bar: 'foo'
                }),
                baz: 'boo'
            };

            expect(result).to.deep.equal(params);
        });
    });
});
